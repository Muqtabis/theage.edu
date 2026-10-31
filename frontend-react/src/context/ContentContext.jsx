import React, { createContext, useContext, useState, useEffect } from 'react';

// Default content fallback ensuring no page breaks and instant rendering
export const defaultClasses = [
  // PRE-PRIMARY WING
  {
    id: 'playgroup',
    wing: 'pre-primary',
    wingName: 'Pre-Primary Wing (Early Childhood)',
    name: 'Playgroup / Toddlers',
    age: '2.5 – 3.5 Years',
    timings: '08:45 AM – 12:15 PM (Mon – Fri)',
    ratio: '1:12 (Teacher + Assistant)',
    overview: 'A warm, sensory-rich introduction to school life designed to cultivate social confidence, sensory-motor coordination, speech emergence, and emotional security through joyful discovery.',
    subjects: ['Sensory Exploration & Rhymes', 'Phonics Readiness', 'Circle Time & Stories', 'Gross & Fine Motor Play', 'Habit Formation & Etiquette'],
    milestones: ['Expresses feelings and basic needs articulately', 'Develops finger-pincer grip and motor coordination', 'Learns social sharing and turn-taking in peer groups', 'Recognizes primary colors, shapes, and everyday sounds'],
    assessment: 'Continuous observational portfolio shared with parents quarterly; strictly zero written testing.',
    coCurricular: ['Sensory Sand Play', 'Splash Play Corner', 'Puppet Theatre Studio', 'Music & Rhythmic Movement']
  },
  {
    id: 'nursery',
    wing: 'pre-primary',
    wingName: 'Pre-Primary Wing (Early Childhood)',
    name: 'Nursery',
    age: '3.5 – 4.5 Years',
    timings: '08:45 AM – 12:30 PM (Mon – Fri)',
    ratio: '1:15',
    overview: 'Nurturing curiosity with structured phonemic awareness, pre-writing strokes, early number comprehension (1 to 20), storytelling, and social emotional intelligence in interactive smart classrooms.',
    subjects: ['English Phonics & Rhymes', 'Kannada & Hindi Oral Exploration', 'Pre-Math Concepts & Counting (1-20)', 'General Awareness (Nature, Family, Seasons)', 'Art, Clay Modeling & Craft'],
    milestones: ['Letter-sound identification (A-Z)', 'Counting and sorting concrete objects up to 20', 'Independent personal self-care and hydration routines', 'Confident oral recitation of rhymes and story sequencing'],
    assessment: 'Continuous milestone tracker assessing 12 cognitive and socio-emotional parameters.',
    coCurricular: ['Storytelling Pavilion', 'Junior Rhythm Band', 'Mini Sports & Obstacle Course', 'Gardening & Nature Walks']
  },
  {
    id: 'lkg',
    wing: 'pre-primary',
    wingName: 'Pre-Primary Wing (Early Childhood)',
    name: 'Lower Kindergarten (LKG / Junior KG)',
    age: '4.5 – 5.5 Years',
    timings: '08:45 AM – 01:00 PM (Mon – Fri)',
    ratio: '1:16',
    overview: 'Bridging play with foundational literacy. Children develop steady pencil grip, write lowercase & uppercase alphabets, blend three-letter phonetic words (CVC), and understand early addition concepts.',
    subjects: ['English Language (Phonics & CVC Blends)', 'First Language (Kannada/Urdu/Hindi Oral & Letters)', 'Mathematics (1 to 50, Patterns, Shapes)', 'Environmental Studies (Living/Non-Living, Community)', 'Creative Arts & Music', 'Yoga & Physical Conditioning'],
    milestones: ['Fluent phonics reading of three-letter words', 'Writing uppercase and lowercase alphabets legibly', 'Basic addition with tactile counters and number lines', 'Awareness of community helpers, seasons, and hygiene'],
    assessment: 'Continuous Comprehensive Assessment (CCA) via pictorial worksheets and conversational reviews.',
    coCurricular: ['Show & Tell Speaking Hour', 'Clay Modeling & Dough Sculpting', 'Gymnastics & Free Play', 'Junior Science Experiments']
  },
  {
    id: 'ukg',
    wing: 'pre-primary',
    wingName: 'Pre-Primary Wing (Early Childhood)',
    name: 'Upper Kindergarten (UKG / Senior KG)',
    age: '5.5 – 6.5 Years',
    timings: '08:45 AM – 01:30 PM (Mon – Fri)',
    ratio: '1:18',
    overview: 'The preparatory graduation milestone equipping students for primary school. Emphasizes sight-word reading, short sentence construction, addition/subtraction, bilingual phonetics, and computer familiarity.',
    subjects: ['English Language (Sight Words, Short Sentences)', 'First Language (Kannada/Urdu/Hindi Aksharamale)', 'Mathematics (1 to 100, Simple Add/Sub, Time Basics)', 'General Science & Environmental Studies', 'Smart Screen Literacy & Educational Games', 'Visual Arts & Performing Expressions'],
    milestones: ['Reads beginner-level storybooks independently', 'Performs single-digit addition and subtraction mentally', 'Writes complete 4-word sentences with capital letters and full stops', 'Demonstrates public recitation poise and team collaboration'],
    assessment: 'Trimester appraisal evaluating linguistic fluency, logical reasoning, and motor dexterity.',
    coCurricular: ['Kindergarten Graduation Day', 'Rhyme & Choral Recitation', 'Junior STEM Tinkering', 'Track Athletics & Relay']
  },

  // PRIMARY SCHOOL WING
  {
    id: 'class-1',
    wing: 'primary',
    wingName: 'Primary School Wing (Classes I - V)',
    name: 'Class I (Grade 1)',
    age: '6 – 7 Years',
    timings: '08:30 AM – 03:30 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:20',
    overview: 'Entry into formal primary schooling. Students acquire classroom focus, notebook discipline, bilingual literacy, mental arithmetic, and scientific wonder under loving faculty mentorship.',
    subjects: ['English Language & Prose', 'Kannada (First Language)', 'Hindi / Second Language', 'Mathematics & Mental Arithmetic', 'Environmental Studies (EVS)', 'Computer Science (Tux Paint, Keyboard Mastery)', 'Art & Craft', 'Physical Education & Karate', 'Moral Science & Value Education'],
    milestones: ['Mastery of two-digit numbers, place values, and mental math', 'Creative sentence writing with correct spelling and punctuation', 'Understanding basic anatomy, plants, animals, and healthy habits', 'Basic computer hardware identification and mouse dexterity'],
    assessment: 'Continuous & Comprehensive Evaluation (CCE) with 4 Formative Assessments (FA1-FA4) and 2 Summative Assessments (SA1-SA2).',
    coCurricular: ['Junior Science Explorers', 'Calligraphy & Drawing', 'Chess & Table Tennis', 'Inter-Class Elocution']
  },
  {
    id: 'class-2',
    wing: 'primary',
    wingName: 'Primary School Wing (Classes I - V)',
    name: 'Class II (Grade 2)',
    age: '7 – 8 Years',
    timings: '08:30 AM – 03:30 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:22',
    overview: 'Strengthening reading comprehension, paragraph writing, multiplication tables, environmental curiosity, and civic awareness in a collaborative classroom environment.',
    subjects: ['English Literature & Grammar', 'Kannada (Kallola Textbook)', 'Hindi (Srujana)', 'Mathematics (Multiplication, Division basics, Money, Measurement)', 'Environmental Studies (Weather, Solar System, Water Cycle)', 'Computer Science (MS Paint, WordPad Basics)', 'Art, SUPW & Craft', 'Physical Education, Yoga & Athletics'],
    milestones: ['Writes cohesive paragraphs on familiar topics', 'Recites multiplication tables up to 10 effortlessly', 'Understands states of matter, weather, and water conservation', 'Reads library chapter books with expression'],
    assessment: 'Formative project portfolios, dictation reviews, mental math quizzes, and term evaluations.',
    coCurricular: ['Spelling Bee Championship', 'Eco-Club Nature Watch', 'Folk Dance & Vocal Music', 'Athletics & Kho-Kho']
  },
  {
    id: 'class-3',
    wing: 'primary',
    wingName: 'Primary School Wing (Classes I - V)',
    name: 'Class III (Grade 3)',
    age: '8 – 9 Years',
    timings: '08:30 AM – 03:30 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:22',
    overview: 'Nurturing independent thought, introduction to fractions and plane geometry, structured English essay drafting, local heritage studies, and Scratch block programming.',
    subjects: ['English Grammar, Vocabulary & Prose', 'First Language (Kannada/Urdu)', 'Second/Third Language (Hindi/English)', 'Mathematics (Fractions, Geometry, 4-Digit Numbers)', 'General Science (Living Organisms, Human Body, Soil & Rocks)', 'Social Studies (Local Heritage, Map Skills, Indian Culture)', 'Computer Science (Scratch Visual Programming)', 'Visual & Performing Arts', 'Physical Education & Team Sports'],
    milestones: ['Comprehends fractional parts and geometric shapes', 'Drafts personal letters and descriptive stories', 'Understands Karnataka regional geography and historical forts', 'Creates basic interactive animations in Scratch'],
    assessment: 'Periodic tests, classroom participation rubrics, science experiments, and terminal exams.',
    coCurricular: ['Robotics Workshop', 'Dramatic Skits & Plays', 'Badminton & Volleyball Clinics', 'Weekly Library Reading Circle']
  },
  {
    id: 'class-4',
    wing: 'primary',
    wingName: 'Primary School Wing (Classes I - V)',
    name: 'Class IV (Grade 4)',
    age: '9 – 10 Years',
    timings: '08:30 AM – 03:30 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:24',
    overview: 'Encouraging analytical inquiry, multi-step problem solving, experimental scientific models, Indian political geography, cyber awareness, and formal oratory debates.',
    subjects: ['English Literature & Expressive Writing', 'First Language Kannada', 'Second Language English/Hindi', 'Mathematics (Factors, Multiples, Decimals, Perimeter & Area)', 'Science (Ecology, Energy, Human Anatomy, Adaptations)', 'Social Studies (Indian States, Physical Features, Governance Intro)', 'Computer Applications (MS Office, Cyber Ethics)', 'Physical Education, Martial Arts & Sports', 'Civic Responsibilities & Ethics'],
    milestones: ['Solves multi-step real-world math word problems', 'Demonstrates scientific hypotheses through functional models', 'Delivers fluent bilingual presentations on social topics', 'Understands civic governance and environmental preservation'],
    assessment: 'State-aligned CCE framework with project exhibitions, open-ended evaluations, and term papers.',
    coCurricular: ['Science Fair Model Showcase', 'Inter-House Quiz Tournaments', 'Cricket & Football Leagues', 'Vocal Choir & Instrumental Music']
  },
  {
    id: 'class-5',
    wing: 'primary',
    wingName: 'Primary School Wing (Classes I - V)',
    name: 'Class V (Grade 5 - Primary Capstone)',
    age: '10 – 11 Years',
    timings: '08:30 AM – 03:45 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:25',
    overview: 'The capstone year of primary school. Cultivates rigorous academic independence, advanced arithmetic (percentages, averages, data handling), scientific method, and leadership acumen.',
    subjects: ['English Advanced Literature & Composition', 'First Language (Kannada - Nali-Kali/State Syllabi)', 'Second Language (English/Hindi)', 'Mathematics (Percentages, Unitary Method, Symmetry, Data Graphs)', 'General Science (Force & Work, Simple Machines, Ecosystems)', 'Social Studies (Indian Freedom Struggle, World Continents)', 'Computer Science (Algorithms, Web Basics, Python Intro)', 'Art, SUPW & Craftsmanship', 'Physical Education, Track Athletics & Yoga'],
    milestones: ['Attains Primary Graduation Milestone benchmarks', 'Excels in mental math speed and percentage calculations', 'Exhibits fluent bilingual public speaking and essay drafting', 'Leads collaborative science and community outreach projects'],
    assessment: 'Comprehensive annual examinations, board diagnostic diagnostics, and practical notebook vivas.',
    coCurricular: ['Junior Student Council Leadership', 'National Math Olympiad Coaching', 'State Heritage Field Excursions', 'Annual Track & Field Conclave']
  },

  // MIDDLE SCHOOL WING
  {
    id: 'class-6',
    wing: 'middle',
    wingName: 'Middle School Wing (Classes VI - VIII)',
    name: 'Class VI (Grade 6)',
    age: '11 – 12 Years',
    timings: '08:30 AM – 03:45 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:25',
    overview: 'The transition to subject-specialist faculty. Science bifurcates into Physics, Chemistry, and Biology laboratory modules. Social Science expands into Ancient History, Civics, and Physical Geography under the Three-Language Policy.',
    subjects: ['First Language (Kannada/Urdu - 100 Marks)', 'Second Language (English)', 'Third Language (Hindi)', 'Mathematics (Integers, Algebra Intro, Ratio & Proportion)', 'General Science (Physics, Chemistry & Biology modules with lab practicals)', 'Social Science (Ancient India, Social & Political Life, Physical Geography)', 'Computer Science & Python Coding', 'Physical & Health Education, Yoga', 'Art, Work Experience (SUPW) & Ethics'],
    milestones: ['Seamless adaptation to specialized departmental subject faculty', 'Formulates and solves linear algebraic equations with confidence', 'Performs hands-on microscopy and chemical tests in laboratories', 'Demonstrates written and spoken proficiency across three languages'],
    assessment: 'Karnataka DSEL continuous assessment scheme with Periodic Tests, Mid-Term Exams, and Annual Examinations.',
    coCurricular: ['Robotics & Electronics Tinkering', 'Junior Model United Nations', 'Competitive Badminton, Cricket & Volleyball', 'Literary & Debating Society']
  },
  {
    id: 'class-7',
    wing: 'middle',
    wingName: 'Middle School Wing (Classes VI - VIII)',
    name: 'Class VII (Grade 7)',
    age: '12 – 13 Years',
    timings: '08:30 AM – 03:45 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:25',
    overview: 'Fostering deep analytical rigor, geometric proofs, medieval world & Indian history, democratic state institutions, chemical reactions, and web design fundamentals.',
    subjects: ['First Language (Kannada/Urdu - Detailed Prose & Poetry)', 'Second Language (English Literature & Essay Writing)', 'Third Language (Hindi - Rashtrabhasha Curriculum)', 'Mathematics (Rational Numbers, Lines & Angles, Triangles, Exponents)', 'Science (Acids/Bases/Salts, Nutrition, Respiration, Motion & Time, Light)', 'Social Science (Medieval India, State Government, Environment, Water)', 'Computer Science (HTML5, CSS & Web Architecture)', 'Physical Education, Martial Arts & Athletics'],
    milestones: ['Applies geometric theorems and algebraic manipulations to complex problems', 'Conducts acid-base titrations and biological specimen dissections safely', 'Authors research papers on medieval Karnataka architecture and society', 'Publishes fully styled web pages using HTML5 and CSS'],
    assessment: 'Periodic unit tests, lab journal evaluations, viva-voce reviews, and formal terminal examinations.',
    coCurricular: ['National Science Day Exhibition', 'Inter-School Debate Championship', 'State Level Basketball & Track Meets', 'Scouts & Guides / NCC Orientation']
  },
  {
    id: 'class-8',
    wing: 'middle',
    wingName: 'Middle School Wing (Classes VI - VIII)',
    name: 'Class VIII (Grade 8 - Middle School Capstone)',
    age: '13 – 14 Years',
    timings: '08:30 AM – 03:45 PM (Mon – Fri) | 08:30 AM – 12:30 PM (Sat)',
    ratio: '1:26',
    overview: 'Middle school capstone year preparing scholars for high school board rigors. Covers advanced algebraic factorization, modern Indian history, Indian Constitution, cell biology, and AI fundamentals.',
    subjects: ['First Language (Kannada/Urdu Literature)', 'Second Language (English Core & Composition)', 'Third Language (Hindi Samanya)', 'Mathematics (Linear Equations, Quadrilaterals, Mensuration, Factorisation)', 'Science (Microorganisms, Metals & Non-metals, Pressure, Cell Structure)', 'Social Science (Modern India, Constitution, Judiciary, Industries)', 'Artificial Intelligence & Python Programming', 'Physical Education & Competitive Sports'],
    milestones: ['Complete mastery of board preparatory foundation syllabus', 'Comprehensive understanding of constitutional rights and judicial structure', 'Solves 3D solid mensuration and polynomial factorizations', 'Builds working machine learning decision trees in Python'],
    assessment: 'Karnataka State Common Examination / Board-Pattern Assessment with lab practical evaluations.',
    coCurricular: ['Youth Mock Parliament', 'NTSE & NMMS National Olympiad Training', 'Science Fair Innovation Gala', 'Inter-House Championship Trophy']
  },

  // SECONDARY SCHOOL WING
  {
    id: 'class-9',
    wing: 'secondary',
    wingName: 'Secondary School Wing (Classes IX - X)',
    name: 'Class IX (Grade 9 - Foundation to Board)',
    age: '14 – 15 Years',
    timings: '08:15 AM – 04:00 PM (Mon – Fri) | 08:15 AM – 01:00 PM (Sat)',
    ratio: '1:28',
    overview: 'The rigorous springboard for secondary board exams. Covers comprehensive syllabi across 6 board-tested subjects with weekly diagnostic clinics, specialized mentorship, and stream guidance.',
    subjects: ['First Language (Kannada/Urdu - 100 Marks)', 'Second Language (English - 100 Marks)', 'Third Language (Hindi - 100 Marks)', 'Mathematics (Number Systems, Polynomials, Coordinate Geometry, Triangles, Statistics - 100 Marks)', 'Science (Physics: Motion & Gravitation; Chemistry: Atoms & Molecules; Biology: Tissues & Health - 100 Marks)', 'Social Science (History, Political Science, Sociology, Geography, Economics - 100 Marks)', 'IT & AI Elective Practical (50 Marks)', 'Physical Education & Yoga (Graded A-D)'],
    milestones: ['Mastery of core theoretical and numerical foundations for Class 10', 'Independent execution of CBSE/State lab experiments in PCB', 'Development of speed, accuracy, and presentation for 3-hour board papers', 'Clear career orientation (Science vs Commerce vs Arts)'],
    assessment: '3 Periodic Tests (PT1-PT3), Mid-Term Board Simulation, and Pre-Annual Model Examination.',
    coCurricular: ['State Science Seminar & Project Competition', 'Model United Nations High Delegation', 'Career Counseling & Aptitude Symposium', 'Inter-School Sports League']
  },
  {
    id: 'class-10',
    wing: 'secondary',
    wingName: 'Secondary School Wing (Classes IX - X)',
    name: 'Class X (Grade 10 - SSLC Board Examination Year)',
    age: '15 – 16 Years',
    timings: '08:15 AM – 04:30 PM (Mon – Fri with clinics) | 08:15 AM – 01:00 PM (Sat)',
    ratio: '1:28',
    overview: 'The pinnacle of secondary education culminating in the Karnataka School Examination and Assessment Board (KSEAB) SSLC Examination. Full syllabus completed by November, followed by three Pre-Board rounds, personalized remedial coaching, and an unbroken 100% pass track record.',
    subjects: ['First Language (Kannada/Urdu - Texts, Grammar, Composition - 100 Marks)', 'Second Language (English - Literature, Comprehension, Essays - 100 Marks)', 'Third Language (Hindi - Prose, Poetry, Grammar - 100 Marks)', 'Mathematics (Quadratic Equations, AP, Trigonometry, Circles, Coordinate Geometry, Surface Areas - 100 Marks)', 'Science (Physics: Light, Electricity; Chemistry: Carbon Compounds, Reactions; Biology: Heredity, Life Processes - 100 Marks)', 'Social Science (Contemporary World, Indian Constitution, Geography & Mapping, Economic Sectors - 100 Marks)', 'Practical Science Journals & Viva Voce (Internal Assessment - 20 Marks per subject)'],
    milestones: ['100% Board Pass Target with high distinction and state ranking benchmarks', 'Comprehensive completion of 10+ years solved board question papers', 'High psychological resilience and time-management under examination conditions', 'Graduation Valedictory and lifelong Alumni Association induction'],
    assessment: 'KSEAB SSLC State Board Examination preceded by 3 rigorous internal Pre-Board Model Examinations.',
    coCurricular: ['Valedictory Assembly & Candle Lighting', 'Personality & Leadership Conclave', 'Higher Secondary Stream Selection Clinics', 'Alumni Mentorship Roundtables']
  },

  // SENIOR SECONDARY / PRE-UNIVERSITY WING
  {
    id: 'class-11-12-science',
    wing: 'senior-secondary',
    wingName: 'Senior Secondary / PUC Wing (Classes XI - XII)',
    name: 'Classes XI & XII - Science Stream (PCMB / PCMC)',
    age: '16 – 18 Years',
    timings: '08:00 AM – 04:30 PM (Mon – Fri) | 08:00 AM – 01:30 PM (Sat)',
    ratio: '1:25',
    overview: 'Pre-University and Senior Secondary education engineered for competitive academic supremacy (KCET, NEET, JEE Mains). Advanced Physics, Chemistry, Biology, Mathematics, and Computer Science laboratories with dedicated lecture series and weekly test modules.',
    subjects: ['Physics (Mechanics, Waves, Thermodynamics, Electromagnetism, Optics, Modern Physics)', 'Chemistry (Physical, Organic & Inorganic Chemistry, Coordination Compounds)', 'Mathematics (Calculus, Linear Programming, 3D Geometry, Vectors, Probability)', 'Biology / Computer Science (Botany, Zoology, Genetics / Python, SQL, Networking)', 'English Core (Advanced Rhetoric & Literature)', 'Kannada / Hindi (Regional Language Elective)'],
    milestones: ['Top distinction scores in Karnataka PUC / Senior Secondary Board Exams', 'Competitive readiness for KCET, NEET, and JEE entrance examinations', 'Rigorous experimental mastery across university-grade science laboratories', 'Acceptances into premier engineering, medical, and research institutes'],
    assessment: 'PUC Board Examinations, Board Practical Examinations, and Weekly Objective NEET/JEE Simulation Tests.',
    coCurricular: ['National Science Olympiads', 'Robotics & AI Innovation Lab', 'Hospital & Tech Campus Research Visits', 'Annual Inter-Collegiate Athletic Meet']
  },
  {
    id: 'class-11-12-commerce',
    wing: 'senior-secondary',
    wingName: 'Senior Secondary / PUC Wing (Classes XI - XII)',
    name: 'Classes XI & XII - Commerce Stream (SEBA / CEBA)',
    age: '16 – 18 Years',
    timings: '08:00 AM – 03:45 PM (Mon – Fri) | 08:00 AM – 01:00 PM (Sat)',
    ratio: '1:25',
    overview: 'Comprehensive commercial and economic training preparing future chartered accountants, corporate finance leaders, economists, and entrepreneurs. Covers double-entry accounting, macroeconomics, business management, and corporate regulations.',
    subjects: ['Accountancy (Financial Statements, Partnership, Company Accounting, Cash Flow)', 'Business Studies (Principles of Management, Financial Markets, Marketing)', 'Economics (Microeconomics, Macroeconomics, Indian Economic Development)', 'Statistics / Computer Applications / Applied Mathematics', 'English Core (Business Communication & Literature)', 'Kannada / Hindi Elective'],
    milestones: ['CA Foundation, CS Executive, and CMA entry examination readiness', 'Live stock market simulations and financial balance sheet analysis', 'In-depth case study evaluations of leading Indian and global corporations', 'High placement rate into top university B.Com, BBA, and Economics programs'],
    assessment: 'PUC Board Examinations, Project Dissertations, Accountancy Practical Vivas, and Term Examinations.',
    coCurricular: ['Commerce & Finance Society', 'Young Entrepreneur Shark Tank Pitch', 'Banking & Taxation Filing Workshops', 'Inter-Collegiate Business Fests']
  },
  {
    id: 'class-11-12-arts',
    wing: 'senior-secondary',
    wingName: 'Senior Secondary / PUC Wing (Classes XI - XII)',
    name: 'Classes XI & XII - Humanities & Arts Stream',
    age: '16 – 18 Years',
    timings: '08:00 AM – 03:45 PM (Mon – Fri) | 08:00 AM – 01:00 PM (Sat)',
    ratio: '1:25',
    overview: 'Cultivating critical intellectuals, civil service aspirants, lawyers, journalists, and policy makers through rigorous study of Indian and world history, political systems, sociological dynamics, and literary criticism.',
    subjects: ['History (Themes in Indian History I, II, III, World Civilizations)', 'Political Science (Contemporary World Politics, Indian Democratic Politics)', 'Sociology (Structure of Indian Society, Social Movements & Change)', 'Economics / Psychology / Logic', 'English Core (Advanced Rhetoric & Composition)', 'Kannada / Hindi Elective'],
    milestones: ['UPSC / KPSC Civil Services Foundation & CLAT Law Entrance orientation', 'Field surveys and original sociological monographs', 'Parliamentary debate excellence and national MUN representation', 'Admissions to prestigious national law universities and central degree colleges'],
    assessment: 'PUC Board Examinations, Research Dissertations, and Analytical Seminar Papers.',
    coCurricular: ['Youth Parliament & Legal Aid Clinic', 'Model United Nations High Commission', 'Creative Writing & Literary Gazette', 'Social Impact Field Expeditions']
  }
];

export const defaultContent = {
  general: {
    schoolName: 'The Age School',
    tagline: 'Future Ready. Values Driven.',
    admissionsBadge: 'Admissions Open 2025-26',
    phone: '(+91) 12345 67890',
    email: 'info@theageschool.edu',
    address: 'Basavakalyan, Bidar Dist., Karnataka, India - 585327',
    affiliation: 'Karnataka State Board Recognized',
    affiliationCode: 'Code: 29050220001',
    udiseCode: '29050220001',
    establishedYear: '2012',
    schoolHours: '08:30 AM – 03:45 PM (Mon - Fri) | 08:30 AM – 12:30 PM (Sat)',
    noticeMarquee: 'ADMISSIONS OPEN FOR SESSION 2026-2027: Pre-Nursery to Grade XII (Science & Commerce) • Schedule Campus Tour • SSLC Board Preparatory Clinics Commencing Soon',
    socialFacebook: 'https://facebook.com',
    socialTwitter: 'https://twitter.com',
    socialInstagram: 'https://instagram.com',
    socialLinkedin: 'https://linkedin.com',
    googleMapsIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.646473634086!2d76.9455!3d17.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce89ac2335f60d%3A0x286358316719266e!2sBasavakalyan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  home: {
    heroBadge: 'Admissions Open 2025-26',
    heroTitleLine1: 'Future Ready.',
    heroTitleHighlight: 'Values Driven.',
    heroSubtitle: 'A premier K-10 institution nurturing curiosity, character, and leadership in the heart of Karnataka.',
    heroImageUrl: '',
    ctaApplyText: 'Apply Now',
    ctaTourText: 'Explore Campus',
    statsStudents: '500+',
    statsPassRate: '100%',
    statsFaculty: '35+',
    statsYears: '12+',
    bento1Title: 'Innovation Lab',
    bento1Desc: 'State-of-the-art facilities for Robotics, Coding, and STEM learning. We prepare students for jobs of tomorrow.',
    bento2Title: 'Holistic Growth',
    bento2Desc: 'Sports, Arts, and Academics in perfect balance for complete development.',
    bento2Tags: ['Yoga & Meditation', 'Visual Arts', 'Competitive Sports', 'Public Speaking'],
    bento3Title: 'Global Perspective',
    bento3Desc: 'Curriculum designed for the modern world with critical inquiry.',
    bento4Title: 'Student Care',
    bento4Desc: 'Individual mentorship, mental health support & safe nurturing environment.',
  },
  about: {
    heroBadge: 'Est. 2012',
    heroTitle: 'Education for a changing world.',
    heroSubtitle: "At The Age School, we don't just teach the curriculum. We cultivate character, creativity, and the courage to lead in a global society.",
    heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    presidentName: 'Dr. Sarah Mitchell',
    presidentRole: 'President',
    presidentQuote: '"Lighting the fire of curiosity."',
    presidentMessage: 'Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.',
    presidentImageUrl: 'https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    vpName: 'Mr. Alex Chen',
    vpRole: 'Vice President',
    vpQuote: '"Embracing tomorrow\'s challenges."',
    vpMessage: 'As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.',
    vpImageUrl: 'https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    timeline: [
      {
        year: '2012',
        title: 'Foundation',
        desc: 'The Age School opened its doors with 50 students and a vision for progressive education in Karnataka.',
      },
      {
        year: '2016',
        title: 'Campus Expansion',
        desc: 'Added modern science laboratories, high-speed computer center, and expanded athletic grounds.',
      },
      {
        year: '2024',
        title: 'Smart Learning & Global Reach',
        desc: 'Integrated interactive digital classrooms, STEM robotics curriculum, and international student exchange modules.',
      },
    ],
  },
  admissions: {
    heroBadge: 'ADMISSIONS OPEN 2025-26',
    heroTitle: 'Begin Your Journey Here',
    heroSubtitle: 'We are looking for curious minds and kind hearts. Begin your application process with confidence.',
    fees: [
      {
        grade: 'Pre-Primary Wing (ECCE)',
        range: 'Nursery, LKG & UKG',
        annual: '12,000',
        materials: '₹ 2,500',
        highlight: false,
      },
      {
        grade: 'Primary School Wing',
        range: 'Classes I – V (Grades 1 to 5)',
        annual: '15,000',
        materials: '₹ 3,500',
        highlight: false,
      },
      {
        grade: 'Middle School Wing',
        range: 'Classes VI – VIII (Grades 6 to 8)',
        annual: '18,000',
        materials: '₹ 4,000',
        highlight: true,
      },
      {
        grade: 'Secondary School (SSLC Board)',
        range: 'Classes IX – X (Grades 9 & 10)',
        annual: '25,000',
        materials: '₹ 5,000',
        highlight: false,
      },
      {
        grade: 'Senior Secondary / PUC Science',
        range: 'Classes XI – XII (PCMB / PCMC)',
        annual: '32,000',
        materials: '₹ 6,500',
        highlight: false,
      },
      {
        grade: 'Senior Secondary / PUC Commerce & Arts',
        range: 'Classes XI – XII (Commerce & Humanities)',
        annual: '28,000',
        materials: '₹ 5,500',
        highlight: false,
      },
    ],
    steps: [
      {
        id: 1,
        title: 'Inquire & Visit',
        desc: 'Explore our website and schedule a virtual or in-person tour to see our campus.',
      },
      {
        id: 2,
        title: 'Submit Application',
        desc: 'Complete our online application form and submit the required documentation.',
      },
      {
        id: 3,
        title: 'Student Assessment',
        desc: 'Prospective students participate in a friendly assessment and faculty interview.',
      },
      {
        id: 4,
        title: 'Final Decision & Welcome',
        desc: 'Admissions confirmation letter issued and welcome kit provided for smooth onboarding.',
      },
    ],
    financialAidTitle: 'Financial Aid & Scholarships',
    financialAidDesc: 'We believe financial barriers should not prevent a child from receiving quality education. Need-based and merit-based scholarships are available.',
  },
  academics: {
    heroBadge: 'Academic Excellence',
    heroTitle: 'Curriculum & Class Directory',
    heroSubtitle: "From early childhood steps in Pre-Nursery to secondary board mastery and senior PUC streams, explore every grade's learning outcomes, daily timings, and subjects.",
    levels: [
      {
        id: 'pre-primary',
        title: 'Pre-Primary Wing (ECCE - Nursery to UKG)',
        desc: 'Early childhood foundation emphasizing sensory-motor discovery, phonics, number sense, and play-based socialization.',
        focus: ['Phonics & Pre-Math', 'Sensory Play', 'Social Communication'],
      },
      {
        id: 'primary',
        title: 'Primary School Wing (Classes I - V)',
        desc: 'Foundational literacy, three-language familiarity, arithmetic, environmental sciences, and moral education.',
        focus: ['Foundational Literacy', 'Mental Math', 'EVS & Digital Skills'],
      },
      {
        id: 'middle',
        title: 'Middle School Wing (Classes VI - VIII)',
        desc: 'Transitional phase emphasizing specialized STEM laboratory sciences, modern history, and analytical problem-solving.',
        focus: ['Composite Science Labs', 'Algebra & Geometry', 'Three-Language Policy'],
      },
      {
        id: 'secondary',
        title: 'Secondary School Wing (Classes IX - X)',
        desc: 'Rigorous Karnataka SSLC Board curriculum preparing scholars for secondary board examinations with 100% distinction track record.',
        focus: ['SSLC Board Prep', 'Physics, Chemistry & Biology Labs', 'Career Guidance'],
      },
      {
        id: 'senior-secondary',
        title: 'Senior Secondary / Pre-University (Classes XI - XII)',
        desc: 'Pre-University preparation across Science, Commerce, and Arts streams with integrated competitive entrance guidance.',
        focus: ['PCMB / PCMC Science', 'Commerce & Accountancy', 'Humanities & CLAT Prep'],
      },
    ],
    classes: defaultClasses,
  },
  studentLife: {
    heroBadge: 'Campus Experience',
    heroTitle: 'Life at The Age School',
    heroSubtitle: 'A vibrant community where passions are ignited, friendships are forged, and memories are captured forever.',
    activities: [
      {
        title: 'Athletics & Sports',
        desc: 'Teamwork, sportsmanship, and healthy competition in athletics, football, basketball, and gymnastics.',
        tags: ['Basketball', 'Football', 'Athletics', 'Yoga'],
      },
      {
        title: 'Arts & Creativity',
        desc: 'From the theatre stage to the painting studio, creativity thrives here. Express yourself through color and sound.',
        tags: ['Drama', 'Visual Arts', 'Vocal Choir', 'Handicrafts'],
      },
      {
        title: 'Clubs & Community',
        desc: 'Debate, robotics, community service, and dozens more. Find your passion and lead the way.',
        tags: ['Robotics Lab', 'Debate Society', 'Eco-Club', 'Science Olympiad'],
      },
    ],
  },
};

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          // Merge with defaults to guarantee all keys exist
          setContent({
            general: { ...defaultContent.general, ...(data.general || {}) },
            home: { ...defaultContent.home, ...(data.home || {}) },
            about: { ...defaultContent.about, ...(data.about || {}) },
            admissions: { 
              ...defaultContent.admissions, 
              ...(data.admissions || {}),
              fees: (data.admissions && Array.isArray(data.admissions.fees) && data.admissions.fees.length > 0)
                ? data.admissions.fees
                : defaultContent.admissions.fees,
            },
            academics: { 
              ...defaultContent.academics, 
              ...(data.academics || {}),
              classes: (data.academics && Array.isArray(data.academics.classes) && data.academics.classes.length > 0)
                ? data.academics.classes
                : defaultContent.academics.classes,
            },
            studentLife: { ...defaultContent.studentLife, ...(data.studentLife || {}) },
          });
        }
      }
    } catch (err) {
      console.warn('Using default content (API unreachable or offline):', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const saveContent = async (updatedData) => {
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const saved = await res.json();
        setContent((prev) => ({
          ...prev,
          ...saved,
        }));
        return { success: true, data: saved };
      } else {
        const err = await res.json();
        return { success: false, error: err.message || 'Failed to save' };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent: fetchContent, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return {
      content: defaultContent,
      loading: false,
      refreshContent: () => {},
      saveContent: async () => ({ success: false }),
    };
  }
  return ctx;
};
