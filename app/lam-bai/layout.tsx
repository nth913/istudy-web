import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Làm bài — istudy",
  robots: { index: false, follow: false },
};

export default function LamBaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
