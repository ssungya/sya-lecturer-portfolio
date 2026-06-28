"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface LectureHistory {
  year: string;
  client: string;
  category: "ai" | "communication" | "leadership" | "cs";
  theme: string;
}

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "communication" | "leadership" | "cs">("all");
  
  // Mouse tracking state for Aurora Trail effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    subject: "생성형 AI & 업무 효율화",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = "dynamic_sya@naver.com";
  const phone = "010-4056-3636";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      console.error("이메일 복사 실패:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    if (!formData.clientName || !formData.phone || !formData.email || !formData.message) {
      alert("문의 내용을 모두 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/dynamic_sya@naver.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "신청자/기관명": formData.clientName,
          "연락처": formData.phone,
          "이메일": formData.email,
          "문의 분야": formData.subject,
          "상세 문의 내용": formData.message,
          "_subject": `[한국인력경영개발원] 새로운 강의 문의가 접수되었습니다 (${formData.clientName}님)`,
          "_template": "table" // Send beautiful table in the email
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("메일 전송에 실패했습니다.");
      }
    } catch (err) {
      console.error("이메일 전송 오류:", err);
      alert("문의 전송 도중 에러가 발생했습니다. 대표 메일(dynamic_sya@naver.com)로 직접 문의 남겨주시면 감사하겠습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      clientName: "",
      phone: "",
      email: "",
      subject: "생성형 AI & 업무 효율화",
      message: ""
    });
    setIsSubmitted(false);
  };

  // Full lecture history database parsed from the PDF
  const lectureData: LectureHistory[] = [
    // AI/디지털/업무효율화 (ai)
    { year: "2026", client: "국립세종도서관", category: "ai", theme: "스마트폰 기반 AI행정혁신 (4회)" },
    { year: "2026", client: "제주더큰내일센터", category: "ai", theme: "노션활용한 자기주도 성장계획수립" },
    { year: "2026", client: "산청군청", category: "ai", theme: "신규공무원 생성형 AI활용 업무스킬업" },
    { year: "2026", client: "창원 중장년내일센터", category: "ai", theme: "AI활용 스마트한 일상" },
    { year: "2026", client: "음성군", category: "ai", theme: "생성형AI베이직과정 원데이" },
    { year: "2026", client: "대구과학대학교", category: "ai", theme: "교수님을 위한 AI교수학습법 (2회)" },
    { year: "2026", client: "경남행복내일센터", category: "ai", theme: "중장년 구직활용을 위한 AI활용법" },
    { year: "2026", client: "청주대학교", category: "ai", theme: "노션을 활용한 업무 효율화 TA" },
    { year: "2025", client: "대한상공회의소", category: "ai", theme: "AI로 완성하는 기획보고서 및 데이터수집 (3회)" },
    { year: "2025", client: "대구과학대학교", category: "ai", theme: "대학생을 위한 AI학습법 (2회)" },
    { year: "2025", client: "경남행복내일센터", category: "ai", theme: "AI활용 구직역량강화 교육 (5회)" },
    { year: "2025", client: "대전일자리경제진흥원", category: "ai", theme: "AI면접의 이해와 활용" },
    { year: "2025", client: "율곡연수원", category: "ai", theme: "노션활용 업무효율화 (2025, 2026)" },
    { year: "2025", client: "제주국제자유도시개발센터", category: "ai", theme: "AI활용 보고서작성 (4회)" },
    { year: "2025", client: "제주국제자유도시개발센터", category: "ai", theme: "AI활용 디자인 스킬업 (3회)" },
    { year: "2025", client: "경남정보대학교", category: "ai", theme: "지혜로운 AI 학습활용법" },
    { year: "2025", client: "경희대학교 국제캠퍼스", category: "ai", theme: "노션활용 업무효율화" },
    { year: "2025", client: "제주국제자유도시개발센터", category: "ai", theme: "AI활용 업무효율화 보고서 및 PPT" },
    { year: "2025", client: "소상공인연합회 디지털교육센터", category: "ai", theme: "AI활용 경영컨설팅 및 매출향상전략" },
    { year: "2025", client: "화학물질안전원", category: "ai", theme: "AI활용 업무 효율화 (2회)" },
    { year: "2025", client: "공정거래위원회", category: "ai", theme: "생성형AI활용 업무 효율화 (6회)" },
    { year: "2025", client: "환경부", category: "ai", theme: "환경실무전문인력 AI리터러시 향상 교육" },
    { year: "2025", client: "대전서구 평생학습원", category: "ai", theme: "챗GPT실전활용 평생교육 기획부터 홍보까지" },
    { year: "2025", client: "대전신용보증재단", category: "ai", theme: "챗GPT업무활용교육" },
    { year: "2025", client: "국립세종도서관", category: "ai", theme: "세종공직자 대상 일잘러의 AI활용 (2회)" },
    { year: "2025", client: "의회 (울릉군/창원/부산사상구)", category: "ai", theme: "챗GPT활용 의정업무 교육지원" },
    { year: "2025", client: "경남경영자총협회", category: "ai", theme: "청년도전지원사업 청년을 위한 AI활용" },
    { year: "2025", client: "충남도립대학교", category: "ai", theme: "AI이해와 활용" },
  
    // 소통/MBTI/스피치 (communication)
    { year: "2023-26", client: "한국보건복지인재원", category: "communication", theme: "근무현장에서 효과적인 대화법 (50회)" },
    { year: "2023-26", client: "경남경영자총협회", category: "communication", theme: "청년도전지원사업 소통교육" },
    { year: "2026", client: "한국장애인고용공단", category: "communication", theme: "근로지원인 교육강사 양성과정" },
    { year: "2026", client: "대전충남 CTO포럼", category: "communication", theme: "CEO를 위한 스피치" },
    { year: "2025", client: "기획재정부", category: "communication", theme: "인사실무자 워크샵 - MBTI활용 소통역량강화" },
    { year: "2025", client: "양산시청", category: "communication", theme: "직원업무능률향상워크숍 - MBTI활용 의사소통 향상" },
    { year: "2025", client: "대전 동구청", category: "communication", theme: "노사 합동 워크샵 - 갈등관리" },
    { year: "2025", client: "㈜잡스", category: "communication", theme: "청년을 위한 사회적커뮤니케이션" },
    { year: "2025", client: "대전세종연구원", category: "communication", theme: "MBTI활용 조직소통 교육" },
    { year: "2025", client: "골프존", category: "communication", theme: "MBTI활용 조직소통 교육" },
    { year: "2024", client: "뷰리프성형외과", category: "communication", theme: "조직내 소통과 서비스교육" },
    { year: "2024", client: "국민건강보험공단", category: "communication", theme: "6급 직원내소통교육 및 MBTI소통" },
    { year: "2024", client: "국민건강보험공단", category: "communication", theme: "전달력을 높이는 스피치" },
    { year: "2024", client: "한국남부발전 하동발전본부", category: "communication", theme: "MBTI 조직내소통" },
    { year: "2024", client: "삼성전자", category: "communication", theme: "임직원 비즈니스 매너와 조직내 소통" },
    { year: "2024", client: "군위군 창업아카데미", category: "communication", theme: "IR스피치" },
    { year: "2023", client: "경남대", category: "communication", theme: "학생홍보대사 의전매너 및 스피치" },
    { year: "2023", client: "경북여성정책개발원", category: "communication", theme: "MBTI교육" },
    { year: "2023", client: "경북 프라이드 기업", category: "communication", theme: "조직내 소통교육" },
    { year: "2021-22", client: "한밭대학교", category: "communication", theme: "일학습병행 NCS 대인관계능력 8주 교육" },
    { year: "2021-22", client: "경남경총", category: "communication", theme: "재직자 경력관리" },
    { year: "2019", client: "미디어 크리에이터", category: "communication", theme: "미디어 스피치 교육" },
  
    // 리더십/조직관리/기획/퍼실리테이션 (leadership)
    { year: "2026", client: "중소벤처기업진흥공단", category: "leadership", theme: "기업금융부서 가치공감 워크샵 팀빌딩" },
    { year: "2026", client: "대전시청", category: "leadership", theme: "신규직원 힐링 워크샵 팀빌딩 및 조직 커뮤니케이션" },
    { year: "2026", client: "충남도청", category: "leadership", theme: "육아휴직복지자 대상 마음건강 챙기기" },
    { year: "2026", client: "대전 유성구청", category: "leadership", theme: "6급 리더십 역량강화 교육 팀장소통 리더십" },
    { year: "2026", client: "대전 자치경찰위원회", category: "leadership", theme: "스트레스 회복 특강" },
    { year: "2025", client: "제주도청", category: "leadership", theme: "정책 정책 퍼실리테이션" },
    { year: "2025", client: "해병대", category: "leadership", theme: "온택트 교육 - 심리이해소통리더십, 조직관리리더십 (8회)" },
    { year: "2025", client: "AI사관학교", category: "leadership", theme: "프로일잘러 프로젝트" },
    { year: "2025", client: "대전대덕구청", category: "leadership", theme: "6급 팀장리더십 역량강화교육 연차별 리더십 교육" },
    { year: "2025", client: "대전서구청", category: "leadership", theme: "신규직원 온보딩 팀빌딩" },
    { year: "2025", client: "중소벤처기업진흥공단", category: "leadership", theme: "감사실 워크샵 - 조직활성화를 위한 팀빌딩" },
    { year: "2025", client: "한국농촌지도자 세종연합회", category: "leadership", theme: "리더십교육" },
    { year: "2024", client: "한국수력원자력", category: "leadership", theme: "부서장워크샵 트렌드코리아 & 혁신과제 발굴" },
    { year: "2024", client: "세종 공직자 대상", category: "leadership", theme: "리더의 질문법" },
    { year: "2023", client: "유니크", category: "leadership", theme: "임원 워크샵 - 리더의 전략적 사고" },
    { year: "2023", client: "부산경총", category: "leadership", theme: "청년 워크숍 조직내 소통 리더십" },
    { year: "2022", client: "LH한국토지주택공사", category: "leadership", theme: "직원교육 - 팔로워십 & 셀프리더십" },
    { year: "2022", client: "유니크", category: "leadership", theme: "신입사원 직무능력 향상교육" },
    { year: "2022", client: "글로벌리더십연수원", category: "leadership", theme: "유닉테크노스 신입사원 교육" },
    { year: "2022", client: "글로벌리더십연수원", category: "leadership", theme: "중기부-중진공 합동 워크샵 특강" },
    { year: "2022-23", client: "중소벤처기업진흥공단", category: "leadership", theme: "역량강화 워크샵 특강" },
    { year: "2022", client: "수산그룹", category: "leadership", theme: "신입사원 강점찾기 교육" },
    { year: "2019-24", client: "중소기업희망포럼", category: "leadership", theme: "신입사원 교육" },
  
    // CS/민원응대/취업/이미지메이킹 (cs)
    { year: "2025-26", client: "호남연수원", category: "cs", theme: "분기별 CS교육 (4회)" },
    { year: "2025", client: "호텔마띠유", category: "cs", theme: "고객만족서비스 CS교육" },
    { year: "2025", client: "전북특별자치도교육연수원", category: "cs", theme: "교육행정 민원응대" },
    { year: "2025", client: "보령시청", category: "cs", theme: "민원담당공무원 힐링워크숍 팀빌딩 및 민원응대" },
    { year: "2019-25", client: "한국도로교통공단", category: "cs", theme: "서비스마인드, 직업윤리, 청렴, 민원 교육" },
    { year: "2024", client: "대덕구청", category: "cs", theme: "공무원 민원응대 특강 3회" },
    { year: "2024", client: "경남소재 요양원", category: "cs", theme: "휴머니튜드 교육" },
    { year: "2023", client: "대진전자통신고", category: "cs", theme: "직장예절 및 취업역량강화" },
    { year: "2022", client: "한밭대학교", category: "cs", theme: "일학습병행 NCS 직업윤리 3주 교육" },
    { year: "2021", client: "영천시교육문화센터", category: "cs", theme: "재취업 중장년 서비스교육" },
    { year: "2016", client: "전국 8개 지방중소기업청", category: "cs", theme: "민원담당자 스트레스관리법" },
    { year: "2025", client: "한국교육개발원", category: "cs", theme: "청년인턴을 위한 모의면접" },
    { year: "2021-25", client: "영천여성새로일하기센터", category: "cs", theme: "취업지원프로그램" },
    { year: "2023-26", client: "삼성전자", category: "cs", theme: "재취업 이미지메이킹" },
    { year: "2024-25", client: "인천여성복지관", category: "cs", theme: "이미지메이킹, 퍼스널컬러 교육" },
    { year: "2023-24", client: "경남여성가족센터", category: "cs", theme: "퍼스널 이미지메이킹" },
    { year: "2023", client: "경남청소년지원재단", category: "cs", theme: "퍼스널 이미지메이킹" },
    { year: "2023-24", client: "강원공공기관", category: "cs", theme: "자기소개서 컨설팅" },
    { year: "2023", client: "한국폴리텍", category: "cs", theme: "대학생 진로인성캠프" },
    { year: "2023", client: "수원상공회의소", category: "cs", theme: "특성화고 취업캠프" },
    { year: "2022-23", client: "동원과학기술대학", category: "cs", theme: "취업캠프 자기소개서 작성법 및 면접" },
    { year: "2023", client: "부산진지역자활센터", category: "cs", theme: "취업지원" },
    { year: "2023", client: "취업랜드", category: "cs", theme: "취업트랜드 및 취업전략" },
    { year: "2021", client: "영천시 여성채용박람회", category: "cs", theme: "이력서 컨설팅" }
  ];

  const filteredHistory = activeTab === "all"
    ? lectureData
    : lectureData.filter(item => item.category === activeTab);

  return (
    <div className={styles.container}>
      {/* Dynamic blurred backdrop glows */}
      <div className={styles.glowBg1} />
      <div className={styles.glowBg2} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          한국인력경영개발원<span className={styles.logoDot} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#profile" className={styles.headerLink}>Profile</a>
          <a href="#curriculum" className={styles.headerLink}>Courses</a>
          <a href="#history" className={styles.headerLink}>History</a>
          <a href="#contact" className={styles.headerLink}>Inquiry</a>
        </div>
      </header>

      {/* Interactive Centered Visual Hero Banner with Mouse Tracking Events */}
      <section 
        className={styles.bannerSection}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic Background Fog & Mouse Glow Aurora Trail */}
        <div className={styles.bannerBgDecorations}>
          <div className={styles.fogLayer1} />
          <div className={styles.fogLayer2} />
          {isHovered && (
            <div 
              className={styles.mouseGlow} 
              style={{ 
                left: `${mousePos.x}px`, 
                top: `${mousePos.y}px` 
              }} 
            />
          )}
        </div>

        <div className={styles.bannerContentCentered}>
          <span className={styles.bannerSubtitleCentered}>한국인력경영개발원</span>
          <h1 className={styles.bannerTitleCentered}>
            사람과 조직의 성장을 설계합니다
          </h1>
          <p className={styles.bannerDescCentered}>
            기업과 기관에 필요한 교육을 기획 · 운영하는 전문 교육 파트너
          </p>

          <a href="#contact" className={styles.bannerCTA}>
            교육 문의하기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>

        {/* Profile Card & Resume (프로필 및 학력/경력) */}
        <section className={styles.section} id="profile">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>ABOUT ME</span>
            <h2 className={styles.sectionTitle}>프로필 및 약력</h2>
          </div>

          <div className={styles.profileGrid}>
            {/* Left Block: Avatar Card & Personal details */}
            <div className={styles.profileLeft}>
              <div className={styles.avatarWrapper}>
                <img src="/profile.png" alt="성영아 강사 프로필" className={styles.avatarImage} />
              </div>

              <div className={styles.profileCard}>
                <div className={styles.profileItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <div>
                    <span className={styles.profileLabel}>현직</span>
                    <p className={styles.profileValue}>
                      • 한국인력경영개발원 대표<br />
                      • 소상공인연합회 디지털공인강사
                    </p>
                  </div>
                </div>

                <div className={styles.profileItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className={styles.profileLabel}>주소</span>
                    <p className={styles.profileValue}>대전광역시 유성구 용성로 20</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: Timelines and Badges */}
            <div className={styles.profileRight}>
              
              {/* Education & Experience */}
              <div>
                <h3 className={styles.rightSubtitle}>주요 경력 및 학력</h3>
                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineTitle}>충남대학교 경영대학원</span>
                      <span className={styles.timelinePeriod}>2026</span>
                    </div>
                    <p className={styles.timelineDesc}>경영학 석사 졸업</p>
                  </div>

                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineTitle}>전) 효성ITX 사내강사</span>
                      <span className={styles.timelinePeriod}>2016. 01 ~ 2022. 07</span>
                    </div>
                    <p className={styles.timelineDesc}>1357중소기업통합콜센터, KB금융 임직원 사내 교육 총괄</p>
                  </div>

                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineTitle}>전) LG사이언스홀 과학해설 및 교육강사</span>
                      <span className={styles.timelinePeriod}>2014. 01 ~ 2015. 10</span>
                    </div>
                    <p className={styles.timelineDesc}>과학 교육 및 해설 프로그램 기획/운영</p>
                  </div>

                  <div className={styles.timelineItem}>
                    <span className={styles.timelineDot} />
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineTitle}>영남대학교 졸업</span>
                      <span className={styles.timelinePeriod}>2013</span>
                    </div>
                    <p className={styles.timelineDesc}>생명과학과 학사 학위 취득</p>
                  </div>
                </div>
              </div>

              {/* Licenses & Credentials */}
              <div>
                <h3 className={styles.rightSubtitle}>자격증 및 전문 자격</h3>
                <div className={styles.badgeGrid}>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>구글공인전문교육가</span>
                    <span className={styles.licenseYear}>2026년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>인공지능(AI)활용능력 1급</span>
                    <span className={styles.licenseYear}>2025년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>TA교류분석 자격</span>
                    <span className={styles.licenseYear}>2024년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>MBTI 전문강사 자격</span>
                    <span className={styles.licenseYear}>2023년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>KAC 코치인증</span>
                    <span className={styles.licenseYear}>2023년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>퍼실리테이션 전문가 1급</span>
                    <span className={styles.licenseYear}>2023년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>심리분석사 2급</span>
                    <span className={styles.licenseYear}>2019년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>서비스강사 2급</span>
                    <span className={styles.licenseYear}>2015년 취득</span>
                  </div>
                  <div className={styles.licenseBadge}>
                    <span className={styles.licenseTitle}>사회복지사 2급 자격</span>
                    <span className={styles.licenseYear}>2014년 취득</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Detailed Lecture Modules (강의 분야 상세) */}
        <section className={styles.section} id="curriculum">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>WHAT I TEACH</span>
            <h2 className={styles.sectionTitle}>대표 강의 커리큘럼</h2>
          </div>

          <div className={styles.grid}>
            {/* 1. Generative AI */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>생성형 AI & 업무 효율화</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>챗GPT 활용 업무 프로세스 효율화</span>
                <span className={styles.subItem}>AI 툴을 활용한 고속 발표자료(PPT) 제작</span>
                <span className={styles.subItem}>실무 엑셀(Excel) 자동화 및 데이터 가공</span>
                <span className={styles.subItem}>콘텐츠 및 크리에이티브 이미지 생성 기법</span>
              </div>
            </div>

            {/* 2. Communication / TA */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="9" cy="9" r="1" />
                  <circle cx="13" cy="9" r="1" />
                  <circle cx="17" cy="9" r="1" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>소통 & MBTI · TA 분석</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>MBTI 기반의 상호이해 및 맞춤형 직장 대화법</span>
                <span className={styles.subItem}>TA 교류분석을 통한 커뮤니케이션 왜곡 개선</span>
                <span className={styles.subItem}>조직 갈등 관리 및 건강한 파트너십 구축</span>
                <span className={styles.subItem}>부부/가족/세대간 원활한 소통 교육</span>
              </div>
            </div>

            {/* 3. Leadership & Team */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>리더십 & 조직 활성화</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>신입사원 OJT 및 비즈니스 매너 교육</span>
                <span className={styles.subItem}>팀 시너지를 극대화하는 팀빌딩 퍼실리테이션</span>
                <span className={styles.subItem}>중간관리자 및 팀장급 소통 리더십</span>
                <span className={styles.subItem}>조직 내 팔로워십 배양 및 동기부여</span>
              </div>
            </div>

            {/* 4. Speech & IR */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>스피치 & IR 피칭</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>목소리 톤 교정 및 보이스 트레이닝</span>
                <span className={styles.subItem}>프레젠테이션 불안 극복 및 전달력 향상</span>
                <span className={styles.subItem}>스타트업 및 소상공인 대상 IR 스피치</span>
                <span className={styles.subItem}>홍보대사 의전 매너 및 미디어 스피치</span>
              </div>
            </div>

            {/* 5. CS & Service */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>CS & 민원 응대</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>고객 만족 서비스 마인드 및 비즈니스 매너</span>
                <span className={styles.subItem}>불만 고객 진화 및 강성 민원 회복탄력성</span>
                <span className={styles.subItem}>공공기관 특화 친절 교육 및 민원 응대법</span>
                <span className={styles.subItem}>감정노동자를 위한 스트레스 해소 테라피</span>
              </div>
            </div>

            {/* 6. Career Coaching */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>취업 & 커리어 코칭</h3>
              <div className={styles.cardSublist}>
                <span className={styles.subItem}>자기소개서 작성 전략 및 서류 컨설팅</span>
                <span className={styles.subItem}>실전 모의면접 진행 및 면접 이미지 메이킹</span>
                <span className={styles.subItem}>퍼스널 컬러 진단 및 체형 분석 이미지 메이킹</span>
                <span className={styles.subItem}>청년/중장년 대상 생애 재설계 커리어 컨설팅</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filterable Lecture History (출강 이력 필터) */}
        <section className={styles.section} id="history">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>PORTFOLIO</span>
            <h2 className={styles.sectionTitle}>주요 출강 이력</h2>
          </div>

          {/* Filter Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "all" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("all")}
            >
              전체 보기 ({lectureData.length})
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "ai" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("ai")}
            >
              AI · 디지털 · 노션
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "communication" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("communication")}
            >
              소통 · MBTI · 스피치
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "leadership" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("leadership")}
            >
              리더십 · 팀빌딩 · 기획
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "cs" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("cs")}
            >
              CS · 취업 · 민원응대
            </button>
          </div>

          {/* Filtered Content List */}
          <div className={styles.historyList}>
            {filteredHistory.map((item, idx) => (
              <div key={idx} className={styles.historyItem}>
                <span className={styles.yearBadge}>{item.year}</span>
                <span className={styles.clientName}>{item.client}</span>
                <span className={styles.lectureTheme}>{item.theme}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Inquiry Section */}
        <section className={styles.section} id="contact">
          <div className={styles.contactCard}>
            
            {/* Left Block: Direct Contacts */}
            <div className={styles.contactLeft}>
              <span className={styles.sectionTag}>GET IN TOUCH</span>
              <h2 className={styles.contactTitle}>교육 및 강연 문의</h2>
              <p className={styles.contactDesc}>
                조직 성장 워크숍, 생성형 AI 실습 과정, MBTI/TA 소통 특강 등 <br />
                강연 요청이나 문의사항을 오른쪽 폼에 남겨주시면 신속히 확인 후 연락드리겠습니다.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className={styles.emailArea}>
                  <span className={styles.emailText}>{email}</span>
                  <div className={styles.actionButtons}>
                    <button className={styles.copyButton} onClick={handleCopyEmail}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      복사
                    </button>
                    <a href={`mailto:${email}`} className={styles.mailButton}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      메일
                    </a>
                  </div>
                </div>

                <div className={styles.emailArea} style={{ paddingRight: "0" }}>
                  <span className={styles.emailText}>☎ {phone}</span>
                  <a href={`tel:${phone}`} className={styles.mailButton} style={{ background: "var(--accent-light)", color: "#ffffff", border: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    전화걸기
                  </a>
                </div>
              </div>
            </div>

            {/* Right Block: Inquiry Form */}
            <div className={styles.inquiryFormBlock}>
              {isSubmitted ? (
                <div className={styles.successOverlay}>
                  <div className={styles.successIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>문의 접수 완료</h3>
                  <p className={styles.successMsg}>
                    강의 문의가 정상적으로 접수되었습니다.<br />
                    보내주신 이메일/연락처로 확인 후<br />
                    신속하게 회신드리겠습니다. 감사합니다!
                  </p>
                  <button 
                    className={styles.submitBtn} 
                    onClick={handleResetForm}
                    style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", background: "var(--accent-light)" }}
                  >
                    확인
                  </button>
                </div>
              ) : null}

              <h3 className={styles.formTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-light)" }}>
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                강의 제안 및 문의하기
              </h3>

              <form onSubmit={handleFormSubmit} className={styles.inquiryForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="clientName">기관명 / 성함</label>
                    <input
                      type="text"
                      id="clientName"
                      name="clientName"
                      placeholder="예: OOO컴퍼니 / 홍길동"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">연락처</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="예: 010-1234-5678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">이메일 주소</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="예: example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">희망 강의 분야</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={styles.selectField}
                    >
                      <option value="생성형 AI & 업무 효율화">생성형 AI & 업무 효율화</option>
                      <option value="소통 & MBTI · TA 분석">소통 & MBTI · TA 분석</option>
                      <option value="리더십 & 조직 활성화">리더십 & 조직 활성화</option>
                      <option value="스피치 & IR 피칭">스피치 & IR 피칭</option>
                      <option value="CS & 민원 응대">CS & 민원 응대</option>
                      <option value="취업 & 커리어 코칭">취업 & 커리어 코칭</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">문의 및 요청 사항</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="희망 일시, 강의 대상, 인원수, 주요 요구 사항 등을 남겨주시면 원활한 커리큘럼 설계에 큰 도움이 됩니다."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textareaField}
                    required
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                  {isSubmitting ? (
                    <span>전송 중...</span>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      문의 신청하기
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Toast Notification */}
      <div className={`${styles.toast} ${showToast ? styles.show : ""}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem" }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        이메일 주소가 복사되었습니다!
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} 성영아 · 한국인력경영개발원. All rights reserved.</p>
      </footer>
    </div>
  );
}
