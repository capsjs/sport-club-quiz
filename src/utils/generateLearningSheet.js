import jsPDF from "jspdf";

export function generateLearningSheet({ questions, answers, score }) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = 20;

  const colors = {
    primary: [214, 67, 48],
    accent: [237, 178, 74],
    text: [28, 36, 48],
    muted: [88, 98, 112],
    successBg: [237, 249, 239],
    successBorder: [73, 163, 91],
    errorBg: [255, 240, 240],
    errorBorder: [224, 82, 67],
    adviceBg: [255, 248, 235],
    adviceBorder: [243, 217, 164],
  };

  const addNewPageIfNeeded = (heightNeeded) => {
    if (y + heightNeeded > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const drawText = (text, x, currentY, maxWidth, lineHeight = 6) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, currentY);
    return lines.length * lineHeight;
  };

  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Votre fiche d'apprentissage", margin, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Quiz IA - Club de sport amateur", margin, 23);

  y = 45;

  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Score : ${score}/${questions.length} réponses correctes`, margin, y);

  y += 10;

  questions.forEach((question, index) => {
    const answer = answers[index];

    const userAnswer = answer
      ? question.options[answer.selectedIndex]
      : "Aucune réponse";

    const correctAnswer = question.options[question.correct];
    const isCorrect = answer?.isCorrect;

    addNewPageIfNeeded(65);

    doc.setDrawColor(235, 220, 205);
    doc.setFillColor(255, 253, 250);
    doc.roundedRect(margin, y, contentWidth, 12, 3, 3, "FD");

    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    const questionTitle = `${index + 1}. ${question.question}`;
    const questionHeight = drawText(questionTitle, margin + 4, y + 8, contentWidth - 8);

    y += Math.max(16, questionHeight + 8);

    const answerBoxHeight = 16;

    if (isCorrect) {
      doc.setFillColor(...colors.successBg);
      doc.setDrawColor(...colors.successBorder);
    } else {
      doc.setFillColor(...colors.errorBg);
      doc.setDrawColor(...colors.errorBorder);
    }

    doc.roundedRect(margin, y, contentWidth, answerBoxHeight, 3, 3, "FD");

    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(isCorrect ? "Bonne réponse" : "Réponse incorrecte", margin + 4, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    drawText(`Votre réponse : ${userAnswer}`, margin + 4, y + 12, contentWidth - 8, 5);

    y += answerBoxHeight + 8;

    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Bonne réponse :", margin, y);

    doc.setFont("helvetica", "normal");
    const goodAnswerHeight = drawText(correctAnswer, margin + 34, y, contentWidth - 34, 5);

    y += Math.max(8, goodAnswerHeight + 4);

    const adviceText = `Conseil : ${question.explanation}`;
    const adviceLines = doc.splitTextToSize(adviceText, contentWidth - 8);
    const adviceBoxHeight = adviceLines.length * 5 + 10;

    addNewPageIfNeeded(adviceBoxHeight + 10);

    doc.setFillColor(...colors.adviceBg);
    doc.setDrawColor(...colors.adviceBorder);
    doc.roundedRect(margin, y, contentWidth, adviceBoxHeight, 3, 3, "FD");

    doc.setTextColor(...colors.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(adviceLines, margin + 4, y + 7);

    y += adviceBoxHeight + 10;
  });

  doc.save("fiche-apprentissage-ia-club.pdf");
}