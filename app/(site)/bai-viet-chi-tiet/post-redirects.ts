/**
 * Bài viết "redirect" — bấm vào bài là sang thẳng trang đích, không render article.
 * Hardcode map (quyết định brainstorm 2026-06-04, user chọn phương án B):
 * bài mới muốn redirect → thêm 1 dòng tại đây.
 */
export const POST_REDIRECTS: Record<string, string> = {
  // Bài blog "Đề chính thức vào 10 2026" → screen 34 tỉnh
  "de-chinh-thuc-vao-10-2026-tieng-anh": "/de-chinh-thuc-vao-10-2026",
};
