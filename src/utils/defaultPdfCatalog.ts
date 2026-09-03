import { jsPDF } from 'jspdf';
import { TeamBrochureData, DocumentItem } from '../types';
import { TEAMS_DATA } from '../data/teamData';

// In-memory cache for generated PDF blobs
const blobCache = new Map<string, { blob: Blob; url: string; pageCount: number }>();

function drawHeaderBar(doc: jsPDF, title: string, subtitle: string, isLandscape: boolean = false) {
  const width = isLandscape ? 297 : 210;
  // CJ Corporate Dark Blue
  doc.setFillColor(11, 25, 44);
  doc.rect(0, 0, width, 22, 'F');

  // CJ Crimson accent line
  doc.setFillColor(225, 29, 72);
  doc.rect(0, 21, width, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('CJ ONLYONE FAIR 2026 | DOCUMENT REPOSITORY', 14, 10);

  doc.setFontSize(7.5);
  doc.setTextColor(190, 205, 225);
  doc.text(title, 14, 16);

  // Right badge
  doc.setFillColor(225, 29, 72);
  doc.roundedRect(width - 46, 6, 32, 9, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('CJ ONLYONE', width - 42, 12);
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number, isLandscape: boolean = false) {
  const width = isLandscape ? 297 : 210;
  const y = isLandscape ? 200 : 282;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, width - 14, y);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7);
  doc.text(`CJ ONLYONE Fair 2026 Official Repository | Page ${pageNum} of ${totalPages}`, 14, y + 5);
  doc.text('Confidential & Proprietary - CJ CheilJedang', width - 75, y + 5);
}

export function generateBrochurePdfBlob(team: TeamBrochureData): { blob: Blob; pageCount: number } {
  const cacheKey = `brochure-${team.teamNumber}`;
  if (blobCache.has(cacheKey)) {
    const item = blobCache.get(cacheKey)!;
    return { blob: item.blob, pageCount: item.pageCount };
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // --- Page 1: Korean Brochure ---
  drawHeaderBar(doc, `[${team.teamName}] ${team.projectTitleKo} - 국문 브로셔 (Korean)`, 'BILINGUAL BROCHURE');
  
  // Title & Team Meta
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text(`${team.teamName}. ${team.projectTitleKo}`, 14, 34);

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Team Roster / Authors: ${team.membersKo.join(', ')}`, 14, 41);
  doc.text(`Category: ${team.categoryTag}`, 14, 46);

  // Concept Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 51, 182, 22, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 51, 182, 22, 2.5, 2.5, 'S');

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.text(`[Concept] ${team.korean.headline}`, 18, 58);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7.5);
  const subLinesKo = doc.splitTextToSize(team.korean.subheadline, 174);
  doc.text(subLinesKo.slice(0, 2), 18, 65);

  let curY = 79;

  // 1. Business Overview
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(8.5);
  doc.text('1. 사업 아이디어 개요 (Business Overview)', 18, curY + 5);

  curY += 11;
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(7.5);
  team.korean.businessOverview.forEach((item) => {
    const lines = doc.splitTextToSize(`• ${item}`, 174);
    doc.text(lines, 16, curY);
    curY += lines.length * 4.2;
  });

  curY += 3;

  // 2. ONLYONE Point
  if (team.korean.onlyonePoints) {
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(8.5);
    doc.text('2. ONLYONE POINT (차별화 핵심 경쟁력)', 18, curY + 5);

    curY += 11;
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.5);

    if (team.korean.onlyonePoints.first) {
      const l1 = doc.splitTextToSize(`[FIRST] ${team.korean.onlyonePoints.first}`, 174);
      doc.text(l1, 16, curY);
      curY += l1.length * 4.2;
    }
    if (team.korean.onlyonePoints.best) {
      const l2 = doc.splitTextToSize(`[BEST] ${team.korean.onlyonePoints.best}`, 174);
      doc.text(l2, 16, curY);
      curY += l2.length * 4.2;
    }
    if (team.korean.onlyonePoints.different) {
      const l3 = doc.splitTextToSize(`[DIFFERENT] ${team.korean.onlyonePoints.different}`, 174);
      doc.text(l3, 16, curY);
      curY += l3.length * 4.2;
    }
    curY += 3;
  }

  // 3. Expected Effects
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(8.5);
  doc.text('3. 기대 효과 (Expected Outcomes)', 18, curY + 5);

  curY += 11;
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(7.5);
  team.korean.expectedEffects.forEach((item) => {
    const lines = doc.splitTextToSize(`✔ ${item}`, 174);
    doc.text(lines, 16, curY);
    curY += lines.length * 4.2;
  });

  curY += 3;

  // 4. Features & Roadmap
  if (team.korean.featuresOrRoadmap && team.korean.featuresOrRoadmap.length > 0) {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(8.5);
    doc.text('4. 주요 기능 및 실행 로드맵 (Features & Roadmap)', 18, curY + 5);

    curY += 10;
    doc.setFontSize(7);
    team.korean.featuresOrRoadmap.forEach((sec) => {
      doc.setTextColor(30, 41, 59);
      doc.text(`[${sec.title}]`, 16, curY);
      curY += 4;
      sec.items.forEach((sub) => {
        const lines = doc.splitTextToSize(`- ${sub}`, 170);
        doc.setTextColor(71, 85, 105);
        doc.text(lines, 20, curY);
        curY += lines.length * 3.8;
      });
      curY += 1.5;
    });
  }

  drawFooter(doc, 1, 2);

  // --- Page 2: English Brochure ---
  doc.addPage();
  drawHeaderBar(doc, `[${team.teamName}] ${team.projectTitleEn} - English Brochure`, 'BILINGUAL BROCHURE');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.text(`${team.teamName}. ${team.projectTitleEn}`, 14, 34);

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Team Roster / Authors: ${team.membersEn.join(', ')}`, 14, 41);
  doc.text(`Category: ${team.categoryTag}`, 14, 46);

  // Concept Box EN
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 51, 182, 22, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 51, 182, 22, 2.5, 2.5, 'S');

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.text(`[Concept] ${team.english.headline}`, 18, 58);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7.5);
  const subLinesEn = doc.splitTextToSize(team.english.subheadline, 174);
  doc.text(subLinesEn.slice(0, 2), 18, 65);

  curY = 79;

  // 1. Business Overview EN
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(8.5);
  doc.text('1. Business Overview', 18, curY + 5);

  curY += 11;
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(7.5);
  team.english.businessOverview.forEach((item) => {
    const lines = doc.splitTextToSize(`• ${item}`, 174);
    doc.text(lines, 16, curY);
    curY += lines.length * 4.2;
  });

  curY += 3;

  // 2. ONLYONE Point EN
  if (team.english.onlyonePoints) {
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(8.5);
    doc.text('2. ONLYONE Point (Differentiators)', 18, curY + 5);

    curY += 11;
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.5);

    if (team.english.onlyonePoints.first) {
      const l1 = doc.splitTextToSize(`[FIRST] ${team.english.onlyonePoints.first}`, 174);
      doc.text(l1, 16, curY);
      curY += l1.length * 4.2;
    }
    if (team.english.onlyonePoints.best) {
      const l2 = doc.splitTextToSize(`[BEST] ${team.english.onlyonePoints.best}`, 174);
      doc.text(l2, 16, curY);
      curY += l2.length * 4.2;
    }
    if (team.english.onlyonePoints.different) {
      const l3 = doc.splitTextToSize(`[DIFFERENT] ${team.english.onlyonePoints.different}`, 174);
      doc.text(l3, 16, curY);
      curY += l3.length * 4.2;
    }
    curY += 3;
  }

  // 3. Expected Outcomes EN
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(14, curY, 182, 7, 1.5, 1.5, 'F');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(8.5);
  doc.text('3. Expected Outcomes & Market Impact', 18, curY + 5);

  curY += 11;
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(7.5);
  team.english.expectedEffects.forEach((item) => {
    const lines = doc.splitTextToSize(`✔ ${item}`, 174);
    doc.text(lines, 16, curY);
    curY += lines.length * 4.2;
  });

  drawFooter(doc, 2, 2);

  const blob = doc.output('blob');
  const url = typeof window !== 'undefined' && window.URL ? URL.createObjectURL(blob) : '';
  blobCache.set(cacheKey, { blob, url, pageCount: 2 });
  return { blob, pageCount: 2 };
}

export function generatePresentationDeckPdfBlob(team: TeamBrochureData): { blob: Blob; pageCount: number } {
  const cacheKey = `pt-${team.teamNumber}`;
  if (blobCache.has(cacheKey)) {
    const item = blobCache.get(cacheKey)!;
    return { blob: item.blob, pageCount: item.pageCount };
  }

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // --- Slide 1: Cover ---
  doc.setFillColor(11, 25, 44);
  doc.rect(0, 0, 297, 210, 'F');

  // Left Accent Bar
  doc.setFillColor(225, 29, 72);
  doc.rect(0, 0, 10, 210, 'F');

  doc.setTextColor(225, 29, 72);
  doc.setFontSize(12);
  doc.text('CJ ONLYONE FAIR 2026 | FINAL PRESENTATION DECK', 28, 42);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(`[${team.teamName}] ${team.projectTitleKo}`, 28, 62);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(13);
  doc.text(team.projectTitleEn, 28, 74);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(10.5);
  const sub = doc.splitTextToSize(team.presentationDeckDraft.subtitle, 240);
  doc.text(sub, 28, 90);

  // Author Box
  doc.setFillColor(24, 38, 60);
  doc.roundedRect(28, 115, 240, 48, 3, 3, 'F');

  doc.setTextColor(248, 250, 252);
  doc.setFontSize(9.5);
  doc.text(`Category: ${team.categoryTag}`, 36, 128);
  doc.text(`Team Roster: ${team.membersKo.join(', ')}`, 36, 138);

  doc.setTextColor(251, 191, 36);
  doc.text(`Status: 공식 발표 슬라이드 덱 (슬라이드 총 ${team.presentationDeckDraft.slidesCount}페이지)`, 36, 148);

  drawFooter(doc, 1, 2, true);

  // --- Slide 2: Agenda ---
  doc.addPage('a4', 'landscape');
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 297, 210, 'F');

  drawHeaderBar(doc, `[${team.teamName}] ${team.projectTitleKo} - Agenda & Slide Architecture`, 'PRESENTATION DECK', true);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(15);
  doc.text('발표 슬라이드 아키텍처 및 핵심 아젠다', 15, 36);

  let sy = 48;
  team.presentationDeckDraft.slidesSummary.forEach((slide, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, sy, 267, 18, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, sy, 267, 18, 2, 2, 'S');

    doc.setFillColor(11, 25, 44);
    doc.roundedRect(20, sy + 3.5, 11, 11, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`0${idx + 1}`, 23, sy + 11);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(slide, 36, sy + 11);

    sy += 22;
  });

  drawFooter(doc, 2, 2, true);

  const blob = doc.output('blob');
  const url = typeof window !== 'undefined' && window.URL ? URL.createObjectURL(blob) : '';
  blobCache.set(cacheKey, { blob, url, pageCount: 2 });
  return { blob, pageCount: 2 };
}

export function generateEvaluationRubricPdfBlob(): { blob: Blob; pageCount: number } {
  const cacheKey = 'eval-rubric';
  if (blobCache.has(cacheKey)) {
    const item = blobCache.get(cacheKey)!;
    return { blob: item.blob, pageCount: item.pageCount };
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  drawHeaderBar(doc, '2026 CJ ONLYONE Fair 심사 평가 기준표 (Official Rubric)', 'EVALUATION STANDARD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(15);
  doc.text('2026 ONLYONE Fair 심사 평가 기준표 (100점 만점)', 14, 34);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('심사위원단은 4대 핵심 역량 영역(100점 만점)에 따라 객관적이고 엄정하게 심사를 진행합니다.', 14, 40);

  const criteria = [
    {
      no: '01',
      name: 'ONLYONE 차별성 (Originality & Innovation)',
      points: '30점',
      color: [238, 242, 255],
      items: [
        '• 최초(First), 최고(Best), 차별화(Different) 관점의 독창적 가치 창출',
        '• 기존 시장의 한계점 및 고객 페인포인트를 혁신적으로 재정의하였는가?',
        '• CJ만의 고유 역량과 결합하여 지속 가능한 경쟁 우위를 가지는가?'
      ]
    },
    {
      no: '02',
      name: '시장성 및 사업 가치 (Market Potential & Business Value)',
      points: '25점',
      color: [240, 253, 244],
      items: [
        '• 글로벌 타겟 시장(미국, 일본, 동남아 등)의 규모 및 성장성 충족 여부',
        '• 고객이 실질적으로 지불/이용할 명확한 구매 동기와 경제성 확보',
        '• 매출 기여 및 그룹사 비즈니스(식품/바이오/올리브영 등) 시너지 파급력'
      ]
    },
    {
      no: '03',
      name: '실행 타당성 및 구체성 (Feasibility & Implementation)',
      points: '25점',
      color: [254, 242, 242],
      items: [
        '• R&D 기술, 생산, 소재(PHA, BLG, TNR 등), 유통 구조의 실현 가능성',
        '• 단계별 실행 로드맵 및 마케팅/유통 채널 전략의 구체성',
        '• 규제, 콜드체인, 품질 관리 등 예상 리스크에 대한 사전 대응책'
      ]
    },
    {
      no: '04',
      name: '발표 완성도 및 전달력 (Presentation & Clarity)',
      points: '20점',
      color: [255, 251, 235],
      items: [
        '• 브로셔 및 발표 슬라이드의 시각적 가독성, 논리 전개 완성도',
        '• 질의응답(Q&A)에 대한 명확한 대응력 및 팀원 간의 조화로운 팀워크'
      ]
    }
  ];

  let cy = 47;
  criteria.forEach((c) => {
    doc.setFillColor(c.color[0], c.color[1], c.color[2]);
    doc.roundedRect(14, cy, 182, 42, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, cy, 182, 42, 2, 2, 'S');

    doc.setTextColor(11, 25, 44);
    doc.setFontSize(9.5);
    doc.text(`[${c.no}] ${c.name}`, 18, cy + 8);

    doc.setFillColor(11, 25, 44);
    doc.roundedRect(162, cy + 3, 28, 7, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text(`배점: ${c.points}`, 165, cy + 7.5);

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.5);
    let ly = cy + 16;
    c.items.forEach((it) => {
      const lines = doc.splitTextToSize(it, 172);
      doc.text(lines, 18, ly);
      ly += lines.length * 4.2;
    });

    cy += 46;
  });

  drawFooter(doc, 1, 1);

  const blob = doc.output('blob');
  const url = typeof window !== 'undefined' && window.URL ? URL.createObjectURL(blob) : '';
  blobCache.set(cacheKey, { blob, url, pageCount: 1 });
  return { blob, pageCount: 1 };
}

export function generateEvaluationGuidePdfBlob(): { blob: Blob; pageCount: number } {
  const cacheKey = 'eval-guide';
  if (blobCache.has(cacheKey)) {
    const item = blobCache.get(cacheKey)!;
    return { blob: item.blob, pageCount: item.pageCount };
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  drawHeaderBar(doc, 'CJ ONLYONE Fair 2026 심사위원 운영 매뉴얼 & 평가 가이드', 'OPERATING PROTOCOL');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(15);
  doc.text('심사위원 현장 평가 진행 가이드라인', 14, 34);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('온라인 평가 시스템 접속, 발표 타임테이블 및 점수 최종 집계 프로토콜 안내입니다.', 14, 40);

  const sections = [
    {
      title: '1. 온라인 평가 시스템 접속 및 로그인',
      items: [
        '• 평가 시스템 URL: https://onlyonefair-judge.vercel.app/',
        '• 발급받은 심사위원 계정으로 로그인하여 세션 인증을 완료합니다.',
        '• 발표 진행 중 실시간으로 조별 점수와 심사 의견을 입력할 수 있습니다.'
      ]
    },
    {
      title: '2. 발표 및 질의응답 타임테이블 (팀당 총 15분)',
      items: [
        '• 팀별 발표 (Presentation): 8분 정시 진행',
        '• 심사위원 질의응답 (Q&A): 5분 질의응답',
        '• 점수 입력 및 평가지 정리 (Scoring): 2분',
        '• 1조부터 7조까지 순차 진행되며 4조 종료 후 15분간 중간 휴식이 제공됩니다.'
      ]
    },
    {
      title: '3. 점수 제출 및 최종 확정 절차',
      items: [
        '• 모든 조의 심사가 완료된 후 시스템 우측 상단의 [최종 점수 제출]을 클릭합니다.',
        '• 최종 제출 전까지는 언제든지 점수 및 평가 코멘트 수정이 가능합니다.'
      ]
    }
  ];

  let cy = 48;
  sections.forEach((sec) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, cy, 182, 38, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, cy, 182, 38, 2, 2, 'S');

    doc.setTextColor(30, 58, 138);
    doc.setFontSize(9);
    doc.text(sec.title, 18, cy + 8);

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.5);
    let ly = cy + 15;
    sec.items.forEach((it) => {
      const lines = doc.splitTextToSize(it, 172);
      doc.text(lines, 18, ly);
      ly += lines.length * 4.2;
    });

    cy += 43;
  });

  drawFooter(doc, 1, 1);

  const blob = doc.output('blob');
  const url = typeof window !== 'undefined' && window.URL ? URL.createObjectURL(blob) : '';
  blobCache.set(cacheKey, { blob, url, pageCount: 1 });
  return { blob, pageCount: 1 };
}

export function getInitialCatalogDocuments(): DocumentItem[] {
  const docs: DocumentItem[] = [];

  // 1. Evaluation System Web Link
  docs.push({
    id: 'eval-system-link',
    title: 'CJ ONLYONE Fair 온라인 평가 시스템',
    subtitle: '심사위원 전용 온라인 채점 및 집계 포털',
    type: 'link',
    category: 'evaluation',
    evaluationDocType: 'link',
    targetUrl: 'https://onlyonefair-judge.vercel.app/',
    badgeText: '온라인 평가 시스템',
    status: 'available',
    formatTag: 'WEB LINK',
    language: 'KO',
    description: '심사위원 평가 점수 및 의견을 실시간 입력하는 온라인 심사 포털입니다.',
  });

  // 2. Evaluation Rubric Standard PDF (Bilingual support)
  docs.push({
    id: 'eval-rubric-kor',
    title: '2026 ONLYONE Fair 평가 기준 상세',
    subtitle: '공식 100점 만점 심사 척도 및 영역별 배점 기준',
    type: 'pdf',
    category: 'evaluation',
    subtype: 'rubric',
    evaluationDocType: 'rubric',
    fileUrl: '/documents/eval/eval_rubric(kor).pdf',
    badgeText: '심사 평가 기준표',
    status: 'available',
    formatTag: 'PDF',
    language: 'KO',
    fileSize: '76 KB',
    originalFileName: 'eval_rubric(kor).pdf',
    date: '2026.09.01',
    description: 'ONLYONE 차별성(30점), 시장성(25점), 실행 타당성(25점), 발표 완성도(20점) 4대 기준표',
  });

  docs.push({
    id: 'eval-rubric-eng',
    title: '2026 ONLYONE Fair Evaluation Criteria',
    subtitle: 'Official 100-Point Scoring Rubric & Evaluation Dimensions',
    type: 'pdf',
    category: 'evaluation',
    subtype: 'rubric',
    evaluationDocType: 'rubric',
    fileUrl: '/documents/eval/eval_rubric(eng).pdf',
    badgeText: 'Evaluation Criteria',
    status: 'available',
    formatTag: 'PDF',
    language: 'EN',
    fileSize: '50 KB',
    originalFileName: 'eval_rubric(eng).pdf',
    date: '2026.09.01',
    description: 'ONLYONE Differentiation (30 pts), Market Viability (25 pts), Feasibility (25 pts), Presentation Quality (20 pts)',
  });

  // 3. Evaluation Guide PDF (Direct mapping to /documents/eval/eval_guide.pdf)
  docs.push({
    id: 'eval-guide-manual',
    title: '2026 ONLYONE Fair 평가 가이드',
    subtitle: '심사위원 평가 진행 및 시스템 이용 가이드',
    type: 'pdf',
    category: 'evaluation',
    subtype: 'guide',
    evaluationDocType: 'guide',
    fileUrl: '/documents/eval/eval_guide.pdf',
    badgeText: '평가 가이드',
    status: 'available',
    formatTag: 'PDF',
    language: 'KO',
    fileSize: '470 KB',
    originalFileName: 'eval_guide.pdf',
    date: '2026.09.01',
    description: '심사위원 로그인 방법, 조별 15분 타임테이블(8분/5분/2분) 및 점수 확정 절차',
  });

  // 4. Teams 1~7 Documents
  TEAMS_DATA.forEach((team) => {
    // Team Brochure
    const brochure = generateBrochurePdfBlob(team);
    docs.push({
      id: `team-${team.teamNumber}-brochure-pure`,
      title: `[${team.teamName}] ${team.projectTitleKo} 국·영문 브로셔`,
      subtitle: `${team.teamName} 국문/영문 통합 공식 브로셔 (2 Pages)`,
      type: 'pdf',
      category: 'team_presentation',
      subtype: 'brochure',
      teamNumber: team.teamNumber,
      teamName: team.teamName,
      members: team.membersKo,
      badgeText: `${team.teamName} 국·영문 브로셔`,
      status: 'available',
      formatTag: 'PDF',
      language: 'BILINGUAL',
      fileSize: '680 KB',
      pageCount: brochure.pageCount,
      rawBlob: brochure.blob,
      blobUrl: typeof window !== 'undefined' && window.URL ? URL.createObjectURL(brochure.blob) : '',
      originalFileName: `[${team.teamName}]_${team.projectTitleKo}_국영문_브로셔.pdf`,
      date: '2026.09.01',
      description: team.korean.subheadline,
      brochureData: team,
    });

    // Team Presentation Deck
    const pt = generatePresentationDeckPdfBlob(team);
    docs.push({
      id: `team-${team.teamNumber}-pt-pure`,
      title: `[${team.teamName}] ${team.projectTitleKo} 발표 자료`,
      subtitle: `${team.teamName} 최종 프레젠테이션 슬라이드 덱`,
      type: 'pdf',
      category: 'team_presentation',
      subtype: 'presentation',
      teamNumber: team.teamNumber,
      teamName: team.teamName,
      members: team.membersKo,
      badgeText: `${team.teamName} 발표 자료`,
      status: 'available',
      formatTag: 'PPT/PDF',
      language: 'BILINGUAL',
      fileSize: '890 KB',
      pageCount: pt.pageCount,
      rawBlob: pt.blob,
      blobUrl: typeof window !== 'undefined' && window.URL ? URL.createObjectURL(pt.blob) : '',
      originalFileName: `[${team.teamName}]_${team.projectTitleKo}_발표슬라이드.pdf`,
      date: '2026.09.01',
      description: team.presentationDeckDraft.subtitle,
      brochureData: team,
    });
  });

  return docs;
}
