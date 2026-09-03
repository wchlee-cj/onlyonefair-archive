import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ko' | 'en';

export interface Translations {
  header: {
    badge: string;
    title: string;
  };
  evaluation: {
    sectionTitle: string;
    sectionSubtitle: string;
    systemSiteTitle: string;
    systemBadge: string;
    rubricTitle: string;
    guideTitle: string;
    openInNewTab: string;
    preview: string;
    download: string;
  };
  archive: {
    sectionTitle: string;
    sectionSubtitle: string;
    brochureBtn: string;
    ptKorBtn: string;
    ptEngBtn: string;
    openInNewTab: string;
    preview: string;
    download: string;
  };
  viewer: {
    title: string;
    page: string;
    of: string;
    zoomIn: string;
    zoomOut: string;
    fitWidth: string;
    rotate: string;
    thumbnails: string;
    fullscreen: string;
    exitFullscreen: string;
    download: string;
    openNewTab: string;
    close: string;
    loading: string;
    error: string;
  };
  footer: {
    copyright: string;
    systemStatus: string;
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    header: {
      badge: 'CJ ONLYONE FAIR',
      title: '2026 H1 CJCJ ONLYONE FAIR 자료실',
    },
    evaluation: {
      sectionTitle: '평가 자료실',
      sectionSubtitle: '온라인 평가 사이트 바로가기 및 평가 기준 상세',
      systemSiteTitle: '평가 사이트 접속',
      systemBadge: 'SITE',
      rubricTitle: '평가 기준 상세',
      guideTitle: '평가 가이드',
      openInNewTab: '브라우저 새 탭에서 열기',
      preview: '상세 미리보기',
      download: 'PDF 다운로드',
    },
    archive: {
      sectionTitle: '조별 자료실',
      sectionSubtitle: '각 팀별 국·영문 브로셔 및 발표 자료를 새 탭에서 즉시 열람하거나 다운로드할 수 있습니다.',
      brochureBtn: '국·영문 브로셔',
      ptKorBtn: '발표 자료(국문)',
      ptEngBtn: '발표 자료(영문)',
      openInNewTab: '새 탭에서 열기',
      preview: '순수 원본 고해상도 미리보기',
      download: '원본 PDF 다운로드',
    },
    viewer: {
      title: '고해상도 순수 원본 PDF 뷰어',
      page: '페이지',
      of: '/',
      zoomIn: '확대',
      zoomOut: '축소',
      fitWidth: '너비 맞춤',
      rotate: '90° 회전',
      thumbnails: '썸네일 목차',
      fullscreen: '전체화면 발표 모드',
      exitFullscreen: '전체화면 종료',
      download: '원본 다운로드',
      openNewTab: '새 탭에서 열기',
      close: '닫기 (ESC)',
      loading: '고해상도 원본 PDF 렌더링 중...',
      error: 'PDF 문서를 로드하는 중 오류가 발생했습니다.',
    },
    footer: {
      copyright: '© 2026 ONLYONE FAIR ARCHIVE',
      systemStatus: 'ONLINE EVALUATION & PRESENTATION SYSTEM',
    },
  },
  en: {
    header: {
      badge: 'CJ ONLYONE FAIR',
      title: '2026 H1 CJCJ ONLYONE FAIR Archive',
    },
    evaluation: {
      sectionTitle: 'Evaluation',
      sectionSubtitle: 'Direct link to online evaluation site & criteria',
      systemSiteTitle: 'Access Evaluation System',
      systemBadge: 'SITE',
      rubricTitle: 'Evaluation Criteria',
      guideTitle: 'Evaluation Guide',
      openInNewTab: 'Open in new tab',
      preview: 'Preview PDF',
      download: 'Download PDF',
    },
    archive: {
      sectionTitle: 'Archive',
      sectionSubtitle: 'View or download each team’s brochure and presentation materials in pure original format.',
      brochureBtn: 'Brochure(KOR/ENG)',
      ptKorBtn: 'Presentation(KOR)',
      ptEngBtn: 'Presentation(ENG)',
      openInNewTab: 'Open in new tab',
      preview: 'High-Fidelity PDF Preview',
      download: 'Download Original PDF',
    },
    viewer: {
      title: 'Pure Original PDF Viewer',
      page: 'Page',
      of: 'of',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitWidth: 'Fit to Width',
      rotate: 'Rotate 90°',
      thumbnails: 'Thumbnails',
      fullscreen: 'Fullscreen Presentation',
      exitFullscreen: 'Exit Fullscreen',
      download: 'Download Original',
      openNewTab: 'Open in New Tab',
      close: 'Close (ESC)',
      loading: 'Rendering high-resolution vector PDF...',
      error: 'Failed to load PDF document.',
    },
    footer: {
      copyright: '© 2026 ONLYONE FAIR ARCHIVE',
      systemStatus: 'ONLINE EVALUATION & PRESENTATION SYSTEM',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always default to 'ko' (Korean) upon initial access
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get('lang');
      if (queryLang === 'en') return 'en';
    }
    return 'ko';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].header.title;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
