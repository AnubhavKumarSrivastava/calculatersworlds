"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";

type FileEngineProps = {
  kind: string;
};

type DownloadResult = {
  url: string;
  filename: string;
  type: string;
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const toArrayBuffer = (
  data: Uint8Array<ArrayBufferLike>,
): ArrayBuffer => {
  const buffer = new ArrayBuffer(data.byteLength);
  new Uint8Array(buffer).set(data);
  return buffer;
};

function extensionForMime(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  if (type === "application/pdf") return "pdf";
  return "bin";
}

export default function FileEngine({ kind }: FileEngineProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DownloadResult | null>(null);

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const createDownloadResult = (blob: Blob, filename: string) => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    const url = URL.createObjectURL(blob);

    setResult({
      url,
      filename,
      type: blob.type,
    });
  };

  const waitMinimumThreeSeconds = async () => {
    setProgress(0);

    const started = Date.now();
    const minimumDuration = 3000;

    while (Date.now() - started < minimumDuration) {
      const elapsed = Date.now() - started;
      setProgress(Math.min(95, Math.round((elapsed / minimumDuration) * 95)));
      await sleep(100);
    }

    setProgress(100);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(file);

      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };

      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to read this image."));
      };

      image.src = url;
    });

  const convertImage = async (
    file: File,
    outputType: string,
    resize = false,
  ): Promise<Blob> => {
    const image = await loadImage(file);

    const maxWidth = resize ? 1200 : image.width;
    const width = Math.min(maxWidth, image.width);
    const height = Math.max(
      1,
      Math.round(image.height * (width / image.width)),
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Your browser could not create an image canvas.");
    }

    // JPEG does not support transparency, so use a white background.
    if (outputType === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }

    context.drawImage(image, 0, 0, width, height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Image conversion failed."));
            return;
          }

          resolve(blob);
        },
        outputType,
        0.82,
      );
    });
  };

  const processFiles = async () => {
    if (!files.length) {
      setMessage("Choose a file first.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setMessage("");
    setResult(null);
    setProgress(0);

    try {
      // The user specifically requested a visible loader for at least 3 seconds.
      // The actual browser-side processing happens after that minimum wait.
      await waitMinimumThreeSeconds();

      /*
       * JPG → PNG
       */
      if (kind === "image-convert" || kind === "jpg-to-png") {
        const file = files[0];

        const outputType =
          kind === "jpg-to-png"
            ? "image/png"
            : file.type === "image/png"
              ? "image/jpeg"
              : "image/png";

        const blob = await convertImage(file, outputType);

        const extension = extensionForMime(outputType);

        createDownloadResult(
          blob,
          `${file.name.replace(/\.[^.]+$/, "")}.${extension}`,
        );

        setMessage("Image converted successfully.");
        return;
      }

      /*
       * PNG → JPG
       */
      if (kind === "png-to-jpg") {
        const file = files[0];

        const blob = await convertImage(
          file,
          "image/jpeg",
        );

        createDownloadResult(
          blob,
          `${file.name.replace(/\.[^.]+$/, "")}.jpg`,
        );

        setMessage("PNG converted to JPG successfully.");
        return;
      }

      /*
       * WebP converter
       */
      if (kind === "image-webp" || kind === "webp-converter") {
        const file = files[0];

        const blob = await convertImage(
          file,
          "image/webp",
        );

        createDownloadResult(
          blob,
          `${file.name.replace(/\.[^.]+$/, "")}.webp`,
        );

        setMessage("Image converted to WebP successfully.");
        return;
      }

      /*
       * Image compressor
       */
      if (kind === "image-compress") {
        const file = files[0];

        const blob = await convertImage(
          file,
          "image/webp",
        );

        createDownloadResult(
          blob,
          `${file.name.replace(/\.[^.]+$/, "")}-compressed.webp`,
        );

        setMessage("Image compressed successfully.");
        return;
      }

      /*
       * Image resize
       */
      if (kind === "image-resize") {
        const file = files[0];

        const blob = await convertImage(
          file,
          "image/webp",
          true,
        );

        createDownloadResult(
          blob,
          `${file.name.replace(/\.[^.]+$/, "")}-resized.webp`,
        );

        setMessage("Image resized successfully.");
        return;
      }

      /*
       * PDF merge
       */
      if (kind === "pdf-merge") {
        const outputPdf = await PDFDocument.create();

        for (const file of files) {
          const sourcePdf = await PDFDocument.load(
            await file.arrayBuffer(),
          );

          const pages = await outputPdf.copyPages(
            sourcePdf,
            sourcePdf.getPageIndices(),
          );

          pages.forEach((page) => outputPdf.addPage(page));
        }

        const pdfBytes = await outputPdf.save();

        const blob = new Blob(
          [toArrayBuffer(pdfBytes)],
          { type: "application/pdf" },
        );

        createDownloadResult(blob, "merged.pdf");
        setMessage("PDF files merged successfully.");
        return;
      }

      /*
       * PDF split
       */
      if (kind === "pdf-split") {
        const sourcePdf = await PDFDocument.load(
          await files[0].arrayBuffer(),
        );

        const pageCount = sourcePdf.getPageCount();

        for (let index = 0; index < pageCount; index++) {
          const outputPdf = await PDFDocument.create();

          const pages = await outputPdf.copyPages(
            sourcePdf,
            [index],
          );

          outputPdf.addPage(pages[0]);

          const pdfBytes = await outputPdf.save();

          const blob = new Blob(
            [toArrayBuffer(pdfBytes)],
            { type: "application/pdf" },
          );

          downloadBlob(blob, `page-${index + 1}.pdf`);
        }

        setMessage(
          `PDF split completed. ${pageCount} page${
            pageCount === 1 ? "" : "s"
          } downloaded.`,
        );

        return;
      }

      /*
       * JPG → PDF
       */
      if (kind === "jpg-pdf") {
        const outputPdf = await PDFDocument.create();

        for (const file of files) {
          const imageBytes = await file.arrayBuffer();
          const image = await outputPdf.embedJpg(imageBytes);

          const page = outputPdf.addPage([
            image.width,
            image.height,
          ]);

          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        }

        const pdfBytes = await outputPdf.save();

        const blob = new Blob(
          [toArrayBuffer(pdfBytes)],
          { type: "application/pdf" },
        );

        createDownloadResult(blob, "images.pdf");
        setMessage("JPG images converted to PDF successfully.");
        return;
      }

      setMessage(
        "This file tool is not yet connected to a production conversion engine.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "File processing failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    setFiles(selectedFiles);
    setMessage("");
    setResult(null);
    setProgress(0);
  };

  const isMultiple =
    kind === "pdf-merge" ||
    kind === "jpg-pdf";

  const acceptedFiles =
    kind === "jpg-pdf"
      ? ".jpg,.jpeg"
      : kind === "jpg-to-png"
        ? ".jpg,.jpeg"
        : kind === "png-to-jpg"
          ? ".png"
          : kind.startsWith("image")
            ? "image/*"
            : "application/pdf";

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          border: "2px dashed #d0d5dd",
          borderRadius: 18,
          padding: 28,
          background: "#f8fafc",
        }}
      >
        <input
          type="file"
          multiple={isMultiple}
          accept={acceptedFiles}
          onChange={handleFileChange}
          disabled={loading}
          style={{
            display: "block",
            width: "100%",
            color: "#475467",
          }}
        />

        {files.length > 0 && (
          <p
            style={{
              margin: "12px 0 0",
              color: "#667085",
              fontSize: 13,
            }}
          >
            {files.length} file{files.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={processFiles}
        disabled={loading}
        className="primary-button"
        style={{
          width: "fit-content",
          opacity: loading ? 0.65 : 1,
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Convert / Process File"}
      </button>

      {loading && (
        <div className="file-loader">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              color: "#1d4ed8",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            <span>Processing your file…</span>
            <span>{progress}%</span>
          </div>

          <div className="file-loader-track">
            <div
              className="file-loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p
            style={{
              margin: "10px 0 0",
              color: "#667085",
              fontSize: 12,
            }}
          >
            Please wait. Your file is being processed securely in the browser.
          </p>
        </div>
      )}

      {!loading && message && (
        <div className={result ? "file-success" : "file-loader"}>
          <b>{result ? "✓ " : ""}{message}</b>
        </div>
      )}

      {!loading && result && (
        <div className="file-success">
          <div style={{ fontWeight: 900 }}>
            📄 Your converted file is ready
          </div>

          <div style={{ marginTop: 5, fontSize: 13 }}>
            {result.filename}
          </div>

          <a
            href={result.url}
            download={result.filename}
            className="file-download"
          >
            ⇩ Download {result.filename}
          </a>
        </div>
      )}
    </div>
  );
}
