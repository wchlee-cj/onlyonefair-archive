import React from 'react';
import { Eye, Download, FileText, Presentation } from 'lucide-react';
import { TeamBrochureData, DocumentItem } from '../types';
import { openDocumentInNewTab, downloadDocumentPdf } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

export interface TeamCardProps {
  key?: React.Key;
  team: TeamBrochureData;
  onPreview: (doc: DocumentItem) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onPreview }) => {
  const { lang, t } = useLanguage();

  // 1. 국·영문 브로셔 Document
  const brochureDocItem: DocumentItem = {
    id: `team-${team.teamNumber}-brochure-pure`,
    title: `[${team.teamName}] ${lang === 'en' ? team.projectTitleEn : team.projectTitleKo} ${t.archive.brochureBtn}`,
    subtitle: `${team.teamName} ${lang === 'en' ? 'Integrated Official Brochure (Bilingual)' : '국·영문 통합 공식 브로셔'}`,
    type: 'pdf',
    category: 'team_presentation',
    subtype: 'brochure',
    fileUrl: team.brochurePdfUrl || `/documents/team0${team.teamNumber}/brochure.pdf`,
    teamNumber: team.teamNumber,
    teamName: team.teamName,
    members: lang === 'en' ? team.membersEn : team.membersKo,
    badgeText: `${team.teamName} ${t.archive.brochureBtn}`,
    status: 'available',
    formatTag: 'PDF',
    language: 'BILINGUAL',
    description: lang === 'en' ? team.english.subheadline : team.korean.subheadline,
    fileSize: '300 KB',
    pageCount: 2,
    date: '2026.09.01',
    originalFileName: `[${team.teamName}]_${team.projectTitleKo}_국영문_브로셔.pdf`,
    brochureData: team,
  };

  // 2. 발표 자료 (국문) Document
  const ptKorDocItem: DocumentItem = {
    id: `team-${team.teamNumber}-pt-kor`,
    title: `[${team.teamName}] ${lang === 'en' ? team.projectTitleEn : team.projectTitleKo} ${t.archive.ptKorBtn}`,
    subtitle: `${team.teamName} ${lang === 'en' ? 'Official Pitch Deck (Korean)' : '공식 프레젠테이션 슬라이드 (국문)'}`,
    type: 'pdf',
    category: 'team_presentation',
    subtype: 'presentation',
    fileUrl: team.presentationKorPdfUrl || `/documents/team0${team.teamNumber}/presentation(kor).pdf`,
    teamNumber: team.teamNumber,
    teamName: team.teamName,
    members: team.membersKo,
    badgeText: `${team.teamName} ${t.archive.ptKorBtn}`,
    status: 'available',
    formatTag: 'PPT/PDF',
    language: 'KO',
    description: team.presentationDeckDraft.subtitle,
    fileSize: '15 MB',
    date: '2026.09.01',
    originalFileName: `[${team.teamName}]_${team.projectTitleKo}_발표자료(국문).pdf`,
    brochureData: team,
  };

  // 3. 발표 자료 (영문) Document
  const ptEngDocItem: DocumentItem = {
    id: `team-${team.teamNumber}-pt-eng`,
    title: `[${team.teamName}] ${team.projectTitleEn} ${t.archive.ptEngBtn}`,
    subtitle: `${team.teamName} ${lang === 'en' ? 'Official Pitch Deck (English)' : '공식 프레젠테이션 슬라이드 (영문)'}`,
    type: 'pdf',
    category: 'team_presentation',
    subtype: 'presentation',
    fileUrl: team.presentationEngPdfUrl || `/documents/team0${team.teamNumber}/presentation(eng).pdf`,
    teamNumber: team.teamNumber,
    teamName: team.teamName,
    members: team.membersEn,
    badgeText: `${team.teamName} ${t.archive.ptEngBtn}`,
    status: 'available',
    formatTag: 'PPT/PDF',
    language: 'EN',
    description: team.english.subheadline,
    fileSize: '15 MB',
    date: '2026.09.01',
    originalFileName: `[${team.teamName}]_${team.projectTitleEn}_presentation(eng).pdf`,
    brochureData: team,
  };

  const primaryTitle = lang === 'en' ? team.projectTitleEn : team.projectTitleKo;
  const subtitle = team.projectSubtitleEn || team.projectTitleEn;

  return (
    <div className="bg-white hover:bg-slate-50/60 rounded-lg border border-slate-200 hover:border-slate-300 transition-all p-3 sm:p-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
      {/* Left: Team & Project Title Info */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-900 text-white">
            TEAM 0{team.teamNumber}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
          {primaryTitle}
        </h3>
        <p className="text-xs text-slate-500 font-mono truncate">
          {subtitle}
        </p>
      </div>

      {/* Right: Integrated 3 Items: Brochure(kor/eng) + Presentation(kor) + Presentation(eng) */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-200/60 flex-shrink-0">
        {/* 1. 국·영문 브로셔 / Brochure(kor/eng) */}
        <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white border border-slate-200 rounded hover:bg-blue-50/50 hover:border-blue-300 transition-colors group flex-1 sm:flex-initial">
          <div
            id={`btn-open-brochure-${team.teamNumber}`}
            onClick={() => openDocumentInNewTab(brochureDocItem)}
            className="flex items-center gap-2 cursor-pointer pr-1.5"
            title={`${t.archive.brochureBtn} - ${t.archive.openInNewTab}`}
          >
            <div className="bg-blue-100 p-1.5 rounded text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-900 whitespace-nowrap">
              {t.archive.brochureBtn}
            </span>
          </div>

          <div className="flex items-center space-x-0.5 border-l border-slate-200 pl-1.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(brochureDocItem);
              }}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
              title={t.archive.preview}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadDocumentPdf(brochureDocItem);
              }}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
              title={t.archive.download}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. 발표 자료(국문) / Presentation(kor) */}
        <div className="flex items-center justify-between p-2 sm:p-2.5 bg-amber-50/60 border border-amber-200 rounded hover:bg-amber-100/60 hover:border-amber-300 transition-colors group flex-1 sm:flex-initial">
          <div
            id={`btn-open-pt-kor-${team.teamNumber}`}
            onClick={() => openDocumentInNewTab(ptKorDocItem)}
            className="flex items-center gap-2 cursor-pointer pr-1.5"
            title={`${t.archive.ptKorBtn} - ${t.archive.openInNewTab}`}
          >
            <div className="bg-amber-100 p-1.5 rounded text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Presentation className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900 whitespace-nowrap">
              {t.archive.ptKorBtn}
            </span>
          </div>

          <div className="flex items-center space-x-0.5 border-l border-amber-200 pl-1.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(ptKorDocItem);
              }}
              className="p-1 text-amber-800/70 hover:text-amber-950 hover:bg-amber-200/50 rounded transition-colors cursor-pointer"
              title={t.archive.preview}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadDocumentPdf(ptKorDocItem);
              }}
              className="p-1 text-amber-800/70 hover:text-amber-950 hover:bg-amber-200/50 rounded transition-colors cursor-pointer"
              title={t.archive.download}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. 발표 자료(영문) / Presentation(eng) */}
        <div className="flex items-center justify-between p-2 sm:p-2.5 bg-indigo-50/60 border border-indigo-200 rounded hover:bg-indigo-100/60 hover:border-indigo-300 transition-colors group flex-1 sm:flex-initial">
          <div
            id={`btn-open-pt-eng-${team.teamNumber}`}
            onClick={() => openDocumentInNewTab(ptEngDocItem)}
            className="flex items-center gap-2 cursor-pointer pr-1.5"
            title={`${t.archive.ptEngBtn} - ${t.archive.openInNewTab}`}
          >
            <div className="bg-indigo-100 p-1.5 rounded text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Presentation className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900 whitespace-nowrap">
              {t.archive.ptEngBtn}
            </span>
          </div>

          <div className="flex items-center space-x-0.5 border-l border-indigo-200 pl-1.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(ptEngDocItem);
              }}
              className="p-1 text-indigo-800/70 hover:text-indigo-950 hover:bg-indigo-200/50 rounded transition-colors cursor-pointer"
              title={t.archive.preview}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadDocumentPdf(ptEngDocItem);
              }}
              className="p-1 text-indigo-800/70 hover:text-indigo-950 hover:bg-indigo-200/50 rounded transition-colors cursor-pointer"
              title={t.archive.download}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
