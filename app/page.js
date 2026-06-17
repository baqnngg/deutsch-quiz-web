"use client";
import { useState, useCallback } from "react";

/* ─── Initial 50 questions (fallback / first load) ─── */
const INITIAL = [
  {q:"아침 11시 이전에 사용하는 독일어 인사말은?",o:["Guten Morgen!","Guten Tag!","Guten Abend!","Gute Nacht!"],a:0,ch:4},
  {q:"오후 6시 이후에 사용하는 인사말로 알맞은 것은?",o:["Guten Morgen!","Guten Tag!","Guten Abend!","Hallo!"],a:2,ch:4},
  {q:"남부 독일/바이에른 지방에서 주로 쓰는 인사말은?",o:["Hallo!","Grüß Gott!","Guten Tag!","Grüezi!"],a:1,ch:4},
  {q:"스위스에서 사용하는 인사말은?",o:["Grüß Gott!","Servus!","Grüezi!","Ade!"],a:2,ch:4},
  {q:"'안녕히 가세요/계세요'에 해당하는 격식 작별 인사는?",o:["Tschüss!","Auf Wiedersehen!","Ade!","Hallo!"],a:1,ch:4},
  {q:"잠자리에 들 때 하는 인사말은?",o:["Guten Abend!","Tschüss!","Gute Nacht!","Auf Wiedersehen!"],a:2,ch:4},
  {q:"만남과 작별 모두에 사용할 수 있는 남부 독일 인사말은?",o:["Hallo!","Servus!","Grüezi!","Tschüss!"],a:1,ch:4},
  {q:"'Schlaf schön!'의 의미는?",o:["좋은 하루!","잘 자!","안녕히 가세요!","좋은 여행!"],a:1,ch:4},
  {q:"상점에서 헤어질 때 '좋은 하루 되세요'는?",o:["Gute Reise!","Einen schönen Tag noch!","Bis bald!","Alles Gute!"],a:1,ch:4},
  {q:"'Danke, gleichfalls!'의 의미는?",o:["정말 감사합니다!","고맙습니다, 당신도요!","만나서 반갑습니다!","잘 가!"],a:1,ch:4},
  {q:"격식체로 '어떻게 지내세요?'는?",o:["Wie heißen Sie?","Wie geht es Ihnen?","Wie geht es dir?","Woher kommen Sie?"],a:1,ch:4},
  {q:"친구에게 안부를 물을 때 올바른 표현은?",o:["Wie geht es Ihnen?","Wie heißt du?","Wie geht es dir?","Wo wohnst du?"],a:2,ch:4},
  {q:"'Danke, es geht mir gut.'의 의미는?",o:["고마워, 잘 지내.","고마워, 안 좋아.","만나서 반가워.","이름이 뭐야?"],a:0,ch:4},
  {q:"안부에 대해 '별로 좋지 않다'고 답하려면?",o:["Super!","Gut, danke!","Ach, nicht so gut.","Sehr gut!"],a:2,ch:4},
  {q:"'Wie geht's?'에서 's는 무엇의 줄임?",o:["es","sie","das","dir"],a:0,ch:4},
  {q:"'Und Ihnen?'은 어떤 상황에서 사용하나요?",o:["친구에게 되물을 때","격식체로 되물을 때","이름을 물을 때","출신을 물을 때"],a:1,ch:4},
  {q:"'gut'의 반의어는?",o:["super","schlecht","genau","auch"],a:1,ch:4},
  {q:"'Vielen Dank!'에서 Vielen을 쓰는 이유는?",o:["주격이라서","Dank가 남성 4격이라 관용적으로","여성명사라서","복수형이라서"],a:1,ch:4},
  {q:"친구에게 '이름이 뭐야?'는?",o:["Wie heißen Sie?","Wie heißt du?","Wer bist du?","Wie geht es dir?"],a:1,ch:5},
  {q:"'heißen' 동사의 du 형태는?",o:["heißt","heiße","heißen","heißst"],a:0,ch:5},
  {q:"'heißen' 동사의 ich 형태는?",o:["heiße","heißt","heißen","heißst"],a:0,ch:5},
  {q:"'heißen' 동사의 er/sie/es 형태는?",o:["heiße","heißen","heißt","heißst"],a:2,ch:5},
  {q:"빈칸: 'Wie _____ Sie?' (격식으로 이름 묻기)",o:["heißt","heißen","heiße","heißst"],a:1,ch:5},
  {q:"'Ich heiße Claudia König.'의 의미는?",o:["나는 클라우디아 쾨니히입니다.","나는 클라우디아를 압니다.","이분은 클라우디아입니다.","클라우디아가 왔습니다."],a:0,ch:5},
  {q:"'만나서 반갑습니다 (격식)'를 독일어로?",o:["Freut mich auch!","Es freut mich, Sie kennenzulernen.","Hallo!","Ich bin Mike."],a:1,ch:6},
  {q:"친구 사이에서 '만나서 반갑다'는?",o:["Es freut mich, Sie kennenzulernen.","Es freut mich, dich kennenzulernen.","Auf Wiedersehen!","Wie geht es Ihnen?"],a:1,ch:6},
  {q:"'Das ist Herr Schneider.'의 의미는?",o:["슈나이더 씨는 여기 삽니다.","이분은 슈나이더 씨입니다.","슈나이더 씨 안녕하세요.","슈나이더 씨를 찾고 있습니다."],a:1,ch:6},
  {q:"제3자를 소개할 때 쓰는 기본 표현은?",o:["Ich heiße...","Das ist...","Ich komme aus...","Wie heißt..."],a:1,ch:6},
  {q:"'Ganz meinerseits!'의 의미는?",o:["천만에요!","저야말로 반갑습니다!","잘 지내요!","또 만나요!"],a:1,ch:6},
  {q:"비즈니스 상황에서 소개 시 성과 함께 쓰는 것은?",o:["du","Herr / Frau","ich","wir"],a:1,ch:6},
  {q:"출신을 물을 때 쓰는 의문사는?",o:["wo","woher","wie","was"],a:1,ch:7},
  {q:"'Woher kommst du?' — 'Ich komme ___ Korea.'",o:["in","aus","von","nach"],a:1,ch:7},
  {q:"'kommen' 동사의 du 형태는?",o:["komme","kommst","kommt","kommen"],a:1,ch:7},
  {q:"다음 중 여성 관사(die)를 쓰는 국가는?",o:["Iran","Irak","Schweiz","Sudan"],a:2,ch:7},
  {q:"'Ich komme aus ___ Türkei.' 빈칸에 알맞은 것은?",o:["dem","der","den","das"],a:1,ch:7},
  {q:"'Kommen Sie aus Korea?' — 'Nein, ich komme ___ aus Korea.'",o:["auch","nicht","sehr","ja"],a:1,ch:7},
  {q:"Ja-/Nein-Frage에서 동사의 위치는?",o:["문장 끝","문장 맨 앞","두 번째 위치","의문사 뒤"],a:1,ch:7},
  {q:"'sein' 동사의 ich 형태는?",o:["bist","bin","ist","sind"],a:1,ch:7},
  {q:"거주지를 물을 때: 'Wo _____ du?'",o:["wohnst","wohne","wohnt","wohnen"],a:0,ch:8},
  {q:"'wohnen' 동사의 er/sie/es 형태는?",o:["wohne","wohnst","wohnt","wohnen"],a:2,ch:8},
  {q:"거주지 답변: 'Ich wohne ___ Berlin.'",o:["aus","in","von","nach"],a:1,ch:8},
  {q:"출신은 '___', 거주는 '___' 전치사를 씁니다.",o:["in / aus","aus / in","von / nach","bei / mit"],a:1,ch:8},
  {q:"독일 거리명에서 '-straße'의 의미는?",o:["광장","길(거리)","가로수길","다리"],a:1,ch:8},
  {q:"'Ich wohne in ___ Goethestraße.' 빈칸에 알맞은 것은?",o:["dem","der","den","das"],a:1,ch:8},
  {q:"존칭으로 전화번호를 물을 때: 'Wie ist ___ Telefonnummer?'",o:["deine","Ihre","meine","seine"],a:1,ch:9},
  {q:"'die Telefonnummer'는 어떤 복합명사 조합인가?",o:["das Telefon + die Nummer","der Telefon + das Nummer","die Telefon + der Nummer","das Tele + die Fonnummer"],a:0,ch:9},
  {q:"독일어로 숫자 '17'은?",o:["sechzehn","siebzehn","achtzehn","fünfzehn"],a:1,ch:9},
  {q:"독일어 숫자 'dreiundzwanzig'는 몇인가?",o:["32","23","33","13"],a:1,ch:9},
  {q:"독일어로 '67'을 읽으면?",o:["sechsundsiebzig","siebenundsechzig","siebundsechzig","sechsundziebzig"],a:1,ch:9},
  {q:"소유관사 '나의'는 독일어로?",o:["dein","mein","sein","ihr"],a:1,ch:9},
];

const CH = {4:"제4강 인사말/안부",5:"제5강 이름",6:"제6강 소개하기",7:"제7강 출신지",8:"제8강 거주지",9:"제9강 연락처"};

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

export default function Page() {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongs, setWrongs] = useState([]);
  const [phase, setPhase] = useState("landing");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [genCount, setGenCount] = useState(0);

  const cur = questions[idx];

  const startWith = useCallback((qs) => {
    setQuestions(shuffle(qs));
    setIdx(0); setSel(null); setConfirmed(false);
    setScore(0); setWrongs([]); setPhase("quiz");
  }, []);

  const startDefault = () => startWith(INITIAL);

  const generate = async () => {
    setGenerating(true); setGenError("");
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("서버 응답 파싱 실패: " + text.slice(0, 100)); }
      if (data.error) throw new Error(data.error);
      if (!data.questions?.length) throw new Error("문제가 생성되지 않았습니다");
      setGenCount(c => c + 1);
      startWith(data.questions);
    } catch (e) {
      setGenError(e.message || "생성 실패");
    } finally {
      setGenerating(false);
    }
  };

  const confirm = () => {
    if (sel === null) return;
    setConfirmed(true);
    if (sel === cur.a) setScore(s => s + 1);
    else setWrongs(w => [...w, { ...cur, picked: sel }]);
  };

  const next = () => {
    if (idx + 1 >= questions.length) { setPhase("result"); return; }
    setIdx(i => i + 1); setSel(null); setConfirmed(false);
  };

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  if (phase === "landing") return (
    <div style={S.wrap}>
      <div style={S.center}>
        <div style={S.flagBar}><span style={S.flagB}/><span style={S.flagR}/><span style={S.flagY}/></div>
        <h1 style={S.heroTitle}>Deutsch Quiz</h1>
        <p style={S.heroSub}>기말고사 대비 · 제4강 ~ 제9강</p>
        <div style={S.chips}>{Object.values(CH).map(c=><span key={c} style={S.chip}>{c}</span>)}</div>
        <p style={S.heroInfo}>50문제 · 4지선다 객관식</p>
        <button style={S.btnW} onClick={startDefault}>기본 문제로 시작</button>
        <button style={{...S.btnA,opacity:generating?.6:1}} onClick={generate} disabled={generating}>
          {generating?"⏳ AI로 새 문제 생성 중...":"🤖 AI로 새 문제 생성하기"}
        </button>
        {genError && <p style={S.err}>{genError}</p>}
      </div>
    </div>
  );

  if (phase === "result") {
    const grade = pct>=90?"🏆 Ausgezeichnet!":pct>=70?"👍 Gut gemacht!":pct>=50?"📖 Noch üben!":"💪 Weiter so!";
    return (
      <div style={S.wrap}>
        <div style={S.center}>
          <p style={{fontSize:22,fontWeight:700,marginBottom:8}}>{grade}</p>
          <h2 style={{fontSize:64,fontWeight:900,letterSpacing:"-0.03em",margin:"8px 0"}}>{score}<span style={{fontSize:28,color:"#888",fontWeight:600}}>/{questions.length}</span></h2>
          <div style={{height:8,borderRadius:4,background:"#1a1a1a",margin:"20px auto",maxWidth:300}}>
            <div style={{height:"100%",borderRadius:4,width:`${pct}%`,background:pct>=70?"#22c55e":pct>=50?"#FFCE00":"#ef4444",transition:"width .5s"}}/>
          </div>
          <p style={{fontSize:18,fontWeight:600,color:"#888",marginBottom:32}}>{pct}%</p>
          {wrongs.length>0 && <button style={S.btnO} onClick={()=>setPhase("review")}>틀린 문제 보기 ({wrongs.length})</button>}
          <button style={{...S.btnW,marginTop:12}} onClick={startDefault}>다시 풀기</button>
          <button style={{...S.btnA,marginTop:12,opacity:generating?.6:1}} onClick={generate} disabled={generating}>
            {generating?"⏳ 새 문제 생성 중...":"🤖 퀴즈 다시 제작"}
          </button>
          {genError && <p style={S.err}>{genError}</p>}
          {genCount>0 && <p style={{marginTop:16,fontSize:12,color:"#FFCE00",opacity:.6}}>AI 생성 #{genCount}</p>}
        </div>
      </div>
    );
  }

  if (phase === "review") return (
    <div style={{...S.wrap,alignItems:"flex-start"}}>
      <div style={{maxWidth:520,width:"100%",paddingTop:20}}>
        <h2 style={{fontSize:24,fontWeight:800,marginBottom:20}}>오답 노트 <span style={{fontSize:16,color:"#ef4444"}}>{wrongs.length}문제</span></h2>
        {wrongs.map((w,i)=>(
          <div key={i} style={{padding:18,borderRadius:14,background:"#141414",border:"1px solid #222",marginBottom:14}}>
            <p style={{fontSize:15,fontWeight:600,lineHeight:1.5,marginBottom:10}}><span style={{color:"#ef4444",fontWeight:800,marginRight:8}}>Q{i+1}</span>{w.q}</p>
            <p style={{fontSize:14,color:"#ef4444",marginBottom:4,opacity:.8,textDecoration:"line-through"}}>✕ 내 답: {w.o[w.picked]}</p>
            <p style={{fontSize:14,color:"#22c55e",fontWeight:600}}>✓ 정답: {w.o[w.a]}</p>
            <span style={{display:"inline-block",marginTop:8,fontSize:11,color:"#555",padding:"3px 8px",borderRadius:6,background:"#1e1e1e"}}>{CH[w.ch]}</span>
          </div>
        ))}
        <div style={{display:"flex",flexDirection:"column",gap:12,paddingBottom:40,marginTop:8}}>
          <button style={S.btnW} onClick={startDefault}>다시 풀기</button>
          <button style={{...S.btnA,opacity:generating?.6:1}} onClick={generate} disabled={generating}>
            {generating?"⏳ 생성 중...":"🤖 퀴즈 다시 제작"}
          </button>
        </div>
      </div>
    </div>
  );

  /* ═══ QUIZ ═══ */
  const progress = ((idx+1)/questions.length)*100;
  return (
    <div style={{...S.wrap,alignItems:"flex-start"}}>
      <div style={{maxWidth:520,width:"100%",paddingTop:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:14,fontWeight:600,color:"#888"}}>{idx+1} / {questions.length}</span>
          <span style={{fontSize:14,fontWeight:700,color:"#22c55e"}}>✓ {score}</span>
        </div>
        <div style={{height:3,borderRadius:2,background:"#1a1a1a",marginBottom:14}}>
          <div style={{height:"100%",borderRadius:2,background:"#FFCE00",width:`${progress}%`,transition:"width .3s"}}/>
        </div>
        <div style={{marginBottom:4}}>
          {genCount>0 && <span style={{fontSize:11,color:"#FFCE00",background:"rgba(255,206,0,.12)",padding:"3px 8px",borderRadius:6,marginRight:8,fontWeight:600}}>AI #{genCount}</span>}
          <span style={{fontSize:12,color:"#555"}}>{CH[cur.ch]||`제${cur.ch}강`}</span>
        </div>
        <h2 style={{fontSize:20,fontWeight:700,lineHeight:1.55,margin:"16px 0 24px"}}>{cur.q}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {cur.o.map((opt,i)=>{
            let bg="#1a1a1a",border="2px solid transparent",color="#f0f0f0";
            if(confirmed){
              if(i===cur.a){bg="rgba(34,197,94,.12)";border="2px solid #22c55e";}
              else if(i===sel){bg="rgba(239,68,68,.12)";border="2px solid #ef4444";color="#fca5a5";}
            } else if(i===sel){bg="#1e1e1e";border="2px solid #666";}
            return (
              <button key={i} onClick={()=>!confirmed&&setSel(i)}
                style={{display:"flex",alignItems:"center",gap:14,padding:16,borderRadius:14,background:bg,border,color,fontSize:15,textAlign:"left",cursor:confirmed?"default":"pointer",width:"100%",transition:"all .15s"}}>
                <span style={{width:30,height:30,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,background:"rgba(255,255,255,.06)",flexShrink:0}}>{String.fromCharCode(65+i)}</span>
                <span style={{flex:1,lineHeight:1.45}}>{opt}</span>
                {confirmed&&i===cur.a&&<span style={{color:"#22c55e",fontWeight:800,fontSize:18}}>✓</span>}
                {confirmed&&i===sel&&i!==cur.a&&<span style={{color:"#ef4444",fontWeight:800,fontSize:18}}>✕</span>}
              </button>
            );
          })}
        </div>
        {!confirmed?(
          <button disabled={sel===null} onClick={confirm}
            style={{...S.btnW,marginTop:24,opacity:sel===null?.3:1}}>
            정답 확인
          </button>
        ):(
          <button onClick={next} style={{...S.btnW,marginTop:24}}>
            {idx+1>=questions.length?"결과 보기":"다음 문제 →"}
          </button>
        )}
      </div>
    </div>
  );
}

const S = {
  wrap:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",padding:"24px 16px"},
  center:{textAlign:"center",maxWidth:480,width:"100%"},
  flagBar:{display:"flex",gap:3,justifyContent:"center",marginBottom:32},
  flagB:{width:40,height:6,borderRadius:3,background:"#000"},
  flagR:{width:40,height:6,borderRadius:3,background:"#DD0000"},
  flagY:{width:40,height:6,borderRadius:3,background:"#FFCE00"},
  heroTitle:{fontSize:"clamp(42px,10vw,56px)",fontWeight:900,lineHeight:1.05,letterSpacing:"-0.03em",marginBottom:12},
  heroSub:{fontSize:16,color:"#888",marginBottom:24},
  chips:{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginBottom:28},
  chip:{fontSize:12,padding:"5px 12px",borderRadius:99,background:"#141414",border:"1px solid #222",color:"#888"},
  heroInfo:{fontSize:14,color:"#555",marginBottom:28},
  btnW:{display:"block",width:"100%",padding:16,fontSize:16,fontWeight:700,border:"none",borderRadius:14,background:"#fff",color:"#000",cursor:"pointer"},
  btnA:{display:"block",width:"100%",padding:16,fontSize:16,fontWeight:700,border:"2px solid #FFCE00",borderRadius:14,background:"rgba(255,206,0,.12)",color:"#FFCE00",marginTop:12,cursor:"pointer"},
  btnO:{width:"100%",padding:14,fontSize:15,fontWeight:600,border:"2px solid #222",borderRadius:14,background:"transparent",color:"#f0f0f0",cursor:"pointer"},
  err:{marginTop:12,fontSize:14,color:"#ef4444"},
};
