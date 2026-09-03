import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Sidebar,
  Layers,
  FileCheck2,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { DocumentItem } from '../types';
import { getDocumentBlob, downloadDocumentPdf, openDocumentInNewTab } from '../utils/pdfGenerator';
import { loadPdfDocument, renderPdfPageToCanvas } from '../utils/pdfEngine';
import { PdfThumbnailSidebar } from './PdfThumbnailSidebar';
import { useLanguage } from '../context/LanguageContext';

interface PurePdfViewerModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
}

export function PurePdfViewerModal({ doc, onClose }: PurePdfViewerModalProps) {
  const { t } = useLanguage();
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.25);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renderLoading, setRenderLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'native'>('canvas');
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  // Load PDF Document when doc changes
  useEffect(() => {
    if (!doc) {
      setPdfDoc(null);
      setBlobUrl(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentPage(1);

    let urlToRevoke: string | null = null;

    if (doc.fileUrl) {
      setBlobUrl(doc.fileUrl);
      loadPdfDocument(doc.fileUrl)
        .then((loadedPdf) => {
          if (!isMounted) return;
          setPdfDoc(loadedPdf);
          setTotalPages(loadedPdf.numPages);
          setIsLoading(false);
        })
        .catch((err) => {
          if (!isMounted) return;
          console.error('PDF Load Error:', err);
          setErrorMessage('PDF 문서를 로드하는 중 오류가 발생했습니다. 브라우저 기본 뷰어로 열람해 주세요.');
          setIsLoading(false);
        });
    } else {
      const blob = getDocumentBlob(doc);
      const url = URL.createObjectURL(blob);
      urlToRevoke = url;
      setBlobUrl(url);

      loadPdfDocument(blob)
        .then((loadedPdf) => {
          if (!isMounted) return;
          setPdfDoc(loadedPdf);
          setTotalPages(loadedPdf.numPages);
          setIsLoading(false);
        })
        .catch((err) => {
          if (!isMounted) return;
          console.error('PDF Load Error:', err);
          setErrorMessage('PDF 문서를 로드하는 중 오류가 발생했습니다. 브라우저 기본 뷰어로 열람해 주세요.');
          setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }
    };
  }, [doc]);

  // Render current page onto canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || viewMode !== 'canvas') return;

    let isMounted = true;
    setRenderLoading(true);

    renderPdfPageToCanvas(pdfDoc, currentPage, canvasRef.current, scale, rotation)
      .then(() => {
        if (isMounted) setRenderLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Canvas render error:', err);
          setRenderLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pdfDoc, currentPage, scale, rotation, viewMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!doc) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((prev) => Math.min(prev + 0.2, 2.5));
      } else if (e.key === '-') {
        e.preventDefault();
        setScale((prev) => Math.max(prev - 0.2, 0.5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [doc, totalPages, isFullscreen, onClose]);

  if (!doc) return null;

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.15, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.15, 0.5));
  const handleResetZoom = () => setScale(1.2);
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const toggleFullscreen = () => setIsFullscreen((f) => !f);

  return (
    <div
      ref={modalContainerRef}
      className={`fixed inset-0 z-50 overflow-hidden bg-slate-950/85 backdrop-blur-sm flex flex-col justify-center items-center ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'
      }`}
    >
      {/* Modal Container */}
      <div
        className={`w-full bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden transition-all ${
          isFullscreen
            ? 'h-full w-full rounded-none'
            : 'max-w-7xl h-[92vh] rounded-xl'
        }`}
      >
        {/* 1. Top Enterprise Header */}
        <header className="px-4 py-3 bg-slate-950 text-white border-b border-slate-800 flex items-center justify-between flex-shrink-0 select-none">
          {/* Left: Document Info */}
          <div className="flex items-center space-x-3 min-w-0 pr-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs flex-shrink-0">
              PDF
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  {doc.badgeText}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3" />
                  100% 원본 렌더링
                </span>
                {doc.fileSize && (
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                    {doc.fileSize}
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate leading-snug">
                {doc.title}
              </h2>
            </div>
          </div>

          {/* Right: Mode Switcher & Quick Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs font-mono font-bold">
              <button
                onClick={() => setViewMode('canvas')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 cursor-pointer ${
                  viewMode === 'canvas'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="고해상도 Canvas 렌더러로 보기 (글꼴·그래픽 왜곡 방지)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>고해상도 렌더러</span>
              </button>
              <button
                onClick={() => setViewMode('native')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 cursor-pointer ${
                  viewMode === 'native'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="브라우저 자체 PDF 뷰어로 임베드 보기"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>네이티브 뷰어</span>
              </button>
            </div>

            {/* Open in new tab */}
            <button
              onClick={() => openDocumentInNewTab(doc)}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-bold border border-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="브라우저 새 탭에서 열기"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">새 탭</span>
            </button>

            {/* Download original */}
            <button
              onClick={() => downloadDocumentPdf(doc)}
              className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
              title="무손실 원본 PDF 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">원본 다운로드</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="창 닫기 (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 2. Interactive Tool Bar (Canvas Mode) */}
        {viewMode === 'canvas' && (
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs select-none">
            {/* Left: Thumbnail & Page Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowThumbnails((s) => !s)}
                className={`p-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1 border transition-colors cursor-pointer ${
                  showThumbnails
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="썸네일 사이드바 토글"
              >
                <Sidebar className="w-4 h-4" />
                <span className="hidden sm:inline">썸네일</span>
              </button>

              <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>

              {/* Page Navigator */}
              <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded border border-slate-800 font-mono">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                  title="이전 페이지 (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-slate-200 font-bold px-1.5">
                  {currentPage} <span className="text-slate-500">/</span> {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                  title="다음 페이지 (→)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center: Zoom & Rotate Controls */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.6}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 border border-slate-700 transition-colors cursor-pointer"
                title="축소 (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetZoom}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] border border-slate-700 transition-colors cursor-pointer"
                title="100% 크기로 리셋"
              >
                {Math.round(scale * 100)}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={scale >= 2.5}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 border border-slate-700 transition-colors cursor-pointer"
                title="확대 (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>

              <button
                onClick={handleRotate}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="90도 회전"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title={isFullscreen ? '전체화면 종료' : '전체화면 발표 모드'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* 3. Main Viewer Canvas or Native Embed */}
        <div className="flex-1 flex overflow-hidden relative bg-slate-950">
          {/* Thumbnail Sidebar */}
          {viewMode === 'canvas' && (
            <PdfThumbnailSidebar
              pdfDoc={pdfDoc}
              currentPage={currentPage}
              totalPages={totalPages}
              onSelectPage={(p) => setCurrentPage(p)}
              isOpen={showThumbnails}
            />
          )}

          {/* Central PDF Display Area */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative select-none scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
          >
            {/* Loading Indicator */}
            {(isLoading || renderLoading) && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center z-10 space-y-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-xs text-slate-300 font-mono animate-pulse">
                  {isLoading ? '순수 원본 PDF 데이터 불러오는 중...' : `Page ${currentPage} 고해상도 렌더링 중...`}
                </p>
              </div>
            )}

            {/* Error fallback */}
            {errorMessage ? (
              <div className="max-w-md p-6 bg-slate-900 border border-red-500/40 rounded-xl text-center space-y-3 shadow-xl">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">뷰어 렌더링 안내</h4>
                <p className="text-xs text-slate-400">{errorMessage}</p>
                <div className="pt-2 flex justify-center space-x-2">
                  <button
                    onClick={() => setViewMode('native')}
                    className="px-3.5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold"
                  >
                    네이티브 뷰어로 열기
                  </button>
                  <button
                    onClick={() => openDocumentInNewTab(doc)}
                    className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold"
                  >
                    새 탭에서 열람
                  </button>
                </div>
              </div>
            ) : viewMode === 'canvas' ? (
              /* Canvas Renderer */
              <div className="relative shadow-2xl rounded bg-white overflow-hidden my-auto border border-slate-700">
                <canvas ref={canvasRef} className="block mx-auto max-w-full" />
              </div>
            ) : (
              /* Native Browser iFrame / Embed */
              blobUrl && (
                <iframe
                  src={`${blobUrl}#toolbar=1&navpanes=1`}
                  title={doc.title}
                  className="w-full h-full rounded border-0 bg-slate-900"
                />
              )
            )}
          </div>
        </div>

        {/* 4. Bottom Footer Info Bar */}
        <footer className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono select-none">
          <div className="flex items-center space-x-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="truncate">ORIGINAL: {doc.originalFileName || `${doc.title}.pdf`}</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-500">
            <span className="hidden sm:inline">단축키: ← / → (이동), +/- (확대/축소), Esc (닫기)</span>
            <span className="text-blue-400 font-bold">LOSSLESS PDF ARCHIVE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
