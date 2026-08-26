"use client";

import { useState } from "react";
import QRCode from "qrcode";
import ResultCard from "@/components/ResultCard";

export default function DeveloperEngine({ kind }: { kind: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");

  const run = async () => {
    setError("");
    setQr("");
    try {
      if (kind === "uuid") {
        setOutput(crypto.randomUUID());
        return;
      }
      if (kind === "password") {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
        const bytes = new Uint32Array(24);
        crypto.getRandomValues(bytes);
        setOutput(Array.from(bytes, (n) => chars[n % chars.length]).join(""));
        return;
      }
      if (kind === "qr") {
        setQr(await QRCode.toDataURL(input || "https://example.com"));
        return;
      }

      let result = input;
      if (kind === "json-format") result = JSON.stringify(JSON.parse(input), null, 2);
      else if (kind === "json-validate") { JSON.parse(input); result = "✓ Valid JSON"; }
      else if (kind === "base64") result = btoa(unescape(encodeURIComponent(input)));
      else if (kind === "url") result = encodeURIComponent(input);
      else if (kind === "html") result = input.replace(/></g, ">\n<");
      else if (kind === "css") result = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
      else if (kind === "js") result = input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "").replace(/\s+/g, " ").trim();
      else if (kind === "regex") { const [pattern, ...text] = input.split("\n"); const match = text.join("\n").match(new RegExp(pattern || "", "m")); result = match?.[0] ?? "No match"; }
      else if (kind === "timestamp") { const value = Number(input); const d = new Date(value < 1e12 ? value * 1000 : value); result = Number.isNaN(d.getTime()) ? "Invalid timestamp" : d.toISOString(); }
      else if (kind === "color") { const hex = input.trim().replace(/^#/, ""); result = /^[0-9a-f]{6}$/i.test(hex) ? `rgb(${parseInt(hex.slice(0,2),16)}, ${parseInt(hex.slice(2,4),16)}, ${parseInt(hex.slice(4),16)})` : "Use a 6-digit HEX value such as #2563EB"; }
      else if (kind === "meta") { const [title, description] = input.split("\n"); result = `<title>${title || ""}</title>\n<meta name="description" content="${description || ""}">`; }
      else if (kind === "robots") result = `User-agent: *\nAllow: /\n\nSitemap: ${input || "https://example.com/sitemap.xml"}`;
      else if (kind === "sitemap") result = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${input.split("\n").filter(Boolean).map((u) => `  <url><loc>${u.trim()}</loc></url>`).join("\n")}\n</urlset>`;
      else if (kind === "google-doc-html") result = input.split(/\n+/).filter(Boolean).map((line) => `<p>${line}</p>`).join("\n");
      else result = input;
      setOutput(result);
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Unable to process input.");
    }
  };

  const isGenerator = ["uuid", "password"].includes(kind);
  const placeholder = kind === "regex" ? "First line: regex pattern\nNext lines: test text" : kind === "json-format" || kind === "json-validate" ? '{"name":"CalcIndia","active":true}' : "Paste or type input here...";

  return (
    <div className="space-y-5">
      {!isGenerator && (
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-64 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" placeholder={placeholder} />
      )}
      <button type="button" onClick={run} className="rounded-2xl bg-violet-600 px-5 py-3 font-black text-white transition hover:bg-violet-700">
        {kind === "uuid" ? "Generate UUID" : kind === "password" ? "Generate Password" : kind === "qr" ? "Generate QR Code" : "Run Tool"}
      </button>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {qr && <div className="flex justify-center rounded-2xl border border-slate-200 bg-white p-6"><img src={qr} alt="Generated QR code" className="h-64 w-64" /></div>}
      {output && <ResultCard label="Result" value={output} />}
    </div>
  );
}
