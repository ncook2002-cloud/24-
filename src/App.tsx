/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useRef, useState } from 'react';
import { MessageSquareText, Phone } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CourseFinderSection } from './components/CourseFinderSection';
import { ConciergeChatSection } from './components/ConciergeChatSection';
import { ReservationSection } from './components/ReservationSection';
import {
  ACADEMY_INFO,
  COURSE_MAP,
  RESERVE_COURSE_OPTIONS,
  RESERVE_TIME_OPTIONS,
  type CourseKey,
} from './data/academyData';

export default function App() {
  const [selectedCourseKey, setSelectedCourseKey] = useState<CourseKey>('basic');
  const [reserveCourse, setReserveCourse] = useState<string>(RESERVE_COURSE_OPTIONS[0]);
  const [reserveTime, setReserveTime] = useState<string>(RESERVE_TIME_OPTIONS[0]);
  const [reserveMemo, setReserveMemo] = useState<string>('');
  const [copiedRecently, setCopiedRecently] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [externalQuestionRequest, setExternalQuestionRequest] = useState<{
    id: number;
    text: string;
  } | null>(null);

  const toastTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleSelectCourse = (key: CourseKey) => {
    setSelectedCourseKey(key);
    setReserveCourse(COURSE_MAP[key].selectVal);
  };

  const handleAskCourseQuestion = (question: string) => {
    setExternalQuestionRequest({ id: Date.now(), text: question });
    const el = document.getElementById('concierge');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const previewText = useMemo(() => {
    const trimmedMemo = reserveMemo.trim();
    return [
      '[박문수천안요리학원 & 엔쿡 사전 상담 예약]',
      `• 희망 과정: ${reserveCourse}`,
      `• 희망 시간: ${reserveTime}`,
      trimmedMemo
        ? `• 추가 문의: ${trimmedMemo}`
        : '• 상담 요청: 방문/전화 상담 일정 확인 부탁드립니다.',
    ].join('\n');
  }, [reserveCourse, reserveTime, reserveMemo]);

  const handleCopyPreview = () => {
    navigator.clipboard
      ?.writeText(previewText)
      .then(() => {
        setCopiedRecently(true);
        showToast('예약 신청 메시지가 클립보드에 복사되었습니다.');
        if (copyTimerRef.current) {
          window.clearTimeout(copyTimerRef.current);
        }
        copyTimerRef.current = window.setTimeout(() => {
          setCopiedRecently(false);
        }, 2200);
      })
      .catch(() => {
        showToast('예약 문구를 직접 선택하여 복사하실 수 있습니다.');
      });
  };

  const handleSendSms = () => {
    navigator.clipboard?.writeText(previewText).catch(() => {});
    showToast(`문자 앱을 연결합니다 (원장 직통 ${ACADEMY_INFO.directorMobile})`);
    const encoded = encodeURIComponent(previewText);
    window.location.href = `sms:${ACADEMY_INFO.directorMobile}?body=${encoded}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-stone-900 pb-20 sm:pb-0">
      <TopBar />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-7 pb-12 space-y-6 sm:space-y-8 flex-1">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Course Curation & Academy Operating Principles */}
          <div className="lg:col-span-7">
            <CourseFinderSection
              selectedCourseKey={selectedCourseKey}
              onSelectCourse={handleSelectCourse}
              onAskCourseQuestion={handleAskCourseQuestion}
            />
          </div>

          {/* Right Column: 24H AI Concierge & 1:1 Reservation */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <ConciergeChatSection
              selectedCourseName={reserveCourse}
              externalQuestionRequest={externalQuestionRequest}
            />

            <ReservationSection
              reserveCourse={reserveCourse}
              onChangeReserveCourse={setReserveCourse}
              reserveTime={reserveTime}
              onChangeReserveTime={setReserveTime}
              reserveMemo={reserveMemo}
              onChangeReserveMemo={setReserveMemo}
              previewText={previewText}
              copiedRecently={copiedRecently}
              onCopyPreview={handleCopyPreview}
              onSendSms={handleSendSms}
            />
          </div>
        </div>
      </main>

      {/* Quiet Official Footer */}
      <footer className="border-t border-stone-200/90 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-bold text-stone-800">
              {ACADEMY_INFO.name} · {ACADEMY_INFO.region}
            </p>
            <p className="tabular-nums">
              정규 시간표: {ACADEMY_INFO.scheduleSummary} · 100% 사전 예약제 방문 상담
            </p>
          </div>
          <div className="text-center sm:text-right space-y-1 tabular-nums">
            <p>
              학원 직통:{' '}
              <a
                href={`tel:${ACADEMY_INFO.directTel}`}
                className="font-semibold text-stone-700 hover:text-[#143D2B] underline-offset-2 hover:underline"
              >
                {ACADEMY_INFO.directTel}
              </a>{' '}
              · 원장 예약 문자: {ACADEMY_INFO.directorMobile}
            </p>
            <p className="text-stone-400">
              © {new Date().getFullYear()} {ACADEMY_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile-Only Compact Fixed Bottom Action Bar (<= 8% mobile viewport height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleSendSms}
          className="min-h-[44px] rounded-xl bg-[#C86D2D] active:bg-[#A6551D] text-white font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <MessageSquareText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>예약 문자 전송</span>
        </button>
        <a
          href={`tel:${ACADEMY_INFO.directTel}`}
          className="min-h-[44px] rounded-xl bg-[#143D2B] active:bg-[#0D291D] text-white font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap tabular-nums"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>직통 전화 연결</span>
        </a>
      </div>

      {/* Accessible Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg animate-fade-in whitespace-nowrap max-w-[92vw] truncate"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
