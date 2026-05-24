/**
 * Mock exam fixtures for unwired pages (/lam-bai). Production pages
 * (/de-thi-chi-tiet, /dap-an) fetch from CMS — do NOT import these for new
 * features.
 */
import { SECTIONS, QUESTIONS, type Exam } from "../de-thi";

export const EXAM_THPT_24MA: Exam = {
  meta: {
    slug: "de-thi-thpt-qg-2026-tieng-anh",
    title: "Đề thi tốt nghiệp THPT Quốc gia 2026",
    subjectLabel: "Môn Tiếng Anh",
    description:
      "Đề thi chính thức Kỳ thi tốt nghiệp THPT Quốc gia 2026 môn Tiếng Anh. Đề gồm 40 câu trắc nghiệm bao quát ngữ âm, ngữ pháp, đọc hiểu, từ vựng và viết lại câu — thời gian làm bài 60 phút. Tổ chức thi đồng loạt toàn quốc theo Bộ GD&ĐT.",
    totalQuestions: 40,
    durationMinutes: 60,
    examDate: "27/06/2026",
    views: "284.300",
    numCodes: 24,
    numCodesReady: 8,
    showOnlineOption: true,
    pdfEnabled: false,
    demoMode: "ready-multi",
  },
  sections: SECTIONS,
  questions: QUESTIONS,
};
