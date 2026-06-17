export const runtime = "edge";

const COURSE_CONTEXT = `독일어 초급 기말고사 퀴즈 출제자. 제4강~제9강 기반 4지선다 50문제 생성.

##4강 인사말/안부
만남: Guten Morgen(~11시)/Tag(11~18시)/Abend(18시~), Hallo, Grüß Gott(바이에른), Grüß dich, Servus(만남+작별), Grüezi(스위스)
작별: Auf Wiedersehen(격식), Tschüss, Tschau/Ciao, Ade(남부), Gute Nacht(잠자리), Schlaf schön, Bis bald, Gute Reise, Einen schönen Tag noch, Danke gleichfalls
안부 격식: "Wie geht es Ihnen?"→"Danke, es geht mir gut. Und Ihnen?"
안부 친칭: "Wie geht es dir?"/"Wie geht's?"→"Mir geht es gut. Und dir?"
gehen변화: gehe/gehst/geht/gehen/geht/gehen
3격: mir/dir/Ihnen, 4격: mich/dich/Sie
답변: Super>Sehr gut>Gut, danke>Auch gut>Na ja, es geht>Nicht so gut>Schlecht
gut↔schlecht, Vielen Dank(Dank 남성4격→Vielen), Alles Gute, Viel Glück/Erfolg, viel+불가산명사=어미변화없음

##5강 이름(heißen)
Wie heißen Sie?(격식)/Wie heißt du?(친칭)→Ich heiße...
heißen: heiße/heißt/heißt/heißen/heißt/heißen (어간-ß→du에서 s생략)

##6강 소개
자기: Ich bin.../Freut mich, ich heiße...
격식: Es freut mich, Sie kennenzulernen→Freut mich auch/Angenehm/Ganz meinerseits
친칭: Es freut mich, dich kennenzulernen
제3자: Das ist Herr/Frau... (비즈니스=Herr/Frau+성)

##7강 출신지
W-Frage: woher/wo/wie/was/wer
Woher kommen Sie/kommst du?→Ich komme aus Korea/Ich bin aus Korea
kommen: komme/kommst/kommt/kommen/kommt/kommen
sein(불규칙): bin/bist/ist/sind/seid/sind
Ja-Nein-Frage: 동사맨앞 "Kommen Sie aus Korea?"→Ja.../Nein, nicht...
국가관사: 대부분 중성(무관사). 남성:der Irak/Iran/Sudan, 여성:die Schweiz/Türkei/Ukraine, 복수:die USA/Niederlande
aus+3격: aus Korea/aus der Schweiz/aus dem Irak/aus den USA
정관사: 1격der/die/das/die, 3격dem/der/dem/den, 4격den/die/das/die

##8강 거주지
Wo wohnen Sie/wohnst du?→Ich wohne in Berlin/in der Goethestraße
wohnen: wohne/wohnst/wohnt/wohnen/wohnt/wohnen
출신=aus, 거주=in
거리명: -straße/-weg/-allee/-platz/-berg, die Einbahnstraße
대문자: 명사·문장첫글자·Sie

##9강 연락처/숫자
Wie ist Ihre/deine Telefonnummer?→Meine Telefonnummer ist...
복합명사: 성=뒤명사따름. Telefonnummer(Telefon+Nummer), Handynummer, Deutschlehrer, Großmutter
0~12: null,eins,zwei,drei,vier,fünf,sechs,sieben,acht,neun,zehn,elf,zwölf
13~19: dreizehn~neunzehn (16:sechzehn=s탈락, 17:siebzehn=en탈락)
10단위: 20zwanzig,30dreißig(ß!),40vierzig,50fünfzig,60sechzig,70siebzig,80achtzig,90neunzig,100(ein)hundert
21~99: 1의자리+und+10의자리 (23=dreiundzwanzig, 67=siebenundsechzig)
계산: plus/ist (Zwölf plus sechzehn ist achtundzwanzig)
소유관사: mein/dein/Ihr(존칭)/sein/ihr/unser/euer/ihr(복수) 변화=부정관사어미동일`;

const USER_PROMPT = `위 내용 기반 4지선다 30문제. 챕터별: 4강10,5강4,6강3,7강5,8강4,9강4. 다양한 유형. JSON만 출력:
[{"q":"문제","o":["A","B","C","D"],"a":정답인덱스0~3,"ch":챕터4~9}]`;

export async function POST() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const MODEL = "gemini-2.5-flash";
  const url = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent?key=" + apiKey;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: COURSE_CONTEXT + "\n\n" + USER_PROMPT }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                q:  { type: "string" },
                o:  { type: "array", items: { type: "string" } },
                a:  { type: "integer" },
                ch: { type: "integer" },
              },
              required: ["q", "o", "a", "ch"],
            },
          },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      let msg = res.status + " " + res.statusText;
      try {
        const errJson = JSON.parse(errText);
        msg = errJson?.error?.message || msg;
      } catch {
        if (errText) msg = errText.slice(0, 200);
      }
      console.error("Gemini API error:", msg);
      return Response.json({ error: msg }, { status: 500 });
    }

    const rawText = await res.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("Gemini returned non-JSON:", rawText.slice(0, 300));
      return Response.json({ error: "Gemini이 JSON이 아닌 응답을 반환했습니다" }, { status: 500 });
    }

    if (data.candidates?.[0]?.finishReason === "SAFETY") {
      return Response.json({ error: "Safety filter triggered, try again" }, { status: 500 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error("Unexpected Gemini response:", JSON.stringify(data).slice(0, 500));
      throw new Error("Empty response");
    }

    // Strip markdown fences and find JSON array
    let clean = text.replace(/```json\s*|```\s*/g, "").trim();
    const startIdx = clean.indexOf("[");
    const endIdx = clean.lastIndexOf("]");
    if (startIdx !== -1 && endIdx !== -1) {
      clean = clean.slice(startIdx, endIdx + 1);
    }

    let questions;
    try {
      questions = JSON.parse(clean);
    } catch (parseErr) {
      // Attempt repair: fix trailing commas, unescaped quotes in strings
      let repaired = clean
        .replace(/,\s*([}\]])/g, "$1")           // trailing commas
        .replace(/([^\\])\\(?!["\\/bfnrtu])/g, "$1\\\\") // bad escapes
        .replace(/\n/g, "\\n");                   // literal newlines in strings
      try {
        questions = JSON.parse(repaired);
      } catch {
        console.error("JSON parse failed. First 500 chars:", clean.slice(0, 500));
        throw new Error("JSON 파싱 실패 (position " + parseErr.message.match(/position (\d+)/)?.[1] + ")");
      }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid quiz format");
    }

    return Response.json({ questions });
  } catch (err) {
    console.error("Generate error:", err);
    return Response.json({ error: err.message || "퀴즈 생성 실패" }, { status: 500 });
  }
}
