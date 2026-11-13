import { useState } from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import heroStudioImg from '../assets/images/hero_culinary_studio_1794533825004.jpg';
import { ACADEMY_INFO, CORE_FACTS } from '../data/academyData';

export function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="space-y-4">
      {/* 2-Column Balanced Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        {/* Left: Primary Concierge Proposition */}
        <div className="lg:col-span-7 rounded-3xl bg-[#143D2B] text-white p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-emerald-200/90 font-medium tracking-wide">
              <span>{ACADEMY_INFO.region}</span>
              <span aria-hidden="true">·</span>
              <span>25년 현장 조리직업훈련 명문</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">24시 무인 입학상담실</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold leading-[1.3] tracking-tight text-balance">
              원장님이 실습 지도 중인 밤·주말에도{' '}
              <span className="text-amber-300">1분 만에 맞춤 과정과 방문 예약</span>을 돕습니다.
            </h1>

            <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-2xl">
              수강생 전원에게 배정되는 독립된 <strong className="font-semibold text-white">1인 1실습대 전담 책임제</strong>로
              기초 칼질부터 한식조리기능사 국가자격증, 외식창업 비법 레시피까지 빈틈없이 코칭합니다.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
            <a
              href="#reservation"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#C86D2D] hover:bg-[#B55F22] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <span>1:1 방문·수강 상담 예약하기</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href="#courses"
              className="inline-flex items-center min-h-[44px] px-2 text-sm font-medium text-emerald-100 hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              10초 맞춤 과정 찾기
            </a>
          </div>
        </div>

        {/* Right: Authentic 1-Person-1-Station Studio Visual */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-stone-200/80 bg-[#1B4332] min-h-[220px] sm:min-h-[270px]">
          {!imgFailed ? (
            <img
              src={heroStudioImg}
              alt="박문수천안요리학원 & 엔쿡의 독립 배정된 1인 1실습대 스테인리스 조리 교육 시설"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#143D2B] to-[#0D291D] text-emerald-100">
              <UtensilsCrossed className="w-10 h-10 text-amber-300 mb-3" aria-hidden="true" />
              <p className="text-base font-bold text-white">독립 1인 1실습대 전담 교육장</p>
              <p className="text-xs text-emerald-200/80 mt-1">칼질 각도부터 화력 조절까지 원장 1:1 밀착 코칭</p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
            <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              전 수강생 독립 1인 1실습대 배정 · 소수정예 실전 훈련
            </p>
            <p className="text-xs text-stone-200/90 mt-0.5 tabular-nums">
              {ACADEMY_INFO.scheduleSummary} 정규 가동
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Core Fact Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-white border border-stone-200/90 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80 overflow-hidden">
        {CORE_FACTS.map((fact) => (
          <div key={fact.label} className="p-4 sm:px-5 sm:py-4 flex flex-col justify-center">
            <span className="text-xs font-medium text-stone-500">{fact.label}</span>
            <span className="text-base sm:text-lg font-bold text-stone-900 mt-0.5 tabular-nums">
              {fact.value}
            </span>
            <span className="text-xs text-stone-500 mt-0.5">{fact.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
