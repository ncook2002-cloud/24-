import { Phone } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export function TopBar() {
  return (
    <header className="sm:sticky sm:top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean single-line brand wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143D2B]"
        >
          {ACADEMY_INFO.name}
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
        >
          <a
            href="#courses"
            className="hover:text-[#143D2B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            과정 큐레이션
          </a>
          <a
            href="#concierge"
            className="hover:text-[#143D2B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            24시 AI 상담
          </a>
          <a
            href="#reservation"
            className="hover:text-[#143D2B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            방문 상담 예약
          </a>
          <a
            href="#info"
            className="hover:text-[#143D2B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
          >
            운영 원칙·위치
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href={`tel:${ACADEMY_INFO.directTel}`}
            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-[#143D2B] hover:bg-[#1B5139] text-white text-xs sm:text-sm font-semibold tabular-nums transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143D2B]"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>직통 {ACADEMY_INFO.directTel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
