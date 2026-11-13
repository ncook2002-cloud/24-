import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { RotateCcw, Send } from 'lucide-react';
import {
  FAQ_ANSWERS,
  QUICK_QUESTIONS,
  matchLocalConciergeAnswer,
  type FaqKey,
} from '../data/academyData';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ConciergeChatSectionProps {
  selectedCourseName: string;
  externalQuestionRequest: { id: number; text: string } | null;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'welcome-msg',
  sender: 'bot',
  text: '반갑습니다! 박문수천안요리학원 & 엔쿡 24시 입학상담실입니다. 위 빠른 질문 버튼을 누르시거나 아래 입력창에 궁금한 점을 적어주시면 학원 공식 기준대로 즉시 안내해 드립니다.',
};

export function ConciergeChatSection({
  selectedCourseName,
  externalQuestionRequest,
}: ConciergeChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = useRef<HTMLDivElement | null>(null);
  const lastHandledExternalId = useRef<number | null>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const askFreeformQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const currentHistory = messages
      .filter((m) => m.id !== 'welcome-msg' && m.id !== 'reset-msg')
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          selectedCourse: selectedCourseName,
          history: currentHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim() || matchLocalConciergeAnswer(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: 'bot',
          text: matchLocalConciergeAnswer(trimmed),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      externalQuestionRequest &&
      externalQuestionRequest.id !== lastHandledExternalId.current
    ) {
      lastHandledExternalId.current = externalQuestionRequest.id;
      void askFreeformQuestion(externalQuestionRequest.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalQuestionRequest]);

  const handleQuickAsk = (key: FaqKey, questionLabel: string) => {
    if (isLoading) return;
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: `user-q-${now}`, sender: 'user', text: questionLabel },
      { id: `bot-a-${now}`, sender: 'bot', text: FAQ_ANSWERS[key] },
    ]);
  };

  const handleReset = () => {
    setIsLoading(false);
    setMessages([
      {
        id: 'reset-msg',
        sender: 'bot',
        text: '대화가 초기화되었습니다. 과정 추천, 시간표, 국비 여부, 방문 예약 등 궁금하신 내용을 편하게 물어보세요.',
      },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Prevent duplicate Enter submission during Korean IME character composition
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      void askFreeformQuestion(inputValue);
    }
  };

  return (
    <section
      id="concierge"
      className="scroll-mt-24 bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#C86D2D]">
            02. 24시 AI 무인 입학상담실
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
            궁금한 점을 바로 물어보세요
          </h2>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 min-h-[40px] px-2.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>대화 초기화</span>
        </button>
      </div>

      {/* Horizontal Quick Question Buttons */}
      <div
        aria-label="자주 묻는 입학 질문"
        className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
      >
        {QUICK_QUESTIONS.map((item) => (
          <button
            key={item.key}
            type="button"
            disabled={isLoading}
            onClick={() => handleQuickAsk(item.key, item.question)}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-[#143D2B] hover:text-white text-stone-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Messenger Conversation Area */}
      <div
        ref={chatLogRef}
        role="log"
        aria-live="polite"
        aria-label="입학상담 대화 내역"
        className="bg-[#F2F4F3] rounded-2xl p-4 space-y-3.5 h-72 sm:h-80 overflow-y-auto border border-stone-200/70"
      >
        {messages.map((msg) =>
          msg.sender === 'user' ? (
            <div key={msg.id} className="flex justify-end animate-fade-in">
              <div className="bg-[#143D2B] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs sm:text-sm max-w-[84%] leading-relaxed">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-2.5 animate-fade-in">
              <div
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center text-xs font-bold shrink-0"
              >
                엔쿡
              </div>
              <div className="space-y-1 max-w-[85%]">
                <span className="text-[11px] font-semibold text-stone-600 block">
                  엔쿡 입학상담 AI 실장
                </span>
                <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm text-stone-800 leading-relaxed border border-stone-200/70">
                  {msg.text}
                </div>
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex items-start gap-2.5 animate-fade-in">
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center text-xs font-bold shrink-0"
            >
              엔쿡
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-stone-600 block">
                엔쿡 입학상담 AI 실장
              </span>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-stone-500 border border-stone-200/70">
                학원 공식 안내 기준을 확인하여 답변 작성 중입니다...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Korean IME-Safe Input Bar */}
      <div className="flex gap-2">
        <label htmlFor="concierge-question-input" className="sr-only">
          상담 질문 입력
        </label>
        <input
          id="concierge-question-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 수강 방식이나 준비물이 궁금해요"
          disabled={isLoading}
          className="flex-1 min-w-0 min-h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#143D2B] focus:bg-white transition-colors disabled:opacity-60"
        />
        <button
          type="button"
          disabled={isLoading || !inputValue.trim()}
          onClick={() => void askFreeformQuestion(inputValue)}
          className="inline-flex items-center justify-center gap-1.5 min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl bg-[#143D2B] hover:bg-[#1B5139] disabled:bg-stone-300 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
        >
          <span>전송</span>
          <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
