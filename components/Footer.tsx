import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="logo logo--white">
              <img src="/logo/istudy-circle-64.png" alt="istudy" width={34} height={34} />
              <span className="logo-text" style={{ color: "#fff" }}>
                istudy
              </span>
            </Link>
            <p>istudy — Nền tảng luyện thi tiếng Anh hàng đầu Việt Nam. Better Understanding, Better Learning.</p>
            <div className="footer-socials">
              <div title="Facebook">Fb</div>
              <div title="Youtube">Yt</div>
              <div title="Tiktok">Tk</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Kho đề thi</div>
            <div className="footer-col-item">Đề thi lớp 10</div>
            <div className="footer-col-item">Đề THPT QG</div>
            <div className="footer-col-item">Đề thi thử</div>
            <div className="footer-col-item">Đề Đại học</div>
          </div>
          <div>
            <div className="footer-col-title">Tài liệu</div>
            <div className="footer-col-item">Từ vựng</div>
            <div className="footer-col-item">Ngữ pháp</div>
            <div className="footer-col-item">Giải SGK</div>
            <div className="footer-col-item">Blog</div>
          </div>
          <div>
            <div className="footer-col-title">Hỗ trợ</div>
            <div className="footer-col-item">Liên hệ</div>
            <div className="footer-col-item">FAQ</div>
            <div className="footer-col-item">Điều khoản</div>
            <div className="footer-col-item">Chính sách</div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 istudy. All rights reserved.</span>
          <span>Made with ❤️ by istudy Team</span>
        </div>
      </div>
    </footer>
  );
}
