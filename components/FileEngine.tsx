"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

type Props = { kind: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FileEngine({ kind }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");


  const download = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const pdfBlob = (bytes: Uint8Array<ArrayBufferLike>) => {
    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);
    return new Blob([buffer], { type: "application/pdf" });
  };

  const imageToBlob = (file: File, output: "png" | "jpeg" | "webp", maxWidth?: number) => new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const width = maxWidth ? Math.min(maxWidth, img.width) : img.width;
        const height = Math.max(1, Math.round(img.height * (width / img.width)));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Browser image canvas is unavailable.");
        if (output === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create output image.")), `image/${output}`, output === "webp" ? 0.82 : 0.9);
      } catch (e) { reject(e); } finally { URL.revokeObjectURL(url); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Unable to read the selected image.")); };
    img.src = url;
  });

  const processFiles = async () => {
    if (!files.length) { setMessage("Choose a file first."); return; }
    if (busy) return;
    const started = Date.now();
    setBusy(true); setProgress(8); setMessage("Preparing your file...");
    try {
      const pending: Array<{ blob: Blob; filename: string }> = [];
      if (kind.startsWith("image")) {
        const file = files[0];
        const output = kind === "image-webp" ? "webp" : kind === "png-to-jpg" ? "jpeg" : kind === "jpg-to-png" ? "png" : file.type === "image/png" ? "jpeg" : "webp";
        setProgress(35); setMessage("Reading image...");
        const blob = await imageToBlob(file, output, kind === "image-resize" ? 1200 : undefined);
        setProgress(72); setMessage("Optimizing output...");
        pending.push({ blob, filename: `${file.name.replace(/\.[^.]+$/, "")}.${output === "jpeg" ? "jpg" : output}` });
      } else if (kind === "pdf-merge") {
        const out = await PDFDocument.create();
        for (const file of files) {
          const src = await PDFDocument.load(await file.arrayBuffer());
          const pages = await out.copyPages(src, src.getPageIndices());
          pages.forEach((page) => out.addPage(page));
        }
        setProgress(75); pending.push({ blob: pdfBlob(await out.save()), filename: "merged.pdf" });
      } else if (kind === "pdf-split") {
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        for (let i = 0; i < src.getPageCount(); i++) {
          const out = await PDFDocument.create();
          const [page] = await out.copyPages(src, [i]);
          out.addPage(page);
          pending.push({ blob: pdfBlob(await out.save()), filename: `page-${i + 1}.pdf` });
        }
        setProgress(78);
      } else if (kind === "pdf-compress") {
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        setProgress(70); pending.push({ blob: pdfBlob(await src.save({ useObjectStreams: true })), filename: "compressed.pdf" });
      } else if (kind === "jpg-pdf") {
        const out = await PDFDocument.create();
        for (const file of files) {
          const img = await out.embedJpg(await file.arrayBuffer());
          const page = out.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        setProgress(75); pending.push({ blob: pdfBlob(await out.save()), filename: "images.pdf" });
      } else if (kind === "pdf-jpg") {
        setMessage("PDF → JPG requires a browser PDF renderer. This project keeps the conversion page ready, but the current dependency set does not include a PDF rasterizer.");
        setProgress(50);
      } else {
        setMessage("This file operation is not available yet.");
      }

      const remaining = Math.max(0, 3000 - (Date.now() - started));
      if (remaining) await sleep(remaining);
      pending.forEach(({ blob, filename }) => download(blob, filename));
      setProgress(100);
      setMessage(pending.length ? "✓ File processed successfully. Your download is ready." : "✓ Processing completed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "File processing failed.");
      setProgress(0);
    } finally {
      setBusy(false);
    }
  };

  const isMultiple = kind === "pdf-merge" || kind === "jpg-pdf";
  const accept = kind === "jpg-pdf" ? ".jpg,.jpeg" : kind === "pdf-merge" || kind.startsWith("pdf-") ? "application/pdf" : "image/*";

  return <div className="space-y-5">
    <input type="file" multiple={isMultiple} accept={accept} disabled={busy} onChange={(e) => { setFiles(Array.from(e.target.files || [])); setMessage(""); setProgress(0); }} className="block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600" />
    {files.length > 0 && <p className="text-sm text-slate-500">{files.length} file{files.length === 1 ? "" : "s"} selected.</p>}
    <button type="button" disabled={busy} onClick={processFiles} className="rounded-2xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Processing..." : "Process files"}</button>
    {busy && <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><div className="mb-3 flex justify-between text-sm font-bold text-blue-800"><span>Processing your file</span><span>{progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-blue-100"><div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div><p className="mt-3 text-xs text-blue-700">Please wait. The processing indicator runs for at least 3 seconds.</p></div>}
    {message && <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{message}</p>}
  </div>;
}
