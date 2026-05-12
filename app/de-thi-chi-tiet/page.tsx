import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DE_THI_CHI_TIET_CSS } from "@/lib/page-css/de-thi-chi-tiet";

export const metadata = { title: "Đề tham khảo lớp 10 TP.HCM 2026 — istudy" };

export default function DeThiChiTietPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DE_THI_CHI_TIET_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-sm">
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link><span className="sep">›</span>
            <Link href="/kho-de-thi">Đề thi vào lớp 10</Link><span className="sep">›</span>
            <a href="#">TP.HCM 2026</a><span className="sep">›</span>
            <span className="current">Đề tham khảo</span>
          </nav>

          <div className="head-card">
            <div className="head-meta">
              <span className="badge badge--hot">🔥 Hot</span>
              <span className="badge badge--official">📋 Đề tham khảo</span>
              <span className="pill pill-green">🖥️ Có làm online</span>
            </div>
            <h1>
              Đề tham khảo — Kỳ thi tuyển sinh vào lớp 10 THPT TP.HCM 2026
              <br />Môn Tiếng Anh
            </h1>
            <p className="desc">
              Đề tham khảo chính thức cho kỳ thi tuyển sinh vào lớp 10 THPT tại TP.HCM năm 2026. Đề gồm 7 phần: trắc nghiệm,
              đọc biển báo, điền từ, đọc hiểu, word form, tra từ điển và viết lại câu.
            </p>
            <div className="info-row">
              <span>📖 40 câu hỏi • 7 phần</span>
              <span>⏱️ 90 phút</span>
              <span>👁️ 28.300 lượt xem</span>
              <span>👤 8.500 lượt làm</span>
              <span>📅 10/05/2026</span>
            </div>
            <div className="head-actions">
              <Link href="/lam-bai" className="btn btn--primary">📝 Làm bài online</Link>
              <a href="#" className="btn btn--outline">⬇️ Tải PDF</a>
              <a href="#" className="btn btn--outline">🖨️ In đề</a>
              <a href="#" className="btn btn--outline">↗ Chia sẻ</a>
              <Link href="/dap-an" className="btn btn--green">✅ Xem đáp án</Link>
            </div>
          </div>

          <div className="pdf-card">
            <div className="pdf-toolbar">
              <span>📄 De_tham_khao_vao_lop_10_TPHCM_2026_mon_Anh.pdf</span>
            </div>
            <div className="pdf-content">
              <div className="pdf-page">
                <div className="title-block">
                  <div className="title-1">ĐỀ THAM KHẢO – KỲ THI TUYỂN SINH VÀO LỚP 10 THPT</div>
                  <div className="title-2">MÔN TIẾNG ANH</div>
                  <div className="time">Thời gian: 90 phút</div>
                </div>

                <h4>I. Choose the word / phrase / sentence (A, B, C or D) that best fits the space or best answers the question given in each sentence. (3.5 pts).</h4>

                <div className="q">1. Which word has the underlined part pronounced differently from that of the others?</div>
                <div className="o">A. stay<u>s</u>&nbsp;&nbsp; B. know<u>s</u>&nbsp;&nbsp; C. reset<u>s</u>&nbsp;&nbsp; D. burn<u>s</u></div>

                <div className="q">2. Which word has the underlined part pronounced differently from that of the others?</div>
                <div className="o">A. s<u>e</u>ll&nbsp;&nbsp; B. f<u>e</u>nce&nbsp;&nbsp; C. tr<u>e</u>nd&nbsp;&nbsp; D. m<u>e</u></div>

                <div className="q">3. Which word has a different stress pattern from that of the others?</div>
                <div className="o">A. future&nbsp;&nbsp; B. equip&nbsp;&nbsp; C. modern&nbsp;&nbsp; D. happy</div>

                <div className="q">4. Which word has a different stress pattern from that of the others?</div>
                <div className="o">A. discover&nbsp;&nbsp; B. beautiful&nbsp;&nbsp; C. digital&nbsp;&nbsp; D. educate</div>

                <div className="q">5. Helen: You seem to be busy with something. What&apos;s that, Sam?<br />Sam: I________ an article about our school festival.</div>
                <div className="o">A. wrote&nbsp;&nbsp; B. am writing&nbsp;&nbsp; C. write&nbsp;&nbsp; D. have written</div>

                <div className="q">6. Harry: Where&apos;s the cat? I can&apos;t find it anywhere.<br />Luke: It might be________ the table, sleeping again.</div>
                <div className="o">A. in&nbsp;&nbsp; B. over&nbsp;&nbsp; C. under&nbsp;&nbsp; D. between</div>

                <div className="q">7. Thomas: Are you keen________ joining the art club this term?</div>
                <div className="o">A. at&nbsp;&nbsp; B. with&nbsp;&nbsp; C. in&nbsp;&nbsp; D. on</div>

                <div className="q">8. David: The teacher says we must_______ a survey on local recycling.</div>
                <div className="o">A. break down&nbsp;&nbsp; B. come across&nbsp;&nbsp; C. carry out&nbsp;&nbsp; D. go over</div>

                <div className="q">9. Mike: Do you know the girl________ won the school&apos;s singing contest?</div>
                <div className="o">A. who&nbsp;&nbsp; B. whom&nbsp;&nbsp; C. which&nbsp;&nbsp; D. whose</div>

                <div className="q">10. Mark: How do you describe your new teacher of English?<br />Helen: He&apos;s amazing. He&apos;s a/an________ teacher; that&apos;s why we respect him.</div>
                <div className="o">A. dull&nbsp;&nbsp; B. old-fashioned&nbsp;&nbsp; C. dedicated&nbsp;&nbsp; D. timid</div>

                <div className="q">11. Ben:________ it&apos;s raining, shall we still go for a walk?</div>
                <div className="o">A. Because&nbsp;&nbsp; B. But&nbsp;&nbsp; C. Although&nbsp;&nbsp; D. So</div>

                <div className="q">12. Minh: How often do you go out for a movie or concert?<br />Long: Not quite often! I don&apos;t have much time for________</div>
                <div className="o">A. entertainment&nbsp;&nbsp; B. knowledge&nbsp;&nbsp; C. training&nbsp;&nbsp; D. sports</div>

                <h4>II. Look at the sign or the notice. Choose the best answer (A, B, C or D) for questions 15 and 16. (0.5 pt)</h4>
                <div className="q">15. What does the sign tell you to do?</div>
                <div className="sign-box">
                  <span className="ico">⚠️</span>
                  <div><div className="lbl1">SCHOOL ZONE</div><div className="lbl2">Children crossing</div></div>
                </div>
                <div className="o">A. Give the pupils a lift&nbsp;&nbsp; B. Slow down; school pupils ahead</div>
                <div className="o">C. Take good care of kids&nbsp;&nbsp; D. Pay no attention to kids</div>

                <h4>III. Choose the word (A, B, C or D) that best fits each space in the following passage. (1.5 pts)</h4>
                <div className="passage">
                  Dear Danny,<br />
                  I hope you&apos;re doing well! I&apos;d like to tell you about a (17)________. I really enjoy – badminton. You don&apos;t need much to start – just a racket, a shuttlecock, and a bit of (18)________ space. When I play badminton, I feel happy and full of (19)________. It&apos;s also a good way to (20)________ and spend time with friends.
                </div>

                <h4>VII. Rewrite each of the following sentences in another way so that it means almost the same as the sentence printed before it. (1.0 pt)</h4>
                <div className="q">37. Kate finds it difficult to cook a decent meal.</div>
                <div className="o">→ Kate has __________________________.</div>
                <div className="q">38. They haven&apos;t met each other for quite some time.</div>
                <div className="o">→ It has been __________________________.</div>
                <div className="q">39. This language school is better than any other one in the area.</div>
                <div className="o">→ No other __________________________.</div>
                <div className="q">40. The team finally produced a good solution to the problem.</div>
                <div className="o">→ The team finally came __________________________.</div>

                <div className="pdf-end">— HẾT —</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
