import React from 'react';
import { Search, UploadCloud, FileCheck2, Filter, Layers, Database } from 'lucide-react';
import { DocCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: DocCategory;
  onCategoryChange: (cat: DocCategory) => void;
  selectedTeamFilter: number | null;
  onTeamFilterChange: (teamNum: number | null) => void;
  onOpenUploadModal: () => void;
  storedDocCount: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTeamFilter,
  onTeamFilterChange,
  onOpenUploadModal,
  storedDocCount,
}: FilterBarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs space-y-3">
      {/* Top Row: Search Input & Category Tabs & Upload Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="팀명, 프로젝트명, 발표자, 키워드 검색..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-medium overflow-x-auto scrollbar-none">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            전체 자료
          </button>
          <button
            onClick={() => onCategoryChange('team_presentation')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'team_presentation'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1~7조 발표자료
          </button>
          <button
            onClick={() => onCategoryChange('evaluation')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'evaluation'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            심사·평가 가이드
          </button>
          <button
            onClick={() => onCategoryChange('custom_upload')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
              selectedCategory === 'custom_upload'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>업로드 보관함</span>
            {storedDocCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-mono">
                {storedDocCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Upload Button */}
        <button
          onClick={onOpenUploadModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>순수 원본 PDF 등록</span>
        </button>
      </div>

      {/* Bottom Row: Team 1~7 Filter Pills & Storage Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
        {/* Team Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[11px] font-mono font-bold text-slate-400 mr-1.5 flex items-center">
            <Filter className="w-3 h-3 mr-1" />
            TEAM:
          </span>
          <button
            onClick={() => onTeamFilterChange(null)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              selectedTeamFilter === null
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              onClick={() => onTeamFilterChange(selectedTeamFilter === num ? null : num)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                selectedTeamFilter === num
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {num}조
            </button>
          ))}
        </div>

        {/* Lossless Integrity Badge */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <FileCheck2 className="w-3.5 h-3.5" />
            100% 무손실 원본 보존 중
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-slate-400" />
            IndexedDB 안전 보관
          </span>
        </div>
      </div>
    </div>
  );
}
