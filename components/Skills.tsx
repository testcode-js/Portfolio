'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma, FaLinux, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiCanva, SiTailwindcss, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiGraphql, SiJest, SiVscodium } from 'react-icons/si';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from './helper/animations';
import { VscVscode } from 'react-icons/vsc';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, level: 95 },
      { name: 'Next.js', icon: SiNextdotjs, level: 90 },
      { name: 'TypeScript', icon: SiTypescript, level: 88 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, level: 90 },
      // { name: 'Python', icon: FaPython, level: 85 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 82 },
      { name: 'MongoDB', icon: SiMongodb, level: 80 },
      { name: 'MySQL',   icon: SiMysql, level: 80 },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', icon: FaGitAlt, level: 88 },
      { name: 'Docker', icon: FaDocker, level: 75 },
      { name: 'AWS', icon: FaAws, level: 70 },
      // { name: 'Redis', icon: SiRedis, level: 78 },
    ],
  },
  {
    title: 'Other',
    skills: [
      // { name: 'GraphQL', icon: SiGraphql, level: 80 },
      // { name: 'Jest', icon: SiJest, level: 82 },
      { name: 'Figma', icon: FaFigma, level: 75 },
      { name: 'Canva', icon: SiCanva, level: 70 },
      { name: 'VS Code', icon: VscVscode, level: 85 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[200px]"
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
          <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            My tech stack is constantly evolving as I learn and adapt to new technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className="gradient-border p-8"
            >
              <h3 className="text-xl font-bold mb-6 text-[var(--primary)]">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                          <skill.icon className="text-xl text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
                        </motion.div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[var(--text-muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--darker)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full animated-gradient"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '12+', label: 'Technologies' },
            { value: '15+', label: 'Repositories' },
            { value: '50+', label: 'Commits' },
            { value: '∞', label: 'Learning' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center gradient-border p-6 card-hover"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                className="text-3xl font-bold gradient-text mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
