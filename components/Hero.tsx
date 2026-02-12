'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { fadeInUp, fadeInDown, staggerContainer, staggerItem, scaleIn } from './helper/animations';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[128px] animate-float"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[128px] animate-float"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--secondary)] rounded-full mix-blend-multiply filter blur-[150px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInDown} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-sm text-[var(--text-muted)]">Available for work</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-[var(--text)]">Hi, I&apos;m </span>
            <motion.span
              className="gradient-text inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Arjun Kanani
            </motion.span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div variants={fadeInUp} className="h-16 md:h-20 flex items-center justify-center mb-8">
            <p className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-muted)]">
              {typedText}
              <span
                className={`inline-block w-1 h-8 md:h-10 bg-[var(--accent)] ml-1 transition-opacity duration-100 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--text-muted)] mb-10 leading-relaxed"
          >
            I craft beautiful, responsive, and user-friendly web applications.
            Passionate about clean code, modern design, and creating exceptional digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              href="#projects"
              className="btn-primary flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://www.dropbox.com/scl/fi/m6pei87bqvzyqr6jzhfel/Arjun_Resume_SD.pdf?rlkey=dh2xifce5kdadt2iow44crwue&st=rsk4d9fz&dl=1"
              download
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiDownload />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={staggerContainer} className="flex items-center justify-center gap-6">
            {[FaGithub, FaLinkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href={['https://github.com/kananiarjun', 'https://www.linkedin.com/in/arjun-kanani-190778262'][index]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-all duration-300"
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: '3+', label: 'Months Experience' },
              { value: '5+', label: 'Projects Completed' },
              { value: '3+', label: 'Happy Clients' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 rounded-full bg-[var(--accent)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
