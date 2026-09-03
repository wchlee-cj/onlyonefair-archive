import React from 'react';
import { FileText, ExternalLink, Download, Eye, Sparkles } from 'lucide-react';
import { DocumentItem } from '../types';
import { openDocumentInNewTab, downloadDocumentPdf } from '../utils/pdfGenerator';

interface DocumentCardProps {
  key?: React.Key;
  doc: DocumentItem;
  onPreview: (doc: DocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onPreview }) => {
  const isLink = doc.type === 'link';
  const isTest = doc.status === 'test_draft' || doc.isTestVersion;

  return (
    <div className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition-all duration-150 p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Top Header Badge Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                isLink
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : doc.category === 'evaluation'
                  ? 'bg-slate-100 text-slate-800 border border-slate-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {isLink ? <ExternalLink className="w-3 h-3 mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
              {doc.badgeText}
            </span>

            {isTest && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                DRAFT
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
            {doc.fileSize && <span>{doc.fileSize}</span>}
            {doc.date && (
              <>
                <span>•</span>
                <span>{doc.date}</span>
              </>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-1">
          {doc.title}
        </h3>
        {doc.subtitle && (
          <p className="text-xs font-mono text-slate-500 line-clamp-1 mb-2">
            {doc.subtitle}
          </p>
        )}

        {/* Description or Members */}
        {doc.description && (
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3 bg-slate-50 p-2.5 rounded border border-slate-200">
            {doc.description}
          </p>
        )}

        {doc.members && doc.members.length > 0 && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-mono font-bold text-slate-500 text-[10px] uppercase bg-slate-100 px-1 py-0.5 rounded">
              TEAM
            </span>
            <span className="truncate">
              {doc.members.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {/* Main Action: Open in new tab */}
        <button
          onClick={() => openDocumentInNewTab(doc)}
          className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors uppercase font-mono tracking-wider cursor-pointer"
          title={isLink ? '외부 웹사이트 새 탭으로 열기' : '브라우저 자체 PDF 뷰어로 새 탭에서 열기'}
        >
          {isLink ? (
            <>
              <ExternalLink className="w-3.5 h-3.5" />
              <span>사이트 바로가기</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-3.5 h-3.5" />
              <span>새 탭 열기 (PDF)</span>
            </>
          )}
        </button>

        {/* Secondary Actions */}
        {!isLink && (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPreview(doc)}
              className="p-2 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="상세 미리보기"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => downloadDocumentPdf(doc)}
              className="p-2 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="PDF 파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
