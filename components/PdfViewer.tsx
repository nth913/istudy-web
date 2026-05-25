"use client";

import { useEffect, useRef, useState } from "react";

const WORKER_SRC = "/pdf.worker.min.mjs";
const RENDER_SCALE_DESKTOP = 1.5;
const RENDER_SCALE_MOBILE = 1.2;

type Status = "loading" | "ready" | "error";

interface PdfViewerProps {
  src: string;
  ariaTitle?: string;
}

export function PdfViewer({ src, ariaTitle }: PdfViewerProps) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: { destroy: () => Promise<void> } | null = null;

    async function load() {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;

        loadingTask = pdfjs.getDocument(src) as unknown as { destroy: () => Promise<void> };
        const pdf = await (loadingTask as unknown as { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<unknown> }> }).promise;
        if (cancelled) return;

        const container = pagesRef.current;
        if (!container) return;
        container.replaceChildren();

        const scale = window.matchMedia("(max-width: 768px)").matches
          ? RENDER_SCALE_MOBILE
          : RENDER_SCALE_DESKTOP;

        const total = pdf.numPages;
        setProgress({ current: 0, total });

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const page = (await pdf.getPage(i)) as unknown as {
            getViewport: (opts: { scale: number }) => { width: number; height: number };
            render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown; canvas: HTMLCanvasElement }) => { promise: Promise<void> };
          };
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.className = "pdf-page-canvas";
          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = "100%";
          canvas.style.maxWidth = `${viewport.width}px`;
          canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          ctx.scale(dpr, dpr);
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
          setProgress({ current: i, total });
        }

        setStatus("ready");
        setProgress(null);
      } catch (err) {
        if (cancelled) return;
        console.error("[PdfViewer]", err);
        setStatus("error");
      }
    }

    void load();

    return () => {
      cancelled = true;
      if (loadingTask) {
        void loadingTask.destroy().catch(() => {});
      }
    };
  }, [src]);

  return (
    <div className="pdf-viewer" aria-label={ariaTitle}>
      {status === "loading" && (
        <div className="pdf-viewer__state pdf-viewer__loading">
          <span>Đang tải PDF{progress ? ` (${progress.current}/${progress.total} trang)` : "…"}</span>
        </div>
      )}
      {status === "error" && (
        <div className="pdf-viewer__state pdf-viewer__error">
          <span>Không tải được PDF. Vui lòng thử lại sau.</span>
        </div>
      )}
      <div ref={pagesRef} className="pdf-viewer__pages" />
    </div>
  );
}
