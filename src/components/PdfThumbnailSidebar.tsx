import React, { useEffect, useState } from 'react';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { generatePdfThumbnail } from '../utils/pdfEngine';

interface PdfThumbnailSidebarProps {
  pdfDoc: PDFDocumentProxy | null;
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
  isOpen: boolean;
}

export function PdfThumbnailSidebar({
  pdfDoc,
  currentPage,
  totalPages,
  onSelectPage,
  isOpen,
}: PdfThumbnailSidebarProps) {
  const [thumbnails, setThumbnails] = useState<{ [page: number]: string }>({});

  useEffect(() => {
    if (!pdfDoc) {
      setThumbnails({});
      return;
    }

    let isMounted = true;

    // Asynchronously generate thumbnails with gentle yielding for large PDF decks
    async function loadThumbnails() {
      if (!pdfDoc) return;
      for (let p = 1; p <= totalPages; p++) {
        if (!isMounted) break;
        try {
          const thumbUrl = await generatePdfThumbnail(pdfDoc, p, 130);
          if (isMounted) {
            setThumbnails((prev) => ({ ...prev, [p]: thumbUrl }));
          }
          // Micro-yield to keep main thread and primary canvas render buttery smooth
          await new Promise((resolve) => setTimeout(resolve, 30));
        } catch {
          // ignore error
        }
      }
    }

    loadThumbnails();

    return () => {
      isMounted = false;
    };
  }, [pdfDoc, totalPages]);

  if (!isOpen) return null;

  return (
    <aside className="w-48 bg-slate-900 border-r border-slate-700/80 flex flex-col h-full overflow-hidden flex-shrink-0 select-none">
      <div className="px-3.5 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
        <span>THUMBNAILS</span>
        <span className="text-blue-400">{totalPages} PAGES</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          const isCurrent = pageNum === currentPage;
          const thumbSrc = thumbnails[pageNum];

          return (
            <button
              key={pageNum}
              onClick={() => onSelectPage(pageNum)}
              className={`w-full text-left rounded p-1.5 transition-all cursor-pointer group flex flex-col items-center ${
                isCurrent
                  ? 'bg-blue-600/20 border-2 border-blue-500 shadow-md shadow-blue-500/10'
                  : 'bg-slate-800/60 border border-slate-700/60 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="w-full aspect-[1/1.4] bg-white rounded overflow-hidden flex items-center justify-center relative shadow-xs">
                {thumbSrc ? (
                  <img
                    src={thumbSrc}
                    alt={`Page ${pageNum}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-mono">
                    <span className="animate-pulse">P.{pageNum}</span>
                  </div>
                )}
                {isCurrent && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                )}
              </div>

              <span
                className={`mt-1.5 text-[11px] font-mono font-bold ${
                  isCurrent ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                Page {pageNum}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
