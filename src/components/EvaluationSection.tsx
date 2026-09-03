import React from 'react';
import { ExternalLink, CheckCircle2, FileText, Eye, Sparkles } from 'lucide-react';
import { DocumentItem } from '../types';
import { EVALUATION_SYSTEM_LINK } from '../data/teamData';
import { useLanguage } from '../context/LanguageContext';

interface EvaluationSectionProps {
  evaluationDocs: DocumentItem[];
  onPreview: (doc: DocumentItem) => void;
}

export function EvaluationSection({ evaluationDocs, onPreview }: EvaluationSectionProps) {
  const { lang, t } = useLanguage();

  const isEng = lang === 'en';

  // Dynamic Rubric Document: switch between eval_rubric(eng).pdf and eval_rubric(kor).pdf
  const rubricDoc: DocumentItem = evaluationDocs.find(
    (d) =>
      d.type === 'pdf' &&
      (isEng
        ? d.id === 'eval-rubric-eng' || d.fileUrl?.includes('eval_rubric(eng)')
        : d.id === 'eval-rubric-kor' || d.fileUrl?.includes('eval_rubric(kor)'))
  ) || {
    id: isEng ? 'eval-rubric-eng' : 'eval-rubric-kor',
    title: isEng ? '2026 ONLYONE Fair Evaluation Criteria' : '2026 ONLYONE Fair 평가 기준 상세',
    subtitle: isEng
      ? 'Official 100-Point Scoring Rubric & Evaluation Dimensions'
      : '공식 100점 만점 심사 척도 및 영역별 배점 기준',
    type: 'pdf',
    category: 'evaluation',
    subtype: 'rubric',
    evaluationDocType: 'rubric',
    fileUrl: isEng ? '/documents/eval/eval_rubric(eng).pdf' : '/documents/eval/eval_rubric(kor).pdf',
    badgeText: isEng ? 'Evaluation Criteria' : '심사 평가 기준표',
    status: 'available',
    formatTag: 'PDF',
    language: isEng ? 'EN' : 'KO',
    fileSize: isEng ? '50 KB' : '76 KB',
    originalFileName: isEng ? 'eval_rubric(eng).pdf' : 'eval_rubric(kor).pdf',
    date: '2026.09.01',
    description: isEng
      ? 'ONLYONE Differentiation (30 pts), Market Viability (25 pts), Feasibility (25 pts), Presentation Quality (20 pts)'
      : 'ONLYONE 차별성(30점), 시장성(25점), 실행 타당성(25점), 발표 완성도(20점) 4대 기준표',
  };

  // Dynamic Guide Document: switch between eval_guide(eng).pdf and eval_guide(kor).pdf
  const guideDoc: DocumentItem = evaluationDocs.find(
    (d) =>
      d.type === 'pdf' &&
      (isEng
        ? d.id === 'eval-guide-eng' || d.fileUrl?.includes('eval_guide(eng)')
        : d.id === 'eval-guide-kor' || d.fileUrl?.includes('eval_guide(kor)'))
  ) || {
    id: isEng ? 'eval-guide-eng' : 'eval-guide-kor',
    title: isEng ? '2026 ONLYONE Fair Evaluation Guide' : '2026 ONLYONE Fair 평가 가이드',
    subtitle: isEng
      ? 'Judges Evaluation Protocol & System Operations Manual'
      : '심사위원 평가 진행 및 시스템 이용 가이드',
    type: 'pdf',
    category: 'evaluation',
    subtype: 'guide',
    evaluationDocType: 'guide',
    fileUrl: isEng ? '/documents/eval/eval_guide(eng).pdf' : '/documents/eval/eval_guide(kor).pdf',
    badgeText: isEng ? 'Evaluation Guide' : '평가 가이드',
    status: 'available',
    formatTag: 'PDF',
    language: isEng ? 'EN' : 'KO',
    fileSize: isEng ? '505 KB' : '535 KB',
    originalFileName: isEng ? 'eval_guide(eng).pdf' : 'eval_guide(kor).pdf',
    date: '2026.09.01',
    description: isEng
      ? 'Judge login instructions, 15-minute presentation timetable (8m pitch/5m Q&A/2m scoring) and final submission flow'
      : '심사위원 로그인 방법, 조별 15분 타임테이블(8분/5분/2분) 및 점수 확정 절차',
  };

  return (
    <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 border-l-4 border-blue-600 pl-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {t.evaluation.sectionTitle}
          </h2>
          <p className="text-xs text-slate-500">
            {t.evaluation.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* 3 Compact Action Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Evaluation System Web Link */}
        <a
          id="hero-eval-system-btn"
          href={EVALUATION_SYSTEM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-300 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-900">
                {t.evaluation.systemSiteTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              {t.evaluation.systemBadge}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
          </div>
        </a>

        {/* 2. Evaluation Criteria (평가 기준 상세) Viewer Button */}
        <div
          id="btn-eval-rubric"
          onClick={() => onPreview(rubricDoc)}
          className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded hover:bg-red-50/50 hover:border-red-300 transition-colors group cursor-pointer"
          title={`${t.evaluation.rubricTitle} - ${t.evaluation.preview}`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-red-100 p-2 rounded text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-900 truncate">
                {t.evaluation.rubricTitle}
              </p>
            </div>
          </div>
          <div className="p-1 text-slate-400 group-hover:text-red-600 rounded transition-colors flex-shrink-0">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        {/* 3. Evaluation Guide (평가 가이드) Viewer Button */}
        <div
          id="btn-eval-guide"
          onClick={() => onPreview(guideDoc)}
          className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded hover:bg-amber-50/50 hover:border-amber-300 transition-colors group cursor-pointer"
          title={`${t.evaluation.guideTitle} - ${t.evaluation.preview}`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-amber-100 p-2 rounded text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900 truncate">
                {t.evaluation.guideTitle}
              </p>
            </div>
          </div>
          <div className="p-1 text-slate-400 group-hover:text-amber-700 rounded transition-colors flex-shrink-0">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
