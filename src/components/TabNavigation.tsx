import { Layers, FileText, CheckCircle2, UploadCloud } from 'lucide-react';
import { DocCategory } from '../types';

interface TabNavigationProps {
  currentTab: DocCategory;
  onTabChange: (tab: DocCategory) => void;
  counts: {
    all: number;
    evaluation: number;
    team_presentation: number;
    custom_upload: number;
  };
}

export function TabNavigation({ currentTab, onTabChange, counts }: TabNavigationProps) {
  const tabs = [
    {
      id: 'all' as DocCategory,
      label: '전체 목록',
      icon: Layers,
      count: counts.all,
    },
    {
      id: 'team_presentation' as DocCategory,
      label: '1~7조 발표자료',
      icon: FileText,
      count: counts.team_presentation,
    },
    {
      id: 'evaluation' as DocCategory,
      label: '평가 시스템 & 기준표',
      icon: CheckCircle2,
      count: counts.evaluation,
    },
    {
      id: 'custom_upload' as DocCategory,
      label: '업로드 문서함',
      icon: UploadCloud,
      count: counts.custom_upload,
    },
  ];

  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
