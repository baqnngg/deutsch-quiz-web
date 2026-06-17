# 🇩🇪 Deutsch Quiz — 독일어 기말고사 대비

제4강~제9강 범위 50문제 퀴즈 앱.  
🤖 **Gemini AI**가 매번 새로운 문제를 생성합니다. (무료!)

## 배포 방법 (Vercel)

### 1단계: API 키 발급 (무료)
👉 [Google AI Studio](https://aistudio.google.com/apikey) 접속 → API 키 생성

### 2단계: GitHub에 올리기
```bash
git init
git add .
git commit -m "deutsch quiz"
git remote add origin https://github.com/너의아이디/deutsch-quiz.git
git push -u origin main
```

### 3단계: Vercel에서 배포
1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub 레포 선택
3. **Environment Variables** 추가:
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSy...` (1단계에서 발급받은 키)
4. **Deploy** 클릭 → 끝!

## 로컬에서 실행
```bash
cp .env.example .env.local
# .env.local에 API 키 입력
npm install
npm run dev
```
