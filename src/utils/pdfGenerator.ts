import { DocumentItem } from '../types';
import { downloadBlob } from './pdfStorage';
import {
  generateBrochurePdfBlob,
  generatePresentationDeckPdfBlob,
  generateEvaluationRubricPdfBlob,
  generateEvaluationGuidePdfBlob,
} from './defaultPdfCatalog';

export function getDocumentBlob(docItem: DocumentItem): Blob {
  if (docItem.rawBlob) {
    return docItem.rawBlob;
  }
  if (docItem.customFile) {
    return docItem.customFile;
  }

  // Fallback to default catalog generators
  if (docItem.brochureData) {
    if (docItem.formatTag === 'PPT/PDF' || docItem.subtype === 'presentation') {
      return generatePresentationDeckPdfBlob(docItem.brochureData).blob;
    }
    return generateBrochurePdfBlob(docItem.brochureData).blob;
  }

  if (docItem.evaluationDocType === 'rubric' || docItem.subtype === 'rubric') {
    return generateEvaluationRubricPdfBlob().blob;
  }

  if (docItem.evaluationDocType === 'guide' || docItem.subtype === 'guide') {
    return generateEvaluationGuidePdfBlob().blob;
  }

  return generateEvaluationRubricPdfBlob().blob;
}

export function openDocumentInNewTab(docItem: DocumentItem): void {
  if (docItem.type === 'link' && docItem.targetUrl) {
    window.open(docItem.targetUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  if (docItem.fileUrl) {
    window.open(docItem.fileUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  if (docItem.blobUrl) {
    window.open(docItem.blobUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  const blob = getDocumentBlob(docItem);
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
}

export function downloadDocumentPdf(docItem: DocumentItem): void {
  if (docItem.type === 'link' && docItem.targetUrl) {
    window.open(docItem.targetUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  if (docItem.fileUrl) {
    const a = document.createElement('a');
    a.href = docItem.fileUrl;
    a.download = docItem.originalFileName || `${docItem.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  const blob = getDocumentBlob(docItem);
  const fileName = docItem.originalFileName || `${docItem.title}.pdf`;
  downloadBlob(blob, fileName);
}
