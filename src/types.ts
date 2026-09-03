export type DocType = 'pdf' | 'link';
export type DocCategory = 'all' | 'evaluation' | 'team_presentation' | 'custom_upload';
export type DocStatus = 'available' | 'test_draft' | 'preparing' | 'custom';
export type DocSubtype = 'brochure' | 'presentation' | 'rubric' | 'guide' | 'custom';

export interface BrochurePageContent {
  headline: string;
  subheadline: string;
  problemStatement: string;
  solutionStatement: string;
  businessOverview: string[];
  onlyonePoints?: {
    first?: string;
    best?: string;
    different?: string;
  };
  expectedEffects: string[];
  featuresOrRoadmap?: {
    title: string;
    items: string[];
  }[];
  keyInsights?: string[];
  appendixDetails?: {
    title: string;
    description: string;
    steps?: string[];
  };
}

export interface TeamBrochureData {
  teamNumber: number;
  teamName: string;
  projectTitleKo: string;
  projectTitleEn: string;
  projectSubtitleEn?: string;
  membersKo: string[];
  membersEn: string[];
  categoryTag: string;
  brochurePdfUrl?: string;
  presentationKorPdfUrl?: string;
  presentationEngPdfUrl?: string;
  korean: BrochurePageContent;
  english: BrochurePageContent;
  presentationDeckDraft: {
    title: string;
    subtitle: string;
    slidesCount: number;
    slidesSummary: string[];
  };
}

export interface DocumentItem {
  id: string;
  title: string;
  subtitle?: string;
  type: DocType;
  category: 'evaluation' | 'team_presentation' | 'custom_upload';
  subtype?: DocSubtype;
  teamNumber?: number;
  teamName?: string;
  members?: string[];
  targetUrl?: string; // external web link
  fileUrl?: string;   // static PDF path in /documents/...
  badgeText: string;
  status: DocStatus;
  formatTag: 'PDF' | 'WEB LINK' | 'PPT/PDF';
  language?: 'KO' | 'EN' | 'BILINGUAL';
  description?: string;
  fileSize?: string;
  pageCount?: number;
  date?: string;
  isTestVersion?: boolean;
  isUserUploaded?: boolean;
  blobUrl?: string;
  rawBlob?: Blob;
  originalFileName?: string;
  customFile?: File;
  brochureData?: TeamBrochureData;
  evaluationDocType?: 'link' | 'rubric' | 'guide';
}

export interface StoredPdfRecord {
  id: string;
  fileName: string;
  blob: Blob;
  fileSize: string;
  pageCount: number;
  createdAt: string;
  metadata: Partial<DocumentItem>;
}
