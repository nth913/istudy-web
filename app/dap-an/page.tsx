"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DAP_AN_CSS } from "@/lib/page-css/dap-an";

type AnswerBanner = { label: string; value: ReactNode; variant?: "is-false" };

type Question = {
  kind: "q";
  cau: number;
  pillClass?: "is-short" | "is-write";
  qtype: string;
  topicEmoji: string;
  topic: string;
  relatedHref?: string;
  relatedLabel?: string;
  stem: ReactNode;
  errStem?: ReactNode;
  options?: { letter: string; text: ReactNode; correct?: boolean }[];
  answerBanner?: AnswerBanner;
  answerBanners?: AnswerBanner[];
  model?: ReactNode;
  explanation: ReactNode;
  explToggleLabel?: string;
};

type ContextCard = {
  kind: "ctx";
  id: string;
  label: string;
  body?: ReactNode;
  audio?: { duration: string; track: string; color?: "purple" | "orange" };
  transcript?: ReactNode;
};

type Item = Question | ContextCard;

const items: Item[] = [
  {
    kind: "q", cau: 1, qtype: "Hoàn thành câu", topicEmoji: "📗", topic: "Câu điều kiện loại 2",
    relatedHref: "#",
    stem: <>If I _______ enough money, I would buy a new laptop next month.</>,
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "had", correct: true },
      { letter: "C", text: "have had" },
      { letter: "D", text: "will have" },
    ],
    explanation: (
      <>
        <p><strong>Câu điều kiện loại 2</strong> diễn tả điều không có thật ở hiện tại / tương lai.</p>
        <ul>
          <li>Công thức: <strong>If + S + V(quá khứ đơn), S + would + V(bare)</strong>.</li>
          <li>Vế sau là &quot;would buy&quot; → vế if bắt buộc dùng <strong>quá khứ đơn</strong>.</li>
          <li>Đáp án: <strong>B. had</strong>.</li>
        </ul>
        <div className="tip">💡 Mẹo: thấy &quot;would/could + V&quot; ở vế sau, vế if đi với quá khứ đơn.</div>
      </>
    ),
  },
  {
    kind: "q", cau: 2, qtype: "Hoàn thành câu", topicEmoji: "📘", topic: "Mệnh đề quan hệ",
    relatedHref: "#",
    stem: <>My sister, _______ lives in Hanoi, is a doctor.</>,
    options: [
      { letter: "A", text: "that" },
      { letter: "B", text: "who", correct: true },
      { letter: "C", text: "which" },
      { letter: "D", text: "whom" },
    ],
    explanation: (
      <ul>
        <li>Đây là <strong>mệnh đề quan hệ không xác định</strong> (có dấu phẩy).</li>
        <li>&quot;My sister&quot; là người và đóng vai trò chủ ngữ trong mệnh đề quan hệ → dùng <strong>who</strong>.</li>
        <li>Không dùng &quot;that&quot; trong mệnh đề có phẩy.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 3, qtype: "Hoàn thành câu", topicEmoji: "📕", topic: "Từ vựng · Tính từ ed/ing",
    stem: <>She is very _______ about her new job at the publishing company.</>,
    options: [
      { letter: "A", text: "excite" },
      { letter: "B", text: "exciting" },
      { letter: "C", text: "excited", correct: true },
      { letter: "D", text: "excitement" },
    ],
    explanation: (
      <>
        <ul>
          <li>Sau &quot;be&quot; + giới từ &quot;about&quot; → cần <strong>tính từ</strong>.</li>
          <li><strong>excited</strong> (cảm thấy hào hứng) tả cảm xúc của <em>người</em>.</li>
          <li><strong>exciting</strong> tả tính chất của <em>vật / việc</em>.</li>
          <li>Chủ ngữ là &quot;she&quot; → chọn <strong>excited</strong>.</li>
        </ul>
        <div className="vocab">
          <div><span className="w">excited (adj)</span><span>cảm thấy hào hứng</span></div>
          <div><span className="w">exciting (adj)</span><span>thú vị, làm người khác hào hứng</span></div>
        </div>
      </>
    ),
  },
  {
    kind: "q", cau: 4, qtype: "Tìm lỗi sai", topicEmoji: "📗", topic: "Despite / Although",
    relatedHref: "#",
    stem: <span style={{ color: "var(--g500)", fontSize: 13 }}>Identify the error in the underlined part:</span>,
    errStem: (
      <>
        <span className="err-tag is-error"><span className="lab">A</span>Despite</span> the rain{" "}
        <span className="err-tag"><span className="lab">B</span>was heavy</span>, we{" "}
        <span className="err-tag"><span className="lab">C</span>decided to continue</span> our trip to the{" "}
        <span className="err-tag"><span className="lab">D</span>countryside</span>.
      </>
    ),
    answerBanner: { label: "Lỗi tại vị trí A · Câu đúng:", value: "Although the rain was heavy, we decided to continue our trip to the countryside." },
    explanation: (
      <>
        <p>Lỗi tại vị trí <strong>A: &quot;Despite&quot;</strong></p>
        <ul>
          <li><strong>Despite + N / V-ing</strong>, không đi với mệnh đề.</li>
          <li>Sau &quot;Despite&quot; là cả một mệnh đề &quot;the rain was heavy&quot; → sai.</li>
          <li>Sửa: <strong>Although</strong> the rain was heavy, ... HOẶC <strong>Despite</strong> the heavy rain, ...</li>
        </ul>
      </>
    ),
  },
  {
    kind: "q", cau: 5, qtype: "Tìm lỗi sai", topicEmoji: "📗", topic: "The number of / A number of",
    relatedHref: "#",
    stem: <span style={{ color: "var(--g500)", fontSize: 13 }}>Identify the error in the underlined part:</span>,
    errStem: (
      <>
        The number of <span className="err-tag"><span className="lab">A</span>students</span> in our class{" "}
        <span className="err-tag is-error"><span className="lab">B</span>have</span>{" "}
        <span className="err-tag"><span className="lab">C</span>increased</span> by 20%{" "}
        <span className="err-tag"><span className="lab">D</span>since</span> last year.
      </>
    ),
    answerBanner: { label: "Lỗi tại vị trí B · Câu đúng:", value: "The number of students in our class has increased by 20% since last year." },
    explanation: (
      <>
        <p>Lỗi tại vị trí <strong>B: &quot;have&quot;</strong></p>
        <ul>
          <li><strong>The number of + N(số nhiều) + động từ SỐ ÍT</strong> (vì chủ ngữ thật là &quot;the number&quot;).</li>
          <li>Sửa &quot;have&quot; thành <strong>has</strong>.</li>
        </ul>
        <div className="tip">💡 Phân biệt: &quot;A number of students <em>have</em>&quot; (số nhiều) ≠ &quot;The number of students <em>has</em>&quot; (số ít).</div>
      </>
    ),
  },
  {
    kind: "q", cau: 6, qtype: "Tìm từ đồng nghĩa", topicEmoji: "📕", topic: "Từ vựng · Tính từ",
    relatedHref: "#", relatedLabel: "Xem từ vựng liên quan",
    stem: <>Choose the word CLOSEST in meaning to the underlined word.<br />The professor&apos;s lecture was extremely <u>fascinating</u> and kept everyone engaged.</>,
    options: [
      { letter: "A", text: "boring" },
      { letter: "B", text: "captivating", correct: true },
      { letter: "C", text: "ordinary" },
      { letter: "D", text: "confusing" },
    ],
    explanation: (
      <>
        <ul>
          <li><strong>fascinating</strong> = rất hấp dẫn, lôi cuốn.</li>
          <li>Từ đồng nghĩa gần nhất là <strong>captivating</strong> (lôi cuốn).</li>
        </ul>
        <div className="vocab">
          <div><span className="w">fascinating</span><span>= captivating, intriguing, gripping</span></div>
          <div><span className="w">boring</span><span>(trái nghĩa) nhàm chán</span></div>
        </div>
      </>
    ),
  },
  {
    kind: "q", cau: 7, qtype: "Tìm từ trái nghĩa", topicEmoji: "📕", topic: "Từ vựng · Tính từ",
    stem: <>Choose the word OPPOSITE in meaning to the underlined word.<br />She is well-known for her <u>generous</u> donations to charity.</>,
    options: [
      { letter: "A", text: "kind" },
      { letter: "B", text: "helpful" },
      { letter: "C", text: "stingy", correct: true },
      { letter: "D", text: "caring" },
    ],
    explanation: (
      <ul>
        <li><strong>generous</strong> = hào phóng.</li>
        <li>Trái nghĩa là <strong>stingy</strong> = keo kiệt, bủn xỉn.</li>
        <li>A, B, D đều là từ đồng nghĩa với generous.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 8, qtype: "Tìm từ đồng nghĩa", topicEmoji: "📕", topic: "Từ vựng · Động từ",
    relatedHref: "#", relatedLabel: "Xem từ vựng liên quan",
    stem: <>Choose the word CLOSEST in meaning to the underlined word.<br />The committee will <u>announce</u> the winners next Friday.</>,
    options: [
      { letter: "A", text: "hide" },
      { letter: "B", text: "declare", correct: true },
      { letter: "C", text: "postpone" },
      { letter: "D", text: "cancel" },
    ],
    explanation: (
      <ul>
        <li><strong>announce</strong> = công bố. Từ đồng nghĩa: <strong>declare</strong> (tuyên bố).</li>
        <li>&quot;hide&quot; (giấu) là trái nghĩa.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 9, pillClass: "is-short", qtype: "Chia động từ", topicEmoji: "📗", topic: "Quá khứ hoàn thành",
    relatedHref: "#",
    stem: <>By the time we arrived at the cinema, the movie <em>(start)</em> ____ for half an hour.</>,
    answerBanner: { label: "Đáp án", value: "had started" },
    explanation: (
      <>
        <ul>
          <li>&quot;By the time + S + V(quá khứ đơn)&quot; → vế chính dùng <strong>quá khứ hoàn thành (had + V3)</strong>.</li>
          <li>Diễn tả hành động xảy ra trước hành động khác trong quá khứ.</li>
        </ul>
        <div className="tip">💡 Dấu hiệu: &quot;by the time&quot;, &quot;before&quot;, &quot;after&quot; + quá khứ đơn → vế kia quá khứ hoàn thành.</div>
      </>
    ),
  },
  {
    kind: "q", cau: 10, pillClass: "is-short", qtype: "Chia động từ", topicEmoji: "📗", topic: "Be going to · Will",
    relatedHref: "#",
    stem: <>Look at those clouds! It <em>(rain)</em> ____ soon.</>,
    answerBanner: { label: "Đáp án", value: "is going to rain" },
    explanation: (
      <ul>
        <li>Dấu hiệu hiện tại (&quot;Look at those clouds!&quot;) + dự đoán dựa trên bằng chứng → dùng <strong>be going to + V(bare)</strong>.</li>
        <li>Không dùng &quot;will&quot; vì &quot;will&quot; cho dự đoán không có cơ sở.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 11, pillClass: "is-short", qtype: "Chia động từ", topicEmoji: "📗", topic: "Bị động quá khứ đơn",
    relatedHref: "#",
    stem: <>This bridge <em>(build)</em> ____ in 1995 and is still in use today.</>,
    answerBanner: { label: "Đáp án", value: "was built" },
    explanation: (
      <ul>
        <li>Cây cầu <strong>được xây</strong> (bị động) năm 1995 (mốc thời gian quá khứ).</li>
        <li>Công thức bị động quá khứ đơn: <strong>was/were + V3</strong>.</li>
      </ul>
    ),
  },
  {
    kind: "ctx", id: "ctx-cloze", label: "📄 Đoạn văn dùng cho Câu 12 – 14",
    body: (
      <>
        Plastic pollution is one of the biggest environmental problems today. Every year, millions of tons of plastic{" "}
        <strong style={{ color: "var(--green)" }}>(12) end up</strong> in our oceans, harming marine life and ecosystems. To{" "}
        <strong style={{ color: "var(--green)" }}>(13) tackle</strong> this issue, many countries have started banning single-use plastics. We can also{" "}
        <strong style={{ color: "var(--green)" }}>(14) actively</strong> contribute by carrying reusable bags, using metal straws, and recycling whenever possible.
      </>
    ),
  },
  {
    kind: "q", cau: 12, qtype: "Hoàn thành đoạn văn", topicEmoji: "📗", topic: "Hoà hợp chủ–vị",
    relatedHref: "#",
    stem: <>… millions of tons of plastic <strong>(12) ______</strong> in our oceans …</>,
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "has" },
      { letter: "C", text: "end up", correct: true },
      { letter: "D", text: "ends up" },
    ],
    explanation: (
      <ul>
        <li>Chủ ngữ &quot;millions of tons&quot; (số nhiều) + &quot;every year&quot; (hiện tại đơn) → động từ <strong>nguyên thể không s</strong>.</li>
        <li>Cụm <strong>end up + V-ing / in</strong> = kết thúc / cuối cùng ở đâu.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 13, qtype: "Hoàn thành đoạn văn", topicEmoji: "📗", topic: "To + V(bare)",
    stem: <>To <strong>(13) ______</strong> this issue, many countries have started banning single-use plastics.</>,
    options: [
      { letter: "A", text: "tackle", correct: true },
      { letter: "B", text: "tackling" },
      { letter: "C", text: "tackled" },
      { letter: "D", text: "tackles" },
    ],
    explanation: (
      <ul>
        <li>&quot;To + V(bare)&quot; — sau &quot;to&quot; là động từ nguyên thể.</li>
        <li><strong>tackle</strong> = giải quyết (vấn đề).</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 14, qtype: "Hoàn thành đoạn văn", topicEmoji: "📕", topic: "Trạng từ / Tính từ",
    relatedHref: "#",
    stem: <>We can also <strong>(14) ______</strong> contribute by carrying reusable bags …</>,
    options: [
      { letter: "A", text: "actively", correct: true },
      { letter: "B", text: "active" },
      { letter: "C", text: "activity" },
      { letter: "D", text: "action" },
    ],
    explanation: (
      <ul>
        <li>Trước động từ &quot;contribute&quot; → cần <strong>trạng từ</strong>.</li>
        <li><strong>actively</strong> (adv.) = một cách chủ động.</li>
      </ul>
    ),
  },
  {
    kind: "ctx", id: "ctx-reading", label: "📄 Đoạn đọc hiểu — dùng cho Câu 15 – 17",
    body: (
      <>
        <strong>The Rise of Online Learning</strong><br />
        Online learning has grown rapidly in the past decade, especially after the COVID-19 pandemic. Many universities now offer courses entirely online, allowing students from around the world to access quality education. The main advantages are flexibility and lower costs — students can study at their own pace and save on travel and accommodation. However, online learning also has drawbacks. Students may feel isolated, struggle with self-discipline, and lack hands-on practice. Experts agree that a <strong>blended approach</strong>, combining online and in-person classes, often produces the best results.
      </>
    ),
  },
  {
    kind: "q", cau: 15, qtype: "Đọc hiểu", topicEmoji: "📘", topic: "Ý chính của đoạn",
    relatedHref: "#",
    stem: <>What is the main idea of the passage?</>,
    options: [
      { letter: "A", text: "Online learning is always better than traditional classes" },
      { letter: "B", text: "Online learning has both pros and cons, and blended is ideal", correct: true },
      { letter: "C", text: "Universities will close because of online education" },
      { letter: "D", text: "Students prefer studying at home" },
    ],
    explanation: (
      <ul>
        <li>Đoạn văn nêu cả ưu điểm (flexibility, lower costs) và nhược điểm (isolation, lack of practice).</li>
        <li>Kết luận đề cao mô hình <strong>blended approach</strong>.</li>
        <li>→ Đáp án B phản ánh đầy đủ ý chính.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 16, qtype: "Đọc hiểu", topicEmoji: "📘", topic: "Câu hỏi NOT mentioned",
    stem: <>According to the passage, what is NOT mentioned as a drawback?</>,
    options: [
      { letter: "A", text: "Students may feel isolated" },
      { letter: "B", text: "Lack of hands-on practice" },
      { letter: "C", text: "Higher tuition fees", correct: true },
      { letter: "D", text: "Self-discipline issues" },
    ],
    explanation: (
      <ul>
        <li>Đoạn văn nêu <em>lower costs</em> là ưu điểm, không nói gì về <em>higher tuition fees</em>.</li>
        <li>A, B, D đều được đề cập rõ trong đoạn.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 17, qtype: "Đọc hiểu", topicEmoji: "📕", topic: "Đoán nghĩa qua ngữ cảnh",
    relatedHref: "#",
    stem: <>The word &quot;<u>blended</u>&quot; in the passage is closest in meaning to:</>,
    options: [
      { letter: "A", text: "separated" },
      { letter: "B", text: "combined", correct: true },
      { letter: "C", text: "online" },
      { letter: "D", text: "expensive" },
    ],
    explanation: (
      <ul>
        <li><strong>blended</strong> = pha trộn, kết hợp = <strong>combined</strong>.</li>
        <li>Ngữ cảnh: &quot;combining online and in-person classes&quot; cũng đã giải thích nghĩa của blended.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 18, pillClass: "is-short", qtype: "Viết lại câu", topicEmoji: "📗", topic: "Hiện tại hoàn thành · since/for",
    relatedHref: "#",
    stem: <>&quot;I haven&apos;t seen Tom for two years.&quot; → <em>(since)</em></>,
    answerBanners: [
      { label: "Đáp án", value: "It is two years since I last saw Tom." },
      { label: "Hoặc", value: "The last time I saw Tom was two years ago." },
    ],
    explanation: (
      <>
        <p>Các cấu trúc tương đương:</p>
        <ul>
          <li>S + haven&apos;t + V3 + for + (thời gian)</li>
          <li>= The last time + S + V(quá khứ) + was + (thời gian) + ago</li>
          <li>= It is + (thời gian) + since + S + last + V(quá khứ)</li>
        </ul>
      </>
    ),
  },
  {
    kind: "q", cau: 19, pillClass: "is-short", qtype: "Viết lại câu", topicEmoji: "📗", topic: "Câu bị động",
    relatedHref: "#",
    stem: <>&quot;They built this temple over 200 years ago.&quot; → <em>(passive)</em></>,
    answerBanner: { label: "Đáp án", value: "This temple was built over 200 years ago." },
    explanation: (
      <ul>
        <li>Bị động quá khứ đơn: <strong>was/were + V3</strong>.</li>
        <li>Tân ngữ &quot;this temple&quot; chuyển thành chủ ngữ.</li>
        <li>Tác nhân &quot;they&quot; không quan trọng nên bỏ.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 20, pillClass: "is-short", qtype: "Kết hợp câu", topicEmoji: "📗", topic: "Mệnh đề mục đích · so that",
    relatedHref: "#",
    stem: <>She studied very hard. She wanted to pass the entrance exam. <em>(so that)</em></>,
    answerBanner: { label: "Đáp án", value: "She studied very hard so that she could pass the entrance exam." },
    explanation: (
      <ul>
        <li><strong>so that + S + can/could + V</strong> = để mà (chỉ mục đích).</li>
        <li>Vế trước &quot;studied&quot; là quá khứ → dùng <strong>could</strong> cho hài hoà thì.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 21, pillClass: "is-write", qtype: "Viết email", topicEmoji: "✍️", topic: "Writing · 80–100 từ",
    relatedHref: "#",
    stem: <>Write an email (80–100 words) to your friend Mai, telling her about a book you have recently read. Include: (1) book&apos;s title and author, (2) why you liked it, (3) recommendation.</>,
    model: (
      <>
        <div className="ml">✍️ Bài mẫu tham khảo (96 từ)</div>
        Hi Mai,<br />
        How are you? I&apos;m writing to tell you about a wonderful book I&apos;ve just finished reading. It&apos;s called <em>&quot;The Little Prince&quot;</em> by Antoine de Saint-Exupéry — a short novel I borrowed from our library.<br /><br />
        I really enjoyed it because the story is simple but full of meaning. It teaches us about friendship, love, and what truly matters in life. Some quotes made me think for hours.<br /><br />
        I think you&apos;d love it too, especially since you enjoy thoughtful stories. Let me know when you finish it!<br /><br />
        Best,<br />
        Linh
      </>
    ),
    explToggleLabel: "Tiêu chí chấm điểm",
    explanation: (
      <>
        <div className="expl-title">🍎 Tiêu chí chấm (2.0 điểm)</div>
        <ul>
          <li><strong>Cấu trúc email (0.5đ):</strong> chào hỏi, body chia đoạn rõ, kết &amp; ký tên.</li>
          <li><strong>Nội dung (0.75đ):</strong> đủ 3 ý — tên sách + tác giả, lý do thích, gợi ý đọc.</li>
          <li><strong>Ngữ pháp &amp; từ vựng (0.5đ):</strong> đa dạng thì, từ vựng phong phú.</li>
          <li><strong>Mạch lạc (0.25đ):</strong> dùng từ nối, ý kế thừa nhau.</li>
        </ul>
      </>
    ),
  },
  {
    kind: "ctx", id: "ctx-audio-1", label: "🎧 Bài nghe 1 — dùng cho Câu 22 – 23",
    audio: { duration: "0:00 / 1:24", track: "Track 1" },
    transcript: (
      <>
        <span className="speaker">Anna:</span> Hi John, are you free on Saturday evening?<br />
        <span className="speaker">John:</span> Actually, I&apos;m planning to attend a concert at the City Hall. It starts at 7.<br />
        <span className="speaker">Anna:</span> Oh, sounds great! Who&apos;s performing?<br />
        <span className="speaker">John:</span> A local jazz band. The tickets are only 100,000 VND. Want to join me?<br />
        <span className="speaker">Anna:</span> I&apos;d love to! Let&apos;s meet at the bus stop at 6:30.
      </>
    ),
  },
  {
    kind: "q", cau: 22, qtype: "Nghe trắc nghiệm", topicEmoji: "🎧", topic: "Chi tiết thông tin",
    stem: <>What time does the concert start?</>,
    options: [
      { letter: "A", text: "6:00 PM" },
      { letter: "B", text: "6:30 PM" },
      { letter: "C", text: "7:00 PM", correct: true },
      { letter: "D", text: "7:30 PM" },
    ],
    explanation: (
      <ul>
        <li>John nói: &quot;<em>It starts at 7</em>.&quot; → đáp án C.</li>
        <li>Lưu ý 6:30 là giờ hẹn ở bến xe, không phải giờ concert.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 23, qtype: "Nghe trắc nghiệm", topicEmoji: "🎧", topic: "Chi tiết thông tin",
    stem: <>How much is one ticket?</>,
    options: [
      { letter: "A", text: "50,000 VND" },
      { letter: "B", text: "100,000 VND", correct: true },
      { letter: "C", text: "150,000 VND" },
      { letter: "D", text: "200,000 VND" },
    ],
    explanation: (
      <ul>
        <li>&quot;<em>The tickets are only 100,000 VND</em>&quot; → đáp án B.</li>
      </ul>
    ),
  },
  {
    kind: "ctx", id: "ctx-audio-2", label: "🎧 Bài nghe 2 — dùng cho Câu 24 – 25",
    audio: { duration: "0:00 / 0:48", track: "Track 2", color: "orange" },
    transcript: (
      <em>
        Good morning everyone. This is your school announcement. Due to the heavy rain, today&apos;s outdoor sports activities have been cancelled. All students should report to their homeroom for regular classes. The science fair scheduled for tomorrow will still go ahead as planned. Lunch will be served at 11:30 in the main hall. Thank you.
      </em>
    ),
  },
  {
    kind: "q", cau: 24, qtype: "Nghe đúng / sai", topicEmoji: "🎧", topic: "Suy luận đồng nghĩa",
    stem: <>Today&apos;s outdoor sports activities have been postponed because of bad weather.</>,
    answerBanner: { label: "Đáp án · TRUE", value: <>&quot;cancelled&quot; = đã bị huỷ vì heavy rain (bad weather).</> },
    explanation: (
      <ul>
        <li>Trong bài: &quot;<em>Due to the heavy rain, today&apos;s outdoor sports activities have been cancelled.</em>&quot;</li>
        <li>&quot;due to heavy rain&quot; = vì mưa lớn (bad weather). → TRUE.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 25, qtype: "Nghe đúng / sai", topicEmoji: "🎧", topic: "Đối chiếu chi tiết",
    stem: <>Tomorrow&apos;s science fair has been cancelled.</>,
    answerBanner: { label: "Đáp án · FALSE", value: <>Trong bài: &quot;The science fair … will still go ahead as planned.&quot;</>, variant: "is-false" },
    explanation: (
      <ul>
        <li>Bài nói rõ &quot;<em>will still go ahead as planned</em>&quot; = vẫn diễn ra như kế hoạch.</li>
        <li>Khẳng định &quot;đã bị huỷ&quot; ngược lại với &quot;cancelled&quot; → FALSE.</li>
      </ul>
    ),
  },
  {
    kind: "ctx", id: "ctx-audio-3", label: "🎧 Bài nghe 3 — Library Membership Form (Câu 26 – 28)",
    audio: { duration: "0:00 / 1:12", track: "Track 3" },
    body: (
      <>
        <strong>Library Membership Form</strong><br />
        Full name: <em>Sarah Johnson</em><br />
        Date of birth: <strong style={{ color: "var(--green)" }}>(26) _____________</strong><br />
        Address: <em>45 Maple Street, Hanoi</em><br />
        Phone number: <strong style={{ color: "var(--green)" }}>(27) _____________</strong><br />
        Preferred genre: <strong style={{ color: "var(--green)" }}>(28) _____________</strong>
      </>
    ),
  },
  {
    kind: "q", cau: 26, pillClass: "is-short", qtype: "Nghe điền từ", topicEmoji: "🎧", topic: "Số đếm · Ngày tháng",
    relatedHref: "#",
    stem: <>Điền vào ô <strong>(26) Date of birth</strong> (không quá 3 từ).</>,
    answerBanner: { label: "Đáp án", value: "15 March 2008" },
    explanation: (
      <ul>
        <li>Audio: &quot;<em>I was born on the fifteenth of March, two thousand and eight.</em>&quot;</li>
        <li>Viết theo định dạng ngày: <strong>15 March 2008</strong>. Chấp nhận 15/03/2008.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 27, pillClass: "is-short", qtype: "Nghe điền từ", topicEmoji: "🎧", topic: "Số điện thoại",
    stem: <>Điền vào ô <strong>(27) Phone number</strong>.</>,
    answerBanner: { label: "Đáp án", value: "0912 345 678" },
    explanation: (
      <ul>
        <li>Nghe rõ các con số: &quot;<em>oh-nine-one-two, three-four-five, six-seven-eight</em>&quot;.</li>
        <li>Lưu ý: &quot;double 6&quot; sẽ là &quot;66&quot;.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 28, pillClass: "is-short", qtype: "Nghe điền từ", topicEmoji: "🎧", topic: "Từ vựng · Thể loại sách",
    stem: <>Điền vào ô <strong>(28) Preferred genre</strong>.</>,
    answerBanner: { label: "Đáp án", value: "science fiction" },
    explanation: (
      <ul>
        <li>Audio: &quot;<em>My favorite genre is <strong>science fiction</strong> — I love stories about future worlds.</em>&quot;</li>
        <li>Chỉ điền cụm chính, không viết cả câu.</li>
      </ul>
    ),
  },
  {
    kind: "ctx", id: "ctx-audio-4", label: "🎧 Bài nghe 4 — Podcast với Dr. Lan (Câu 29 – 30)",
    audio: { duration: "0:00 / 1:36", track: "Track 4" },
    transcript: (
      <em>
        Welcome to today&apos;s podcast. We&apos;re talking with Dr. Lan, a marine biologist. Dr. Lan has worked at the Nha Trang Marine Institute for fifteen years. Her research focuses on coral reef conservation. She believes that rising sea temperatures are the biggest threat to coral reefs today. Many of her studies have been published in international journals.
      </em>
    ),
  },
  {
    kind: "q", cau: 29, pillClass: "is-short", qtype: "Nghe trả lời ngắn", topicEmoji: "🎧", topic: "Khoảng thời gian",
    stem: <>How long has Dr. Lan worked at the institute? <span style={{ color: "var(--g500)", fontSize: 12 }}>(Không quá 4 từ)</span></>,
    answerBanner: { label: "Đáp án", value: "(For) fifteen years" },
    explanation: (
      <ul>
        <li>Audio: &quot;<em>Dr. Lan has worked at … for fifteen years.</em>&quot;</li>
        <li>Đáp án ngắn gọn: &quot;fifteen years&quot; hoặc &quot;for fifteen years&quot;.</li>
      </ul>
    ),
  },
  {
    kind: "q", cau: 30, pillClass: "is-short", qtype: "Nghe trả lời ngắn", topicEmoji: "🎧", topic: "Bắt ý chính",
    relatedHref: "#",
    stem: <>What does she consider the biggest threat to coral reefs?</>,
    answerBanner: { label: "Đáp án", value: "Rising sea temperatures" },
    explanation: (
      <ul>
        <li>Audio: &quot;<em>She believes that rising sea temperatures are the biggest threat to coral reefs today.</em>&quot;</li>
        <li>Đáp án 3–4 từ: <strong>rising sea temperatures</strong>.</li>
      </ul>
    ),
  },
];

const KEY: string[] = [
  "B", "B", "C", "A", "B", "B", "C", "B", "had started", "is going to rain",
  "was built", "C", "A", "A", "B", "C", "B", "It is two years since…", "This temple was built…", "so that she could…",
  "(bài mẫu)", "C", "B", "TRUE", "FALSE", "15 March 2008", "0912 345 678", "science fiction", "fifteen years", "rising sea temperatures",
];

// Stable pseudo-random heights for audio wave bars (avoids hydration mismatch).
const WAVE_HEIGHTS = Array.from({ length: 32 }, (_, i) => 4 + ((i * 7 + 3) % 17));

function AudioBar({ audio }: { audio: NonNullable<ContextCard["audio"]> }) {
  const orange = audio.color === "orange";
  return (
    <div className="audio-bar">
      <div className="play" style={orange ? { background: "var(--orange)" } : undefined}>▶</div>
      <div className="wave">
        {WAVE_HEIGHTS.map((h, i) => (
          <span key={i} style={{ height: `${h}px` }} />
        ))}
      </div>
      <span className="time">{audio.duration}</span>
      <span className="label" style={orange ? { color: "var(--orange)" } : undefined}>{audio.track}</span>
    </div>
  );
}

function Ctx({ c }: { c: ContextCard }) {
  const [open, setOpen] = useState(false);
  const hasTranscript = !!c.transcript;
  return (
    <div className="context-card">
      <div className="ctx-label">{c.label}</div>
      {c.audio && <AudioBar audio={c.audio} />}
      {hasTranscript && (
        <div className="transcript-toggle" onClick={() => setOpen((o) => !o)}>
          📝 {open ? "Ẩn transcript" : "Xem transcript"} ▾
        </div>
      )}
      {hasTranscript && open && (
        <div className="ctx-body" style={{ marginTop: 8, padding: "12px 14px", background: "#FAFAFA", borderRadius: 8 }}>
          {c.transcript}
        </div>
      )}
      {c.body && <div className="ctx-body">{c.body}</div>}
    </div>
  );
}

function QCard({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);
  const explLabel = q.explToggleLabel ?? "Xem giải thích chi tiết";
  return (
    <div className={`qcard${open ? " open" : ""}`}>
      <div className="qhead-bar">
        <div className="qhead-meta">
          <span className={`pill-cau${q.pillClass ? " " + q.pillClass : ""}`}>Câu {q.cau}</span>
          <span className="pill-type">{q.qtype}</span>
          <span className="pill-topic">
            <span className="emo">{q.topicEmoji}</span>
            {q.topic}
          </span>
        </div>
        {q.relatedHref && (
          <a className="related-link" href={q.relatedHref}>
            {q.relatedLabel ?? "Xem ngữ pháp liên quan"}
          </a>
        )}
      </div>
      <div className="qbody-wrap">
        <p className="qstem">{q.stem}</p>

        {q.errStem && <div className="err-stem">{q.errStem}</div>}

        {q.options && (
          <div className="opts">
            {q.options.map((o) => (
              <div className={`opt${o.correct ? " right" : ""}`} key={o.letter}>
                {o.correct && <span className="check">✓</span>}
                <span className="lt">{o.letter}.</span> {o.text}
              </div>
            ))}
          </div>
        )}

        {q.answerBanner && (
          <div className={`answer-banner${q.answerBanner.variant ? " " + q.answerBanner.variant : ""}`}>
            <span className="icon">{q.answerBanner.variant === "is-false" ? "✗" : "✓"}</span>
            <div>
              <div className="lbl">{q.answerBanner.label}</div>
              <div className="val">{q.answerBanner.value}</div>
            </div>
          </div>
        )}

        {q.answerBanners && (
          <div className="fill-row">
            {q.answerBanners.map((b, i) => (
              <div key={i} className={`answer-banner${b.variant ? " " + b.variant : ""}`}>
                <span className="icon">✓</span>
                <div>
                  <div className="lbl">{b.label}</div>
                  <div className="val">{b.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {q.model && <div className="model">{q.model}</div>}

        <button className="expl-toggle" onClick={() => setOpen((o) => !o)} type="button">
          💡 <span className="lbl">{open ? `Ẩn ${explLabel.replace(/^Xem /, "").replace(/^Tiêu chí /, "tiêu chí ")}` : explLabel}</span>
          <span className="chev">▼</span>
        </button>
        <div className="expl-body">
          <div className="expl-content">
            {q.explToggleLabel ? null : <div className="expl-title">🍎 Giải thích</div>}
            {q.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DapAnPage() {
  const [tab, setTab] = useState<"detail" | "key" | "image">("detail");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DAP_AN_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-sm">
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link><span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link><span className="sep">›</span>
            <Link href="/de-thi-chi-tiet">Đề tham khảo TP.HCM 2026</Link><span className="sep">›</span>
            <span className="current">Đáp án</span>
          </nav>

          <div className="head-card">
            <span className="tag">✅ Đáp án chính thức từ istudy</span>
            <h1>Đáp án — Đề tham khảo lớp 10 TP.HCM 2026</h1>
            <p className="sub">Môn Tiếng Anh • 30 câu • Có giải thích chi tiết cho từng câu</p>
            <div className="head-actions">
              <Link href="/de-thi-chi-tiet" className="btn btn--outline">← Xem lại đề thi</Link>
              <Link href="/lam-bai" className="btn btn--primary">📝 Làm bài online</Link>
              <a href="#" className="btn btn--outline">⬇️ Tải đáp án PDF</a>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-mini"><div className="v">30</div><div className="l">Tổng câu</div></div>
            <div className="stat-mini g"><div className="v">13</div><div className="l">Dạng bài</div></div>
            <div className="stat-mini b"><div className="v">10pt</div><div className="l">Điểm tối đa</div></div>
            <div className="stat-mini p"><div className="v">90&apos;</div><div className="l">Thời gian</div></div>
          </div>

          <div className="tabs" role="tablist">
            <button className={`tab-btn${tab === "detail" ? " active" : ""}`} onClick={() => setTab("detail")}>📖 Đáp án chi tiết</button>
            <button className={`tab-btn${tab === "key" ? " active" : ""}`} onClick={() => setTab("key")}>📋 Bảng đáp án</button>
            <button className={`tab-btn${tab === "image" ? " active" : ""}`} onClick={() => setTab("image")}>🖼️ Ảnh đáp án</button>
          </div>

          <div className={`tab-pane${tab === "detail" ? " active" : ""}`}>
            <div className="huongdan">
              💡 <strong>Hướng dẫn:</strong> Mỗi câu hiện đầy đủ câu hỏi, các lựa chọn và đáp án đúng được highlight. Nhấn{" "}
              <strong>&quot;Xem giải thích chi tiết&quot;</strong> để mở rộng phần giải thích từng câu.
            </div>
            {items.map((it) =>
              it.kind === "ctx" ? <Ctx key={it.id} c={it} /> : <QCard key={`q${it.cau}`} q={it} />
            )}
          </div>

          <div className={`tab-pane${tab === "key" ? " active" : ""}`}>
            <div className="key-board">
              <div className="key-title">
                BẢNG ĐÁP ÁN CHÍNH THỨC
                <div className="ln">Đề tham khảo lớp 10 TP.HCM 2026 — Môn Tiếng Anh</div>
              </div>
              <div className="key-grid">
                {KEY.map((a, i) => (
                  <div key={i}>
                    <span className="n">{i + 1}.</span>
                    <span className="a">{a}</span>
                  </div>
                ))}
              </div>
              <div className="key-foot">— aistudy.com.vn © 2026 —</div>
            </div>
            <div style={{ textAlign: "center", marginTop: 18 }}>
              <button className="btn btn--outline btn--small" onClick={() => window.print()} type="button">🖨️ In bảng đáp án</button>
            </div>
          </div>

          <div className={`tab-pane${tab === "image" ? " active" : ""}`}>
            <div className="img-tab">
              <div style={{ fontSize: 64, marginBottom: 12 }}>🖼️</div>
              <div className="cap">Ảnh đáp án chính thức từ Sở GD&amp;ĐT TP.HCM</div>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <Link href="/lam-bai" className="btn btn--primary btn--large">📝 Làm thử bài này online ngay</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
