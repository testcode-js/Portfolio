'use client';

import { motion } from 'framer-motion';
import { HiCode, HiLightningBolt, HiDeviceMobile, HiServer } from 'react-icons/hi';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  scaleIn
} from './helper/animations';

const services = [
  {
    icon: HiCode,
    title: 'Web Development',
    description: 'Building responsive, high-performance websites using modern frameworks and best practices.',
  },
  {
    icon: HiDeviceMobile,
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications with React Native and Flutter.',
  },
  {
    icon: HiServer,
    title: 'Backend Development',
    description: 'Designing scalable APIs and server-side solutions with Node.js and Python.',
  },
  {
    icon: HiLightningBolt,
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed, SEO, and better user experience.',
  },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Passionate about <span className="gradient-text">creating</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            I&apos;m a dedicated software developer with expertise in building modern web applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="gradient-border p-8"
            >
              <h3 className="text-2xl font-bold mb-4">My Story</h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                I am a fresher and Full Stack Developer Intern at Progressive Softtech, Rajkot, where I am gaining hands-on experience in building web applications using modern technologies such as React, Next.js, Node.js.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                I am passionate about learning, writing clean and maintainable code, and creating intuitive user experiences. As I grow in my career, I enjoy exploring new technologies, contributing to team projects, and continuously improving my development skills. I am eager to learn from experienced professionals and build impactful digital solutions.
              </p>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'].map((tech) => (
                <motion.span
                  key={tech}
                  variants={staggerItem}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-lg glass text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                className="gradient-border p-6 card-hover group"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl animated-gradient flex items-center justify-center mb-4"
                >
                  <service.icon className="text-white text-xl" />
                </motion.div>
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-sm text-[var(--text-muted)]">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Experience & Education</h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {[
              {
                year: '2025 - Present',
                title: 'Software Developer Intern',
                company: 'Progressive Softtech, Rajkot.',
                description: 'development of enterprise web applications using Next.js and Node.js.',
              },
              {
                year: '2022 - 2026',
                title: 'Graduation',
                company: 'Atmiya University, Rajkot.',
                description: 'B.Tech in Information Technology with a CGPA of 8.28',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ x: 10 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="w-4 h-4 rounded-full bg-[var(--primary)]"
                  />
                  <div className="w-0.5 h-full bg-gradient-to-b from-[var(--primary)] to-transparent" />
                </div>
                <div className="pb-8">
                  <span className="text-[var(--accent)] text-sm font-medium">{item.year}</span>
                  <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                  <span className="text-[var(--text-muted)] text-sm">{item.company}</span>
                  <p className="text-[var(--text-muted)] mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
