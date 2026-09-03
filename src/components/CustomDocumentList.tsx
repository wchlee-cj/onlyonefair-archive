import React from 'react';
import {
  FileText,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  FileCheck2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DocumentItem } from '../types';
import { openDocumentInNewTab, downloadDocumentPdf } from '../utils/pdfGenerator';

interface CustomDocumentListProps {
  customDocs: DocumentItem[];
  onPreview: (doc: DocumentItem) => void;
  onDeleteDoc: (docId: string) => void;
  onOpenUploadModal: () => void;
}

export function CustomDocumentList({
  customDocs,
  onPreview,
  onDeleteDoc,
  onOpenUploadModal,
}: CustomDocumentListProps) {
  if (customDocs.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">
          업로드된 사용자 원본 PDF 문서가 없습니다.
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          팀별 최신 발표본이나 자체 심사 문서를 등록해 보세요. 글꼴, 서식, 그래픽이 100% 원본 그대로 안전하게 보관됩니다.
        </p>
        <button
          onClick={onOpenUploadModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono transition-colors inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
        >
          <span>첫 번째 원본 PDF 파일 업로드하기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3 border-l-4 border-emerald-600 pl-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>사용자 업로드 원본 보관함</span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {customDocs.length}건 보관 중
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            IndexedDB에 저장되어 새로고침 후에도 안전하게 유지되는 원본 PDF 아카이브
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {customDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                      {doc.badgeText}
                    </span>
                    {doc.teamNumber && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                        {doc.teamNumber}조
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-mono">
                      {doc.fileSize}
                    </span>
                    {doc.pageCount && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        · {doc.pageCount}P
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 truncate leading-snug">
                    {doc.title}
                  </h4>
                  {doc.description && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {doc.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                {doc.date || '최근 등록'}
              </span>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onPreview(doc)}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                  title="고해상도 뷰어로 보기"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>미리보기</span>
                </button>

                <button
                  onClick={() => openDocumentInNewTab(doc)}
                  className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  title="새 탭에서 열기"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => downloadDocumentPdf(doc)}
                  className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  title="무손실 원본 다운로드"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteDoc(doc.id)}
                  className="p-1 text-red-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  title="문서 보관함에서 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
