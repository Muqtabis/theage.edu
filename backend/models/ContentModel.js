const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main_site_content',
      unique: true,
    },
    general: {
      schoolName: { type: String, default: 'The Age School' },
      tagline: { type: String, default: 'Future Ready. Values Driven.' },
      admissionsBadge: { type: String, default: 'Admissions Open 2025-26' },
      phone: { type: String, default: '(+91) 12345 67890' },
      email: { type: String, default: 'info@theageschool.edu' },
      address: { type: String, default: 'Basavakalyan, Bidar Dist., Karnataka, India - 585327' },
      affiliation: { type: String, default: 'State Board' },
      affiliationCode: { type: String, default: 'Code: 29050220001' },
      socialFacebook: { type: String, default: 'https://facebook.com' },
      socialTwitter: { type: String, default: 'https://twitter.com' },
      socialInstagram: { type: String, default: 'https://instagram.com' },
      socialLinkedin: { type: String, default: 'https://linkedin.com' },
      googleMapsIframe: { 
        type: String, 
        default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.646473634086!2d76.9455!3d17.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce89ac2335f60d%3A0x286358316719266e!2sBasavakalyan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin' 
      }
    },
    home: {
      heroBadge: { type: String, default: 'Admissions Open 2025-26' },
      heroTitleLine1: { type: String, default: 'Future Ready.' },
      heroTitleHighlight: { type: String, default: 'Values Driven.' },
      heroSubtitle: { 
        type: String, 
        default: 'A premier K-10 institution nurturing curiosity, character, and leadership in the heart of Karnataka.' 
      },
      heroImageUrl: { type: String, default: '' },
      ctaApplyText: { type: String, default: 'Apply Now' },
      ctaTourText: { type: String, default: 'Explore Campus' },
      statsStudents: { type: String, default: '500+' },
      statsPassRate: { type: String, default: '100%' },
      statsFaculty: { type: String, default: '35+' },
      statsYears: { type: String, default: '12+' },
      bento1Title: { type: String, default: 'Innovation Lab' },
      bento1Desc: { 
        type: String, 
        default: 'State-of-the-art facilities for Robotics, Coding, and STEM learning. We prepare students for the future.' 
      },
      bento2Title: { type: String, default: 'Holistic Growth' },
      bento2Desc: { type: String, default: 'Sports, Arts, and Academics in perfect balance.' },
      bento2Tags: { 
        type: [String], 
        default: ['Yoga & Meditation', 'Visual Arts', 'Competitive Sports', 'Public Speaking'] 
      },
      bento3Title: { type: String, default: 'Global Perspective' },
      bento3Desc: { type: String, default: 'Curriculum designed for the modern world.' },
      bento4Title: { type: String, default: 'Student Care' },
      bento4Desc: { type: String, default: 'Mental health support & safe, nurturing environment.' },
    },
    about: {
      heroBadge: { type: String, default: 'Est. 2012' },
      heroTitle: { type: String, default: 'Education for a changing world.' },
      heroSubtitle: { 
        type: String, 
        default: 'At The Age School, we don\'t just teach the curriculum. We cultivate character, creativity, and the courage to lead in a global society.' 
      },
      heroImageUrl: { 
        type: String, 
        default: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
      },
      presidentName: { type: String, default: 'Dr. Sarah Mitchell' },
      presidentRole: { type: String, default: 'President' },
      presidentQuote: { type: String, default: '"Lighting the fire of curiosity."' },
      presidentMessage: { 
        type: String, 
        default: 'Welcome to The Age School. We believe that education is not merely about academic rigor, but about shaping character. Our mission is to provide stability, values, and the skills needed to navigate the future.' 
      },
      presidentImageUrl: { 
        type: String, 
        default: 'https://images.unsplash.com/photo-1544531327-c820ad9d46dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' 
      },
      vpName: { type: String, default: 'Mr. Alex Chen' },
      vpRole: { type: String, default: 'Vice President' },
      vpQuote: { type: String, default: '"Embracing tomorrow\'s challenges."' },
      vpMessage: { 
        type: String, 
        default: 'As Vice President, I emphasize inclusion and innovation. Our campus is a place where every student is known, valued, and challenged to be their best self daily.' 
      },
      vpImageUrl: { 
        type: String, 
        default: 'https://images.unsplash.com/photo-1574023605634-6d9ff7b5a840?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' 
      },
      timeline: {
        type: [
          {
            year: String,
            title: String,
            desc: String,
          }
        ],
        default: [
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
        ]
      }
    },
    admissions: {
      heroBadge: { type: String, default: 'ADMISSIONS OPEN 2025-26' },
      heroTitle: { type: String, default: 'Begin Your Journey Here' },
      heroSubtitle: { 
        type: String, 
        default: 'We are looking for curious minds and kind hearts. Begin your application process with confidence.' 
      },
      fees: {
        type: [
          {
            grade: String,
            range: String,
            annual: String,
            materials: String,
            highlight: Boolean,
          }
        ],
        default: [
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
        ]
      },
      steps: {
        type: [
          {
            id: Number,
            title: String,
            desc: String,
          }
        ],
        default: [
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
        ]
      },
      financialAidTitle: { type: String, default: 'Financial Aid & Scholarships' },
      financialAidDesc: { 
        type: String, 
        default: 'We believe financial barriers should not prevent a child from receiving quality education. Need-based and merit-based scholarships are available.' 
      }
    },
    academics: {
      heroBadge: { type: String, default: 'Academic Excellence' },
      heroTitle: { type: String, default: 'Curriculum & Resources' },
      heroSubtitle: { 
        type: String, 
        default: 'From kindergarten steps to 10th grade leaps, we structure our learning to empower every student\'s unique journey.' 
      },
      levels: {
        type: [
          {
            id: String,
            title: String,
            desc: String,
            focus: [String],
          }
        ],
        default: [
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
        ]
      }
    },
    studentLife: {
      heroBadge: { type: String, default: 'Campus Experience' },
      heroTitle: { type: String, default: 'Life at The Age School' },
      heroSubtitle: { 
        type: String, 
        default: 'A vibrant community where passions are ignited, friendships are forged, and memories are captured forever.' 
      },
      activities: {
        type: [
          {
            title: String,
            desc: String,
            tags: [String],
          }
        ],
        default: [
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
        ]
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', ContentSchema);
