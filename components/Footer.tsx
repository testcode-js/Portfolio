'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { fadeInUp, staggerContainer, staggerItem } from './helper/animations';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Development', href: '#about' },
        // { label: 'Mobile Apps', href: '#about' },
        { label: 'UI/UX Design', href: '#about' },
        { label: 'Consulting', href: '#contact' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub', href: 'https://github.com/kananiarjun' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/arjun-kanani' },
        // { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'Email', href: 'mailto:[EMAIL_ADDRESS]' },
      ],
    },
  ];

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Top Gradient Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="col-span-2 md:col-span-1">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold gradient-text mb-4 inline-block"
            >
              Arjun Kanani
            </motion.a>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Full Stack Developer crafting digital experiences with modern technologies.
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={staggerItem}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[var(--text-muted)] text-sm hover:text-[var(--text)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-[var(--card)] mb-8"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[var(--text-muted)] text-sm flex items-center justify-center gap-1">
            © {currentYear} All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--primary)] transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <HiArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
