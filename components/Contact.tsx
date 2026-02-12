'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn } from './helper/animations';

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'arjunkanani2@gmail.com',
    href: 'mailto:arjunkanani2@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+91 87330 57636',
    href: 'tel:+918733057636',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Rajkot, Gujarat',
    href: 'https://maps.app.goo.gl/qWYkkZte2GKbvjE37',
  },
];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/kananiarjun', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/arjun-kanani-190778262/', label: 'LinkedIn' },
  
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[200px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInLeft}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="gradient-border p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors"
                    >
                      <info.icon className="text-xl text-[var(--text-muted)] group-hover:text-white transition-colors" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)]">{info.label}</p>
                      <p className="font-medium group-hover:text-[var(--primary)] transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="gradient-border p-8"
            >
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--primary)] transition-all duration-300"
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="gradient-border p-6 bg-gradient-to-br from-[var(--primary)]/10 to-transparent"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-400"
                />
                <span className="font-semibold">Available for Freelance</span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                Currently accepting new projects. Let&apos;s discuss how I can help bring your ideas to life.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInRight}
            className="lg:col-span-3"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="gradient-border p-8"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--darker)] border border-[var(--card)] focus:border-[var(--primary)] focus:outline-none transition-colors text-[var(--text)]"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--darker)] border border-[var(--card)] focus:border-[var(--primary)] focus:outline-none transition-colors text-[var(--text)]"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--darker)] border border-[var(--card)] focus:border-[var(--primary)] focus:outline-none transition-colors text-[var(--text)]"
                >
                  <option value="">Select a subject</option>
                  <option value="project">Project Inquiry</option>
                  <option value="freelance">Freelance Opportunity</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--darker)] border border-[var(--card)] focus:border-[var(--primary)] focus:outline-none transition-colors text-[var(--text)] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                  >
                    Message Sent!
                  </motion.span>
                ) : (
                  <>
                    <HiPaperAirplane />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-green-400 text-sm"
                >
                  Thank you! Your message has been sent successfully.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-red-400 text-sm"
                >
                  Something went wrong. Please try again later.
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
