import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaCss3Alt, FaGithub, FaFire, FaDocker, FaHtml5, FaPython,
} from 'react-icons/fa';
import {
  SiJavascript, SiExpress, SiMongodb, SiThreedotjs, SiRedux, SiN8N,
  SiPostman, SiVercel, SiVite, SiTailwindcss, SiFramer, SiPostgresql,
  SiTypescript, SiNextdotjs, SiSocketdotio, SiCloudinary, SiFastapi,
  SiLangchain,
} from 'react-icons/si';
import './Skills.css';

const domains = [
  {
    id: 'all',
    label: 'All Skills',
  },
  {
    id: 'frontend',
    label: 'Frontend',
  },
  {
    id: 'backend',
    label: 'Backend',
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
  },
];

const skills = [
  // ── Frontend ──
  { name: 'React.js', icon: <FaReact />, color: '#61dafb', level: 'Expert', domain: 'frontend', desc: 'Custom hooks, Virtual DOM routing, and Fiber component architecture.' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e', level: 'Expert', domain: 'frontend', desc: 'ES2024+, structural inheritance, event systems, and functional patterns.' },
  { name: 'Three.js / WebGL', icon: <SiThreedotjs />, color: '#00f2fe', level: 'Intermediate', domain: 'frontend', desc: 'Shader architectures, raycasting, coordinate systems, and rendering loops.' },
  { name: 'Framer Motion', icon: <SiFramer />, color: '#ff0055', level: 'Expert', domain: 'frontend', desc: 'Cinematic spring animations, gesture-driven UX, and layout transitions.' },
  { name: 'CSS3 / Sass', icon: <FaCss3Alt />, color: '#1572b6', level: 'Expert', domain: 'frontend', desc: 'Fluid variables, modular structuring, and high-performance transforms.' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8', level: 'Advanced', domain: 'frontend', desc: 'Utility-first design systems, JIT engine, and responsive token architectures.' },

  // ── Backend ──
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063', level: 'Advanced', domain: 'backend', desc: 'Async event loops, REST endpoints, streams, and cluster setups.' },
  { name: 'Express.js', icon: <SiExpress />, color: '#8892b0', level: 'Advanced', domain: 'backend', desc: 'Secure middleware architectures, API routing, and system integrations.' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', level: 'Advanced', domain: 'backend', desc: 'Aggregation frameworks, indexing, schema validations, and replica setups.' },
  { name: 'Python', icon: <FaPython />, color: '#3572A5', level: 'Advanced', domain: 'backend', desc: 'Scripting, data pipelines, automation bots, and ML preprocessing tasks.' },
  { name: 'Socket.io', icon: <SiSocketdotio />, color: '#25c2a0', level: 'Intermediate', domain: 'backend', desc: 'Real-time bidirectional event streaming, rooms, namespaces, and pub-sub patterns.' },
  { name: 'Cloudinary', icon: <SiCloudinary />, color: '#3448c5', level: 'Advanced', domain: 'backend', desc: 'Media upload pipelines, image transformations, and CDN delivery optimizations.' },

  // ── Tools & DevOps ──
  { name: 'GitHub / Git', icon: <FaGithub />, color: '#f05032', level: 'Expert', domain: 'tools', desc: 'Advanced git flow, submodules, CI/CD configuration, and automated hooks.' },
  { name: 'Postman', icon: <SiPostman />, color: '#ff6c37', level: 'Expert', domain: 'tools', desc: 'API contract testing, environment variables, collection runners, and monitoring.' },

  // ── AI & Automation ──
  { name: 'n8n Automation', icon: <SiN8N />, color: '#ff6c5c', level: 'Expert', domain: 'ai', desc: 'Complex workflow automations, custom nodes, webhook triggers, and data parsing.' },
];

const marqueeItems1 = [
  'REACT.JS', 'NEXT.JS', 'NODE.JS', 'EXPRESS', 'MONGODB', 'POSTGRESQL', 'N8N AUTOMATION', 'TYPESCRIPT', 'PYTHON', 'FASTAPI', 'THREE.JS', 'FRAMER MOTION', 'DOCKER', 'VERCEL', 'REDUX TOOLKIT',
];

const marqueeItems2 = [
  'CINEMATIC INTERFACE', 'CREATIVE ENGINEERING', 'PERFORMANCE OPTIMIZATION', 'REST APIs', 'CLEAN ARCHITECTURE', 'REAL-TIME SYSTEMS', 'AI WORKFLOWS', 'WEBGL PHYSICS', 'BENTO LAYOUTS',
];

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSkills = activeFilter === 'all'
    ? skills
    : skills.filter(s => s.domain === activeFilter);

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.04 * index, duration: 0.5, ease: 'easeOut' },
    }),
    exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
  };

  return (
    <section id="skills" className="skills-section">
      <div className="neon-glow-circle circle-skills" style={{ bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--primary-color)', opacity: 0.06 }} />

      {/* Top Infinite Marquee */}
      <div className="marquee-wrapper top-marquee">
        <div className="marquee-content">
          {[...marqueeItems1, ...marqueeItems1].map((item, idx) => (
            <span key={idx} className="marquee-item font-title">
              {item} <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container skills-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">// engineering toolkit</span>
          <h2 className="section-title">My Tech Stack</h2>
        </div>

        {/* Domain Filter Tabs */}
        <div className="skills-filter-tabs">
          {domains.map((domain) => (
            <button
              key={domain.id}
              className={`filter-tab font-title ${activeFilter === domain.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(domain.id)}
            >
              {domain.label}
              <span className="tab-count">
                {domain.id === 'all' ? skills.length : skills.filter(s => s.domain === domain.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div className="skills-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="skill-card glass-panel"
                style={{ '--hover-color': skill.color }}
              >
                <div className="skill-card-inner">
                  {/* Header */}
                  <div className="skill-header">
                    <div className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className="skill-level font-title" style={{ borderColor: `${skill.color}44`, color: skill.color }}>
                      {skill.level}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="skill-name font-title">{skill.name}</h3>
                  <p className="skill-desc">{skill.desc}</p>

                  {/* Glow layer */}
                  <div className="skill-card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}18 0%, transparent 70%)` }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Reverse Marquee */}
      <div className="marquee-wrapper bottom-marquee">
        <div className="marquee-content marquee-reverse-anim">
          {[...marqueeItems2, ...marqueeItems2].map((item, idx) => (
            <span key={idx} className="marquee-item font-title text-dimmed">
              {item} <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
