import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, Gift, Heart, Sparkles, Star, Sun, Utensils, WandSparkles } from "lucide-react";
import { toast } from "sonner";

type Page = { path: string; label: string; eyebrow: string; icon: string };
const pages: Page[] = [
  { path: "/", label: "Swagat", eyebrow: "01 / 05", icon: "ॐ" },
  { path: "/mehfil", label: "Teen Behne", eyebrow: "02 / 05", icon: "✦" },
  { path: "/aarti", label: "Aarti", eyebrow: "03 / 05", icon: "दीप" },
  { path: "/mithai", label: "Mithai", eyebrow: "04 / 05", icon: "◒" },
  { path: "/tohfa", label: "Tohfa", eyebrow: "05 / 05", icon: "उपहार" },
];
const sisters = [
  { name: "Muskan Didi", color: "#ffb66e", note: "jinki muskaan se ghar roshan hai", gift: "Ek surprise gift hamper" },
  { name: "Khushi Didi", color: "#f99bab", note: "jinke pyaar se har pal khaas hai", gift: "Khushiyon se bhara gift box" },
  { name: "Khushbu Didi", color: "#c6a4ff", note: "jinki yaadein hamesha mehakti hain", gift: "Dil se chuna hua tohfa" },
];

function Shell({ children, pageIndex, title }: { children: React.ReactNode; pageIndex: number; title: string }) {
  const [, navigate] = useLocation();
  const current = pages[pageIndex];
  const go = (direction: number) => {
    const next = (pageIndex + direction + pages.length) % pages.length;
    navigate(pages[next].path);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);
  return (
    <div className="festival-app">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="petals petals-one">✦　✿　✦</div><div className="petals petals-two">✿　✦　✿</div>
      <header className="topbar">
        <Link href="/" className="brand-mark"><span className="brand-icon">ॐ</span><span><b>bhai</b> dooj<small>ek din, teen dil</small></span></Link>
        <nav className="page-nav" aria-label="Celebration pages">
          {pages.map((item, index) => <Link key={item.path} href={item.path} className={index === pageIndex ? "active" : ""}><i>{item.icon}</i><span>{item.label}</span></Link>)}
        </nav>
        <div className="progress-note">{current.eyebrow}<span className="progress-line"><b style={{ width: `${((pageIndex + 1) / pages.length) * 100}%` }} /></span></div>
      </header>
      <main className="page-stage" key={current.path}>
        <div className="page-kicker"><span className="live-dot" />{title}<span className="kicker-line" /></div>
        {children}
      </main>
      <footer className="jump-footer">
        <button className="circle-btn" onClick={() => go(-1)} aria-label="Previous page"><ArrowLeft size={18} /></button>
        <div className="jump-label">अगला सेक्शन <span>↘</span></div>
        <button className="circle-btn filled" onClick={() => go(1)} aria-label="Next page"><ArrowRight size={18} /></button>
      </footer>
    </div>
  );
}

function Welcome({ onNext }: { onNext: () => void }) {
  return <Shell pageIndex={0} title="a little digital celebration, made with love"><section className="hero-layout">
    <div className="hero-copy"><p className="overline">For my favourite people</p><h1>Teen behne.<br /><em>Ek dil.</em><br />Anant pyaar.</h1><p className="hero-sub">Is Bhai Dooj par ek chhoti si virtual mehfil — sirf <strong>Muskan Didi, Khushi Didi aur Khushbu Didi</strong> ke naam.</p><button className="primary-btn" onClick={onNext}>Celebration shuru karein <ArrowRight size={17} /></button><div className="mini-sign"><span className="signature-line" />tumhara bhai, hamesha</div></div>
    <div className="hero-art"><div className="sun-disc"><span>शुभ<br />भाई<br />दूज</span></div><div className="diya large"><span /></div><div className="halo halo-a" /><div className="halo halo-b" /><div className="rangoli"><i>✺</i><i>❋</i><i>✺</i><i>❋</i></div><div className="hero-sticker">♥<small>love<br />you</small></div></div>
  </section><div className="scroll-hint"><span />scroll / swipe to enter the mehfil</div></Shell>;
}

function Mehfil({ onNext }: { onNext: () => void }) {
  return <Shell pageIndex={1} title="the people who make home feel like home"><section className="section-head"><div><p className="overline">Meri teen stars</p><h2>Har ek ke liye<br /><em>ek khaas dua.</em></h2></div><p className="section-intro">Aaj ki shaam in teen roshniyon ke naam — jinse meri duniya thodi aur sundar hai.</p></section><div className="sister-row">{sisters.map((s, i) => <article className="sister-card" key={s.name} style={{ "--accent": s.color } as React.CSSProperties}><div className="card-number">0{i + 1}</div><div className="portrait"><span>{s.name.split(" ")[0][0]}<sup>♥</sup></span></div><h3>{s.name}</h3><p>{s.note}</p><div className="card-foot"><span>meri dua</span><Heart size={15} fill="currentColor" /></div></article>)}</div><button className="text-btn" onClick={onNext}>Aarti ki roshni mein chalo <ArrowRight size={16} /></button></Shell>;
}

function Aarti({ onNext }: { onNext: () => void }) {
  const [lit, setLit] = useState(false);
  return <Shell pageIndex={2} title="aarti, tilak aur dher saara aashirwad"><section className="aarti-layout"><div className="aarti-copy"><p className="overline">Ritual no. 01</p><h2>Aaj meri aarti<br /><em>main khud karunga.</em></h2><p>Thali ready hai. Diya jal raha hai. Bas tum teenon ke liye dil se nikli ek dua baaki hai.</p><div className="wish-strip"><span>ॐ</span><div><b>“Sada khush raho, sada muskurao.”</b><small>— bhai ki taraf se</small></div></div><button className="primary-btn" onClick={() => { setLit(true); toast.success("Aarti complete — teenon didiyon ke naam ek roshni ✨"); }}>{lit ? <><Check size={17} /> Aarti ho gayi!</> : <><Sun size={17} /> Diya jalao</>}</button></div><div className={`thali-scene ${lit ? "is-lit" : ""}`}><div className="thali"><div className="thali-center"><div className="kumkum" /><div className="diya"><span /></div></div><div className="petal p1">✿</div><div className="petal p2">✦</div><div className="petal p3">✿</div><div className="petal p4">✦</div></div><div className="aarti-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div></section><div className="ritual-progress"><span className={lit ? "done" : ""}>01 <b>Aarti</b></span><i /><span>02 <b>Tilak</b></span><i /><span>03 <b>Aashirwad</b></span></div>{lit && <button className="text-btn" onClick={onNext}>Ab mithai ki baari <ArrowRight size={16} /></button>}</Shell>;
}

function Mithai({ onNext }: { onNext: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const sweets = [{ name: "Kaju katli", icon: "◆", tone: "silver" }, { name: "Motichoor ladoo", icon: "●", tone: "gold" }, { name: "Gulab jamun", icon: "●", tone: "rose" }];
  return <Shell pageIndex={3} title="mithaas jo screen se bhi mehsoos ho"><section className="section-head mithai-head"><div><p className="overline">Ritual no. 02</p><h2>Ek bite mere liye,<br /><em>baaki sab tumhare.</em></h2></div><div className="mithai-note"><Utensils size={18} /><span>pick a mithai<br /><b>aur celebration complete karo</b></span></div></section><div className="sweet-row">{sweets.map((sweet) => <button key={sweet.name} className={`sweet-card ${sweet.tone} ${picked === sweet.name ? "picked" : ""}`} onClick={() => { setPicked(sweet.name); toast(`Yum! ${sweet.name} tumhare liye 💛`); }}><span className="sweet-orb">{sweet.icon}</span><strong>{sweet.name}</strong><small>{picked === sweet.name ? "tumhari pasand ♥" : "tap to choose"}</small></button>)}</div><div className="mithai-banner"><span className="banner-ornament">✦</span><p>“Rishte bhi mithai jaise hote hain — jitna baanto, utne hi meethe lagte hain.”</p><span className="banner-ornament">✦</span></div><button className="text-btn" onClick={onNext}>Ab tohfa kholte hain <Gift size={16} /></button></Shell>;
}

function Gifts() {
  const [opened, setOpened] = useState<number[]>([]);
  const reveal = (i: number) => setOpened((current) => current.includes(i) ? current : [...current, i]);
  const allOpen = opened.length === sisters.length;
  return <Shell pageIndex={4} title="because the best gifts are the ones with a story"><section className="section-head"><div><p className="overline">Ritual no. 03</p><h2>Chhote se gifts,<br /><em>bahut bada pyaar.</em></h2></div><p className="section-intro">Har gift ke andar ek chhoti si wish hai. Tap karke apna tohfa kholna, Didi.</p></section><div className="gift-row">{sisters.map((s, i) => <button key={s.name} className={`gift-card ${opened.includes(i) ? "opened" : ""}`} style={{ "--accent": s.color } as React.CSSProperties} onClick={() => reveal(i)}>{opened.includes(i) ? <><div className="gift-reveal"><Sparkles size={22} /><b>{s.gift}</b><small>kyunki tum isse bhi zyada special ho</small></div></> : <><div className="ribbon" /><Gift size={34} /><strong>{s.name}</strong><small>tap to open</small></>}</button>)}</div>{allOpen && <div className="final-blessing"><div className="blessing-icon"><WandSparkles size={22} /></div><div><p>To my forever favourite trio</p><h3>Happy Bhai Dooj, meri jaan didiyon.</h3><span>Muskan • Khushi • Khushbu — aap teenon ho toh ghar, ghar lagta hai.</span></div><Link href="/" className="replay-link">Replay <span>↗</span></Link></div>}</Shell>;
}

export default function Home() {
  const [location, navigate] = useLocation();
  const pageIndex = useMemo(() => Math.max(0, pages.findIndex((p) => p.path === location)), [location]);
  const next = () => navigate(pages[(pageIndex + 1) % pages.length].path);
  if (pageIndex === 0) return <Welcome onNext={next} />;
  if (pageIndex === 1) return <Mehfil onNext={next} />;
  if (pageIndex === 2) return <Aarti onNext={next} />;
  if (pageIndex === 3) return <Mithai onNext={next} />;
  return <Gifts />;
}
