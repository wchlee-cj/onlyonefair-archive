import { useState } from 'react';
import { X, ExternalLink, Download, Globe, CheckCircle2, FileText, Presentation, Sparkles, Building2, Users } from 'lucide-react';
import { DocumentItem } from '../types';
import { openDocumentInNewTab, downloadDocumentPdf } from '../utils/pdfGenerator';

interface DocumentPreviewModalProps {
  doc: DocumentItem | null;
  initialLang?: 'ko' | 'en';
  onClose: () => void;
}

export function DocumentPreviewModal({ doc, initialLang = 'ko', onClose }: DocumentPreviewModalProps) {
  const [currentLang, setCurrentLang] = useState<'ko' | 'en'>(initialLang);

  if (!doc) return null;

  const isTeamBrochure = !!doc.brochureData && doc.formatTag !== 'PPT/PDF';
  const isPtDeck = !!doc.brochureData && doc.formatTag === 'PPT/PDF';
  const team = doc.brochureData;

  const content = team ? (currentLang === 'ko' ? team.korean : team.english) : null;
  const projectTitle = team ? (currentLang === 'ko' ? team.projectTitleKo : team.projectTitleEn) : doc.title;
  const members = team ? (currentLang === 'ko' ? team.membersKo : team.membersEn) : doc.members;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs">
              DOC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                  {doc.badgeText}
                </span>
                {doc.isTestVersion && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
                    DRAFT
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 leading-snug line-clamp-1">
                {projectTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher for Brochure */}
            {isTeamBrochure && (
              <div className="flex items-center bg-slate-800 rounded p-0.5 text-xs font-mono font-bold">
                <button
                  onClick={() => setCurrentLang('ko')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    currentLang === 'ko' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  KR
                </button>
                <button
                  onClick={() => setCurrentLang('en')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    currentLang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="창 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-white">
          {/* Case 1: Team Brochure */}
          {isTeamBrochure && team && content && (
            <div className="space-y-5">
              {/* Cover Banner */}
              <div className="p-5 rounded-lg bg-slate-900 text-white border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono uppercase tracking-wider">
                  <span>TEAM 0{team.teamNumber} // {team.categoryTag}</span>
                  <span>ONLYONE ARCHIVE</span>
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">
                  {projectTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-3">
                  {content.subheadline}
                </p>
                {members && (
                  <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2.5 border-t border-slate-800 font-mono">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>ROSTER: {members.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* 1. Business Overview */}
              <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200">
                <h4 className="text-xs font-mono font-bold text-blue-900 mb-2 uppercase tracking-wider flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
                  [01] {currentLang === 'ko' ? '사업 아이디어 개요' : 'Business Overview'}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {content.businessOverview.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2 font-mono">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. ONLYONE Point */}
              {content.onlyonePoints && (
                <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200">
                  <h4 className="text-xs font-mono font-bold text-red-900 mb-2.5 uppercase tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2" />
                    [02] ONLYONE POINT ({currentLang === 'ko' ? '차별화 핵심 경쟁력' : 'Key Differentiators'})
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                    {content.onlyonePoints.first && (
                      <div className="p-2.5 bg-white rounded border border-slate-200">
                        <strong className="text-slate-900 font-mono mr-1.5">[FIRST]</strong>
                        <span>{content.onlyonePoints.first}</span>
                      </div>
                    )}
                    {content.onlyonePoints.best && (
                      <div className="p-2.5 bg-white rounded border border-slate-200">
                        <strong className="text-slate-900 font-mono mr-1.5">[BEST]</strong>
                        <span>{content.onlyonePoints.best}</span>
                      </div>
                    )}
                    {content.onlyonePoints.different && (
                      <div className="p-2.5 bg-white rounded border border-slate-200">
                        <strong className="text-slate-900 font-mono mr-1.5">[DIFFERENT]</strong>
                        <span>{content.onlyonePoints.different}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Expected Effects */}
              <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200">
                <h4 className="text-xs font-mono font-bold text-emerald-900 mb-2 uppercase tracking-wider flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2" />
                  [03] {currentLang === 'ko' ? '기대 효과 (Expected Effects)' : 'Expected Outcomes'}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {content.expectedEffects.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Features & Appendix Details */}
              {content.featuresOrRoadmap && content.featuresOrRoadmap.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200">
                  <h4 className="text-xs font-mono font-bold text-slate-900 mb-2.5 uppercase tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2" />
                    [04] {currentLang === 'ko' ? '주요 기능 및 실행 로드맵' : 'Key Features & Roadmap'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.featuresOrRoadmap.map((sec, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded border border-slate-200">
                        <h5 className="text-xs font-mono font-bold text-slate-800 mb-1.5 uppercase">{sec.title}</h5>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {sec.items.map((sub, sidx) => (
                            <li key={sidx} className="flex items-start">
                              <span className="text-blue-500 mr-1.5 font-mono">▪</span>
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Case 2: Presentation Deck Draft */}
          {isPtDeck && team && (
            <div className="space-y-5">
              <div className="p-5 rounded-lg bg-slate-900 text-white border-l-4 border-amber-500">
                <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono font-bold uppercase mb-1">
                  <Presentation className="w-3.5 h-3.5" />
                  <span>PRESENTATION SLIDE DECK // PREVIEW</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    DRAFT
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  [TEAM 0{team.teamNumber}] {team.projectTitleKo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-3">
                  {team.presentationDeckDraft.subtitle}
                </p>
                <div className="text-xs text-slate-400 flex items-center space-x-4 font-mono">
                  <span>TOTAL SLIDES: {team.presentationDeckDraft.slidesCount} PAGES</span>
                  <span>ESTIMATED: 8 MIN PITCH + 5 MIN Q&A</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-200">
                <h4 className="text-xs font-mono font-bold text-slate-900 mb-3 uppercase tracking-wider">
                  // SLIDE AGENDA ARCHITECTURE
                </h4>
                <div className="space-y-2">
                  {team.presentationDeckDraft.slidesSummary.map((slide, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-2.5 bg-white rounded border border-slate-200">
                      <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {slide}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Case 3: Evaluation Rubric */}
          {doc.evaluationDocType === 'rubric' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-slate-900 text-white border-l-4 border-emerald-500">
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 mb-1">EVALUATION RUBRIC ARCHITECTURE (100 PTS)</h4>
                <p className="text-xs text-slate-300">
                  ONLYONE 차별성, 시장성, 실행 타당성, 발표 완성도의 4대 영역을 종합적으로 평가합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="font-mono font-bold text-blue-900 text-xs uppercase">[01] ONLYONE 차별성</h5>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-800 rounded border border-slate-200">30 PTS</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 text-xs">
                    <li>• First, Best, Different 관점의 아이디어 독창성</li>
                    <li>• 기존 한계 극복 및 페인포인트 재정의</li>
                    <li>• 그룹 시너지 차별화 포인트</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="font-mono font-bold text-blue-900 text-xs uppercase">[02] 시장성 및 사업 가치</h5>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-800 rounded border border-slate-200">25 PTS</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 text-xs">
                    <li>• 글로벌 타겟 시장의 규모 및 성장성</li>
                    <li>• 고객의 실질적 구매/소비 동기</li>
                    <li>• 매출 기여 및 카테고리 확장성</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="font-mono font-bold text-blue-900 text-xs uppercase">[03] 실행 타당성 & 구체성</h5>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-800 rounded border border-slate-200">25 PTS</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 text-xs">
                    <li>• R&D 소재 및 공법 실현 가능성</li>
                    <li>• 마케팅 및 유통 구조의 구체성</li>
                    <li>• 규제/물류 리스크 대응책</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="font-mono font-bold text-blue-900 text-xs uppercase">[04] 발표 완성도 & 전달력</h5>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-800 rounded border border-slate-200">20 PTS</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 text-xs">
                    <li>• 브로셔 및 PT 슬라이드 가독성</li>
                    <li>• Q&A 질의응답 대응력 및 팀워크</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Case 4: Evaluation Guide (Test Version) */}
          {doc.evaluationDocType === 'guide' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-slate-900 text-white border-l-4 border-amber-500">
                <div className="flex items-center space-x-1.5 font-mono font-bold text-xs text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>JUDGING OPERATION MANUAL // DRAFT</span>
                </div>
                <p className="text-xs text-slate-300">
                  본 가이드는 심사위원의 원활한 현장 평가 진행을 위한 테스트 버전입니다.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <h5 className="font-mono font-bold text-slate-900 text-xs uppercase mb-1">[STEP 01] 온라인 시스템 접속</h5>
                  <p className="text-xs text-slate-600">
                    심사위원 계정으로 https://onlyonefair-judge.vercel.app/ 에 접속하여 인증 후 심사를 시작합니다.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <h5 className="font-mono font-bold text-slate-900 text-xs uppercase mb-1">[STEP 02] 발표 진행 및 시간 배분</h5>
                  <p className="text-xs text-slate-600">
                    각 조별 총 15분: 발표(8분) ➔ 질의응답(5분) ➔ 채점 및 점수 입력(2분)
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded border border-slate-200">
                  <h5 className="font-mono font-bold text-slate-900 text-xs uppercase mb-1">[STEP 03] 최종 점수 제출</h5>
                  <p className="text-xs text-slate-600">
                    7개 조의 모든 심사를 완료한 후 [최종 점수 제출] 버튼을 눌러 점수를 집계 시스템에 전송합니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-100">
          <div className="text-xs text-slate-500 hidden sm:block font-mono">
            {doc.fileSize ? `SIZE: ${doc.fileSize}` : 'SYSTEM VIEWER'}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => openDocumentInNewTab(doc)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase shadow-xs transition-colors"
              title="브라우저 자체 PDF 뷰어로 새 탭에서 열기"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>새 탭 열기 (PDF)</span>
            </button>

            {doc.type === 'pdf' && (
              <button
                onClick={() => downloadDocumentPdf(doc)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold uppercase transition-colors"
                title="PDF 파일 다운로드"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold uppercase transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
