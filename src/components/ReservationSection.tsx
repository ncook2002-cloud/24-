import { Check, Copy, MessageSquareText, Phone } from 'lucide-react';
import {
  ACADEMY_INFO,
  RESERVE_COURSE_OPTIONS,
  RESERVE_TIME_OPTIONS,
} from '../data/academyData';

interface ReservationSectionProps {
  reserveCourse: string;
  onChangeReserveCourse: (val: string) => void;
  reserveTime: string;
  onChangeReserveTime: (val: string) => void;
  reserveMemo: string;
  onChangeReserveMemo: (val: string) => void;
  previewText: string;
  copiedRecently: boolean;
  onCopyPreview: () => void;
  onSendSms: () => void;
}

export function ReservationSection({
  reserveCourse,
  onChangeReserveCourse,
  reserveTime,
  onChangeReserveTime,
  reserveMemo,
  onChangeReserveMemo,
  previewText,
  copiedRecently,
  onCopyPreview,
  onSendSms,
}: ReservationSectionProps) {
  return (
    <section
      id="reservation"
      className="scroll-mt-24 bg-white border border-[#143D2B]/30 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm"
    >
      <div>
        <p className="text-xs font-semibold text-[#C86D2D]">
          03. 원스톱 사전 방문·수강 예약
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
          1:1 사전 방문·수강 상담 예약하기
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          희망 과정과 시간대를 고르시면 원장님께 바로 보낼 예약 문자가 완성됩니다.
        </p>
      </div>

      <div className="space-y-3.5">
        <div>
          <label
            htmlFor="reserve-course-select"
            className="block text-xs font-semibold text-stone-700 mb-1.5"
          >
            1. 희망 교육 과정
          </label>
          <select
            id="reserve-course-select"
            value={reserveCourse}
            onChange={(e) => onChangeReserveCourse(e.target.value)}
            className="w-full min-h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-900 focus:outline-none focus:border-[#143D2B] focus:bg-white transition-colors"
          >
            {RESERVE_COURSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reserve-time-select"
            className="block text-xs font-semibold text-stone-700 mb-1.5"
          >
            2. 상담 희망 시간대
          </label>
          <select
            id="reserve-time-select"
            value={reserveTime}
            onChange={(e) => onChangeReserveTime(e.target.value)}
            className="w-full min-h-[46px] bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-900 tabular-nums focus:outline-none focus:border-[#143D2B] focus:bg-white transition-colors"
          >
            {RESERVE_TIME_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reserve-memo-input"
            className="block text-xs font-semibold text-stone-700 mb-1.5"
          >
            3. 희망 요일 또는 간단 문의 메모 <span className="font-normal text-stone-400">(선택)</span>
          </label>
          <input
            id="reserve-memo-input"
            type="text"
            maxLength={80}
            value={reserveMemo}
            onChange={(e) => onChangeReserveMemo(e.target.value)}
            placeholder="예: 이번 주 목요일 저녁 방문 희망합니다"
            className="w-full min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#143D2B] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Auto-generated SMS Preview (clean subtle surface, no nested thick borders) */}
      <div className="bg-[#FAF8F5] rounded-2xl p-4 space-y-2 border border-stone-200/80">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#143D2B]">
            자동 완성된 예약 메시지 · 개인정보 서버 저장 없음
          </span>
          <button
            type="button"
            onClick={onCopyPreview}
            className="inline-flex items-center gap-1 min-h-[36px] px-2.5 rounded-lg text-xs font-semibold text-[#C86D2D] hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0"
          >
            {copiedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>내용 복사</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed font-medium tabular-nums">
          {previewText}
        </p>
      </div>

      {/* Conversion Actions */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onSendSms}
          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#C86D2D] hover:bg-[#B25E23] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
        >
          <MessageSquareText className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>원장님 핸드폰으로 예약 문자 보내기</span>
        </button>

        <a
          href={`tel:${ACADEMY_INFO.directTel}`}
          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#143D2B] hover:bg-[#1B5139] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap tabular-nums"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>학원 직통 전화 연결 ({ACADEMY_INFO.directTel})</span>
        </a>
      </div>
    </section>
  );
}
