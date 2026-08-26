"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

type Props = { kind: string; slug?: string };
type OutputFile = { blob: Blob; filename: string; url: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FileEngine({ kind, slug }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [outputs, setOutputs] = useState<OutputFile[]>([]);

  const clearOutputs = () => {
    setOutputs((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.url));
      return [];
    });
  };

  const pdfBlob = (bytes: Uint8Array<ArrayBufferLike>) => {
    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);
    return new Blob([buffer], { type: "application/pdf" });
  };

  const imageToBlob = (
    file: File,
    output: "png" | "jpeg" | "webp",
    maxWidth?: number,
  ) =>
    new Promise<Blob>((resolve, reject) => {
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
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("Could not create output image."))),
            `image/${output}`,
            output === "webp" ? 0.82 : 0.9,
          );
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(url);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to read the selected image."));
      };
      img.src = url;
    });

  const processFiles = async () => {
    if (!files.length) {
      setMessage("Choose a file first.");
      return;
    }
    if (busy) return;

    clearOutputs();
    const started = Date.now();
    setBusy(true);
    setProgress(8);
    setMessage("Preparing your file...");

    try {
      const pending: Array<{ blob: Blob; filename: string }> = [];

      if (kind.startsWith("image") || slug === "jpg-to-png" || slug === "png-to-jpg") {
        const file = files[0];
        const output = slug === "jpg-to-png"
          ? "png"
          : slug === "png-to-jpg"
            ? "jpeg"
            : kind === "image-webp"
              ? "webp"
              : file.type === "image/png" ? "jpeg" : "webp";

        setProgress(35);
        setMessage("Reading image...");
        const blob = await imageToBlob(file, output, kind === "image-resize" ? 1200 : undefined);
        setProgress(72);
        setMessage("Preparing your converted file...");
        pending.push({
          blob,
          filename: `${file.name.replace(/\.[^.]+$/, "")}.${output === "jpeg" ? "jpg" : output}`,
        });
      } else if (kind === "pdf-merge") {
        const out = await PDFDocument.create();
        for (const file of files) {
          const src = await PDFDocument.load(await file.arrayBuffer());
          const pages = await out.copyPages(src, src.getPageIndices());
          pages.forEach((page) => out.addPage(page));
        }
        setProgress(75);
        pending.push({ blob: pdfBlob(await out.save()), filename: "merged.pdf" });
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
        setProgress(70);
        pending.push({ blob: pdfBlob(await src.save({ useObjectStreams: true })), filename: "compressed.pdf" });
      } else if (kind === "jpg-pdf") {
        const out = await PDFDocument.create();
        for (const file of files) {
          const img = await out.embedJpg(await file.arrayBuffer());
          const page = out.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        setProgress(75);
        pending.push({ blob: pdfBlob(await out.save()), filename: "images.pdf" });
      } else if (kind === "pdf-jpg") {
        throw new Error("PDF → JPG requires a browser PDF renderer. This converter is not enabled in the current dependency set.");
      } else {
        throw new Error("This file operation is not available yet.");
      }

      const remaining = Math.max(0, 3000 - (Date.now() - started));
      if (remaining) await sleep(remaining);

      const prepared = pending.map((item) => ({
        ...item,
        url: URL.createObjectURL(item.blob),
      }));

      setOutputs(prepared);
      setProgress(100);
      setMessage("✓ File processed successfully. Your file is ready. Click Download to save it.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "File processing failed.");
      setProgress(0);
    } finally {
      setBusy(false);
    }
  };

  const isMultiple = kind === "pdf-merge" || kind === "jpg-pdf";
  const accept = kind === "jpg-pdf"
    ? ".jpg,.jpeg"
    : kind === "pdf-merge" || kind.startsWith("pdf-")
      ? "application/pdf"
      : "image/*";

  const downloadOne = (item: OutputFile) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = item.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadAll = () => outputs.forEach(downloadOne);

  return (
    <div className="file-engine">
      <input
        type="file"
        multiple={isMultiple}
        accept={accept}
        disabled={busy}
        onChange={(event) => {
          clearOutputs();
          setFiles(Array.from(event.target.files || []));
          setMessage("");
          setProgress(0);
        }}
        className="file-picker"
      />

      {files.length > 0 && (
        <p className="file-selected">{files.length} file{files.length === 1 ? "" : "s"} selected.</p>
      )}

      <button type="button" disabled={busy} onClick={processFiles} className="file-primary-button">
        {busy ? "Processing..." : "Process file"}
      </button>

      {busy && (
        <div className="file-progress-box">
          <div className="file-progress-head"><span>Processing your file</span><span>{progress}%</span></div>
          <div className="file-progress-track"><div className="file-progress-bar" style={{ width: `${progress}%` }} /></div>
          <p>Please wait. Processing takes at least 3 seconds.</p>
        </div>
      )}

      {message && <p className="file-message">{message}</p>}

      {outputs.length > 0 && (
        <div className="file-output-box">
          <div>
            <span className="file-success-badge">✓ READY</span>
            <h3>Your converted file is ready</h3>
            <p>The file will not download automatically. Choose Download when you are ready.</p>
          </div>

          <div className="file-output-list">
            {outputs.map((item) => (
              <div className="file-output-item" key={item.filename + item.url}>
                <span className="file-output-icon">{item.filename.toLowerCase().endsWith(".pdf") ? "📄" : "🖼"}</span>
                <strong>{item.filename}</strong>
                <button type="button" onClick={() => downloadOne(item)} className="file-download-button">Download</button>
              </div>
            ))}
          </div>

          {outputs.length > 1 && (
            <button type="button" onClick={downloadAll} className="file-download-all">Download all files</button>
          )}
        </div>
      )}
    </div>
  );
}
