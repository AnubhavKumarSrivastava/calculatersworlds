"use client";

import { useMemo, useState } from "react";
import Field from "@/components/Field";
import ResultCard from "@/components/ResultCard";

const money = (value: number) =>
  `₹${Math.max(0, value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const num = (value: string) => Number(value) || 0;

export default function CalculatorEngine({ kind }: { kind: string }) {
  const [a, setA] = useState("100000");
  const [b, setB] = useState("10");
  const [c, setC] = useState("20");
  const [date, setDate] = useState("2026-01-01");
  const [text, setText] = useState("USD");

  const fields = useMemo(() => {
    const common: Array<{ label: string; key: "a" | "b" | "c" | "date" | "text"; type?: string }> = [];
    switch (kind) {
      case "age": return [{ label: "Date of birth", key: "date", type: "date" }];
      case "date": return [{ label: "Start date", key: "date", type: "date" }, { label: "Days to add / subtract", key: "b" }];
      case "time": return [{ label: "Start time", key: "text", type: "time" }, { label: "Hours to add", key: "b" }, { label: "Minutes to add", key: "c" }];
      case "bmi": return [{ label: "Weight (kg)", key: "a" }, { label: "Height (cm)", key: "b" }];
      case "percentage": return [{ label: "Value", key: "a" }, { label: "Percentage (%)", key: "b" }];
      case "salary": return [{ label: "Current salary (₹)", key: "a" }, { label: "Hike (%)", key: "b" }];
      case "emi": return [{ label: "Loan amount (₹)", key: "a" }, { label: "Interest rate (%)", key: "b" }, { label: "Tenure (years)", key: "c" }];
      case "sip": return [{ label: "Monthly SIP (₹)", key: "a" }, { label: "Expected return (%)", key: "b" }, { label: "Years", key: "c" }];
      case "gst": return [{ label: "Taxable amount (₹)", key: "a" }, { label: "GST rate (%)", key: "b" }];
      case "tax": return [{ label: "Annual income (₹)", key: "a" }, { label: "Deductions (₹)", key: "b" }];
      case "fd": return [{ label: "Deposit (₹)", key: "a" }, { label: "Interest rate (%)", key: "b" }, { label: "Years", key: "c" }];
      case "rd": return [{ label: "Monthly deposit (₹)", key: "a" }, { label: "Interest rate (%)", key: "b" }, { label: "Months", key: "c" }];
      case "ppf": return [{ label: "Annual contribution (₹)", key: "a" }, { label: "Years", key: "b" }, { label: "Rate (%)", key: "c" }];
      case "nps": return [{ label: "Monthly contribution (₹)", key: "a" }, { label: "Years", key: "b" }, { label: "Expected return (%)", key: "c" }];
      case "gratuity": return [{ label: "Last drawn salary (₹)", key: "a" }, { label: "Completed years", key: "b" }];
      case "hra": return [{ label: "Basic salary / month (₹)", key: "a" }, { label: "HRA / month (₹)", key: "b" }, { label: "Rent / month (₹)", key: "c" }];
      case "epf": return [{ label: "Basic salary / month (₹)", key: "a" }, { label: "Years", key: "b" }, { label: "Interest rate (%)", key: "c" }];
      case "compound": return [{ label: "Principal (₹)", key: "a" }, { label: "Annual rate (%)", key: "b" }, { label: "Years", key: "c" }];
      case "inflation": return [{ label: "Current amount (₹)", key: "a" }, { label: "Inflation (%)", key: "b" }, { label: "Years", key: "c" }];
      case "discount": return [{ label: "Original price (₹)", key: "a" }, { label: "Discount (%)", key: "b" }];
      case "profit": return [{ label: "Cost price (₹)", key: "a" }, { label: "Selling price (₹)", key: "b" }];
      case "currency": return [{ label: "Amount", key: "a" }, { label: "Target currency", key: "text", type: "text" }];
      case "eligibility": return [{ label: "Monthly income (₹)", key: "a" }, { label: "Interest rate (%)", key: "b" }, { label: "Tenure (years)", key: "c" }];
      default: return common;
    }
  }, [kind]);

  const values = { a, b, c, date, text };
  const update = (key: keyof typeof values, value: string) => {
    if (key === "a") setA(value);
    if (key === "b") setB(value);
    if (key === "c") setC(value);
    if (key === "date") setDate(value);
    if (key === "text") setText(value);
  };

  const rows = useMemo<Array<[string, string]>>(() => {
    const A = num(a), B = num(b), C = num(c);
    const result: Array<[string, string]> = [];

    if (kind === "percentage") result.push(["Percentage amount", money(A * B / 100)]);
    else if (kind === "salary") { const increase = A * B / 100; result.push(["New annual salary", money(A + increase)], ["Annual increase", money(increase)]); }
    else if (kind === "emi") { const r = B / 1200, n = C * 12; const emi = n <= 0 ? 0 : r === 0 ? A / n : A * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); result.push(["Monthly EMI", money(emi)], ["Total interest", money(Math.max(0, emi * n - A))], ["Total payment", money(emi * n)]); }
    else if (kind === "sip") { const r = B / 1200, n = C * 12; const maturity = r === 0 ? A * n : A * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); result.push(["Maturity value", money(maturity)], ["Invested amount", money(A * n)], ["Estimated gain", money(Math.max(0, maturity - A * n))]); }
    else if (kind === "gst") { const gst = A * B / 100; result.push(["GST amount", money(gst)], ["Invoice value", money(A + gst)]); }
    else if (kind === "tax") { const taxable = Math.max(0, A - B); const tax = taxable <= 400000 ? 0 : taxable <= 800000 ? (taxable - 400000) * .05 : taxable <= 1200000 ? 20000 + (taxable - 800000) * .10 : taxable <= 1600000 ? 60000 + (taxable - 1200000) * .15 : taxable <= 2000000 ? 120000 + (taxable - 1600000) * .20 : taxable <= 2400000 ? 200000 + (taxable - 2000000) * .25 : 300000 + (taxable - 2400000) * .30; result.push(["Taxable income", money(taxable)], ["Illustrative tax", money(tax)]); }
    else if (kind === "fd") { const maturity = A * Math.pow(1 + B / 400, 4 * C); result.push(["Maturity value", money(maturity)], ["Interest earned", money(maturity - A)]); }
    else if (kind === "rd") { const r = B / 400, n = C; const maturity = r === 0 ? A * n : A * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); result.push(["Maturity value", money(maturity)], ["Total deposits", money(A * n)], ["Interest earned", money(maturity - A * n)]); }
    else if (kind === "ppf") { const rate = (C || 7.1) / 100; const years = Math.max(0, B); const maturity = rate === 0 ? A * years : A * ((Math.pow(1 + rate, years) - 1) / rate) * (1 + rate); result.push(["Estimated maturity", money(maturity)], ["Total contributions", money(A * years)]); }
    else if (kind === "nps") { const r = (C || 10) / 1200, n = B * 12; const corpus = r === 0 ? A * n : A * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); result.push(["Estimated corpus", money(corpus)], ["Total contribution", money(A * n)]); }
    else if (kind === "gratuity") result.push(["Estimated gratuity", money(A * 15 / 26 * Math.floor(B))]);
    else if (kind === "hra") { const exemption = Math.max(0, Math.min(B, C - A * .1, A * .5)); result.push(["Estimated HRA exemption", money(exemption)]); }
    else if (kind === "epf") { const rate = (C || 8.25) / 1200, n = B * 12, monthly = A * .12; const corpus = rate === 0 ? monthly * n : monthly * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate); result.push(["Estimated EPF corpus", money(corpus)], ["Employee contribution", money(monthly * n)]); }
    else if (kind === "compound") { const finalAmount = A * Math.pow(1 + B / 1200, 12 * C); result.push(["Final amount", money(finalAmount)], ["Interest", money(finalAmount - A)]); }
    else if (kind === "inflation") result.push(["Future cost", money(A * Math.pow(1 + B / 100, C))]);
    else if (kind === "bmi") { const height = B / 100; const bmi = height > 0 ? A / (height * height) : 0; result.push(["BMI", bmi.toFixed(1)], ["Category", bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal range" : bmi < 30 ? "Overweight" : "Obesity range"]); }
    else if (kind === "discount") { const saved = A * B / 100; result.push(["You save", money(saved)], ["Final price", money(A - saved)]); }
    else if (kind === "profit") { const difference = B - A; result.push([difference >= 0 ? "Profit" : "Loss", money(Math.abs(difference))], ["Margin", `${A ? (Math.abs(difference) / A * 100).toFixed(2) : "0.00"}%`]); }
    else if (kind === "eligibility") { const r = B / 1200, n = C * 12, emiCapacity = A * .5; const loan = n <= 0 ? 0 : r === 0 ? emiCapacity * n : emiCapacity * (1 - Math.pow(1 + r, -n)) / r; result.push(["Estimated loan eligibility", money(loan)], ["Assumed EMI capacity", money(emiCapacity)]); }
    else if (kind === "age") { const dob = new Date(date); const today = new Date(); let years = today.getFullYear() - dob.getFullYear(); const beforeBirthday = today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()); if (beforeBirthday) years--; result.push(["Age", `${Math.max(0, years)} years`]); }
    else if (kind === "date") { const d = new Date(`${date}T00:00:00`); d.setDate(d.getDate() + B); result.push(["Result date", Number.isNaN(d.getTime()) ? "Invalid date" : d.toISOString().slice(0, 10)]); }
    else if (kind === "time") { const [h, m] = (text || "10:00").split(":").map(Number); const total = ((h || 0) * 60 + (m || 0) + B * 60 + C) % 1440; const safe = (total + 1440) % 1440; result.push(["Result time", `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`]); }
    else if (kind === "currency") { const target = text || "USD"; const demoRates: Record<string, number> = { USD: 83, EUR: 90, GBP: 105, AED: 22.6, INR: 1 }; const rate = demoRates[target.toUpperCase()] || 1; result.push([`Approx. ${target.toUpperCase()}`, `${(A / rate).toFixed(2)}`], ["Note", "Uses starter/demo rates; connect a live FX provider for production."]); }
    return result;
  }, [a, b, c, date, text, kind]);

  const labels: Record<string, string> = {
    percentage: "Percentage", salary: "Salary hike", emi: "Loan EMI", sip: "SIP", gst: "GST", tax: "Income tax", fd: "Fixed deposit", rd: "Recurring deposit", ppf: "PPF", nps: "NPS", gratuity: "Gratuity", hra: "HRA", epf: "EPF", compound: "Compound interest", inflation: "Inflation", bmi: "BMI", discount: "Discount", profit: "Profit & loss", eligibility: "Loan eligibility", age: "Age", date: "Date", time: "Time", currency: "Currency"
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <Field
            key={field.key + field.label}
            label={field.label}
            value={values[field.key]}
            type={field.type || "number"}
            onChange={(value) => update(field.key, value)}
          />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.length ? rows.map(([label, value]) => <ResultCard key={label} label={label} value={value} />) : <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Enter your inputs above to see the result.</div>}
      </div>
      <p className="text-xs leading-6 text-slate-500">{labels[kind] || "Calculator"} results are estimates for planning and should be checked against current official rules or professional advice where applicable.</p>
    </div>
  );
}
