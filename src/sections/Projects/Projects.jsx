import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Magnetic from '../../components/Magnetic/Magnetic';
import './Projects.css';


const projects = [
  {
    id: 1,
    title: 'INDICT',
    subtitle: 'Modern Social Blogging & Community Platform',
    desc: 'A modern MERN-stack social media and blogging platform with advanced content sharing, interactive community features, and immersive user experiences.',

    longDesc: 'INDICT is a full stack social blogging and content-sharing platform inspired by modern social applications like Instagram and advanced blogging ecosystems. The platform allows users to create posts, publish blogs, upload images, explore dynamic feeds, and engage with community-driven content in real time. Built using the MERN stack architecture, it integrates secure JWT authentication, Cloudinary-powered media uploads, scalable REST APIs, and responsive frontend experiences enhanced with smooth animations and modern UI interactions.',

    tech: [
      'React.js',
      'Vite',
      'Framer Motion',
      'MongoDB',
      'Express.js',
      'Node.js',
      'JWT Authentication',
      'Cloudinary',
      'REST APIs',
      'CSS3',
      'Redux Toolkit',
      'Responsive Design'
    ],

    link: 'https://indict-frontend.vercel.app/',

    github: 'https://github.com/abhinavDir/Indict-frontend',

    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&auto=format&fit=crop&q=50&ixlib=rb-4.0.3',
    gridClass: 'bento-large',

    features: [
      'Advanced social media style posting and content sharing system',
      'Interactive blogging platform with modern article publishing',
      'JWT-secured authentication and protected user management',
      'Cloudinary-powered media upload and image optimization'
    ]
  },
  {
    id: 2,
    title: 'FuxionX',
    subtitle: 'Full-Stack Ed-Tech & Course Commerce Platform',
    desc: 'A premium MERN-stack ed-tech marketplace with course discovery, Razorpay payment integration, and an immersive learning dashboard experience.',

    longDesc: 'FuxionX is a full-stack education technology and course commerce platform built with the MERN stack. Students can browse a rich catalog of courses, enroll via secure Razorpay-powered checkout, and access learning content through a clean, responsive dashboard. The platform features JWT-secured authentication, Cloudinary-powered media storage for course thumbnails and videos, REST API-driven backend architecture, and a polished React frontend using the Quicksand font for a friendly, engaging feel. FuxionX brings together modern payment infrastructure and seamless UX to deliver a premium online learning marketplace.',

    tech: [
      'React.js',
      'Vite',
      'MongoDB',
      'Express.js',
      'Node.js',
      'JWT Authentication',
      'Razorpay Payments',
      'Cloudinary',
      'REST APIs',
      'CSS3',
      'Responsive Design'
    ],

    link: 'https://delta-beige-rho.vercel.app/',

    github: '#',

    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=50&ixlib=rb-4.0.3',
    gridClass: 'bento-large',

    features: [
      'Razorpay-integrated secure course purchase and payment checkout',
      'JWT-secured student authentication and protected course access',
      'Cloudinary-powered media management for course content delivery',
      'Full-stack MERN architecture with responsive course marketplace UI'
    ]
  },
  {
    id: 3,
    title: 'Edur AI',
    subtitle: 'AI-Powered E-Learning & Exam Preparation Platform',
    desc: 'A modern AI-driven education platform designed for personalized learning, intelligent exam preparation, and interactive student experiences.',

    longDesc: 'Edur AI is a futuristic educational platform focused on transforming digital learning through AI-powered tools and interactive study experiences. Inspired by modern learning ecosystems, the platform helps students prepare for competitive exams using intelligent learning agents, personalized study recommendations, essay evaluation systems, progress tracking, and dynamic educational content. Built with a modern frontend architecture and immersive UI interactions, the platform delivers a smooth and responsive learning experience optimized for accessibility, performance, and real-time engagement.',

    tech: [
      'React.js',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Framer Motion',
      'GSAP',
      'JWT Authentication',
      'Cloudinary',
      'REST APIs',
      'AI Integrations',
      'Responsive Design'
    ],

    link: 'https://edur-ai.vercel.app/',

    github: '#',

    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=50&ixlib=rb-4.0.3',

    gridClass: 'bento-medium',

    features: [
      'AI-powered personalized learning and exam preparation system',
      'Interactive essay evaluation and intelligent study assistance',
      'Dynamic educational dashboards with modern UI interactions',
      'Responsive MERN-stack architecture with immersive user experience'
    ]
  },
  {
    id: 4,
    title: 'AI Chatbot',
    subtitle: 'Modern Conversational AI Interface',
    desc: 'A simple and responsive AI chatbot application built with React.js, delivering real-time conversational experiences through a clean modern interface.',

    longDesc: 'AI Chatbot is a lightweight conversational web application developed using React.js with a focus on smooth user interaction and modern UI design. The platform allows users to communicate with an AI assistant through a responsive chat interface featuring real-time messaging, dynamic response rendering, and clean conversational layouts. Built with a minimalist frontend architecture, the project emphasizes simplicity, performance, and intuitive user experience while showcasing modern React component structuring and interactive frontend development.',

    tech: [
      'React.js',
      'JavaScript',
      'CSS3',
      'Vite',
      'Responsive Design',
      'REST APIs',
      'Frontend Development',
      'Modern UI/UX'
    ],

    link: 'https://ai-chatbot-five-chi.vercel.app/',

    github: '#',

    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=50&ixlib=rb-4.0.3',
    gridClass: 'bento-medium',

    features: [
      'Real-time conversational chat interface',
      'Modern responsive React.js frontend architecture',
      'Dynamic AI response rendering and messaging system',
      'Clean UI design optimized for smooth user interaction'
    ]
  },
  {
    id: 5,
    title: 'Smart Attendance UI',
    subtitle: '3D Futuristic Attendance Management Platform',
    desc: 'A modern 3D attendance management interface built with Next.js featuring immersive animations, futuristic dashboards, and interactive user experiences.',

    longDesc: 'Smart Attendance UI is a visually immersive attendance management platform designed with futuristic 3D-inspired interfaces and modern frontend architecture. Built using Next.js, the platform focuses on delivering a premium dashboard experience with smooth transitions, animated layouts, interactive attendance tracking systems, and responsive user workflows. The interface integrates cinematic motion effects, glassmorphism components, dynamic dashboard cards, and modern UI interactions to create a next-generation attendance management experience optimized for performance and usability.',

    tech: [
      'Next.js',
      'React.js',
      'JavaScript',
      'CSS3',
      'GSAP',
      'Framer Motion',
      'Three.js',
      'Responsive Design',
      'Modern UI/UX',
      '3D Animations'
    ],

    link: 'https://smart-attendence-ui.vercel.app/',

    github: '#',

    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&auto=format&fit=crop&q=50&ixlib=rb-4.0.3',

    gridClass: 'bento-wide',

    features: [
      'Immersive 3D-inspired dashboard and attendance visualization',
      'Modern Next.js architecture with responsive UI experiences',
      'Smooth GSAP and Framer Motion powered interactions',
      'Futuristic glassmorphism interface with animated components'
    ]
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Spotlights local coordinate tracker
  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`project-${id}`);
    if (!card) return;
    const { left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="neon-glow-circle circle-projects" style={{ top: '10%', right: '10%', width: '450px', height: '450px', background: 'var(--secondary-color)', opacity: 0.08 }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">// selected engineering</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Bento Grid layout */}
        <div className="bento-grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              className={`project-card glass-panel ${project.gridClass}`}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
            >
              {/* Image & Gradient overlay */}
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <div className="project-image-gradient" />
              </div>

              {/* Spotlight cursor follow mask */}
              <div className="project-spotlight" />

              {/* Card Details */}
              <div className="project-content">
                <span className="project-subtitle-text font-title">{project.subtitle}</span>
                <h3 className="project-title-text font-title">{project.title}</h3>

                {/* Tech list */}
                <div className="project-tech-list">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="project-tech-tag font-title">{t}</span>
                  ))}
                  {project.tech.length > 3 && <span className="project-tech-tag font-title">+{project.tech.length - 3}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Detail Dialog Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="project-popup-card glass-panel"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              data-lenis-prevent
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="close-popup-btn"
                aria-label="Close details"
              >
                <FaTimes size={20} />
              </button>

              <div className="popup-grid">
                {/* Visual Block */}
                <div className="popup-visual">
                  <img src={selectedProject.image} alt={selectedProject.title} className="popup-img" />
                  <div className="popup-img-glow" />
                </div>

                {/* Information Block */}
                <div className="popup-info">
                  <span className="popup-subtitle font-title">{selectedProject.subtitle}</span>
                  <h3 className="popup-title font-title">{selectedProject.title}</h3>

                  <p className="popup-desc">{selectedProject.longDesc}</p>

                  {/* Features */}
                  <div className="popup-features">
                    <h4 className="popup-section-label font-title">Key Integrations</h4>
                    <ul className="popup-features-list">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx}>• {feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="popup-tech">
                    <h4 className="popup-section-label font-title">Technology Matrix</h4>
                    <div className="popup-tech-tags">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="popup-tech-tag font-title">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="popup-actions">
                    <Magnetic strength={0.3}>
                      <a href={selectedProject.link} className="btn-primary" target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Live Preview
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                      <a href={selectedProject.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub Repository
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
