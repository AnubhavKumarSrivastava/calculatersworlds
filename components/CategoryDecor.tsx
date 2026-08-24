export default function CategoryDecor({category}:{category:"calculators"|"finance"|"dev"|"seo"|"files"}){
 const data={
  calculators:{label:"CALCULATOR MODE",icons:"＋ － × ÷ ＝ % √ ∑",className:"calc-decor"},
  finance:{label:"FINANCE MODE",icons:"₹ 〽︎ ₿ % + − ×",className:"finance-decor"},
  dev:{label:"DEVELOPER MODE",icons:"{ } </> [] (); => #",className:"dev-decor"},
  seo:{label:"SEO MODE",icons:"⌕ # ↑ ✓ <meta> /sitemap",className:"seo-decor"},
  files:{label:"FILE LAB",icons:"PDF JPG PNG WEBP ⇩ ⤴ ✦",className:"files-decor"}
 }[category];
 return <div aria-hidden className={`category-decor ${data.className}`}><div className="decor-orb"/><div className="decor-grid"/><div className="decor-symbols">{data.icons.split(" ").map((x,i)=><span key={i} style={{animationDelay:`${i*.35}s`}}>{x}</span>)}</div><div className="decor-label">{data.label}</div></div>
}
