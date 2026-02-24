'use client';

import { motion } from 'framer-motion';
import { Code, Monitor, Server, Database, Cloud, Terminal } from 'lucide-react';

export default function Page() {
  // Coding-themed animation variants
  const codeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

 const codeItemVariants: import('framer-motion').Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const typingVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const blinkVariants = {
    animate: {
      opacity: [1, 0, 1],
      scale: [1, 1.2, 1]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-gray-800/10 to-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="grid grid-cols-20 gap-4 w-full h-full">
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={i}
                className="text-green-400 text-xs font-mono"
                animate={{ opacity: [0, 1, 0], y: [0, -20] }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {Math.random().toString(36).substring(2, 3)}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={codeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Terminal-style Hero */}
        <motion.section
          className="text-center mb-20 py-16 relative"
          variants={codeItemVariants}
        >
          <motion.div
            className="mb-10 relative inline-block"
            initial={{ scale: 0, rotateX: -90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gray-900 rounded-lg border-2 border-green-400 shadow-2xl flex items-center justify-center">
                <motion.div
                  className="p-6 bg-black/80 rounded"
                  animate={blinkVariants}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Terminal className="w-12 h-12 text-green-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            WEB DEVELOPMENT
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto mb-10 leading-relaxed px-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Build the future with clean, efficient, and scalable web applications
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'GraphQL'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-400/30 rounded text-green-200 font-mono text-sm hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Code Editor Simulation */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              FULL-STACK DEVELOPMENT
            </motion.h2>
            <motion.div
              className="w-32 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h3
                className="text-3xl font-bold text-green-300 mb-6 font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Clean Code, Powerful Results
              </motion.h3>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our web development approach combines modern frameworks with clean architecture principles. We build applications that are not only functional but also maintainable, scalable, and performant. Every line of code is crafted with precision and attention to detail.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-white mb-6 text-center font-mono">Development Expertise:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Code className="w-5 h-5" />, text: "Frontend Frameworks" },
                    { icon: <Server className="w-5 h-5" />, text: "Backend Architecture" },
                    { icon: <Database className="w-5 h-5" />, text: "Database Design" },
                    { icon: <Cloud className="w-5 h-5" />, text: "Cloud Deployment" },
                    { icon: <Monitor className="w-5 h-5" />, text: "Responsive Design" },
                    { icon: <Terminal className="w-5 h-5" />, text: "DevOps Pipeline" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-400/20 hover:border-green-400/50 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-gray-200 font-medium font-mono">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg border border-green-400/30 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-green-400/30">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-gray-400 text-sm font-mono">app.jsx</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-500">// Modern React Component</div>
                <div className="text-green-400">function</div> <span className="text-blue-400">App</span>() {'{'}
                <div className="ml-4 text-yellow-300">return</div> (
                <div className="ml-8 text-blue-300">&lt;div&gt;</div>
                <div className="ml-12 text-purple-300">&lt;header&gt;</div>
                <div className="ml-16 text-yellow-400">Welcome to Modern Web</div>
                <div className="ml-12 text-purple-300">&lt;/header&gt;</div>
                <div className="ml-8 text-blue-300">&lt;/div&gt;</div>
                )
                {'}'}
                <div className="mt-4 text-green-400">export default App;</div>
                <motion.div
                  className="inline-block ml-2"
                  animate={blinkVariants}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ▮
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Technology Tree */}
        <motion.section
          className="mb-20 py-16 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-2xl border border-green-400/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              TECH STACK TREE
            </motion.h2>
            <motion.p
              className="text-xl text-green-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Enterprise-level technologies for scalable web solutions
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                desc: "React, Next.js, TypeScript, Tailwind CSS for modern interfaces",
                icon: <Monitor className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Backend",
                desc: "Node.js, Express, Python, GraphQL for robust server logic",
                icon: <Server className="w-8 h-8" />,
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Database",
                desc: "PostgreSQL, MongoDB, Redis for efficient data storage",
                icon: <Database className="w-8 h-8" />,
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Deployment",
                desc: "Docker, Kubernetes, AWS, Vercel for scalable hosting",
                icon: <Cloud className="w-8 h-8" />,
                color: "from-orange-500 to-red-500"
              },
              {
                title: "DevOps",
                desc: "CI/CD pipelines, testing, monitoring, and maintenance",
                icon: <Terminal className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Security",
                desc: "Authentication, encryption, and compliance solutions",
                icon: <Code className="w-8 h-8" />,
                color: "from-pink-500 to-purple-500"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-green-300 transition-colors font-mono">
                  {tech.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Development Process Flow */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DEVELOPMENT FLOW
            </motion.h2>
            <motion.p
              className="text-xl text-green-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Agile methodology with continuous integration and deployment
            </motion.p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-16 bottom-16 w-1 bg-gradient-to-b from-green-400 to-blue-500 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  step: "Planning",
                  title: "Requirements Analysis",
                  desc: "Understanding your business needs and technical requirements",
                  color: "from-green-500 to-emerald-500",
                  delay: 0.1
                },
                {
                  step: "Design",
                  title: "Architecture Design",
                  desc: "Creating scalable and maintainable system architecture",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.2
                },
                {
                  step: "Development",
                  title: "Code Implementation",
                  desc: "Writing clean, efficient, and well-documented code",
                  color: "from-purple-500 to-indigo-500",
                  delay: 0.3
                },
                {
                  step: "Testing",
                  title: "Quality Assurance",
                  desc: "Comprehensive testing for functionality and performance",
                  color: "from-orange-500 to-red-500",
                  delay: 0.4
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className={`p-6 bg-gradient-to-br ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700`}
                  initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.7 + phase.delay, duration: 0.6 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${phase.color} rounded-full mb-4 text-white font-bold font-mono`}>
                    {index + 1}
                  </div>
                  <div className="text-green-400 text-sm font-mono mb-2">{phase.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">{phase.title}</h3>
                  <p className="text-gray-300">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: Performance Metrics */}
        <motion.section
          className="mb-20 py-16 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl border border-green-400/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PERFORMANCE METRICS
            </motion.h2>
            <motion.p
              className="text-xl text-green-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our web development projects
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Uptime", icon: <Server className="w-6 h-6" /> },
              { number: "<100ms", label: "Response Time", icon: <Code className="w-6 h-6" /> },
              { number: "95%", label: "SEO Score", icon: <Monitor className="w-6 h-6" /> },
              { number: "100%", label: "Mobile Friendly", icon: <Terminal className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-gray-800/60 to-gray-900/60 rounded-xl border border-green-400/20 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2 font-mono">{metric.number}</div>
                <div className="text-gray-300 font-medium text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Terminal Style */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-green-600 to-blue-700 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0'
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              START CODING THE FUTURE
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Deploy scalable web applications with our expert development team
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-green-600 font-bold py-5 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg font-mono"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                INIT PROJECT
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 hover:bg-white hover:text-green-600 min-w-[240px] text-lg font-mono"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                RUN DEMO
              </motion.button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            >
              {[
                {
                  icon: <Code className="w-8 h-8" />,
                  title: "Clean Code",
                  desc: "Well-structured, maintainable, and documented codebase"
                },
                {
                  icon: <Server className="w-8 h-8" />,
                  title: "Scalable Architecture",
                  desc: "Designed to grow with your business requirements"
                },
                {
                  icon: <Monitor className="w-8 h-8" />,
                  title: "Responsive Design",
                  desc: "Perfect experience across all devices and browsers"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-xl font-mono">{benefit.title}</h3>
                  <p className="text-white/80 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}