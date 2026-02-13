'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { fadeInUp, fadeInDown, staggerContainer, staggerItem, scaleIn } from './helper/animations';
import { imageCache } from './helper/imageCache';

// Convert Dropbox sharing link to direct image URL
const getDropboxDirectUrl = (url: string) => {
  if (!url || !url.includes('dropbox.com')) return url;
  
  // Replace dl=0 with raw=1 for direct image access
  // or use dl=1 for download
  let directUrl = url.replace('dl=0', 'raw=1');
  
  // If no query params, add raw=1
  if (!directUrl.includes('?')) {
    directUrl = directUrl + '?raw=1';
  } else if (!directUrl.includes('raw=1') && !directUrl.includes('dl=1')) {
    directUrl = directUrl + '&raw=1';
  }
  
  return directUrl;
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
    image: getDropboxDirectUrl(process.env.NEXT_PUBLIC_DROPBOX_ECOMMERCE || ''),
    fallbackImage: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Cloudinary'],
    github: 'https://github.com/testcode-js/Ecommerce-Frontend',
    live: 'https://ecommerce-frontend-2bqo.onrender.com/',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team collaboration features.',
    image: getDropboxDirectUrl(process.env.NEXT_PUBLIC_DROPBOX_TASKMANAGER || ''),
    fallbackImage: '/projects/taskmanager.jpg',
    tags: ['React', 'Node.js', 'Bootstrap', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://task-tracker-frontend-xgtj.onrender.com/',
    featured: true,
  },
  {
    title: 'Todo List App',
    description: 'A simple and intuitive to-do list app to help you organize tasks and boost productivity.',
    image: getDropboxDirectUrl(process.env.NEXT_PUBLIC_DROPBOX_TODO || ''),
    fallbackImage: '/projects/aichat.jpg',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB'],
    github: 'https://github.com/testcode-js/todo-list',
    live: 'https://todo-list-lilac-ten-45.vercel.app/',
    featured: false,
  },
  {
    title: 'Portfolio',
    description: 'A personal portfolio showcasing my projects, skills, and experience as a full stack developer.',
    image: getDropboxDirectUrl(process.env.NEXT_PUBLIC_DROPBOX_PORTFOLIO || ''),
    fallbackImage: '/projects/portfolio.jpg',
    tags: ['Next.js', 'TailwindCSS', 'Dropbox', 'Framer-motion'],
    github: 'https://github.com/testcode-js/portfolio',
    live: 'https://portfolio-inky-three-48.vercel.app/',
    featured: false,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [cachedImages, setCachedImages] = useState<Record<string, string>>({});

  // Preload images when component mounts or filter changes
  useEffect(() => {
    // Only run on client-side to avoid hydration issues
    if (typeof window === 'undefined') return;

    const preloadImages = async () => {
      const projectImages = projects
        .filter(p => filter === 'all' || (filter === 'featured' && p.featured))
        .map(p => p.image)
        .filter(Boolean);

      console.log(`🚀 Preloading ${projectImages.length} images for filter: ${filter}`);
      
      try {
        await imageCache.preloadImages(projectImages);
        
        // Debug cache status
        imageCache.debugCache();
        
        // Update cached images state
        const newCachedImages: Record<string, string> = {};
        for (const url of projectImages) {
          const cachedUrl = await imageCache.getImage(url);
          newCachedImages[url] = cachedUrl;
        }
        setCachedImages(prev => ({ ...prev, ...newCachedImages }));
        
        console.log('✅ Image preloading completed');
      } catch (error) {
        console.error('❌ Error preloading images:', error);
      }
    };

    // Small delay to ensure component is mounted
    const timer = setTimeout(preloadImages, 100);
    
    return () => clearTimeout(timer);
  }, [filter]);

  const handleImageError = (projectTitle: string) => {
    setImgErrors(prev => ({ ...prev, [projectTitle]: true }));
  };

  const filteredProjects = filter === 'all'
    ? projects
    : filter === 'featured'
      ? projects.filter(p => p.featured)
      : projects;

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[200px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            A selection of my recent work, showcasing my skills in full-stack development
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {['all', 'featured'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === tab
                  ? 'bg-[var(--primary)] text-white'
                  : 'glass text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
          
          {/* Debug Cache Button */}
          <motion.button
            onClick={() => {
              console.log('🔍 Manual cache debug:');
              imageCache.debugCache();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full font-medium transition-all duration-300 glass text-[var(--text-muted)] hover:text-[var(--text)] text-xs"
          >
            Debug Cache
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="gradient-border overflow-hidden card-hover group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-[var(--darker)]">
                  {(project.image && !imgErrors[project.title]) ? (
                    <motion.img
                      src={cachedImages[project.image] || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                      onError={() => handleImageError(project.title)}
                    />
                  ) : project.fallbackImage ? (
                    <motion.img
                      src={project.fallbackImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <HiCode className="text-6xl text-[var(--text-muted)] opacity-20" />
                    </div>
                  )}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-medium"
                    >
                      Featured
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        variants={staggerItem}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 rounded-md bg-[var(--darker)] text-xs text-[var(--text-muted)]"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub />
                      Code
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiExternalLink />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/kananiarjun"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
