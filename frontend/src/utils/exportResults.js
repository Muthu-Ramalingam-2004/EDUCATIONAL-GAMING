import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Format a Date object into a readable string (e.g., "31 Aug 2026, 05:15 PM")
 */
function formatDate(date = new Date()) {
  try {
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (_) {
    return new Date().toISOString();
  }
}

/**
 * Helper to normalize result data object to guard against missing fields
 */
function getNormalizedData(resultData = {}) {
  const user = resultData.user || {};
  const stats = resultData || {};
  
  const totalQ = Number(stats.totalQuestions) || (stats.questionsDetail ? stats.questionsDetail.length : 10);
  const correct = Number(stats.correctCount) || 0;
  const wrong = stats.wrongCount !== undefined ? Number(stats.wrongCount) : Math.max(0, totalQ - correct);
  const score = Number(stats.score) || 0;
  const accuracy = stats.accuracyPct !== undefined ? Number(stats.accuracyPct) : Math.round((correct / (totalQ || 1)) * 100);
  const xp = Number(stats.xpEarned) || 0;
  const coins = Number(stats.coinsEarned) || 0;
  const timeTaken = stats.timeTaken || 'N/A';
  const gameTitle = stats.levelTitle || (stats.mode === 'puzzle' ? 'Number Sequence Puzzle Lab' : stats.mode === 'dragdrop' ? 'Proof Reorder Lab' : 'Algebra Arena Quiz');
  const studentName = user.name || stats.studentName || 'Student Player';
  const username = user.username || stats.username || 'student';
  const activeClass = user.activeClass || stats.activeClass || 9;
  const dateStr = stats.completedAt || formatDate();

  const questionsDetail = Array.isArray(stats.questionsDetail) && stats.questionsDetail.length > 0
    ? stats.questionsDetail
    : [
        {
          questionNumber: 1,
          question: 'Sample Question: Solve 2x + 5 = 15',
          userAnswer: 'x = 5',
          correctAnswer: 'x = 5',
          isCorrect: true,
          marks: 100,
          explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5.'
        }
      ];

  return {
    studentName,
    username,
    activeClass,
    gameTitle,
    mode: stats.mode || 'quiz',
    dateStr,
    totalQ,
    correct,
    wrong,
    score,
    accuracy,
    xp,
    coins,
    timeTaken,
    badgeEarned: stats.badgeEarned || '',
    questionsDetail
  };
}

/**
 * EXPORT RESULTS AS PDF
 */
export function exportToPDF(resultData) {
  const data = getNormalizedData(resultData);
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ── HEADER BANNER ──────────────────────────────────────────────────────────
  doc.setFillColor(15, 23, 42); // Dark slate background (#0f172a)
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Decorative Accent Line
  doc.setFillColor(245, 158, 11); // Gold accent line (#f59e0b)
  doc.rect(0, 36, pageWidth, 2, 'F');

  // Educational Quest Logo / Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Educational Quest', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(217, 249, 157); // Light lime text
  doc.text('OFFICIAL GAME EVALUATION & PERFORMANCE REPORT', 14, 26);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`Generated: ${data.dateStr}`, pageWidth - 14, 18, { align: 'right' });

  // ── STUDENT & GAME INFO CARD ────────────────────────────────────────────────
  let currentY = 46;

  doc.setFillColor(248, 250, 252); // Slate 50 background
  doc.setDrawColor(226, 232, 240); // Slate 200 border
  doc.roundedRect(14, currentY, pageWidth - 28, 28, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85); // Slate 700

  // Left Column
  doc.text('STUDENT INFORMATION', 18, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`Name: ${data.studentName} (@${data.username})`, 18, currentY + 14);
  doc.text(`Class Standard: Class ${data.activeClass}th`, 18, currentY + 21);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('GAME SESSION INFO', pageWidth / 2 + 10, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`Game Title: ${data.gameTitle}`, pageWidth / 2 + 10, currentY + 14);
  doc.text(`Play Mode: ${data.mode.toUpperCase()}`, pageWidth / 2 + 10, currentY + 21);

  currentY += 34;

  // ── PERFORMANCE SUMMARY CARDS ──────────────────────────────────────────────
  const cardWidth = (pageWidth - 28 - 9) / 4; // 4 cards with 3mm gap
  const cardHeight = 18;

  const statsCards = [
    { label: 'FINAL SCORE', val: `${data.score} pts`, color: [79, 70, 229] }, // Indigo
    { label: 'ACCURACY', val: `${data.accuracy}%`, color: [16, 185, 129] },  // Emerald
    { label: 'CORRECT / TOTAL', val: `${data.correct} / ${data.totalQ}`, color: [245, 158, 11] }, // Gold
    { label: 'XP & COINS', val: `+${data.xp} XP | +${data.coins} 🪙`, color: [147, 51, 234] } // Purple
  ];

  statsCards.forEach((card, i) => {
    const cardX = 14 + i * (cardWidth + 3);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(cardX, currentY, cardWidth, cardHeight, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(card.label, cardX + cardWidth / 2, currentY + 5, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(card.color[0], card.color[1], card.color[2]);
    doc.text(card.val, cardX + cardWidth / 2, currentY + 13, { align: 'center' });
  });

  currentY += 24;

  // ── DETAILED QUESTION-BY-QUESTION TABLE ─────────────────────────────────────
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Question-by-Question Response Breakdown', 14, currentY);
  currentY += 4;

  const tableHead = [['#', 'Question Text', 'Student Answer', 'Correct Answer', 'Status', 'Score']];

  const tableRows = data.questionsDetail.map((q, idx) => {
    const isCorrect = q.isCorrect !== false;
    return [
      String(q.questionNumber || idx + 1),
      q.question || 'N/A',
      q.userAnswer || 'No Answer',
      q.correctAnswer || 'N/A',
      isCorrect ? 'CORRECT' : 'WRONG',
      `${q.marks || (isCorrect ? 100 : 0)} pts`
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: tableHead,
    body: tableRows,
    theme: 'grid',
    margin: { left: 14, right: 14, bottom: 20 },
    headStyles: {
      fillColor: [30, 41, 59], // Slate 800
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 3,
      overflow: 'linebreak',
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 65 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
      5: { cellWidth: 17, halign: 'center' }
    },
    didParseCell: function (cellData) {
      if (cellData.section === 'body' && cellData.column.index === 4) {
        if (cellData.cell.raw === 'CORRECT') {
          cellData.cell.styles.textColor = [16, 185, 129]; // Emerald
        } else {
          cellData.cell.styles.textColor = [225, 29, 72]; // Rose/Red
        }
      }
    },
    didDrawPage: function (pageData) {
      // ── FOOTER ON EVERY PAGE ────────────────────────────────────────────────
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);

      doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);
      doc.text('MathQuest Educational Gaming Platform • Confidential Student Assessment Report', 14, pageHeight - 7);
      doc.text(`Page ${pageData.pageNumber} of ${totalPages}`, pageWidth - 14, pageHeight - 7, { align: 'right' });
    }
  });

  // Save the generated PDF
  const cleanStudentName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `MathQuest_Result_${cleanStudentName}_${Date.now()}.pdf`;
  doc.save(filename);
}

/**
 * EXPORT RESULTS AS EXCEL (.xlsx)
 */
export function exportToExcel(resultData) {
  const data = getNormalizedData(resultData);
  const wb = XLSX.utils.book_new();

  // ── SHEET 1: SUMMARY ────────────────────────────────────────────────────────
  const summaryRows = [
    ['EDUCATIONAL QUEST GAME EVALUATION REPORT'],
    ['Generated Date', data.dateStr],
    [],
    ['STUDENT DETAILS'],
    ['Student Name', data.studentName],
    ['Username', `@${data.username}`],
    ['Class Standard', `Class ${data.activeClass}th`],
    [],
    ['GAME SESSION DETAILS'],
    ['Game Title', data.gameTitle],
    ['Play Mode', data.mode.toUpperCase()],
    ['Time Taken', data.timeTaken],
    [],
    ['PERFORMANCE STATISTICS'],
    ['Total Questions', data.totalQ],
    ['Correct Answers', data.correct],
    ['Wrong Answers', data.wrong],
    ['Accuracy Percentage', `${data.accuracy}%`],
    ['Final Score', `${data.score} pts`],
    ['XP Earned', `+${data.xp} XP`],
    ['Coins Earned', `+${data.coins} Coins`],
    ['Badge Unlocked', data.badgeEarned || 'None']
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  wsSummary['!cols'] = [{ wch: 25 }, { wch: 45 }];

  XLSX.utils.book_append_sheet(wb, wsSummary, 'Performance Summary');

  // ── SHEET 2: QUESTIONS & ANSWERS DETAIL ──────────────────────────────────────
  const detailHeaders = [
    'Question No',
    'Question Text',
    'Student Answer',
    'Correct Answer',
    'Status',
    'Marks Earned',
    'Solution Explanation'
  ];

  const detailRows = [detailHeaders];

  data.questionsDetail.forEach((q, idx) => {
    const isCorrect = q.isCorrect !== false;
    detailRows.push([
      q.questionNumber || idx + 1,
      q.question || '',
      q.userAnswer || 'No Answer',
      q.correctAnswer || '',
      isCorrect ? 'CORRECT' : 'WRONG',
      q.marks || (isCorrect ? 100 : 0),
      q.explanation || ''
    ]);
  });

  const wsDetails = XLSX.utils.aoa_to_sheet(detailRows);
  wsDetails['!cols'] = [
    { wch: 12 }, // Question No
    { wch: 50 }, // Question Text
    { wch: 30 }, // Student Answer
    { wch: 30 }, // Correct Answer
    { wch: 15 }, // Status
    { wch: 15 }, // Marks
    { wch: 55 }  // Explanation
  ];

  XLSX.utils.book_append_sheet(wb, wsDetails, 'Question Breakdown');

  // Save the Excel file
  const cleanStudentName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `MathQuest_Result_${cleanStudentName}_${Date.now()}.xlsx`;
  XLSX.writeFile(wb, filename);
}
