export const maxDuration = 30;

const COURSE_CONTEXT = `당신은 독일어 초급 기말고사 퀴즈 출제자입니다. 아래 교재 내용(제4강~제9강)을 바탕으로 4지선다 객관식 50문제를 만들어주세요.

## 제4강 Part1: 인사말
- 시간대별: Guten Morgen!(아침~11시), Guten Tag!(11시~오후6시), Guten Abend!(오후6시 이후)
- 기타: Hallo!(가볍게), Grüß Gott!(남부 바이에른), Grüß dich!(남부), Servus!(남부, 만남+작별 공용), Grüezi!(스위스)
- 작별: Auf Wiedersehen!(격식), Tschüss!(비격식), Tschau!/Ciao!, Ade!(남부/스위스), Gute Nacht!(잠자리), Schlaf schön!
- 기타 작별: Bis bald!, Gute Reise!, Einen schönen Tag noch!, Danke gleichfalls!
- 만남(Kommen): Hallo, Guten Morgen, Grüß Gott, Grüezi / 작별(Gehen): Tschüss, Auf Wiedersehen, Gute Nacht, Ade
- du vs Sie: 노인/격식→Sie, 젊은 친구→du

## 제4강 Part2: 안부
- 격식: "Guten Tag, wie geht es Ihnen?" → "Danke, es geht mir gut. Und Ihnen?"
- 친칭: "Hallo, wie geht es dir?" / "Wie geht's?" → "Danke, mir geht es gut. Und dir?"
- gehen 변화: ich gehe, du gehst, Sie gehen, er/sie/es geht, wir gehen, ihr geht, sie gehen
- 3격 대명사: mir(나에게), dir(너에게), Ihnen(당신에게) / 4격: mich, dich, Sie
- 답변: Super! > Danke, sehr gut. > Gut, danke. > Auch gut. > Na ja, es geht. > Ach, nicht so gut. > Schlecht! > Sehr schlecht!
- gut ↔ schlecht
- Vielen Dank!(Dank 남성 4격→관습적 Vielen), Alles Gute!, Viel Glück!, Viel Erfolg!
- viel 불가산 명사 앞 어미변화 없음: viel Geld, viel Zeit

## 제5강: 이름 (heißen)
- 격식: Wie heißen Sie? / 친칭: Wie heißt du? → Ich heiße Claudia König.
- heißen 변화(어간 -ß): ich heiße, du heißt, er/sie/es heißt, wir heißen, ihr heißt, sie/Sie heißen
- "Wie heißt er?" → "Er heißt Peter." / "Wie heißt sie?" → "Sie heißt Erika."

## 제6강: 소개하기
- 자기소개: "Ich bin Minsu Kang." / "Freut mich, ich heiße Schneider."
- 격식: "Es freut mich, Sie kennenzulernen." → "Freut mich auch!" / "Angenehm!" / "Ganz meinerseits!"
- 친칭: "Es freut mich, dich kennenzulernen."
- 제3자: "Das ist Herr Schneider." / "Das ist Frau Meier."
- 비즈니스: Herr/Frau + 성 사용

## 제7강: 출신지
- W-Frage: wie, woher, wo, was, wer → 의문사 관련 내용 답변
- "Woher kommen Sie/kommst du?" → "Ich komme aus Korea." / "Ich bin aus Korea."
- kommen 변화: ich komme, du kommst, er/sie/es kommt, wir kommen, ihr kommt, Sie/sie kommen
- sein 변화(불규칙): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, Sie/sie sind
- Ja-/Nein-Frage: 동사 맨 앞 → "Kommen Sie aus Korea?" → "Ja/Nein..."
- 국가 관사: 대부분 중성(관사없음). 남성: der Irak, der Iran, der Sudan / 여성: die Schweiz, die Türkei, die Ukraine / 복수: die USA, die Niederlande
- aus+국가: aus Korea / aus der Schweiz(여성3격) / aus dem Irak(남성3격) / aus den USA(복수3격)
- 정관사: 1격 der/die/das/die, 2격 des/der/des/der, 3격 dem/der/dem/den, 4격 den/die/das/die
- 도시: Basel, Wien, Hamburg, Frankfurt, Bern, Leipzig, Köln, München, Zürich 등

## 제8강: 거주지
- "Wo wohnen Sie?" / "Wo wohnst du?" → "Ich wohne in Berlin." / "Ich wohne in der Goethestraße."
- wohnen 변화: ich wohne, du wohnst, er/sie/es wohnt, wir wohnen, ihr wohnt, Sie/sie wohnen
- 전치사: 출신=aus, 거주=in
- 거리명: -straße, -weg, -allee, -platz, -berg / die Einbahnstraße(일방통행로)
- 대문자 규칙: 명사·문장 첫글자·Sie 항상 대문자

## 제9강: 연락처/숫자
- 존칭: "Wie ist Ihre Telefonnummer/Handynummer?" / 친칭: "Wie ist deine ...?"
- 답변: "Meine Telefonnummer ist ..."
- 복합명사: 성은 뒤 명사 따름. die Telefonnummer(Telefon+Nummer), die Handynummer, der Deutschlehrer, die Großmutter
- 숫자 0~20: null,eins,zwei,drei,vier,fünf,sechs,sieben,acht,neun,zehn,elf,zwölf,dreizehn,vierzehn,fünfzehn,sechzehn(s탈락),siebzehn(en탈락),achtzehn,neunzehn,zwanzig
- 10단위: 30 dreißig(ß), 40 vierzig, 50 fünfzig, 60 sechzig, 70 siebzig, 80 achtzig, 90 neunzig, 100 (ein)hundert
- 21~99: 1의자리+und+10의자리 (23=dreiundzwanzig, 67=siebenundsechzig)
- 계산: "Zwölf plus sechzehn ist achtundzwanzig."
- 소유관사: ich→mein, du→dein, Sie→Ihr, er/es→sein, sie→ihr, wir→unser, ihr→euer, sie(복)→ihr
- 소유관사 변화 = 부정관사 어미와 동일`;

const USER_PROMPT = `위 교재 내용을 바탕으로 4지선다 객관식 50문제를 만들어주세요.

규칙:
- 챕터별 배분: 제4강 약 16문제, 제5강 6, 제6강 6, 제7강 8, 제8강 6, 제9강 8
- 난이도: 쉬움 40%, 보통 40%, 어려움 20%
- 유형: 뜻 맞추기, 빈칸 채우기, 인칭변화 고르기, 상황 표현 고르기, 문법 규칙 등
- 매번 새롭고 다양한 문제를 만들어주세요
- 오답 선택지도 그럴듯하게

반드시 아래 JSON 배열 형식으로만 응답하세요. 다른 텍스트·마크다운 없이 순수 JSON만:
[{"q":"문제","o":["A","B","C","D"],"a":정답인덱스,"ch":챕터번호}, ...]`;

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

    const questions = JSON.parse(clean);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid quiz format");
    }

    return Response.json({ questions });
  } catch (err) {
    console.error("Generate error:", err);
    return Response.json({ error: err.message || "퀴즈 생성 실패" }, { status: 500 });
  }
}
