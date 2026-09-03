import { TeamBrochureData, DocumentItem } from '../types';

export const EVALUATION_SYSTEM_LINK = 'https://onlyonefair-judge.vercel.app/';

export const TEAMS_DATA: TeamBrochureData[] = [
  {
    teamNumber: 1,
    teamName: '1조',
    projectTitleKo: '맛.zip',
    projectTitleEn: 'Mat.zip',
    projectSubtitleEn: 'Mat.zip Curation Service',
    membersKo: ['김시현', '김효원', '안소은', '안지민', '이강우', '임소은', '장유희'],
    membersEn: ['KIM SIHYUN', 'KIM HYOWON', 'AHN SOEUN', 'AHN JIMIN', 'LEE KANGU', 'LIM SOEUN', 'JANG YUHEE'],
    categoryTag: '글로벌 K-Food Curation',
    brochurePdfUrl: '/documents/team01/brochure.pdf',
    presentationKorPdfUrl: '/documents/team01/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team01/presentation(eng).pdf',
    korean: {
      headline: '맛.zip',
      subheadline: '[한식에 대해 호기심을 가진 미국 소비자들]이 [어떤 식당을 선택해야 할지 확신이 서지 않는 상황]에서, [‘맛.zip’의 한식당 인증 라벨과 매거진]을 제공하여 [호기심을 확신으로 전환하는 순간]을 선사한다',
      problemStatement: '미국 현지에서 K-컬처 인기로 한식 수요는 폭발하고 있으나, 신뢰할 만한 인증 및 큐레이션 부재로 선택의 불안감 존재',
      solutionStatement: 'CJ 인증 맛.zip 라벨 부여 및 디지털 맛:거진을 통한 한식당 큐레이팅 가이드 제공',
      businessOverview: [
        '맛.zip 라벨: ‘한식의 가치를 느낄 수 있는 캐주얼한 공간’에 부여하는 인증라벨 서비스',
        '맛.zip 디지털 매거진: 한식에 관한 디지털 콘텐츠(맛:거진, AI 트렌드, 식당 가이드)를 제공하는 매거진 서비스'
      ],
      onlyonePoints: {
        first: '[최초]의 민간 한식당 인증 마크 - 선정된 한식당의 신뢰성을 증명하여 실패 없는 외식 경험 보장',
        best: '[최고]의 한식 일상화 솔루션 - 만족스러운 외식 경험 확대로 일상 속 한식 소비 가속화',
        different: '[차별화]된 큐레이팅 기반 외식 가이드 - 식당에서 경험할 수 있는 요소를 맞춤형으로 제시'
      },
      expectedEffects: [
        '한국 브랜드/식당들의 네트워크 구축 및 신뢰성 제고',
        '누적 데이터를 활용한 부가가치 창출',
        '간편식(GSP) 수요 확대를 위한 선행 기반 마련'
      ],
      featuresOrRoadmap: [
        {
          title: '맛.zip 매거진 주요 구성',
          items: ['맛.zip 선정 한식당 리스트', '맛:거진 스토리 아카이브', 'AI 360 기반 한식 트렌드 분석']
        },
        {
          title: 'GSP 확장 로드맵',
          items: ['맛.zip 인증 만족 경험', '한식의 일상적 소비 정착', 'GSP 카테고리 확장 기회 및 수요 증대']
        }
      ],
      appendixDetails: {
        title: '브랜드 및 네이밍 정의',
        description: '1) 맛(Mat): 미국 현지 밈 ‘MASSITA’와 한글 타이포그래피 활용 / 2) 집(Zip): 공간(집), 압축파일(.zip), 미국 ZIP CODE의 삼중 의미'
      }
    },
    english: {
      headline: 'Mat.zip Curation',
      subheadline: 'To [turn curiosities about Korean food into confident choices] for [US diners], [‘Mat.zip’ provides trusted Korean restaurant certifications and magazines]',
      problemStatement: 'US diners are curious about K-food but lack trustworthy curation and certification systems.',
      solutionStatement: 'Provides verified Korean restaurant certification labels and an engaging digital magazine.',
      businessOverview: [
        'Mat.zip Label: Certification label for casual dining places offering authentic Korean cuisine.',
        'Mat.zip Digital Magazine: Digital magazine service delivering content on Korean food culture.'
      ],
      onlyonePoints: {
        first: '[First] Certifying trusted Korean restaurants for a reliable dining experience.',
        best: '[Best] Integrating the consumption of Korean food in daily life by expanding satisfied dining experiences.',
        different: '[Different] Creating motivation to visit by customizing curation what can be experienced.'
      },
      expectedEffects: [
        'Building a network of Korean culinary brands and restaurants.',
        'Generating added value through accumulated consumer data.',
        'Laying the groundwork to expand demand for Korean ready meal (GSP).'
      ],
      featuresOrRoadmap: [
        {
          title: 'Key Magazine Pages',
          items: ['Mat.zip-Certified Restaurant List', 'Mat:gazine Stories', 'AI 360 Based K-food Trend']
        },
        {
          title: 'Road to GSP Expansion',
          items: ['Satisfying ONLYONE Moments via Mat.zip', 'Integrating Korean Food into Daily Life', 'Expanding Category and Increasing Demand of GSP']
        }
      ],
      appendixDetails: {
        title: 'Brand Definition',
        description: 'Mat: Trendy K-meme "MASSITA" & Korean typography identity / Zip: Inspired by "Mat\'jip" (place for great food), .ZIP file archive, and US ZIP CODE.'
      }
    },
    presentationDeckDraft: {
      title: '맛.zip Curation Pitch Deck',
      subtitle: '미국 K-Food 확산 및 GSP 연계 비즈니스 모델',
      slidesCount: 15,
      slidesSummary: [
        '1. Executive Summary & Problem Framing',
        '2. US K-Food Market Opportunity & Customer Insights',
        '3. Solution: Mat.zip Certification & Digital Magazine',
        '4. ONLYONE Differentiators & Business Synergy with GSP',
        '5. Go-to-Market Strategy & Financial Roadmap'
      ]
    }
  },
  {
    teamNumber: 2,
    teamName: '2조',
    projectTitleKo: 'KARARA BUGAK',
    projectTitleEn: 'KARARA BUGAK',
    projectSubtitleEn: 'KARARA BUGAK: Interactive K-Snack',
    membersKo: ['문원진', '변보경', '서자이', '이민석', '이예주', '정현욱', '홍시은'],
    membersEn: ['Wonjin Moon', 'Bokyung Byun', 'Jai Seo', 'Minseok Lee', 'Yeju Lee', 'Hyunwook Jung', 'Sieun Hong'],
    categoryTag: '인도 시장 K-스낵 혁신',
    brochurePdfUrl: '/documents/team02/brochure.pdf',
    presentationKorPdfUrl: '/documents/team02/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team02/presentation(eng).pdf',
    korean: {
      headline: 'KARARA BUGAK',
      subheadline: '[맛과 건강을 모두 원하는 인도 MZ 고객]에게 [기존 스낵의 기름지고 무거운 부담]대신 [원물의 맛과 바삭함을 살린 K-부각]을 제공하여 [나만의 K-flavor로 즐기는 경험]을 선사한다',
      problemStatement: '인도 차이타임 등 일상적인 스낵 문화에서 건강하고 바삭하며 자극적이지 않은 새로운 스낵에 대한 갈증',
      solutionStatement: '인도 친숙 원물(연근·오크라·병아리콩)을 한국 전통 부각 공법으로 재해석하고 DIY K-시즈닝 블렌딩 결합',
      businessOverview: [
        '인도 MZ를 위한 원물 본연의 맛과 식감을 살린 가볍고 바삭한 K-snack',
        '인도 소비자에게 익숙한 원물 연근·오크라·병아리콩을 한국 고유의 ‘부각’ 방식으로 재해석',
        'K-시즈닝을 직접 넣고 흔들어 먹으며, 내 취향대로 K-Flavor를 완성하는 참여형 스낵'
      ],
      onlyonePoints: {
        first: '한국 전통 ‘부각’ 공법의 인도 현지화 최초 진입',
        best: '가볍고 바삭한 건강 원물 스낵(Healthy Crunch)',
        different: '소비자가 직접 시즈닝 비율(7:3, 5:5, 3:7)을 조합하는 My First K-Masala Mix & Shake 소비 경험'
      },
      expectedEffects: [
        'K-Flavor의 일상화: 인도인의 일상 스낵 속 Flavor option으로 확장',
        'K-Snack 입문 캐리어: 단일 제품을 넘어 향후 CJCJ의 다양한 K-Snack 포트폴리오로 확장'
      ],
      featuresOrRoadmap: [
        {
          title: 'HOW TO ENJOY (3단계)',
          items: ['1단계: 부각을 연다', '2단계: 두 가지 시즈닝을 넣는다 (Spicy/Sour K-시즈닝)', '3단계: 흔들어 완성! (Mix & Shake)']
        },
        {
          title: '3대 핵심 가치',
          items: ['원물의 영양과 바삭함 (Wholesome)', '직접 만드는 재미 (Joy of DIY)', '나만의 맛 조합 (Crispiness & Flavor)']
        }
      ],
      appendixDetails: {
        title: 'MY K-MASALA 콘셉트',
        description: '인도의 마살라(향신료 블렌딩) 문화를 K-시즈닝과 결합하여 소비자가 주도하는 새로운 K-스낵 경험 제공'
      }
    },
    english: {
      headline: 'KARARA BUGAK',
      subheadline: 'For [Indian Gen Z seeking taste and healthier snacking], by [reducing the heaviness of conventional snacks] through [light & crispy K-Bugak made with real ingredients], offering [a new K-flavor experience]',
      problemStatement: 'Snacking is essential in India (Chai time), but tasty, crispy, and healthier options are limited.',
      solutionStatement: 'Reinterpreting familiar Indian ingredients (Lotus root, Okra, Chickpeas) via traditional Korean Bugak technique + DIY K-Masala.',
      businessOverview: [
        'Light, crispy K-snack made with real ingredients highlighting natural taste.',
        'Familiar Indian ingredients reinterpreted through traditional Korean Bugak method.',
        'Interactive snack experience by adding and shaking their own K-flavor.'
      ],
      onlyonePoints: {
        first: 'Pioneering traditional Korean Bugak in the Indian snack market.',
        best: 'Wholesome natural ingredients with guilt-free healthy crunch.',
        different: 'Customized DIY K-Masala mixing & shaking experience.'
      },
      expectedEffects: [
        'Everyday K-Flavor: Integrate K-flavors into consumers\' daily snacking occasions.',
        'K-Snack Entry Product: Expand from Bugak into CJCJ\'s wider K-snack portfolio.'
      ],
      featuresOrRoadmap: [
        {
          title: 'HOW TO ENJOY',
          items: ['1. Open your Bugak', '2. Put two seasonings (Spicy & Sour K-seasoning)', '3. Mix & shake to finish!']
        }
      ],
      appendixDetails: {
        title: 'Masala Culture Integration',
        description: 'Blending multiple spices into "MY K-MASALA" creating a localized yet innovative K-snack format.'
      }
    },
    presentationDeckDraft: {
      title: 'KARARA BUGAK Pitch Deck',
      subtitle: '인도 14억 시장을 공략하는 차세대 K-원물 스낵 전략',
      slidesCount: 16,
      slidesSummary: [
        '1. Market Opportunity: Indian Snacking & Gen Z Trends',
        '2. Consumer Pain Point: Heavy fried snacks vs. Healthy cravings',
        '3. Product Innovation: Real Ingredient Bugak + Mix & Shake K-Masala',
        '4. Supply Chain & Local Production Feasibility',
        '5. Brand Expansion & Sales Projections'
      ]
    }
  },
  {
    teamNumber: 3,
    teamName: '3조',
    projectTitleKo: 'One Meal Shot',
    projectTitleEn: 'One Meal Shot',
    projectSubtitleEn: 'One Meal Shot: 100mL Nutrition Shot',
    membersKo: ['박민경', '오태훈', '최윤진', '이수민', '윤세희', '김태헌', '정하은'],
    membersEn: ['Minkyung Park', 'Taehoon Oh', 'Yoonjin Choi', 'Sumin Lee', 'Sehee Yoon', 'Taeheon Kim', 'Haeun Chung'],
    categoryTag: 'GLP-1 특화 뉴트리션 음료',
    brochurePdfUrl: '/documents/team03/brochure.pdf',
    presentationKorPdfUrl: '/documents/team03/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team03/presentation(eng).pdf',
    korean: {
      headline: 'One Meal Shot',
      subheadline: '[식사량이 감소한 GLP-1 사용자]에게 [적은 식사량으로 인한 영양 불균형]을 [100mL 고밀도 Nutrition Shot]으로 제공하여 [부담 없이 한 끼 영양을 채우는 경험]을 선사한다',
      problemStatement: 'GLP-1 비만/당뇨 치료제 확산으로 식사량이 줄어들어 영양 불균형 및 메스꺼움 발생, 기존 단백질 음료는 대용량/밀키하여 섭취 부담 큼',
      solutionStatement: '고단백 저점도 BLG 단백질 원료 기반 100mL 초소용량·고밀도 맑은 제형 영양샷',
      businessOverview: [
        '[Compact] 100mL 소용량에 필요한 영양을 압축해 섭취 부담 최소화',
        '[Clear] BLG 기반 고단백·저점도 설계로 맑고 가벼운 워터리 제형 구현',
        '[Complete] 단백질 15g, 식이섬유 7g, 비타민 13종, 미네랄 8종의 균형 영양 설계'
      ],
      onlyonePoints: {
        first: '[First Mover] 국내 최초 GLP-1 특화 Nutrition Drink로 신규 시장 선점',
        best: '[Brand Expansion] Balance Meal을 간편대용식에서 Nutrition 전문 브랜드로 확장',
        different: '[Platform Expansion] 제품을 시작으로 CJ 더마켓의 Wellness Planning 영역 확장'
      },
      expectedEffects: [
        'GLP-1 복용자 및 소식가들의 식사 대체 영양 보충 표준 솔루션 자리매김',
        'CJ 단백질/뉴트리션 카테고리 프리미엄화 견인'
      ],
      featuresOrRoadmap: [
        {
          title: '3대 라인업 구성',
          items: [
            'Refresh Shot (Lemon·Ginger): 울렁이는 순간에도 상큼하게',
            'Comfort Shot (Apple·Kale): 속은 편안하게 균형 있게',
            'Energy Shot (Pear·Honey): 지친 순간에도 가볍게 채우기'
          ]
        },
        {
          title: '핵심 소재 BLG(β-lactoglobulin)',
          items: ['북미 TL유청 단백질 핵심 성분 분리', 'EAA·류신 풍부 및 고용해도', '고단백·저점도 맑은 워터 제형 구현']
        }
      ],
      appendixDetails: {
        title: 'GLP-1 페인포인트 극복',
        description: '과도한 용량 부담 해소(330mL->100mL), 메스꺼움 유발하는 걸쭉함 제거(워터리), 영양 결핍 해소'
      }
    },
    english: {
      headline: 'One Meal Shot',
      subheadline: 'Designed for [GLP-1 users with reduced food intake], providing [essential nutrition to address nutritional gaps], in a [compact 100ml Nutrition Shot], offering an [easy way to fulfill the nutrition of a meal without the burden].',
      problemStatement: 'Growing GLP-1 use creates nutritional gaps; conventional milky protein drinks cause nausea and volume burden.',
      solutionStatement: '100mL clear, high-density nutrition drink formulated with high-solubility BLG whey protein.',
      businessOverview: [
        '[Compact] Essential nutrition in a small 100 mL serving.',
        '[Clear] Light and watery base with highly soluble BLG protein.',
        '[Complete] 15g protein + 7g fiber + 13 vitamins + 8 minerals.'
      ],
      onlyonePoints: {
        first: 'Korea\'s first GLP-1-friendly targeted nutrition shot.',
        best: 'Expanding Balance Meal from meal replacement to clinical wellness.',
        different: 'High-purity BLG formulation offering watery texture without heaviness.'
      },
      expectedEffects: [
        'Pioneering the nascent GLP-1 nutrition companion category in Asia.',
        'High margin revenue stream and platform synergy with CJ TheMarket.'
      ],
      featuresOrRoadmap: [
        {
          title: 'Product Lineup',
          items: ['Refresh Shot (Lemon & Ginger)', 'Comfort Shot (Apple & Kale)', 'Energy Shot (Pear & Honey)']
        }
      ],
      appendixDetails: {
        title: 'BLG Science & USP',
        description: 'β-lactoglobulin ensures rapid digestion, leucine-rich amino profile, and clear drinkability.'
      }
    },
    presentationDeckDraft: {
      title: 'One Meal Shot Presentation Deck',
      subtitle: 'GLP-1 시대를 리딩하는 초소용량 고밀도 뉴트리션 솔루션',
      slidesCount: 14,
      slidesSummary: [
        '1. Rise of GLP-1 Agonists & Emergence of Nutritional Gaps',
        '2. Consumer Journey & Form Factor Limitations',
        '3. BLG Protein Technology & 100mL Shot Architecture',
        '4. 3-Flavor Product Matrix & Clinical Evidence',
        '5. Commercialization Timeline & Expansion Plan'
      ]
    }
  },
  {
    teamNumber: 4,
    teamName: '4조',
    projectTitleKo: '한입탐험대',
    projectTitleEn: 'Bite Explorers',
    projectSubtitleEn: 'One-Bite Explorer: AR Kid Food Solution',
    membersKo: ['박유빈', '박재민', '아프린 아바스', '유서현', '최수', '최영준', '황석영'],
    membersEn: ['Yoobin Park', 'Jaemin Park', 'Afreen Abbas', 'Seohyun Yu', 'Soo Choi', 'Youngjun Choi', 'Seokyoung Hwang'],
    categoryTag: 'AR 기반 영유아 식습관 솔루션',
    brochurePdfUrl: '/documents/team04/brochure.pdf',
    presentationKorPdfUrl: '/documents/team04/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team04/presentation(eng).pdf',
    korean: {
      headline: '한입탐험대',
      subheadline: '[CJ더마켓의 핵심고객층인 3040부모]에게 [자녀들의 식습관에 대한 고민]을 [AR기반의 ‘한입탐험대’ 솔루션 서비스]로 제공하여 [자녀 식습관 개선 경험]을 선사한다',
      problemStatement: '3040 부모들의 최대 육아 난제인 자녀 편식 문제. 기존 개선 방식은 파편화되어 육아 부담 해소 불가',
      solutionStatement: '아이 맞춤 AR 놀이 + 부관 맞춤 식습관 기록 + CJ더마켓 맞춤 식자재/레시피 구매 연계 원스톱 플랫폼',
      businessOverview: [
        '[아이 맞춤 한입 탐험] 아이가 어려워하는 음식을 선택하고, 연령에 맞춰 놀이/식사 경험을 단계별 제공',
        '[부모 맞춤 식습관 관리] 아이의 식사 경험 기록, 다음 식사 행동과 맞춤 레시피 제안',
        '[더마켓 구매 연결] 식습관 개선에 필요한 레시피와 상품을 추천해 구매까지 원스톱 연결'
      ],
      onlyonePoints: {
        first: '[버티컬 플랫폼] 킬러 콘텐츠로 단순 자사몰 탈피, 독보적인 3040 라이프스타일 플랫폼 구축',
        best: '[체류시간 및 락인] AR 서비스와 커뮤니티 활성화를 통한 체류시간 극대화',
        different: '[매출 유기적 견인] 제품 추천 및 레시피가 자연스럽게 CJ제일제당 제품 구매로 직결'
      },
      expectedEffects: [
        '자녀 성장과 함께 지속적으로 CJ를 신뢰하고 구매하는 장기 충성 고객 확보',
        '편식 솔루션 도입 시 부모의 67%가 재방문 의향 응답(자체 설문 검증)'
      ],
      featuresOrRoadmap: [
        {
          title: '연령별 핵심 기능',
          items: [
            '3~5세 추천: 같이 찰칵 (AR 페이스 필터), 냠냠 챌린지 (인터랙티브 먹방 놀이)',
            '6~7+세 추천: 유튜버 도전 (아이 주도 식사 브이로그), 영양 탐험 (식재료 퀘스트)'
          ]
        }
      ],
      appendixDetails: {
        title: 'Why CJ TheMarket?',
        description: '성공적인 버티컬 커머스는 고객의 넓은 문제를 해결하여 대체 불가능한 일상 서비스로 진화'
      }
    },
    english: {
      headline: 'One-Bite Explorer',
      subheadline: 'To [parents in their 30s and 40s], by [addressing their concerns about picky eating children] through [the AR-based solution service], offering them [an experience that improves eating habits].',
      problemStatement: 'Picky eating is a major parental pain point with fragmented tools.',
      solutionStatement: 'AR gamified dining for kids + meal logs & personalized CJ TheMarket grocery/recipe links for parents.',
      businessOverview: [
        '[Child-Centered Exploration] Select challenging foods and provide step-by-step play-based meals.',
        '[Eating Habit Management] Track mealtime experiences and recommend next meal recipes.',
        '[Connection to CJ TheMarket] One-click purchase of needed nutritious ingredients.'
      ],
      onlyonePoints: {
        first: 'Transforming CJ TheMarket into a comprehensive family wellness platform.',
        best: 'Maximizing app dwell time with gamified AR dining features.',
        different: 'Organic revenue loop linking digital engagement to ingredient cart checkout.'
      },
      expectedEffects: [
        'Securing lifetime customer loyalty from young parent demographics.',
        '67% survey intent for repeat visits upon feature rollout.'
      ],
      featuresOrRoadmap: [
        {
          title: 'Key Interactive Features',
          items: ['Snap! (AR Filter)', 'YumYum Challenge', 'Youtuber Time!', 'Nutrition Quest']
        }
      ],
      appendixDetails: {
        title: 'Vertical Commerce Strategy',
        description: 'Evolving from transactional grocery app to essential child dietary lifestyle companion.'
      }
    },
    presentationDeckDraft: {
      title: 'One-Bite Explorer Pitch Deck',
      subtitle: 'CJ더마켓 3040 락인을 위한 AR 기반 유아 식습관 솔루션',
      slidesCount: 15,
      slidesSummary: [
        '1. CJ TheMarket Growth Challenges & 3040 Demographic Analysis',
        '2. Picky Eater Parenting Burden & Market Gap',
        '3. AR Kid Gameplay & Parent Recipe Integration Demo',
        '4. Organic Cart Conversion & CJCJ Product Synergy',
        '5. Financial Projections & 3-Year Feature Roadmap'
      ]
    }
  },
  {
    teamNumber: 5,
    teamName: '5조',
    projectTitleKo: 'PHAlette',
    projectTitleEn: 'PHAlette',
    projectSubtitleEn: 'PHAlette: Biodegradable PHA Beauty Applicator',
    membersKo: ['김민제', '강승민', '김보경', '이민경', '염원', '이재원', '임재윤'],
    membersEn: ['Kim Min-je', 'Kang Seung-min', 'Kim Bo-kyung', 'Lee Min-kyung', 'Yeom Won', 'Lee Jae-won', 'Lim Je-yun'],
    categoryTag: '친환경 PHA 뷰티 툴 & ESG',
    brochurePdfUrl: '/documents/team05/brochure.pdf',
    presentationKorPdfUrl: '/documents/team05/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team05/presentation(eng).pdf',
    korean: {
      headline: 'PHAlette',
      subheadline: '[글로벌 뷰티 소비자]가 [일회성 어플리케이터를 버릴 때 느끼는 죄책감]을 [PHA 뷰티 툴 라인업]으로 해결하여 [일상에서 친환경에 일조하는 뷰티 경험]을 선사한다',
      problemStatement: '올리브영 등 매장 내 일회용 테스터 어플리케이터 폐기물로 인한 환경 오염 및 소비자 죄책감 발생',
      solutionStatement: 'CJ제일제당 독자 생분해 바이오 소재 PHA를 활용한 친환경 뷰티 어플리케이터 및 올리브영 ESG 매장 적용',
      businessOverview: [
        'CJ 제일제당: PHA 인지도 확대 - B2B 소재에서 소비자가 직접 체감하는 친환경 뷰티 소재로 전환 및 글로벌 H&B 확장',
        'CJ 올리브영: 친환경 매장 이미지 강화 - 매장 내 소모품까지 친환경화하여 차별화된 ESG 브랜드 경험 제공',
        '소비자: 비용 부담 없이 친환경 소비 체험 및 생분해 소재 특성 직관적 인지'
      ],
      onlyonePoints: {
        first: '국내 최초 100% 해양 생분해 PHA 뷰티 어플리케이터 상용화',
        best: 'CJ제일제당(소재) x CJ올리브영(유통 매장) 간의 강력한 그룹사 시너지 창출',
        different: '오프라인 매장 테스터에서 시작해 퍼프, 브러시 등 글로벌 H&B 완제품 라인업으로 확장'
      },
      expectedEffects: [
        '올리브영 연간 수천만 개의 일회용 플라스틱 어플리케이터 폐기물 감축',
        '글로벌 K-Beauty 클린 뷰티 트렌드를 선도하는 ESG 브랜드 파워 확보'
      ],
      featuresOrRoadmap: [
        {
          title: '마케팅 실행 전략 (Online / Offline / Media PR)',
          items: [
            'ONLINE: QR 게임 · TikTok 바이럴 콘텐츠로 PHA 인지도 확대',
            'OFFLINE: 올리브영 매장 및 올영페스타에서 직접 체험',
            'MEDIA PR: 론칭 -> 체험 -> 성과 -> 글로벌 확산'
          ]
        },
        {
          title: '중장기 확장 로드맵',
          items: ['1단계: PHA Tester Applicator 개발', '2단계: 국내 올리브영 검증 후 Global H&B 진출', '3단계: 다양한 프리미엄 Beauty Tool 카테고리 확장']
        }
      ],
      appendixDetails: {
        title: '시장 및 소비자 인사이트',
        description: '오프라인 구매 비중 74%, 성능 테스트 중요 응답 44%, 클린뷰티의 성분에서 지속가능성으로의 확장 트렌드'
      }
    },
    english: {
      headline: 'PHAlette',
      subheadline: '[Global beauty consumers] who feel [guilty about discarding single-use applicators], solve this problem with [a PHA beauty tool lineup], delivering [an eco-friendly beauty experience for everyday life].',
      problemStatement: 'Single-use cosmetic testers generate plastic guilt among eco-conscious beauty shoppers.',
      solutionStatement: 'Replacing disposable applicators with CJ\'s marine-biodegradable PHA material in Olive Young stores.',
      businessOverview: [
        'CJ CheilJedang: Expanding PHA awareness directly to end consumers and scaling to global H&B markets.',
        'CJ Olive Young: Strengthening eco-friendly store identity and realizing tangible ESG practices.',
        'Consumers: Experiencing sustainable materials at zero extra cost during everyday shopping.'
      ],
      onlyonePoints: {
        first: 'First commercial 100% marine-biodegradable beauty applicator line.',
        best: 'Cross-affiliate synergy between CJ CheilJedang (Bio) and CJ Olive Young (Retail).',
        different: 'From in-store tester tools to commercial retail consumer beauty tools.'
      },
      expectedEffects: [
        'Massive reduction of disposable plastic waste across retail channels.',
        'Elevating K-Beauty\'s global ESG benchmark.'
      ],
      featuresOrRoadmap: [
        {
          title: 'Marketing Strategy',
          items: ['Online: QR TikTok virals', 'Offline: Olive Young in-store touchpoints & Festa', 'Media PR: Sustainable beauty news']
        },
        {
          title: 'Long-term Roadmap',
          items: ['Phase 1: Tester Applicator -> Phase 2: Global H&B -> Phase 3: Comprehensive Beauty Tools']
        }
      ],
      appendixDetails: {
        title: 'Market Insight',
        description: '74% offline beauty shopping share, 44% prioritizing in-store texture testing, clean beauty shifting to sustainable packaging.'
      }
    },
    presentationDeckDraft: {
      title: 'PHAlette Presentation Deck',
      subtitle: 'CJ 바이오 PHA 소재와 올리브영의 친환경 뷰티 플랫폼 전략',
      slidesCount: 15,
      slidesSummary: [
        '1. Global Clean Beauty Megatrend & In-store Plastic Waste Issue',
        '2. CJ CheilJedang Marine-Degradable PHA Material Superiority',
        '3. Olive Young In-store Experience & Marketing Rollout',
        '4. Cross-Affiliate Synergy & Cost-Benefit Analysis',
        '5. Global H&B Expansion Roadmap'
      ]
    }
  },
  {
    teamNumber: 6,
    teamName: '6조',
    projectTitleKo: 'FLY-VOR',
    projectTitleEn: 'FLY-VOR',
    projectSubtitleEn: 'FLY-VOR: In-Flight TasteNrich Solution',
    membersKo: ['김경민', '김다인', '김효은', '박진주', '백민경', '이유진', '최연서'],
    membersEn: ['Kyeongmin Kim', 'Dain Kim', 'Hyoeun Kim', 'Jinju Park', 'Minkyung Baek', 'Yoojin Lee', 'Yeonseo Choi'],
    categoryTag: '글로벌 기내식 TasteNrich 솔루션',
    brochurePdfUrl: '/documents/team06/brochure.pdf',
    presentationKorPdfUrl: '/documents/team06/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team06/presentation(eng).pdf',
    korean: {
      headline: 'FLY-VOR',
      subheadline: '[기내식 케이터링 업체]에게 [기내 환경에서 발생하는 맛 저하와 건강 부담 문제]를 [새로운 TasteNrich 라인업 개발]로 해결하여 [맛과 건강의 가치를 동시에 충족할 수 있는 경험]을 선사한다',
      problemStatement: '기내 저압·저습도 환경에서 단맛(-45.3%), 짠맛(-36.7%), 감칠맛(-15.4%) 저하 발생. 기존 업체는 맛을 내기 위해 자극적 조미료/나트륨을 과다 첨가하여 승객의 소화 및 건강 부담 가중',
      solutionStatement: 'CJ 테이스트엔리치(TasteNrich) 클린라벨 천연 조미 솔루션을 활용한 기내식 전용 풍미 증진 및 나트륨 저감 솔루션',
      businessOverview: [
        'Savory Boosting: 기내에서도 풍부한 감칠맛과 깊은 풍미 완벽 구현',
        'Clean Label: 무MSG, 비건, 할랄, 코셔, Non-GMO 인증 클린 원료',
        'Sodium Reduction: 나트륨 함량은 대폭 낮추면서도 본연의 짠맛 인지 유지'
      ],
      onlyonePoints: {
        first: '글로벌 항공사 기내식 맞춤형 차세대 천연 발효 조미 솔루션 최초 구축',
        best: '2-Track 진입 전략: 1) 일반 기내식(Standard 라인-시장점유율) / 2) 프리미엄·특별식(Premium 라인-고수익)',
        different: '기내식을 시작으로 향후 병원·요양원 등 트레이 푸드(Tray Food) 및 우주 항공 식품 시장으로 확장'
      },
      expectedEffects: [
        '글로벌 케이터링 파트너십 구축 및 TasteNrich B2B 원료 매출 비약적 증대',
        '항공사의 기내식 품질 만족도 및 건강 브랜드 이미지 혁신'
      ],
      featuresOrRoadmap: [
        {
          title: '2-Track 시장 진입 전략',
          items: [
            '1) TNR Standard 라인: 일반 기내식 가격 경쟁력 확보를 통한 글로벌 M/S 확대',
            '2) TNR Premium 라인: 퍼스트/비즈니스 및 맞춤 특별식 고기능성 솔루션으로 수익성 극대화'
          ]
        },
        {
          title: '확장 로드맵',
          items: ['1단계: 라이프스타일 식품부문 시너지', '2단계: Tray Food(도시락, 병원식) 확장', '3단계: 우주 항공 식품 진입']
        }
      ],
      appendixDetails: {
        title: '상공 환경의 미각 인지 저하 데이터',
        description: 'Burdack-Freitag et al. (2011) 연구 근거: 저기압·저습도로 인해 단맛 45.3%, 짠맛 36.7% 둔화'
      }
    },
    english: {
      headline: 'FLY-VOR',
      subheadline: 'For [In-flight caterers], we address [In-flight taste loss and health concerns] through [a new TasteNrich lineup], delivering [an experience that brings together great taste and better health].',
      problemStatement: 'Low pressure & humidity in cabins dull taste buds (Sweetness -45.3%, Saltiness -36.7%), leading to over-salted unhealthy catering.',
      solutionStatement: 'CJ TasteNrich natural fermentation savory booster providing rich umami with reduced sodium and clean label certification.',
      businessOverview: [
        'Savory Boosting: Rich umami even at 35,000 feet cabin altitude.',
        'Clean Label: MSG-free, vegan, halal, kosher, and non-GMO.',
        'Sodium Reduction: Decreasing sodium while preserving saltiness perception.'
      ],
      onlyonePoints: {
        first: 'First clean-label taste modulation engineered specifically for airline catering.',
        best: '2-Track Strategy: Standard (M/S volume) & Premium (High margin specialty meals).',
        different: 'Scalable beyond airlines into hospital/institutional tray foods and aerospace food.'
      },
      expectedEffects: [
        'Securing recurring contracts with global airline caterers.',
        'Elevating passenger wellness and airline culinary reputation.'
      ],
      featuresOrRoadmap: [
        {
          title: '2-Track Market Strategy',
          items: ['1) TNR Standard for economy meals', '2) TNR Premium for business & wellness special meals']
        },
        {
          title: 'Expansion Roadmap',
          items: ['Food Synergy -> Institutional Tray Food -> Aerospace Food']
        }
      ],
      appendixDetails: {
        title: 'Sensory Science in Altitude',
        description: 'Scientific data by Burdack-Freitag et al. (2011) validates significant sensory threshold elevation in flight.'
      }
    },
    presentationDeckDraft: {
      title: 'FLY-VOR Pitch Deck',
      subtitle: '기내 미각 저하를 극복하는 CJ TasteNrich 항공 푸드 솔루션',
      slidesCount: 16,
      slidesSummary: [
        '1. In-flight Dining Pain Points & High Altitude Sensory Deficits',
        '2. Current Airline Solutions vs. Health-Conscious Passenger Demands',
        '3. TasteNrich Natural Umami & Sodium Reduction Bio-Solution',
        '4. 2-Track Airline Catering Business Model & Client Validation',
        '5. Financial Projections & Tray Food Expansion Roadmap'
      ]
    }
  },
  {
    teamNumber: 7,
    teamName: '7조',
    projectTitleKo: 'TTEOK-kIT',
    projectTitleEn: 'TTEOK-kIT',
    projectSubtitleEn: 'TTEOK-kIT: DIY Fresh Rice-Tteok Premix',
    membersKo: ['권나은', '김현수', '서동주', '이하진', '장경석', '차현빈', '한지원'],
    membersEn: ['Naeun Kwon', 'Hyunsoo Kim', 'Dongju Seo', 'Hajin Lee', 'Gyeongseok Jang', 'Hyunbin Cha', 'Jiwon Han'],
    categoryTag: '북미 K-푸드 상온 간편 떡 프리믹스',
    brochurePdfUrl: '/documents/team07/brochure.pdf',
    presentationKorPdfUrl: '/documents/team07/presentation(kor).pdf',
    presentationEngPdfUrl: '/documents/team07/presentation(eng).pdf',
    korean: {
      headline: 'TTEOK-kIT',
      subheadline: '[K문화에 관심이 많은 미국 Gen-Z]에게 [현지에서 접하기 어려운 Fresh한 떡]을 [간편한 쌀떡 프리믹스]로 제공하여 [떡을 자연스러운 한끼 식사로 즐기는 경험]을 선사한다.',
      problemStatement: '미국 내 K-떡 수요는 급증하고 있으나 현지에서 갓 만든 신선한 떡을 구하기 어렵고 냉동 떡은 식감이 딱딱하며 직접 만들기는 번거로움',
      solutionStatement: '물만 넣고 주물러 전자레인지 1분이면 갓 나온 쫄깃한 떡이 완성되는 올인원 파우치형 쌀떡 프리믹스',
      businessOverview: [
        '글루텐 프리: 쌀가루 기반으로 속 편하고 건강하게 즐기는 한 끼 식사',
        '간편 조리 (Zero-Mess): 별도 볼이나 조리도구 없이 스탠딩 지퍼백 파우치 하나로 반죽 및 압출 완성',
        '다양한 레시피로 활용: 떡볶이, 떡꼬치, 파스타 등 취향에 따라 DIY 활용'
      ],
      onlyonePoints: {
        first: '상온 유통 가능한 글로벌 최초 올인원 DIY 쌀떡 프리믹스 파우치',
        best: '냉동 떡의 딱딱함을 극복한 갓 쪄낸 듯한 쫄깃한 식감(Chewy & Fresh)',
        different: '콜드체인 비용을 획기적으로 절감하는 건식 프리믹스 유통 혁신'
      },
      expectedEffects: [
        'FI(Food Ingredients) 사업의 글로벌화: 국내 중심 소재 사업의 글로벌 B2C/B2B 확장',
        '유통 구조 최적화: 콜드체인 물류 부담 해소로 유통 기한 및 수출 비용 대폭 절감'
      ],
      featuresOrRoadmap: [
        {
          title: '이용 방법 (How to Make 4단계)',
          items: [
            '1. 물 넣기 (지퍼백 내부 계량선까지 주입)',
            '2. 프리믹스 넣고 주무르기 (Zero-Mess 파우치 반죽)',
            '3. 전자레인지 1분 조리',
            '4. 하단 절취선으로 떡 짜기 (두께 조절 가능)'
          ]
        },
        {
          title: '페인포인트 전환 (As-Is vs To-Be)',
          items: [
            '냉동떡 딱딱한 식감 -> 갓 나온 쫄깃한 떡의 식감',
            '콜드체인 유통 중심 -> 상온 유통을 통한 물류비 절감',
            '직접 조리의 번거로움 -> Zero-Mess 간편 DIY'
          ]
        }
      ],
      appendixDetails: {
        title: '다양한 활용 메뉴',
        description: 'K-떡볶이, 바삭한 떡꼬치, 퓨전 떡 파스타 등 글로벌 식단에 유연하게 접목 가능한 K-푸드 플랫폼'
      }
    },
    english: {
      headline: 'TTEOK-kIT',
      subheadline: 'To [US Gen-Z highly interested in K-culture], we provide [fresh tteok which is difficult to find locally], as an [comfortable rice-tteok premix] to present [the experience of enjoying tteok as a daily meal].',
      problemStatement: 'US consumers crave fresh chewy tteok, but frozen tteok loses texture and home cooking is complex.',
      solutionStatement: 'Zero-Mess standing zipper pouch premix: just add water, knead inside pouch, microwave for 1 min, and squeeze out fresh tteok.',
      businessOverview: [
        'Gluten-Free: Healthy and digestible meal made from pure rice flour.',
        'Zero-Mess: Knead and extrude directly from pouch without dishes.',
        'Versatile Culinary Canvas: Tteokbokki, skewers, pasta, and more.'
      ],
      onlyonePoints: {
        first: 'First ambient-storage ready-to-squeeze rice cake premix in North America.',
        best: 'Freshly steamed chewy texture bypassing frozen graininess.',
        different: 'Ambient distribution radically cutting cold-chain freight expenses.'
      },
      expectedEffects: [
        'Globalizing CJ\'s Food Ingredient (FI) division into high-margin consumer retail.',
        'Unlocking non-Asian mainstream retail shelves via ambient logistics.'
      ],
      featuresOrRoadmap: [
        {
          title: 'How to Make (4 Simple Steps)',
          items: ['1. Add Water', '2. Add Premix & Knead inside pouch', '3. Microwave for 1 Min', '4. Squeeze out fresh tteok']
        }
      ],
      appendixDetails: {
        title: 'Recipe Variations',
        description: 'Tteokbokki, Tteok Skewers, and Fusion Pasta.'
      }
    },
    presentationDeckDraft: {
      title: 'TTEOK-kIT Pitch Deck',
      subtitle: '미국 Gen-Z를 겨냥한 상온 간편조리 K-쌀떡 프리믹스',
      slidesCount: 15,
      slidesSummary: [
        '1. K-Food Global Popularity & Texture (Chewy) Megatrend',
        '2. Cold Chain Limitations of Frozen Rice Cakes',
        '3. Zero-Mess 1-Minute Pouch Technology & Sensory Benchmark',
        '4. Retail Channel Placement & Export Logistics Cost Savings',
        '5. Financial Projections & 5-Year Global Scale Roadmap'
      ]
    }
  }
];

export const INITIAL_EVALUATION_DOCS: DocumentItem[] = [
  {
    id: 'eval-system-link',
    title: 'CJ ONLYONE Fair 온라인 평가 시스템',
    subtitle: '실시간 심사위원 평가 및 점수 입력 웹사이트',
    type: 'link',
    category: 'evaluation',
    targetUrl: EVALUATION_SYSTEM_LINK,
    badgeText: '평가 웹사이트',
    status: 'available',
    formatTag: 'WEB LINK',
    language: 'KO',
    description: '심사위원이 조별 발표를 실시간으로 심사하고 평가 항목별 점수와 심사의견을 제출하는 공식 웹 플랫폼입니다.',
    date: '2026.09.01',
    evaluationDocType: 'link'
  },
  {
    id: 'eval-rubric-pdf',
    title: '2026 ONLYONE Fair 평가기준표',
    subtitle: 'ONLYONE 차별성 / 실행가능성 / 시장성 / 완성도 채점 기준',
    type: 'pdf',
    category: 'evaluation',
    badgeText: '평가 기준표',
    status: 'available',
    formatTag: 'PDF',
    language: 'KO',
    fileUrl: '/documents/eval/eval_rubric.pdf',
    originalFileName: '2026_ONLYONE_Fair_평가기준표.pdf',
    fileSize: '76 KB',
    date: '2026.09.01',
    description: '창의성(ONLYONE Point), 사업성/시장 기회, 실행 타당성, 발표 완성도 등 총 100점 만점의 세부 배점 및 심사 척도 안내서입니다.',
    evaluationDocType: 'rubric'
  },
  {
    id: 'eval-guide-pdf',
    title: '2026 ONLYONE Fair 평가 가이드',
    subtitle: '평가 일정, 심사 프로토콜 및 시스템 이용 가이드',
    type: 'pdf',
    category: 'evaluation',
    badgeText: '평가 가이드',
    status: 'available',
    formatTag: 'PDF',
    language: 'KO',
    fileUrl: '/documents/eval/eval_guide.pdf',
    originalFileName: 'eval_guide.pdf',
    fileSize: '470 KB',
    date: '2026.09.01',
    description: '현장 심사 진행 순서, 조별 Q&A 시간 배분, 온라인 시스템 로그인 및 결과 집계 방식 안내',
    evaluationDocType: 'guide'
  }
];
