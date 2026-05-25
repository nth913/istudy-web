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
            <Link className="footer-col-item" href="/kho-de-thi">Đề thi lớp 10</Link>
            <Link className="footer-col-item" href="/kho-de-thi">Đề THPT QG</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Đề thi thử")}`}>Đề thi thử</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Đề Đại học")}`}>Đề Đại học</Link>
          </div>
          <div>
            <div className="footer-col-title">Tài liệu</div>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Từ vựng")}`}>Từ vựng</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Ngữ pháp")}`}>Ngữ pháp</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Giải SGK")}`}>Giải SGK</Link>
            <Link className="footer-col-item" href="/bai-viet">Blog</Link>
          </div>
          <div>
            <div className="footer-col-title">Hỗ trợ</div>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Liên hệ")}`}>Liên hệ</Link>
            <Link className="footer-col-item" href="/coming-soon?feature=FAQ">FAQ</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Điều khoản")}`}>Điều khoản</Link>
            <Link className="footer-col-item" href={`/coming-soon?feature=${encodeURIComponent("Chính sách")}`}>Chính sách</Link>
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
