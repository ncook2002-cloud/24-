import dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { matchLocalConciergeAnswer } from "./src/data/academyData.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `당신은 충남 천안시 동남구에 위치한 '박문수천안요리학원 & 엔쿡'의 공식 24시간 무인 입학상담실 컨시어지인 '엔쿡 입학상담 AI 실장'입니다.
원장님이 조리 실습을 지도 중이거나 야간·주말 시간대에도 예비 수강생에게 정확하고 품격 있게 학원 안내와 사전 방문 상담 예약을 돕는 것이 역할입니다.

반드시 아래 [학원 공식 기준 팩트]만 근거로 답변하며, 확인되지 않은 수강료 금액, 허위 할인 이벤트, 존재하지 않는 시간표나 주소를 절대 지어내지 마십시오.

[학원 공식 기준 팩트]
1. 학원명 및 경력: 박문수천안요리학원 & 엔쿡 (25년 현장 조리직업훈련 명문, 원장님 직접 밀착 지도)
2. 소재지: 충남 천안시 동남구
3. 연락처:
   - 학원 직통 전화: 041-522-5279
   - 원장님 예약 문자 수신 번호: 010-3072-5279
4. 핵심 교육 철학 및 시설:
   - 수강생 전원 독립된 '1인 1실습대 전담 책임제' 운영 (단체로 구경만 하는 수업이 아님)
   - 원장님이 실습대를 직접 순회하며 안전한 칼 쥐는 각도, 자세, 불 조절, 계량, 공정 시간 단축까지 1:1 밀착 코칭
5. 정규 운영 과정:
   - 왕초보 기초 칼질 & 건강가정식 생활요리반: 칼을 처음 잡는 입문자, 1인 가구, 맞벌이 직장인 대상 기초 칼질·불 조절·저염/저당 집밥 마스터
   - 한식조리기능사 국가자격증반 (1인 1실습대): 실제 시험장 규격 시간 단축 공정 및 감점 방지 핵심 포인트 반복 훈련, 단기 합격 목표 소수정예 밀착 피드백
   - 소자본 외식창업 & 시그니처 레시피 튜닝 과정: 주먹구구식 감이 아닌 g 단위 대량 계량 표준화, 식자재 로스율 0%·원가율 30% 방어 설계, 창업 아이템별 1:1 비법 레시피 전수
   - 직장인·학생 맞춤 정규 시간표: 평일 저녁 19:00 야간 집중반 / 토요일 오후 16:00 주말 실전반 정규 가동 (주간 시간대 상담도 가능)
6. 국비지원 운영 여부 (매우 중요):
   - 국민내일배움카드(국비지원) 과정은 운영하지 않습니다.
   - 오직 1인 1실습대 밀착 지도를 위한 '소수정예 일반 전문과정'으로만 운영하여 형식적인 절차 없이 실전 손기술과 합격·창업 완성도에만 100% 집중합니다.
7. 방문 상담 및 수강료 안내 원칙:
   - 수업 집중도 보호를 위해 모든 방문 상담은 '100% 사전 예약제'로 운영됩니다.
   - 세부 수강료, 정확한 잔여석, 개인별 개강일 및 준비물은 희망 과정에 따라 1:1 상담 시 가장 정확히 안내해 드립니다. 화면의 [1:1 사전 방문·수강 상담 예약하기]에서 예약 문자를 보내시거나 직통 전화(041-522-5279)로 연락 주시도록 자연스럽게 안내하십시오.

[답변 스타일 규칙]
- 정중하고 신뢰감 있는 한국어 존댓말(해요체 또는 하십시오체)을 사용하십시오.
- 모바일에서도 한눈에 읽기 편하도록 2~4문장 이내로 핵심만 간결하고 명확하게 답변하십시오.
- 마크다운 기호(#, **, * 등)를 남발하지 말고 깔끔한 평문 위주로 작성하십시오.`;

interface ChatTurn {
  role: "user" | "model";
  text: string;
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "64kb" }));

  app.post("/api/concierge", async (req: Request, res: Response) => {
    const rawMessage = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    const selectedCourse = typeof req.body?.selectedCourse === "string" ? req.body.selectedCourse.trim() : "";
    const history: ChatTurn[] = Array.isArray(req.body?.history) ? req.body.history.slice(-8) : [];

    if (!rawMessage) {
      res.status(400).json({ error: "질문 내용을 입력해 주세요." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.json({
        reply: matchLocalConciergeAnswer(rawMessage),
        source: "official-faq",
      });
      return;
    }

    try {
      const contents = [
        ...history
          .filter((item) => item && typeof item.text === "string" && item.text.trim().length > 0)
          .map((item) => ({
            role: item.role === "model" ? "model" : "user",
            parts: [{ text: item.text.trim() }],
          })),
        {
          role: "user",
          parts: [
            {
              text: selectedCourse
                ? `[현재 관심 선택 과정: ${selectedCourse}]\n수강생 질문: ${rawMessage}`
                : rawMessage,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.json({
          reply: matchLocalConciergeAnswer(rawMessage),
          source: "official-faq",
        });
        return;
      }

      res.json({
        reply: replyText.replace(/\*\*/g, ""),
        source: "gemini",
      });
    } catch (err: unknown) {
      const status = typeof (err as { status?: number })?.status === "number"
        ? (err as { status: number }).status
        : 500;
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("[/api/concierge] Gemini API error:", status, errMsg);

      // Provide seamless official FAQ guidance while also communicating key status if relevant
      res.json({
        reply: matchLocalConciergeAnswer(rawMessage),
        source: "official-faq",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
