export type CourseKey = 'basic' | 'license' | 'startup' | 'schedule';

export type FaqKey = 'beginner' | 'time' | 'gukbi' | 'location' | 'startup';

export interface CourseInfo {
  key: CourseKey;
  index: string;
  shortTitle: string;
  subtitle: string;
  kicker: string;
  title: string;
  desc: string;
  point: string;
  highlights: string[];
  selectVal: string;
  sampleQuestion: string;
}

export interface QuickQuestion {
  key: FaqKey;
  label: string;
  question: string;
}

export const ACADEMY_INFO = {
  name: '박문수천안요리학원 & 엔쿡',
  region: '충남 천안시 동남구',
  directTel: '041-522-5279',
  directorMobile: '010-3072-5279',
  heroKicker: '25년 현장 조리직업훈련 명문 · 24시 스마트 입학상담실',
  scheduleSummary: '평일 19:00 야간반 · 토요일 16:00 주말반',
};

export const CORE_FACTS = [
  {
    label: '실습 환경',
    value: '1인 1실습대',
    detail: '수강생 전원 독립 배정 책임제',
  },
  {
    label: '평일 야간반',
    value: '19:00 집중반',
    detail: '직장인·학생 퇴근 후 정규 가동',
  },
  {
    label: '토요 주말반',
    value: '16:00 실전반',
    detail: '주말 오후 밀착 조리 훈련',
  },
  {
    label: '방문 상담',
    value: '100% 사전예약',
    detail: '수업 집중도 보호 1:1 전담 상담',
  },
];

export const COURSE_LIST: CourseInfo[] = [
  {
    key: 'basic',
    index: '01',
    shortTitle: '왕초보 기초 칼질·집밥',
    subtitle: '칼질이 서툰 입문자 · 건강가정식 생활요리',
    kicker: '입문자 1순위 추천 과정',
    title: '왕초보 기초 칼질 & 건강가정식 생활요리반',
    desc: '칼을 처음 잡아보시는 분도 안심하고 시작하실 수 있습니다. 25년 경력 원장님이 독립된 1인 1실습대 옆에서 안전한 칼 쥐는 자세부터 불 조절, 저염·저당 집밥 레시피까지 1:1 밀착 코칭으로 직접 잡아드립니다.',
    point: '추천 대상: 1인 가구 · 맞벌이 직장인 · 요리 기초부터 체계적으로 배우고 싶은 분',
    highlights: [
      '안전한 칼 쥐는 각도 및 식재료별 기본 썰기 규격 마스터',
      '불 조절 원리와 육수·양념 황금비율 기초 확립',
      '매일 차려 먹기 좋은 저염·저당 건강가정식 실전 조리',
    ],
    selectVal: '왕초보 기초 칼질·건강가정식반',
    sampleQuestion: '왕초보 기초 칼질·집밥반은 주 몇 회 수업으로 진행되나요?',
  },
  {
    key: 'license',
    index: '02',
    shortTitle: '한식조리기능사 자격증',
    subtitle: '1인 1실습대 책임제 · 국가기술자격 속성 대비',
    kicker: '국가기술자격 책임 지도',
    title: '한식조리기능사 국가자격증반 (1인 1실습대)',
    desc: '눈으로만 구경하는 단체 수업이 아니라 수강생 전원에게 독립된 1인 1실습대가 배정됩니다. 실제 국가자격 시험장 규격에 맞춘 시간 단축 공정과 감점 방지 핵심 포인트를 반복 훈련하여 단기 합격을 이끕니다.',
    point: '운영 특징: 비국비 소수정예 일반 전문과정 · 합격할 때까지 1:1 밀착 피드백',
    highlights: [
      '실제 시험장 동선과 동일한 독립 1인 1실습대 전 공정 완주',
      '과제별 제한시간 단축 타이밍 및 위생·규격 감점 요소 집중 교정',
      '원장님 직접 검수 및 부족한 품목 핀포인트 피드백',
    ],
    selectVal: '한식조리기능사 자격증반 (1인 1실습대)',
    sampleQuestion: '한식조리기능사 실기 시험 준비 기간과 준비물이 궁금합니다.',
  },
  {
    key: 'startup',
    index: '03',
    shortTitle: '외식창업·비법 레시피 전수',
    subtitle: '대량 계량 표준화 · 원가율 30% 방어 1:1 튜닝',
    kicker: '외식창업 1:1 비법 전수',
    title: '소자본 외식창업 & 시그니처 레시피 튜닝 과정',
    desc: '손감각에만 의존하는 주먹구구식 조리가 아닌 g 단위 계량 표준화와 식자재 로스율 0%·원가율 30% 방어 설계를 전수합니다. 창업 희망 업종과 상권에 맞춘 원장님 1:1 비법 레시피 튜닝 상담이 가능합니다.',
    point: '상담 방식: 100% 사전 예약제 원장님 직통 1:1 심층 상담 (041-522-5279)',
    highlights: [
      '업장 대량 조리용 g 단위 레시피 정량화 및 맛 편차 제로화',
      '식자재 로스율 최소화 및 목표 원가율 30% 이내 손익 설계',
      '주력 메뉴 구성 및 주방 화구·동선 효율화 1:1 코칭',
    ],
    selectVal: '외식창업·비법 레시피 1:1 전수반',
    sampleQuestion: '외식창업 1:1 레시피 전수 상담은 어떻게 진행되나요?',
  },
  {
    key: 'schedule',
    index: '04',
    shortTitle: '직장인 야간·주말반 안내',
    subtitle: '평일 19:00 야간반 · 토요일 16:00 주말 집중반',
    kicker: '직장인·학생 맞춤 정규 시간표',
    title: '평일 19:00 야간반 & 토요일 16:00 주말 집중반',
    desc: '낮 시간에 학원 방문이 어려운 직장인, 자영업자, 학생을 위해 평일 저녁 19:00 야간반과 토요일 오후 16:00 주말반이 정규 가동되고 있습니다. 퇴근 후와 주말을 활용한 밀도 높은 실습으로 실력을 완성합니다.',
    point: '정규 시간표: 평일 19:00 야간 집중반 · 토요일 16:00 주말 실전반',
    highlights: [
      '퇴근 후 여유 있게 합류 가능한 평일 저녁 19:00 정규 클래스',
      '평일 시간을 내기 어려운 분들을 위한 토요일 16:00 주말 집중반',
      '개별 진도 체크로 결석·보강 부담을 줄인 소수정예 코칭',
    ],
    selectVal: '직장인 야간반 (평일 19:00)',
    sampleQuestion: '평일 19시 야간반과 토요일 16시 주말반 잔여석 확인 방법을 알려주세요.',
  },
];

export const COURSE_MAP: Record<CourseKey, CourseInfo> = {
  basic: COURSE_LIST[0],
  license: COURSE_LIST[1],
  startup: COURSE_LIST[2],
  schedule: COURSE_LIST[3],
};

export const RESERVE_COURSE_OPTIONS = [
  '왕초보 기초 칼질·건강가정식반',
  '한식조리기능사 자격증반 (1인 1실습대)',
  '외식창업·비법 레시피 1:1 전수반',
  '직장인 야간반 (평일 19:00)',
  '토요 주말반 (토요일 16:00)',
];

export const RESERVE_TIME_OPTIONS = [
  '평일 오전 (10:00 ~ 12:00)',
  '평일 오후 (14:00 ~ 18:00)',
  '평일 야간 (19:00 이후)',
  '토요일 주말 (15:00 ~ 18:00)',
];

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    key: 'beginner',
    label: '왕초보 가능 여부',
    question: '완전 왕초보도 수업을 따라갈 수 있나요?',
  },
  {
    key: 'time',
    label: '야간·주말반 시간표',
    question: '직장인 야간반과 주말반 시간표가 궁금합니다.',
  },
  {
    key: 'gukbi',
    label: '국비지원 운영 여부',
    question: '국민내일배움카드 국비지원이 가능한가요?',
  },
  {
    key: 'location',
    label: '위치 및 사전예약 안내',
    question: '학원 위치와 방문 상담 예약 방법을 알려주세요.',
  },
  {
    key: 'startup',
    label: '외식창업 레시피 전수',
    question: '외식창업 비법 레시피 전수는 어떻게 진행되나요?',
  },
];

export const FAQ_ANSWERS: Record<FaqKey, string> = {
  beginner:
    '네, 칼질이 서툰 완전 왕초보자도 충분히 따라오실 수 있습니다. 수강생 전원에게 독립된 1인 1실습대가 배정되며, 25년 경력 원장님이 실습대를 순회하며 안전한 칼 쥔 각도부터 불 조절까지 1:1로 직접 잡아드립니다.',
  time:
    '직장인과 학생분들을 위해 평일 19:00 야간반과 토요일 16:00 주말반이 정규 운영되고 있습니다. 희망하시는 요일의 잔여석 확인은 예약 문자 전송이나 학원 직통(041-522-5279)으로 문의해 주시면 즉시 안내해 드립니다.',
  gukbi:
    '본원은 국민내일배움카드(국비지원) 과정은 운영하지 않으며, 1인 1실습대 밀착 지도를 위한 소수정예 일반 전문과정으로만 운영됩니다. 형식적인 출결 절차 없이 실전 손기술 습득과 자격증 합격에만 100% 집중합니다.',
  location:
    '박문수천안요리학원 & 엔쿡은 충남 천안시 동남구에 위치해 있습니다. 수업 집중도를 위해 방문 상담은 100% 사전 예약제로 진행되오니, 예약 문자 전송(010-3072-5279)이나 직통 전화(041-522-5279)로 연락 주시면 편하신 일정을 잡아드립니다.',
  startup:
    '감에 의존하는 조리가 아닌 g 단위 대량 계량 표준화와 식자재 로스율 0%·원가율 30% 방어 설계를 1:1로 전수합니다. 희망하시는 창업 메뉴에 맞춰 원장님 심층 사전예약 상담을 통해 맞춤 커리큘럼을 구성해 드립니다.',
};

export function matchLocalConciergeAnswer(query: string): string {
  const q = query.trim();
  if (q.includes('초보') || q.includes('칼질') || q.includes('기초') || q.includes('집밥')) {
    return FAQ_ANSWERS.beginner;
  }
  if (q.includes('시간') || q.includes('야간') || q.includes('주말') || q.includes('토요') || q.includes('직장')) {
    return FAQ_ANSWERS.time;
  }
  if (q.includes('국비') || q.includes('내일배움') || q.includes('카드') || q.includes('지원금')) {
    return FAQ_ANSWERS.gukbi;
  }
  if (q.includes('위치') || q.includes('어디') || q.includes('주소') || q.includes('동남구') || q.includes('방문') || q.includes('예약')) {
    return FAQ_ANSWERS.location;
  }
  if (q.includes('창업') || q.includes('레시피') || q.includes('원가') || q.includes('식당') || q.includes('업소')) {
    return FAQ_ANSWERS.startup;
  }
  if (q.includes('자격증') || q.includes('한식') || q.includes('기능사') || q.includes('실기')) {
    return COURSE_MAP.license.desc + ' 세부 개강일과 수강료는 예약 문자나 직통 전화(041-522-5279)로 문의해 주시면 정확히 안내해 드립니다.';
  }
  return '문의해 주신 과정별 수강료와 세부 개강 일정, 준비물 등은 수강 목적에 맞춰 1:1 상담 시 가장 정확하게 안내해 드리고 있습니다. 아래 사전 예약 문자 보내기(010-3072-5279) 또는 학원 직통 번호(041-522-5279)로 연락 주시면 원장님이 친절히 안내해 드리겠습니다.';
}
