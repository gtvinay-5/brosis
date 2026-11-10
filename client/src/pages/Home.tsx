import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Gift, Hand, Heart, Sparkles, Sun, Utensils, WandSparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
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
  const go = (direction: number) => navigate(pages[(pageIndex + direction + pages.length) % pages.length].path);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);
  return <div className="festival-app">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="petals petals-one">✦　✿　✦</div><div className="petals petals-two">✿　✦　✿</div>
    <header className="topbar">
      <Link href="/" className="brand-mark"><span className="brand-icon">ॐ</span><span><b>bhai</b> dooj<small>ek din, teen dil</small></span></Link>
      <nav className="page-nav" aria-label="Celebration pages">{pages.map((item, index) => <Link key={item.path} href={item.path} className={index === pageIndex ? "active" : ""}><i>{item.icon}</i><span>{item.label}</span></Link>)}</nav>
      <div className="progress-note">{current.eyebrow}<span className="progress-line"><b style={{ width: `${((pageIndex + 1) / pages.length) * 100}%` }} /></span></div>
    </header>
    <main className="page-stage" key={current.path}><div className="page-kicker"><span className="live-dot" />{title}<span className="kicker-line" /></div>{children}</main>
    <footer className="jump-footer"><button className="circle-btn" onClick={() => go(-1)} aria-label="Previous page"><ArrowLeft size={23} /></button><div className="jump-label">अगला सेक्शन <span>↘</span></div><button className="circle-btn filled" onClick={() => go(1)} aria-label="Next page"><ArrowRight size={23} /></button></footer>
  </div>;
}

function Welcome({ onNext }: { onNext: () => void }) { return <Shell pageIndex={0} title="a little digital celebration, made with love"><section className="hero-layout"><div className="hero-copy"><p className="overline">For my favourite people</p><h1>Teen behne.<br /><em>Ek dil.</em><br />Anant pyaar.</h1><p className="hero-sub">Is Bhai Dooj par ek chhoti si virtual mehfil — sirf <strong>Muskan Didi, Khushi Didi aur Khushbu Didi</strong> ke naam.</p><button className="primary-btn" onClick={onNext}>Celebration shuru karein <ArrowRight size={17} /></button><div className="mini-sign"><span className="signature-line" />tumhara bhai, hamesha</div></div><div className="hero-art"><div className="sun-disc"><span>शुभ<br />भाई<br />दूज</span></div><div className="diya large"><span /></div><div className="halo halo-a" /><div className="halo halo-b" /><div className="rangoli"><i>✺</i><i>❋</i><i>✺</i><i>❋</i></div><div className="hero-sticker">♥<small>love<br />you</small></div></div></section><div className="scroll-hint"><span />scroll / swipe to enter the mehfil</div></Shell>; }

function Mehfil({ onNext }: { onNext: () => void }) { return <Shell pageIndex={1} title="the people who make home feel like home"><section className="section-head"><div><p className="overline">Meri teen stars</p><h2>Har ek ke liye<br /><em>ek khaas dua.</em></h2></div><p className="section-intro">Aaj ki shaam in teen roshniyon ke naam — jinse meri duniya thodi aur sundar hai.</p></section><div className="sister-row">{sisters.map((s, i) => <article className="sister-card" key={s.name} style={{ "--accent": s.color } as React.CSSProperties}><div className="card-number">0{i + 1}</div><div className="portrait"><span>{s.name.split(" ")[0][0]}<sup>♥</sup></span></div><h3>{s.name}</h3><p>{s.note}</p><div className="card-foot"><span>meri dua</span><Heart size={15} fill="currentColor" /></div></article>)}</div><button className="text-btn" onClick={onNext}>Aarti ki roshni mein chalo <ArrowRight size={16} /></button></Shell>; }

function BrotherAvatar({ tilakApplied = false, fed = false }: { tilakApplied?: boolean; fed?: boolean }) { return <div className="brother-wrap"><div className="brother-photo"><div className="avatar-hair" /><div className="avatar-face"><span className="avatar-eye left" /><span className="avatar-eye right" /><span className="avatar-nose" /><span className="avatar-smile" />{tilakApplied && <span className="forehead-tilak" />}</div><div className="avatar-body"><span className="kurta-dot" /></div><div className={`mouth-target ${fed ? "fed" : ""}`}>{fed ? "♥" : ""}</div></div><span className="photo-caption">tumhara bhai<br /><b>always on duty</b></span></div>; }

function Aarti({ onNext }: { onNext: () => void }) {
  const [orbitAngle, setOrbitAngle] = useState(-Math.PI / 2);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngle, setStartAngle] = useState(-Math.PI / 2);
  const [aartiDone, setAartiDone] = useState(false);
  const [tilakReady, setTilakReady] = useState(false);
  const [tilakApplied, setTilakApplied] = useState(false);

  const beginRotate = (event: React.PointerEvent) => {
    setDragging(true);
    setStartX(event.clientX);
    setStartAngle(orbitAngle);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const rotate = (event: React.PointerEvent) => {
    if (!dragging) return;
    setOrbitAngle(startAngle + (event.clientX - startX) * 0.014);
  };
  const endRotate = () => {
    if (!dragging) return;
    setDragging(false);
    if (!aartiDone) {
      setAartiDone(true);
      setTilakReady(true);
      toast.success("Aarti ho gayi! Ab tika uthao aur bhai ke maathe par lagao.");
    }
  };
  const applyTilak = () => {
    if (!tilakReady || tilakApplied) return;
    setTilakApplied(true);
    toast.success("Tilak lag gaya — ab mithai khilao!");
  };
  const orbitX = Math.cos(orbitAngle) * 178;
  const orbitY = Math.sin(orbitAngle) * 112;
  const thaliStyle = { transform: `translate(${orbitX}px, ${orbitY}px) rotate(${orbitAngle * 57.3 + 90}deg)` };

  return <Shell pageIndex={2} title="haath se karo aarti, dil se lagao tika"><section className="interactive-head"><div><p className="overline">Ritual no. 01 · Hands-on</p><h2>Aarti bhi tum,<br /><em>tika bhi tum.</em></h2><p className="instruction-copy">Thali ko bhai ke chehre ke saamne gol-gol ghumao — bilkul asli Aarti ki tarah. Aarti complete hone ke baad tika uthao aur maathe par tap karo.</p></div><div className="step-badge"><span>{tilakApplied ? "03" : aartiDone ? "02" : "01"}</span><b>{tilakApplied ? "Tilak lag gaya" : aartiDone ? "Ab tika lagao" : "Aarti karo"}</b></div></section><div className="ritual-board"><div className="board-instruction"><Hand size={18} /><b>{!aartiDone ? "Thali ko bhai ke chehre ke saamne circle mein ghumao" : !tilakApplied ? "Pehle टीका uthao, phir bhai ke forehead par tap karo" : "Bahut badhiya! Ab mithai khilao"}</b><small>{!aartiDone ? "finger / mouse drag · circular Aarti" : !tilakApplied ? "2 taps complete the ritual" : "next step unlocked"}</small></div><BrotherAvatar tilakApplied={tilakApplied} /><div className="interactive-thali-area" onPointerMove={rotate} onPointerUp={endRotate} onPointerCancel={endRotate}><div className={`thali interactive-thali ${aartiDone ? "is-lit" : ""}`} style={thaliStyle} onPointerDown={beginRotate} role="button" aria-label="Drag thali in a circle around brother's face"><div className="thali-center"><div className="kumkum" /><div className="diya"><span /></div></div><div className="petal p1">✿</div><div className="petal p2">✦</div><div className="petal p3">✿</div><div className="petal p4">✦</div></div><div className={`tilak-tray ${tilakReady && !tilakApplied ? "ready" : ""}`} onClick={() => setTilakReady(true)} role="button" aria-label="Pick up tilak"><span className="tilak-dot" /> <b>टीका उठाओ</b><small>{tilakApplied ? "done" : "tap here"}</small></div><button className={`forehead-action ${tilakReady && !tilakApplied ? "ready" : ""}`} onClick={applyTilak} aria-label="Apply tilak to brother">{tilakApplied ? <Check size={17} /> : "माथे पर लगाओ"}</button></div></div><div className="ritual-progress"><span className={aartiDone ? "done" : ""}>01 <b>Aarti</b></span><i /><span className={tilakApplied ? "done" : ""}>02 <b>Tilak</b></span><i /><span>03 <b>Aashirwad</b></span></div>{tilakApplied && <button className="text-btn" onClick={onNext}>Mithai lekar aao <ArrowRight size={16} /></button>}</Shell>;
}

function Mithai({ onNext }: { onNext: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null); const [dragging, setDragging] = useState(false); const [fed, setFed] = useState(false); const [pos, setPos] = useState({ x: 105, y: 185 });
  const moveSweet = (event: React.PointerEvent) => { if (!dragging || fed || !stageRef.current) return; const box = stageRef.current.getBoundingClientRect(); setPos({ x: event.clientX - box.left - 32, y: event.clientY - box.top - 32 }); };
  const dropSweet = (event: React.PointerEvent) => { if (!dragging || !stageRef.current) return; setDragging(false); const box = stageRef.current.getBoundingClientRect(); const x = event.clientX - box.left; const y = event.clientY - box.top; if (x > box.width * .52 && y > 75 && y < 300) { setFed(true); toast.success("Mithai muh mein pahunch gayi — wah Didi!"); } else toast("Mithai ko bhai ke muh ke paas le jao 👆"); };
  return <Shell pageIndex={3} title="mithai ko paas le jao, bhai ko khilao"><section className="interactive-head"><div><p className="overline">Ritual no. 02 · Drag & feed</p><h2>Ab ek meetha<br /><em>sa moment.</em></h2><p className="instruction-copy">Mithai ko pakdo, bhai ke muh tak le jao. Sahi jagah pahunchte hi mithai gayab ho jayegi — matlab bhai ne kha li!</p></div><div className="step-badge"><span>{fed ? "✓" : "02"}</span><b>{fed ? "Mithai khila di" : "Mithai khilao"}</b></div></section><div className="feed-stage" ref={stageRef} onPointerMove={moveSweet} onPointerUp={dropSweet} onPointerCancel={() => setDragging(false)}><div className="feed-tip"><Hand size={17} /> Mithai ko drag karo →</div><BrotherAvatar fed={fed} /><div className={`drag-sweet ${dragging ? "being-dragged" : ""} ${fed ? "vanished" : ""}`} style={{ left: pos.x, top: pos.y }} onPointerDown={() => { setDragging(true); }}><span>●</span><b>लड्डू</b></div><div className="sweet-plate"><span>●</span><small>motichoor<br />ladoo</small></div>{fed && <div className="feed-success"><Sparkles size={19} /> Bahut pyaara! Mithai complete.</div>}</div><div className="mithai-banner"><span className="banner-ornament">✦</span><p>“Rishte bhi mithai jaise hote hain — jitna baanto, utne hi meethe lagte hain.”</p><span className="banner-ornament">✦</span></div>{fed && <button className="text-btn" onClick={onNext}>Ab bhai ke haath se tohfa lo <Gift size={16} /></button>}</Shell>;
}

function Gifts() { const [presented, setPresented] = useState(false); const [opened, setOpened] = useState<number[]>([]); const reveal = (i: number) => { setPresented(true); setOpened((current) => current.includes(i) ? current : [...current, i]); }; const allOpen = opened.length === sisters.length; return <Shell pageIndex={4} title="bhai ke haath se aaya hai tumhara tohfa"><section className="interactive-head"><div><p className="overline">Ritual no. 03 · Receive with love</p><h2>Tohfa aa raha hai,<br /><em>haath badhao.</em></h2><p className="instruction-copy">Neeche diye button par tap karo. Bhai ka haath tohfa lekar aayega. Phir apni gift box kholna.</p></div><div className="step-badge"><span>{allOpen ? "✓" : "03"}</span><b>{allOpen ? "Celebration complete" : "Gift lo"}</b></div></section><div className={`gift-delivery ${presented ? "delivered" : ""}`}><div className="gift-hand">🤲</div><div className="gift-box-hero"><div className="hero-ribbon" /><Gift size={40} /></div><button className="primary-btn receive-btn" onClick={() => { setPresented(true); toast("Bhai ke haath se gift aa gaya — ab apna naam wala box kholo!"); }}>{presented ? "Gift aa gaya ✓" : "Bhai se gift lo"}</button></div><div className="gift-row">{sisters.map((s, i) => <button key={s.name} className={`gift-card ${opened.includes(i) ? "opened" : ""} ${!presented ? "locked" : ""}`} style={{ "--accent": s.color } as React.CSSProperties} onClick={() => presented && reveal(i)}>{opened.includes(i) ? <div className="gift-reveal"><Sparkles size={22} /><b>{s.gift}</b><small>kyunki tum isse bhi zyada special ho</small></div> : <><div className="ribbon" /><Gift size={34} /><strong>{s.name}</strong><small>{presented ? "tap to open" : "pehle gift receive karo"}</small></>}</button>)}</div>{allOpen && <div className="final-blessing"><div className="blessing-icon"><WandSparkles size={22} /></div><div><p>To my forever favourite trio</p><h3>Happy Bhai Dooj, meri jaan didiyon.</h3><span>Muskan • Khushi • Khushbu — aap teenon ho toh ghar, ghar lagta hai.<br /><b className="vinay-signature">From your brother, Vinay</b></span></div><Link href="/" className="replay-link">Replay <span>↗</span></Link></div>}</Shell>; }

export default function Home() { const [location, navigate] = useLocation(); const pageIndex = useMemo(() => Math.max(0, pages.findIndex((p) => p.path === location)), [location]); const next = () => navigate(pages[(pageIndex + 1) % pages.length].path); if (pageIndex === 0) return <Welcome onNext={next} />; if (pageIndex === 1) return <Mehfil onNext={next} />; if (pageIndex === 2) return <Aarti onNext={next} />; if (pageIndex === 3) return <Mithai onNext={next} />; return <Gifts />; }
