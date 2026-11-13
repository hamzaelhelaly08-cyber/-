import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export interface PdfExportOptions {
  /** Array of DOM nodes where each element represents one discrete A4 page sheet */
  pageElements: HTMLElement[];
  /** Descriptive file name ending in .pdf */
  filename: string;
}

export interface PdfExportResult {
  success: boolean;
  filename: string;
  pageCount: number;
  errorMessage?: string;
}

/**
 * Generates an explicit sanitized filename following:
 * CateringEgypt_<DocType>_<DocNumber>_<Date>.pdf
 */
export function buildOfficialPdfFilename(
  docTypeSlug: string,
  docNumber: string,
  issueDate: string
): string {
  const cleanType = docTypeSlug.replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanNum = (docNumber || 'DOC').replace(/[^a-zA-Z0-9_-]/g, '-');
  const cleanDate = (issueDate || new Date().toISOString().slice(0, 10)).replace(/[^0-9-]/g, '');
  return `CateringEgypt_${cleanType}_${cleanNum}_${cleanDate}.pdf`;
}

/**
 * Splits a list of line items cleanly across discrete A4 pages
 * so long tables never truncate or cut rows across page breaks.
 */
export function paginateRowsForA4<T>(
  rows: T[],
  firstPageCapacity = 8,
  subsequentPageCapacity = 13
): T[][] {
  if (rows.length === 0) return [[]];
  if (rows.length <= firstPageCapacity) return [rows];

  const pages: T[][] = [];
  pages.push(rows.slice(0, firstPageCapacity));
  let cursor = firstPageCapacity;

  while (cursor < rows.length) {
    pages.push(rows.slice(cursor, cursor + subsequentPageCapacity));
    cursor += subsequentPageCapacity;
  }

  return pages;
}

async function waitForImagesAndFonts(container: HTMLElement): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed even if a remote font fails; bundled @fontsource/cairo stays available
    }
  }

  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map(async (img) => {
      if (img.complete && img.naturalWidth > 0) return;
      await new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, 2500);
        img.addEventListener(
          'load',
          () => {
            window.clearTimeout(timer);
            resolve();
          },
          { once: true }
        );
        img.addEventListener(
          'error',
          () => {
            window.clearTimeout(timer);
            resolve();
          },
          { once: true }
        );
      });
    })
  );
}

/**
 * Exports one or more rendered A4 page DOM nodes into a real downloadable multi-page A4 PDF
 * preserving Arabic RTL text shaping, tables, tabular numbers, SVG logos, and headers/footers.
 */
export async function exportElementsToA4Pdf({
  pageElements,
  filename,
}: PdfExportOptions): Promise<PdfExportResult> {
  if (!pageElements || pageElements.length === 0) {
    return {
      success: false,
      filename,
      pageCount: 0,
      errorMessage: 'لم يتم العثور على صفحات قابلة للتصدير داخل المستند.',
    };
  }

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const a4WidthMm = 210;
    const a4HeightMm = 297;

    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i];
      await waitForImagesAndFonts(el);

      const dataUrl = await toPng(el, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        skipAutoScale: false,
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('print:hidden')) {
            return false;
          }
          return true;
        },
      });

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const imgProps = pdf.getImageProperties(dataUrl);
      const scale = Math.min(a4WidthMm / imgProps.width, a4HeightMm / imgProps.height);
      const renderW = imgProps.width * scale;
      const renderH = imgProps.height * scale;
      const offsetX = (a4WidthMm - renderW) / 2;
      const offsetY = 0;

      pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, renderW, renderH, undefined, 'FAST');
    }

    const safeName = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(safeName);

    return {
      success: true,
      filename: safeName,
      pageCount: pageElements.length,
    };
  } catch (err) {
    const rawMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      filename,
      pageCount: 0,
      errorMessage: `تعذر إنشاء ملف PDF (${rawMsg}). تأكد من أن جميع العناصر والصور داخل الصفحة صالحة للتحميل أو استخدم زر الطباعة كبديل.`,
    };
  }
}

/**
 * Clones rendered A4 page nodes into an isolated body-level print portal
 * and invokes window.print() cleanly without modal scroll clipping.
 */
export function triggerCleanA4Print(pageElements: HTMLElement[]): boolean {
  if (typeof document === 'undefined' || pageElements.length === 0) {
    return false;
  }

  let portal = document.getElementById('ce-print-portal');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'ce-print-portal';
    portal.style.display = 'none';
    portal.setAttribute('dir', document.documentElement.getAttribute('dir') || 'rtl');
    document.body.appendChild(portal);
  }

  portal.innerHTML = '';
  pageElements.forEach((node) => {
    const clone = node.cloneNode(true) as HTMLElement;
    clone.classList.add('ce-a4-page');
    portal!.appendChild(clone);
  });

  document.body.classList.add('ce-printing-portal');

  const cleanup = () => {
    document.body.classList.remove('ce-printing-portal');
    if (portal) {
      portal.innerHTML = '';
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  window.print();

  // Safety fallback cleanup in case browser skips afterprint inside sandboxed frames
  window.setTimeout(cleanup, 3000);
  return true;
}
