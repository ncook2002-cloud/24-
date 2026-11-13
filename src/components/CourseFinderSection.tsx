import { ArrowRight, Check, MessageSquare, PhoneCall } from 'lucide-react';
import {
  ACADEMY_INFO,
  COURSE_LIST,
  COURSE_MAP,
  type CourseKey,
} from '../data/academyData';

interface CourseFinderSectionProps {
  selectedCourseKey: CourseKey;
  onSelectCourse: (key: CourseKey) => void;
  onAskCourseQuestion: (question: string) => void;
}

export function CourseFinderSection({
  selectedCourseKey,
  onSelectCourse,
  onAskCourseQuestion,
}: CourseFinderSectionProps) {
  const activeCourse = COURSE_MAP[selectedCourseKey];

  return (
    <div className="space-y-6">
      {/* STEP 01: Course Finder */}
      <section
        id="courses"
        className="scroll-mt-24 bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-7 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-[#C86D2D]">
              01. 맞춤 교육 과정 큐레이션
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
              어떤 요리를 배우고 싶으신가요?
            </h2>
          </div>
          <p className="text-xs text-stone-500">
            선택 즉시 예약 양식에 자동 연동됩니다
          </p>
        </div>

        {/* Interactive Course Selector Grid */}
        <div
          role="radiogroup"
          aria-label="희망 교육 과정 선택"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {COURSE_LIST.map((course) => {
            const isSelected = course.key === selectedCourseKey;
            return (
              <button
                key={course.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectCourse(course.key)}
                className={`group text-left p-4 sm:p-4.5 rounded-2xl border transition-colors min-h-[76px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143D2B] ${
                  isSelected
                    ? 'bg-[#F4F7F5] border-[#143D2B] text-stone-900'
                    : 'bg-stone-50/80 border-stone-200/80 hover:border-stone-400 hover:bg-stone-50 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isSelected ? 'text-[#143D2B]' : 'text-stone-900 group-hover:text-[#143D2B]'
                    }`}
                  >
                    <span className="tabular-nums text-xs font-semibold text-stone-400 mr-1.5">
                      {course.index}.
                    </span>
                    {course.shortTitle}
                  </span>
                  {isSelected ? (
                    <Check className="w-4 h-4 text-[#143D2B] shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowRight
                      className="w-4 h-4 text-stone-400 group-hover:text-[#143D2B] shrink-0 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                  {course.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Course Detail Report (separated cleanly with hairline divider, no card-in-card nesting) */}
        <div
          key={activeCourse.key}
          className="pt-6 border-t border-stone-200/80 space-y-4 animate-fade-in"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#143D2B] font-semibold">
              <span>{activeCourse.kicker}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500 font-medium">1인 1실습대 전담 코칭</span>
            </div>
            <span className="text-[#143D2B] font-medium">
              사전 예약 과정명에 자동 반영됨
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {activeCourse.title}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {activeCourse.desc}
            </p>
          </div>

          <ul className="space-y-1.5 pt-1">
            {activeCourse.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs sm:text-sm text-stone-700"
              >
                <span className="text-[#143D2B] font-bold select-none" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs sm:text-sm font-semibold text-[#C86D2D] pt-1">
            {activeCourse.point}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <a
              href="#reservation"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#143D2B] hover:bg-[#1B5139] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <span>이 과정으로 방문 상담 예약</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onAskCourseQuestion(activeCourse.sampleQuestion)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-300 hover:border-[#143D2B] bg-white text-stone-800 hover:text-[#143D2B] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>AI 실장에게 이 과정 물어보기</span>
            </button>
          </div>
        </div>
      </section>

      {/* Proof & Official Academy Operating Principles */}
      <section
        id="info"
        className="scroll-mt-24 bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-7 space-y-5"
      >
        <div>
          <p className="text-xs font-semibold text-[#C86D2D]">
            학원 운영 원칙 및 방문 안내
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
            형식적인 단체 진도 대신 실전 손기술 완성에 집중합니다
          </h2>
        </div>

        <div className="divide-y divide-stone-200/80 text-sm">
          <div className="py-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="w-36 shrink-0 font-semibold text-stone-900">
              1인 1실습대 책임제
            </span>
            <p className="text-stone-600 leading-relaxed">
              조별 견학식 수업이 아닌 수강생 전원 독립 실습대에서 재료 손질부터 조리 완성까지 전 공정을 직접 수행합니다.
            </p>
          </div>

          <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="w-36 shrink-0 font-semibold text-stone-900">
              비국비 전문과정 운영
            </span>
            <p className="text-stone-600 leading-relaxed">
              국민내일배움카드(국비지원) 과정은 운영하지 않으며, 오직 소수정예 일반 전문과정으로만 밀도 높게 지도합니다.
            </p>
          </div>

          <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="w-36 shrink-0 font-semibold text-stone-900">
              야간·주말 정규 시간표
            </span>
            <p className="text-stone-600 leading-relaxed tabular-nums">
              바쁜 직장인과 학생을 위해 <strong>평일 19:00 야간반</strong> 및 <strong>토요일 16:00 주말 집중반</strong>이 정규 운영됩니다.
            </p>
          </div>

          <div className="py-3.5 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="w-36 shrink-0 font-semibold text-stone-900">
              위치 및 100% 사전예약
            </span>
            <div className="space-y-1.5 text-stone-600 leading-relaxed">
              <p className="tabular-nums">
                {ACADEMY_INFO.region} 소재 · 수업 집중도 보호를 위해 방문 상담은 100% 사전 예약제로 운영됩니다.
              </p>
              <p className="text-xs text-stone-500 tabular-nums flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex items-center gap-1 text-stone-700 font-semibold">
                  <PhoneCall className="w-3.5 h-3.5 text-[#143D2B]" aria-hidden="true" />
                  학원 직통 {ACADEMY_INFO.directTel}
                </span>
                <span aria-hidden="true">·</span>
                <span>원장 예약 문자 {ACADEMY_INFO.directorMobile}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
