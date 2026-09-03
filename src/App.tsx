import React, { useEffect, useState, useMemo } from 'react';
import { DocumentItem } from './types';
import { TEAMS_DATA } from './data/teamData';
import { getInitialCatalogDocuments } from './utils/defaultPdfCatalog';
import { Navbar } from './components/Navbar';
import { EvaluationSection } from './components/EvaluationSection';
import { TeamCard } from './components/TeamCard';
import { PurePdfViewerModal } from './components/PurePdfViewerModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainApp() {
  const { t } = useLanguage();
  const [catalogDocs, setCatalogDocs] = useState<DocumentItem[]>([]);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    const docs = getInitialCatalogDocuments();
    setCatalogDocs(docs);
  }, []);

  const handleOpenPreview = (doc: DocumentItem) => {
    setPreviewDoc(doc);
  };

  const evaluationDocs = useMemo(() => {
    return catalogDocs.filter((d) => d.category === 'evaluation');
  }, [catalogDocs]);

  return (
    <div
      className="min-h-screen font-sans text-slate-800 flex flex-col selection:bg-blue-900 selection:text-white"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      {/* 1. Header with Language Switcher */}
      <Navbar />

      {/* 2. Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Evaluation System & Criteria Section */}
        <EvaluationSection
          evaluationDocs={evaluationDocs}
          onPreview={handleOpenPreview}
        />

        {/* 1~7 Teams Presentation Materials Container (Archive) */}
        <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 border-l-4 border-slate-900 pl-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.archive.sectionTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.archive.sectionSubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {TEAMS_DATA.map((team) => (
              <TeamCard
                key={team.teamNumber}
                team={team}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="mt-auto bg-slate-100 px-4 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-xs font-mono border-t border-slate-200 gap-1.5">
        <div>
          <span>{t.footer.copyright}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{t.footer.systemStatus}</span>
        </div>
      </footer>

      {/* 4. Pure Lossless PDF In-App Viewer Modal */}
      <PurePdfViewerModal
        doc={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
