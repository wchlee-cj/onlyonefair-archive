import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

// Configure Mozilla PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

// Memory cache for parsed PDF document proxies
const documentCache = new Map<string, PDFDocumentProxy>();

// Active render task reference to cancel previous renders cleanly
const activeRenderTasks = new WeakMap<HTMLCanvasElement, RenderTask>();

export function clearPdfDocumentCache(): void {
  documentCache.clear();
}

export async function loadPdfDocument(source: Blob | string): Promise<PDFDocumentProxy> {
  if (typeof source === 'string') {
    // Add timestamp/cache-buster for local documents if needed or reuse loaded proxy
    if (documentCache.has(source)) {
      return documentCache.get(source)!;
    }

    const loadingTask = pdfjsLib.getDocument({
      url: source,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
      disableRange: false,       // Enable HTTP byte-range streaming for huge files (100MB+)
      disableStream: false,      // Enable progressive streaming
      disableAutoFetch: false,
      maxImageSize: -1,          // Allow high-res presentation graphics
    });

    const pdf = await loadingTask.promise;
    documentCache.set(source, pdf);
    return pdf;
  }

  const arrayBuffer = await source.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
    maxImageSize: -1,
  });
  return await loadingTask.promise;
}

export async function getPdfPageCount(source: Blob | string): Promise<number> {
  try {
    const pdf = await loadPdfDocument(source);
    return pdf.numPages;
  } catch (error) {
    console.warn('Failed to get PDF page count, defaulting to 1', error);
    return 1;
  }
}

export async function renderPdfPageToCanvas(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale: number = 1.2,
  rotation: number = 0
): Promise<{ width: number; height: number }> {
  // 1. Cancel any active render task on this canvas before starting a new one
  if (activeRenderTasks.has(canvas)) {
    try {
      const activeTask = activeRenderTasks.get(canvas);
      if (activeTask) {
        activeTask.cancel();
      }
    } catch {
      // ignore cancel error
    }
    activeRenderTasks.delete(canvas);
  }

  const page = await pdfDoc.getPage(pageNumber);
  const totalRotation = (page.rotate + rotation) % 360;

  // Calculate viewport at requested scale
  const viewport = page.getViewport({ scale, rotation: totalRotation });

  // Safe DPR calculation with max dimension bound (prevent browser canvas memory limit crashes on large 100MB+ decks)
  const maxDimension = 4096; // Safe GPU texture limit
  const baseDpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1.5) : 1.5;
  const clampedDpr = Math.min(baseDpr, 2.0);

  let effectiveDpr = clampedDpr;
  if (viewport.width * effectiveDpr > maxDimension || viewport.height * effectiveDpr > maxDimension) {
    effectiveDpr = Math.min(maxDimension / viewport.width, maxDimension / viewport.height);
  }

  canvas.width = Math.floor(viewport.width * effectiveDpr);
  canvas.height = Math.floor(viewport.height * effectiveDpr);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  ctx.save();
  ctx.scale(effectiveDpr, effectiveDpr);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, viewport.width, viewport.height);

  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
    enableWebGL: true,
  };

  const renderTask = page.render(renderContext);
  activeRenderTasks.set(canvas, renderTask);

  try {
    await renderTask.promise;
    activeRenderTasks.delete(canvas);
    ctx.restore();
    return { width: viewport.width, height: viewport.height };
  } catch (err: unknown) {
    ctx.restore();
    activeRenderTasks.delete(canvas);
    // Ignore cancellation errors which happen during rapid page flips or zoom
    if (err && typeof err === 'object' && 'name' in err && (err as { name: string }).name === 'RenderingCancelledException') {
      return { width: viewport.width, height: viewport.height };
    }
    throw err;
  }
}

export async function generatePdfThumbnail(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  targetWidth: number = 140
): Promise<string> {
  try {
    const page = await pdfDoc.getPage(pageNumber);
    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const scale = targetWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = Math.floor(viewport.width);
    thumbCanvas.height = Math.floor(viewport.height);

    const ctx = thumbCanvas.getContext('2d', { alpha: false });
    if (!ctx) return '';

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, thumbCanvas.width, thumbCanvas.height);

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    return thumbCanvas.toDataURL('image/jpeg', 0.8);
  } catch (err) {
    console.warn('Thumbnail generation failed for page', pageNumber, err);
    return '';
  }
}
