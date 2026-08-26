"use client";

import { useMemo, useState } from "react";
import Field from "@/components/Field";
import ResultCard from "@/components/ResultCard";

type FieldKey = "a" | "b" | "c" | "date" | "text";

type CalculatorField = {
  label: string;
  key: FieldKey;
  type?: string;
};

type CalculatorValues = Record<FieldKey, string>;

const money = (value: number): string =>
  `₹${Math.max(0, value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const num = (value: string): number => Number(value) || 0;

export default function CalculatorEngine({
  kind,
}: {
  kind: string;
}) {
  const [a, setA] = useState("100000");
  const [b, setB] = useState("10");
  const [c, setC] = useState("20");
  const [date, setDate] = useState("2026-01-01");
  const [text, setText] = useState("USD");

  /*
   * ----------------------------------------------------------
   * CALCULATOR INPUT FIELDS
   * ----------------------------------------------------------
   */

  const fields = useMemo<CalculatorField[]>(() => {
    switch (kind) {
      case "age":
        return [
          {
            label: "Date of birth",
            key: "date",
            type: "date",
          },
        ];

      case "date":
        return [
          {
            label: "Start date",
            key: "date",
            type: "date",
          },
          {
            label: "Days to add / subtract",
            key: "b",
            type: "number",
          },
        ];

      case "time":
        return [
          {
            label: "Start time",
            key: "text",
            type: "time",
          },
          {
            label: "Hours to add",
            key: "b",
            type: "number",
          },
          {
            label: "Minutes to add",
            key: "c",
            type: "number",
          },
        ];

      case "bmi":
        return [
          {
            label: "Weight (kg)",
            key: "a",
            type: "number",
          },
          {
            label: "Height (cm)",
            key: "b",
            type: "number",
          },
        ];

      case "percentage":
        return [
          {
            label: "Value",
            key: "a",
            type: "number",
          },
          {
            label: "Percentage (%)",
            key: "b",
            type: "number",
          },
        ];

      case "salary":
        return [
          {
            label: "Current salary (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Hike (%)",
            key: "b",
            type: "number",
          },
        ];

      case "emi":
        return [
          {
            label: "Loan amount (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Interest rate (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Tenure (years)",
            key: "c",
            type: "number",
          },
        ];

      case "sip":
        return [
          {
            label: "Monthly SIP (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Expected return (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Years",
            key: "c",
            type: "number",
          },
        ];

      case "gst":
        return [
          {
            label: "Taxable amount (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "GST rate (%)",
            key: "b",
            type: "number",
          },
        ];

      case "tax":
        return [
          {
            label: "Annual income (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Deductions (₹)",
            key: "b",
            type: "number",
          },
        ];

      case "fd":
        return [
          {
            label: "Deposit (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Interest rate (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Years",
            key: "c",
            type: "number",
          },
        ];

      case "rd":
        return [
          {
            label: "Monthly deposit (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Interest rate (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Months",
            key: "c",
            type: "number",
          },
        ];

      case "ppf":
        return [
          {
            label: "Annual contribution (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Years",
            key: "b",
            type: "number",
          },
          {
            label: "Rate (%)",
            key: "c",
            type: "number",
          },
        ];

      case "nps":
        return [
          {
            label: "Monthly contribution (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Years",
            key: "b",
            type: "number",
          },
          {
            label: "Expected return (%)",
            key: "c",
            type: "number",
          },
        ];

      case "gratuity":
        return [
          {
            label: "Last drawn salary (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Completed years",
            key: "b",
            type: "number",
          },
        ];

      case "hra":
        return [
          {
            label: "Basic salary / month (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "HRA / month (₹)",
            key: "b",
            type: "number",
          },
          {
            label: "Rent / month (₹)",
            key: "c",
            type: "number",
          },
        ];

      case "epf":
        return [
          {
            label: "Basic salary / month (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Years",
            key: "b",
            type: "number",
          },
          {
            label: "Interest rate (%)",
            key: "c",
            type: "number",
          },
        ];

      case "compound":
        return [
          {
            label: "Principal (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Annual rate (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Years",
            key: "c",
            type: "number",
          },
        ];

      case "inflation":
        return [
          {
            label: "Current amount (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Inflation (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Years",
            key: "c",
            type: "number",
          },
        ];

      case "discount":
        return [
          {
            label: "Original price (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Discount (%)",
            key: "b",
            type: "number",
          },
        ];

      case "profit":
        return [
          {
            label: "Cost price (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Selling price (₹)",
            key: "b",
            type: "number",
          },
        ];

      case "currency":
        return [
          {
            label: "Amount",
            key: "a",
            type: "number",
          },
          {
            label: "Target currency",
            key: "text",
            type: "text",
          },
        ];

      case "eligibility":
        return [
          {
            label: "Monthly income (₹)",
            key: "a",
            type: "number",
          },
          {
            label: "Interest rate (%)",
            key: "b",
            type: "number",
          },
          {
            label: "Tenure (years)",
            key: "c",
            type: "number",
          },
        ];

      default:
        return [];
    }
  }, [kind]);

  /*
   * ----------------------------------------------------------
   * INPUT VALUES
   * ----------------------------------------------------------
   */

  const values: CalculatorValues = {
    a,
    b,
    c,
    date,
    text,
  };

  /*
   * ----------------------------------------------------------
   * UPDATE INPUT
   * ----------------------------------------------------------
   */

  const update = (
    key: FieldKey,
    value: string
  ): void => {
    switch (key) {
      case "a":
        setA(value);
        break;

      case "b":
        setB(value);
        break;

      case "c":
        setC(value);
        break;

      case "date":
        setDate(value);
        break;

      case "text":
        setText(value);
        break;
    }
  };

  /*
   * ----------------------------------------------------------
   * CALCULATIONS
   * ----------------------------------------------------------
   */

  const rows = useMemo<Array<[string, string]>>(() => {
    const A = num(a);
    const B = num(b);
    const C = num(c);

    const result: Array<[string, string]> = [];

    /*
     * Percentage
     */
    if (kind === "percentage") {
      result.push([
        "Percentage amount",
        money((A * B) / 100),
      ]);
    }

    /*
     * Salary
     */
    else if (kind === "salary") {
      const increase = (A * B) / 100;

      result.push(
        [
          "New annual salary",
          money(A + increase),
        ],
        [
          "Annual increase",
          money(increase),
        ]
      );
    }

    /*
     * EMI
     */
    else if (kind === "emi") {
      const rate = B / 1200;
      const months = C * 12;

      let emi = 0;

      if (months > 0) {
        if (rate === 0) {
          emi = A / months;
        } else {
          const factor = Math.pow(
            1 + rate,
            months
          );

          emi =
            (A * rate * factor) /
            (factor - 1);
        }
      }

      const totalPayment =
        emi * months;

      const totalInterest =
        Math.max(
          0,
          totalPayment - A
        );

      result.push(
        [
          "Monthly EMI",
          money(emi),
        ],
        [
          "Total interest",
          money(totalInterest),
        ],
        [
          "Total payment",
          money(totalPayment),
        ]
      );
    }

    /*
     * SIP
     */
    else if (kind === "sip") {
      const rate = B / 1200;
      const months = C * 12;

      let maturity = 0;

      if (rate === 0) {
        maturity = A * months;
      } else {
        maturity =
          A *
          ((Math.pow(
            1 + rate,
            months
          ) -
            1) /
            rate) *
          (1 + rate);
      }

      const invested =
        A * months;

      result.push(
        [
          "Maturity value",
          money(maturity),
        ],
        [
          "Invested amount",
          money(invested),
        ],
        [
          "Estimated gain",
          money(
            Math.max(
              0,
              maturity - invested
            )
          ),
        ]
      );
    }

    /*
     * GST
     */
    else if (kind === "gst") {
      const gst =
        (A * B) / 100;

      result.push(
        [
          "GST amount",
          money(gst),
        ],
        [
          "Invoice value",
          money(A + gst),
        ]
      );
    }

    /*
     * Income Tax
     */
    else if (kind === "tax") {
      const taxable =
        Math.max(0, A - B);

      let tax = 0;

      if (taxable <= 400000) {
        tax = 0;
      } else if (taxable <= 800000) {
        tax =
          (taxable - 400000) *
          0.05;
      } else if (taxable <= 1200000) {
        tax =
          20000 +
          (taxable - 800000) *
            0.1;
      } else if (taxable <= 1600000) {
        tax =
          60000 +
          (taxable - 1200000) *
            0.15;
      } else if (taxable <= 2000000) {
        tax =
          120000 +
          (taxable - 1600000) *
            0.2;
      } else if (taxable <= 2400000) {
        tax =
          200000 +
          (taxable - 2000000) *
            0.25;
      } else {
        tax =
          300000 +
          (taxable - 2400000) *
            0.3;
      }

      result.push(
        [
          "Taxable income",
          money(taxable),
        ],
        [
          "Illustrative tax",
          money(tax),
        ]
      );
    }

    /*
     * FD
     */
    else if (kind === "fd") {
      const maturity =
        A *
        Math.pow(
          1 + B / 400,
          4 * C
        );

      result.push(
        [
          "Maturity value",
          money(maturity),
        ],
        [
          "Interest earned",
          money(
            Math.max(
              0,
              maturity - A
            )
          ),
        ]
      );
    }

    /*
     * RD
     */
    else if (kind === "rd") {
      const rate = B / 400;
      const months = C;

      let maturity = 0;

      if (rate === 0) {
        maturity =
          A * months;
      } else {
        maturity =
          A *
          ((Math.pow(
            1 + rate,
            months
          ) -
            1) /
            rate) *
          (1 + rate);
      }

      const deposits =
        A * months;

      result.push(
        [
          "Maturity value",
          money(maturity),
        ],
        [
          "Total deposits",
          money(deposits),
        ],
        [
          "Interest earned",
          money(
            Math.max(
              0,
              maturity - deposits
            )
          ),
        ]
      );
    }

    /*
     * PPF
     */
    else if (kind === "ppf") {
      const rate =
        (C || 7.1) / 100;

      const years =
        Math.max(0, B);

      let maturity = 0;

      if (rate === 0) {
        maturity =
          A * years;
      } else {
        maturity =
          A *
          ((Math.pow(
            1 + rate,
            years
          ) -
            1) /
            rate) *
          (1 + rate);
      }

      result.push(
        [
          "Estimated maturity",
          money(maturity),
        ],
        [
          "Total contributions",
          money(A * years),
        ]
      );
    }

    /*
     * NPS
     */
    else if (kind === "nps") {
      const rate =
        (C || 10) / 1200;

      const months =
        B * 12;

      let corpus = 0;

      if (rate === 0) {
        corpus =
          A * months;
      } else {
        corpus =
          A *
          ((Math.pow(
            1 + rate,
            months
          ) -
            1) /
            rate) *
          (1 + rate);
      }

      result.push(
        [
          "Estimated corpus",
          money(corpus),
        ],
        [
          "Total contribution",
          money(A * months),
        ]
      );
    }

    /*
     * Gratuity
     */
    else if (kind === "gratuity") {
      const years =
        Math.floor(B);

      const gratuity =
        (A * 15 * years) /
        26;

      result.push([
        "Estimated gratuity",
        money(gratuity),
      ]);
    }

    /*
     * HRA
     */
    else if (kind === "hra") {
      const exemption =
        Math.max(
          0,
          Math.min(
            B,
            C - A * 0.1,
            A * 0.5
          )
        );

      result.push([
        "Estimated HRA exemption",
        money(exemption),
      ]);
    }

    /*
     * EPF
     */
    else if (kind === "epf") {
      const rate =
        (C || 8.25) / 1200;

      const months =
        B * 12;

      const monthly =
        A * 0.12;

      let corpus = 0;

      if (rate === 0) {
        corpus =
          monthly * months;
      } else {
        corpus =
          monthly *
          ((Math.pow(
            1 + rate,
            months
          ) -
            1) /
            rate) *
          (1 + rate);
      }

      result.push(
        [
          "Estimated EPF corpus",
          money(corpus),
        ],
        [
          "Employee contribution",
          money(monthly * months),
        ]
      );
    }

    /*
     * Compound Interest
     */
    else if (kind === "compound") {
      const finalAmount =
        A *
        Math.pow(
          1 + B / 1200,
          12 * C
        );

      result.push(
        [
          "Final amount",
          money(finalAmount),
        ],
        [
          "Interest",
          money(
            Math.max(
              0,
              finalAmount - A
            )
          ),
        ]
      );
    }

    /*
     * Inflation
     */
    else if (kind === "inflation") {
      const futureCost =
        A *
        Math.pow(
          1 + B / 100,
          C
        );

      result.push([
        "Future cost",
        money(futureCost),
      ]);
    }

    /*
     * BMI
     */
    else if (kind === "bmi") {
      const height =
        B / 100;

      const bmi =
        height > 0
          ? A /
            (height * height)
          : 0;

      const category =
        bmi < 18.5
          ? "Underweight"
          : bmi < 25
            ? "Normal range"
            : bmi < 30
              ? "Overweight"
              : "Obesity range";

      result.push(
        [
          "BMI",
          bmi.toFixed(1),
        ],
        [
          "Category",
          category,
        ]
      );
    }

    /*
     * Discount
     */
    else if (kind === "discount") {
      const saved =
        (A * B) / 100;

      result.push(
        [
          "You save",
          money(saved),
        ],
        [
          "Final price",
          money(
            Math.max(
              0,
              A - saved
            )
          ),
        ]
      );
    }

    /*
     * Profit / Loss
     */
    else if (kind === "profit") {
      const difference =
        B - A;

      const margin =
        A !== 0
          ? (
              (Math.abs(
                difference
              ) /
                A) *
              100
            ).toFixed(2)
          : "0.00";

      result.push(
        [
          difference >= 0
            ? "Profit"
            : "Loss",
          money(
            Math.abs(
              difference
            )
          ),
        ],
        [
          "Margin",
          `${margin}%`,
        ]
      );
    }

    /*
     * Loan Eligibility
     */
    else if (
      kind === "eligibility"
    ) {
      const rate =
        B / 1200;

      const months =
        C * 12;

      const emiCapacity =
        A * 0.5;

      let loan = 0;

      if (months > 0) {
        if (rate === 0) {
          loan =
            emiCapacity *
            months;
        } else {
          loan =
            (emiCapacity *
              (1 -
                Math.pow(
                  1 + rate,
                  -months
                ))) /
            rate;
        }
      }

      result.push(
        [
          "Estimated loan eligibility",
          money(loan),
        ],
        [
          "Assumed EMI capacity",
          money(emiCapacity),
        ]
      );
    }

    /*
     * Age
     */
    else if (kind === "age") {
      const dob =
        new Date(date);

      const today =
        new Date();

      let years =
        today.getFullYear() -
        dob.getFullYear();

      const beforeBirthday =
        today.getMonth() <
          dob.getMonth() ||
        (today.getMonth() ===
          dob.getMonth() &&
          today.getDate() <
            dob.getDate());

      if (beforeBirthday) {
        years--;
      }

      result.push([
        "Age",
        `${Math.max(
          0,
          years
        )} years`,
      ]);
    }

    /*
     * Date Calculator
     */
    else if (kind === "date") {
      const d = new Date(
        `${date}T00:00:00`
      );

      d.setDate(
        d.getDate() + B
      );

      result.push([
        "Result date",
        Number.isNaN(
          d.getTime()
        )
          ? "Invalid date"
          : d
              .toISOString()
              .slice(0, 10),
      ]);
    }

    /*
     * Time Calculator
     */
    else if (kind === "time") {
      const [hours, minutes] =
        (
          text || "10:00"
        )
          .split(":")
          .map(Number);

      const total =
        (hours || 0) * 60 +
        (minutes || 0) +
        B * 60 +
        C;

      const safe =
        ((total % 1440) +
          1440) %
        1440;

      result.push([
        "Result time",
        `${String(
          Math.floor(
            safe / 60
          )
        ).padStart(2, "0")}:${String(
          safe % 60
        ).padStart(2, "0")}`,
      ]);
    }

    /*
     * Currency
     */
    else if (
      kind === "currency"
    ) {
      const target =
        text || "USD";

      const demoRates: Record<
        string,
        number
      > = {
        USD: 83,
        EUR: 90,
        GBP: 105,
        AED: 22.6,
        INR: 1,
      };

      const currency =
        target.toUpperCase();

      const rate =
        demoRates[currency] ||
        1;

      result.push(
        [
          `Approx. ${currency}`,
          (A / rate).toFixed(2),
        ],
        [
          "Note",
          "Uses starter/demo rates; connect a live FX provider for production.",
        ]
      );
    }

    return result;
  }, [
    a,
    b,
    c,
    date,
    text,
    kind,
  ]);

  /*
   * ----------------------------------------------------------
   * CALCULATOR LABELS
   * ----------------------------------------------------------
   */

  const labels: Record<
    string,
    string
  > = {
    percentage: "Percentage",
    salary: "Salary hike",
    emi: "Loan EMI",
    sip: "SIP",
    gst: "GST",
    tax: "Income tax",
    fd: "Fixed deposit",
    rd: "Recurring deposit",
    ppf: "PPF",
    nps: "NPS",
    gratuity: "Gratuity",
    hra: "HRA",
    epf: "EPF",
    compound: "Compound interest",
    inflation: "Inflation",
    bmi: "BMI",
    discount: "Discount",
    profit: "Profit & loss",
    eligibility: "Loan eligibility",
    age: "Age",
    date: "Date",
    time: "Time",
    currency: "Currency",
  };

  /*
   * ----------------------------------------------------------
   * UI
   * ----------------------------------------------------------
   */

  return (
    <div className="space-y-5">
      {/* INPUTS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <Field
            key={`${field.key}-${field.label}`}
            label={field.label}
            value={values[field.key]}
            type={field.type || "number"}
            onChange={(value: string) =>
              update(field.key, value)
            }
          />
        ))}
      </div>

      {/* RESULTS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.length > 0 ? (
          rows.map(
            ([label, value]) => (
              <ResultCard
                key={label}
                label={label}
                value={value}
              />
            )
          )
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            Enter your inputs above to
            see the result.
          </div>
        )}
      </div>

      {/* DISCLAIMER */}
      <p className="text-xs leading-6 text-slate-500">
        {labels[kind] ||
          "Calculator"}{" "}
        results are estimates for
        planning and should be checked
        against current official rules
        or professional advice where
        applicable.
      </p>
    </div>
  );
}