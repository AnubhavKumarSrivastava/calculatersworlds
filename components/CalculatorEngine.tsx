"use client";
import {useState} from "react";import Field from "@/components/Field";import ResultCard from "@/components/ResultCard";
export default function CalculatorEngine({kind}:{kind:string}){const[a,setA]=useState("100000"),[b,setB]=useState("10"),[c,setC]=useState("20");let rows:[string,string][]=[];const A=+a||0,B=+b||0,C=+c||0;
if(kind==="percentage")rows=[["Percentage amount",(A*B/100).toLocaleString("en-IN")]];
else if(kind==="salary"){const n=A+A*B/100;rows=[["New annual salary",`₹${n.toLocaleString("en-IN")}`],["Annual increase",`₹${(n-A).toLocaleString("en-IN")}`]]}
else if(kind==="emi"){const r=B/1200,n=C*12,e=n?(r?A*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):A/n):0;rows=[["Monthly EMI",`₹${e.toLocaleString("en-IN")}`],["Total interest",`₹${Math.max(0,e*n-A).toLocaleString("en-IN")}`]]}
else if(kind==="sip"){const r=B/1200,n=C*12,v=r?A*((Math.pow(1+r,n)-1)/r)*(1+r):A*n;rows=[["Maturity",`₹${v.toLocaleString("en-IN")}`],["Gain",`₹${Math.max(0,v-A*n).toLocaleString("en-IN")}`]]}
else if(kind==="gst"){const g=A*B/100;rows=[["GST amount",`₹${g.toFixed(2)}`],["Invoice value",`₹${(A+g).toFixed(2)}`]]}
else if(kind==="fd"){const v=A*Math.pow(1+B/400,4*C);rows=[["Maturity",`₹${v.toLocaleString("en-IN")}`],["Interest",`₹${(v-A).toLocaleString("en-IN")}`]]}
else if(kind==="rd"){const r=B/400,n=C,v=r?A*((Math.pow(1+r,n)-1)/r)*(1+r):A*n;rows=[["Maturity",`₹${v.toLocaleString("en-IN")}`],["Deposited",`₹${(A*n).toLocaleString("en-IN")}`]]}
else if(kind==="gratuity")rows=[["Estimated gratuity",`₹${(A*15/26*Math.floor(B)).toLocaleString("en-IN")}`]];
else if(kind==="hra")rows=[["Estimated HRA exemption",`₹${Math.max(0,Math.min(B,25000-A*.1,A*.5)).toLocaleString("en-IN")}`]];
else if(kind==="epf"){const m=A*.12,n=B*12,r=.0825/12,v=m*((Math.pow(1+r,n)-1)/r)*(1+r);rows=[["Estimated EPF corpus",`₹${v.toLocaleString("en-IN")}`]]}
else if(kind==="ppf"){const v=A*(Math.pow(1+.071,B)-1)/.071*1.071;rows=[["Estimated PPF maturity",`₹${v.toLocaleString("en-IN")}`]]}
else if(kind==="nps"){const r=.1/12,n=B*12,v=A*((Math.pow(1+r,n)-1)/r)*(1+r);rows=[["Estimated NPS corpus",`₹${v.toLocaleString("en-IN")}`]]}
else if(kind==="compound"){const v=A*Math.pow(1+B/1200,12*C);rows=[["Final amount",`₹${v.toLocaleString("en-IN")}`],["Interest",`₹${(v-A).toLocaleString("en-IN")}`]]}
else if(kind==="inflation")rows=[["Future cost",`₹${(A*Math.pow(1+B/100,C)).toLocaleString("en-IN")}`]];
else if(kind==="bmi"){const v=A/Math.pow(B/100,2);rows=[["BMI",v.toFixed(1)],["Category",v<18.5?"Underweight":v<25?"Normal range":v<30?"Overweight":"Obesity range"]]}
else if(kind==="discount"){const s=A*B/100;rows=[["You save",`₹${s.toFixed(2)}`],["Final price",`₹${(A-s).toFixed(2)}`]]}
else if(kind==="profit"){const p=B-A;rows=[[p>=0?"Profit":"Loss",`₹${Math.abs(p).toFixed(2)}`],["Percentage",`${Math.abs(A?p/A*100:0).toFixed(2)}%`]]}
else if(kind==="currency")rows=[["Converted",`${(A/83).toFixed(2)} USD`]];
else if(kind==="age"){const d=new Date();const birth=new Date();birth.setFullYear(d.getFullYear()-30);rows=[["Approximate age",`${d.getFullYear()-birth.getFullYear()} years`]]}
else if(kind==="tax"){const t=Math.max(0,A-B);const tax=t<=400000?0:t<=800000?(t-400000)*.05:t<=1200000?20000+(t-800000)*.1:t<=1600000?60000+(t-1200000)*.15:t<=2000000?120000+(t-1600000)*.2:t<=2400000?200000+(t-2000000)*.25:300000+(t-2400000)*.3;rows=[["Taxable income",`₹${t.toLocaleString("en-IN")}`],["Illustrative tax",`₹${tax.toLocaleString("en-IN")}`]]}
else if(kind==="eligibility"){const r=B/1200,n=C*12,cap=Math.max(0,A)*.5,e=n?(r?cap*(1-Math.pow(1+r,-n))/r:cap*n):0;rows=[["Estimated loan",`₹${e.toLocaleString("en-IN")}`]]}
else if(kind==="date"){const d=new Date();d.setDate(d.getDate()+B);rows=[["Result date",d.toISOString().slice(0,10)]]}
else if(kind==="time"){const total=(600+(B*60)+C)%1440;rows=[["Result time",`${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`]];}
const labels:any={percentage:["Value","Percentage (%)"],salary:["Current salary (₹)","Hike (%)"],emi:["Loan amount (₹)","Interest (%)","Years"],sip:["Monthly SIP (₹)","Expected return (%)","Years"],gst:["Amount (₹)","GST rate (%)"],fd:["Deposit (₹)","Interest (%)","Years"],rd:["Monthly deposit (₹)","Interest (%)","Months"],gratuity:["Last drawn salary (₹)","Completed years"],hra:["Basic salary / month (₹)","HRA / month (₹)"],epf:["Basic salary / month (₹)","Years"],ppf:["Annual contribution (₹)","Years"],nps:["Monthly contribution (₹)","Years"],compound:["Principal (₹)","Annual rate (%)","Years"],inflation:["Current amount (₹)","Inflation (%)","Years"],bmi:["Weight (kg)","Height (cm)"],discount:["Original price (₹)","Discount (%)"],profit:["Cost price (₹)","Selling price (₹)"],currency:["Amount",""]};const l=labels[kind]||["Value",""];return <div className="space-y-5"><Field label={l[0]} value={a} onChange={setA}/>{l[1]&&<Field label={l[1]} value={b} onChange={setB}/>} {l[2]&&<Field label={l[2]} value={c} onChange={setC}/>}<div className="grid gap-4 sm:grid-cols-2">{rows.map(([x,y])=><ResultCard key={x} label={x} value={y}/>)}</div></div>}
