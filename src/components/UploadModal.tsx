import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { DocumentItem, DocCategory, DocSubtype } from '../types';
import { saveOriginalPdf, formatBytes } from '../utils/pdfStorage';
import { getPdfPageCount } from '../utils/pdfEngine';

interface UploadModalProps {
  isOpen: boolean;
  targetTeamNumber?: number | null;
  targetSubtype?: DocSubtype | null;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentItem) => void;
}

export function UploadModal({
  isOpen,
  targetTeamNumber = null,
  targetSubtype = null,
  onClose,
  onUploadSuccess,
}: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocCategory>(
    targetTeamNumber ? 'team_presentation' : 'team_presentation'
  );
  const [teamNumber, setTeamNumber] = useState<number>(targetTeamNumber || 1);
  const [subtype, setSubtype] = useState<DocSubtype>(targetSubtype || 'presentation');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [errorText, setErrorText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorText(null);
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorText('PDF 형식의 파일(.pdf)만 등록 가능합니다.');
      return;
    }

    setSelectedFile(file);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    setIsProcessing(true);
    try {
      const pages = await getPdfPageCount(file);
      setPageCount(pages);
    } catch {
      setPageCount(1);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorText('업로드할 PDF 파일을 선택해 주세요.');
      return;
    }

    setIsProcessing(true);
    try {
      const docId = `custom-doc-${Date.now()}`;
      const isTeam = category === 'team_presentation';

      let defaultBadge = '사용자 PDF';
      if (isTeam) {
        defaultBadge = subtype === 'brochure' ? `${teamNumber}조 브로셔` : `${teamNumber}조 발표자료`;
      } else if (category === 'evaluation') {
        defaultBadge = '평가 기준자료';
      }

      const docItem: DocumentItem = {
        id: docId,
        title: title.trim() || selectedFile.name,
        subtitle: isTeam ? `${teamNumber}조 원본 등록 파일` : '사용자 등록 원본 PDF',
        type: 'pdf',
        category: category,
        subtype: subtype,
        teamNumber: isTeam ? teamNumber : undefined,
        teamName: isTeam ? `${teamNumber}조` : undefined,
        badgeText: defaultBadge,
        status: 'custom',
        formatTag: subtype === 'presentation' ? 'PPT/PDF' : 'PDF',
        language: 'KO',
        fileSize: formatBytes(selectedFile.size),
        pageCount: pageCount,
        date: new Date().toLocaleDateString('ko-KR'),
        isUserUploaded: true,
        originalFileName: selectedFile.name,
        rawBlob: selectedFile,
        blobUrl: URL.createObjectURL(selectedFile),
        description: description.trim() || `${selectedFile.name} (총 ${pageCount}페이지 원본 등록)`,
      };

      // Store pure lossless file blob in IndexedDB
      await saveOriginalPdf(docId, selectedFile, docItem, pageCount);

      onUploadSuccess(docItem);
      onClose();
    } catch (err) {
      console.error('Failed to save PDF to IndexedDB', err);
      setErrorText('문서 저장 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded bg-blue-600 text-white">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                순수 원본 PDF 파일 등록 // 자료실 보관
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                100% 원본 글꼴, 서식, 그래픽 보존 보관 시스템
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Drag & Drop Box */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-blue-600 bg-blue-50/70 scale-[0.99]'
                : selectedFile
                ? 'border-emerald-500/80 bg-emerald-50/30'
                : 'border-slate-300 hover:border-blue-500 bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center justify-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-emerald-700 font-mono font-semibold">
                    {formatBytes(selectedFile.size)} · {pageCount} Pages · 클릭하여 다른 파일 선택
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  실제 원본 PDF 파일을 끌어다 놓거나 클릭하여 선택하세요
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  LOSSLESS PDF ONLY (글꼴·디자인 100% 원본 보존)
                </p>
              </div>
            )}
          </div>

          {errorText && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              문서 제목
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: [1조] 맛.zip 발표 슬라이드 최종본"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs text-slate-900"
            />
          </div>

          {/* Classification Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                자료실 구분
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs text-slate-900"
              >
                <option value="team_presentation">1~7조 조별 발표 자료</option>
                <option value="evaluation">심사 및 평가 가이드</option>
                <option value="custom_upload">일반 사용자 업로드 자료실</option>
              </select>
            </div>

            {category === 'team_presentation' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  해당 팀 (조)
                </label>
                <select
                  value={teamNumber}
                  onChange={(e) => setTeamNumber(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs text-slate-900"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num}>
                      {num}조 (TEAM 0{num})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Subtype for team documents */}
          {category === 'team_presentation' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                문서 종류
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSubtype('presentation')}
                  className={`p-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                    subtype === 'presentation'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  발표 슬라이드 (PT Deck)
                </button>
                <button
                  type="button"
                  onClick={() => setSubtype('brochure')}
                  className={`p-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                    subtype === 'brochure'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  국·영문 브로셔
                </button>
              </div>
            </div>
          )}

          {/* Description Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              문서 설명 / 비고 (선택)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="문서에 대한 추가 설명이나 작성자 메모를 입력하세요."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs text-slate-900"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isProcessing}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>무손실 저장 중...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>원본 PDF 등록하기</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
