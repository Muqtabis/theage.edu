import React, { createContext, useContext, useState, useEffect } from 'react';

// Default content fallback ensuring no page breaks and instant rendering
export const defaultContent = {
  general: {
    schoolName: 'The Age School',
    tagline: 'Future Ready. Values Driven.',
    admissionsBadge: 'Admissions Open 2025-26',
    phone: '(+91) 12345 67890',
    email: 'info@theageschool.edu',
    address: 'Basavakalyan, Bidar Dist., Karnataka, India - 585327',
    affiliation: 'State Board',
    affiliationCode: 'Code: 29050220001',
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
        grade: 'Primary School',
        range: 'Grades 1-5',
        annual: '15,000',
        materials: '₹ 3,500',
        highlight: false,
      },
      {
        grade: 'Middle School',
        range: 'Grades 6-8',
        annual: '18,000',
        materials: '₹ 4,000',
        highlight: true,
      },
      {
        grade: 'High School',
        range: 'Grades 9-10',
        annual: '25,000',
        materials: '₹ 5,000',
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
    heroTitle: 'Curriculum & Resources',
    heroSubtitle: "From kindergarten steps to 10th grade leaps, we structure our learning to empower every student's unique journey.",
    levels: [
      {
        id: 'lower',
        title: 'Lower School (Grades K-5)',
        desc: 'Focus on foundational literacy, numeracy, and social-emotional skills through hands-on learning and personalized attention.',
        focus: ['Foundational Skills', 'Creative Arts', 'Digital Literacy'],
      },
      {
        id: 'primary',
        title: 'Primary School (Grades 6-8)',
        desc: 'Transitional phase emphasizing critical thinking, problem-solving, and subject specialization.',
        focus: ['Critical Thinking', 'Integrated STEM', 'Leadership Programs'],
      },
      {
        id: 'high',
        title: 'High School (Grades 9-10)',
        desc: 'College preparatory curriculum with advanced coursework, career counseling, and rigorous external examination readiness.',
        focus: ['Exam Prep', 'Career Counseling', 'Advanced Research'],
      },
    ],
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
            admissions: { ...defaultContent.admissions, ...(data.admissions || {}) },
            academics: { ...defaultContent.academics, ...(data.academics || {}) },
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
