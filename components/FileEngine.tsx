"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

type FileEngineProps = {
  kind: string;
};

export default function FileEngine({ kind }: FileEngineProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  /**
   * Convert Uint8Array to a real ArrayBuffer.
   *
   * This avoids the TypeScript 5.x / newer DOM BlobPart
   * compatibility issue:
   *
   * Uint8Array<ArrayBufferLike>
   * → BlobPart
   */
  const uint8ArrayToArrayBuffer = (
    data: Uint8Array<ArrayBufferLike>
  ): ArrayBuffer => {
    const buffer = new ArrayBuffer(data.byteLength);

    new Uint8Array(buffer).set(data);

    return buffer;
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  const createPdfBlob = (
    data: Uint8Array<ArrayBufferLike>
  ): Blob => {
    const buffer = uint8ArrayToArrayBuffer(data);

    return new Blob([buffer], {
      type: "application/pdf",
    });
  };

  const processFiles = async () => {
    if (!files.length) {
      setMessage("Choose a file first.");
      return;
    }

    setMessage("");

    try {
      /*
       * IMAGE TOOLS
       */
      if (kind.startsWith("image")) {
        const file = files[0];

        const image = new Image();

        image.onload = () => {
          try {
            const canvas = document.createElement("canvas");

            const maxWidth =
              kind === "image-resize" ? 1200 : image.width;

            const width = Math.min(
              maxWidth,
              image.width
            );

            const height = Math.round(
              image.height * (width / image.width)
            );

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext("2d");

            if (!context) {
              setMessage("Unable to create image canvas.");
              return;
            }

            context.drawImage(
              image,
              0,
              0,
              width,
              height
            );

            let outputType = "image/webp";

            if (kind === "image-convert") {
              outputType =
                file.type === "image/png"
                  ? "image/jpeg"
                  : "image/png";
            }

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  setMessage(
                    "Unable to process the image."
                  );
                  return;
                }

                const extension =
                  outputType.split("/")[1];

                downloadBlob(
                  blob,
                  `processed.${extension}`
                );

                setMessage(
                  "Image processed successfully."
                );
              },
              outputType,
              0.8
            );
          } catch (error) {
            setMessage(
              error instanceof Error
                ? error.message
                : "Image processing failed."
            );
          }
        };

        image.onerror = () => {
          setMessage("Unable to load the image.");
        };

        const imageUrl = URL.createObjectURL(file);

        image.src = imageUrl;

        return;
      }

      /*
       * PDF MERGE
       */
      if (kind === "pdf-merge") {
        const outputPdf = await PDFDocument.create();

        for (const file of files) {
          const sourcePdf = await PDFDocument.load(
            await file.arrayBuffer()
          );

          const pages = await outputPdf.copyPages(
            sourcePdf,
            sourcePdf.getPageIndices()
          );

          pages.forEach((page) => {
            outputPdf.addPage(page);
          });
        }

        const pdfBytes = await outputPdf.save();

        const blob = createPdfBlob(pdfBytes);

        downloadBlob(blob, "merged.pdf");

        setMessage("PDF files merged successfully.");

        return;
      }

      /*
       * PDF SPLIT
       */
      if (kind === "pdf-split") {
        const sourcePdf = await PDFDocument.load(
          await files[0].arrayBuffer()
        );

        const pageCount = sourcePdf.getPageCount();

        for (let index = 0; index < pageCount; index++) {
          const outputPdf = await PDFDocument.create();

          const copiedPages = await outputPdf.copyPages(
            sourcePdf,
            [index]
          );

          outputPdf.addPage(copiedPages[0]);

          const pdfBytes = await outputPdf.save();

          const blob = createPdfBlob(pdfBytes);

          downloadBlob(
            blob,
            `page-${index + 1}.pdf`
          );
        }

        setMessage(
          `PDF split completed. ${pageCount} page${
            pageCount === 1 ? "" : "s"
          } processed.`
        );

        return;
      }

      /*
       * JPG TO PDF
       */
      if (kind === "jpg-pdf") {
        const outputPdf = await PDFDocument.create();

        for (const file of files) {
          const imageBytes = await file.arrayBuffer();

          const image = await outputPdf.embedJpg(
            imageBytes
          );

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

        const blob = createPdfBlob(pdfBytes);

        downloadBlob(blob, "images.pdf");

        setMessage(
          "JPG images converted to PDF successfully."
        );

        return;
      }

      /*
       * OTHER TOOLS
       */
      setMessage(
        "This tool is ready for a dedicated production optimization/rasterization pipeline."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Processing failed."
      );
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    setFiles(selectedFiles);
    setMessage("");
  };

  const isMultiple =
    kind === "pdf-merge" ||
    kind === "jpg-pdf";

  const acceptedFiles =
    kind === "jpg-pdf"
      ? ".jpg,.jpeg"
      : kind.startsWith("image")
        ? "image/*"
        : "application/pdf";

  return (
    <div className="space-y-5">
      <input
        type="file"
        multiple={isMultiple}
        accept={acceptedFiles}
        onChange={handleFileChange}
        className="block w-full rounded-2xl border border-dashed border-white/15 bg-black/20 p-8 text-sm text-slate-400"
      />

      <button
        type="button"
        onClick={processFiles}
        className="rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-5 py-3 font-black text-slate-950 transition hover:opacity-90"
      >
        Process files
      </button>

      {message && (
        <p className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm text-cyan-200">
          {message}
        </p>
      )}
    </div>
  );
}