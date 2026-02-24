'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Tablet, Laptop, Server, Database } from 'lucide-react';

export default function Page() {
  // App development-themed animation variants
  const appContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const appItemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
       ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5]
    }
  };

  const codeVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 2, -2, 0]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* App store floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-indigo-300 rounded-xl opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-300 rounded-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-300 rounded-xl opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-violet-300 rounded-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={appContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: App Store Dashboard Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={appItemVariants}
        >
          <motion.div
            className="mb-12 relative inline-block"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-2xl blur-2xl opacity-75"
                animate={pulseVariants}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <div className="relative w-40 h-40 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-3xl flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center"
                  animate={codeVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code className="w-14 h-14 text-indigo-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            APP DEVELOPMENT
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-indigo-800 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Create powerful, intuitive applications that transform your business and delight your users
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['React Native', 'Flutter', 'Swift', 'Kotlin', 'React', 'Vue'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-6 py-4 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 backdrop-blur-sm border border-indigo-400/30 rounded-2xl text-indigo-800 font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg"
                whileHover={{ scale: 1.15, borderColor: '#6366f1' }}
                whileTap={{ scale: 0.95 }}
                animate={floatVariants}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: App Development Overview */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              COMPREHENSIVE APP SOLUTIONS
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h3
                className="text-3xl font-bold text-indigo-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Innovative Mobile & Web Applications
              </motion.h3>

              <motion.p
                className="text-lg text-indigo-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our app development services create powerful, user-friendly applications that solve real business problems. We combine cutting-edge technology with intuitive design to deliver experiences that users love. From concept to deployment, we handle every aspect of the development lifecycle with meticulous attention to detail.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-indigo-900 mb-6 text-center">Development Specialties:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Smartphone className="w-5 h-5" />, text: "Native iOS & Android Apps" },
                    { icon: <Laptop className="w-5 h-5" />, text: "Progressive Web Apps" },
                    { icon: <Tablet className="w-5 h-5" />, text: "Cross-Platform Solutions" },
                    { icon: <Server className="w-5 h-5" />, text: "Backend & API Development" },
                    { icon: <Database className="w-5 h-5" />, text: "Database Design & Integration" },
                    { icon: <Code className="w-5 h-5" />, text: "UI/UX Design & Prototyping" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-200 hover:border-indigo-400 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-indigo-800 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-indigo-200 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 to-pink-100 border-2 border-indigo-200 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={codeVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-3xl mb-6 shadow-2xl">
                    <Smartphone className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-3">App Studio</h3>
                  <p className="text-indigo-700 mb-6">Creating amazing mobile experiences</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-6 bg-indigo-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: App Development Platforms */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-indigo-100/50 to-pink-100/50 rounded-3xl border border-indigo-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DEVELOPMENT PLATFORMS
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Multi-platform solutions for maximum reach and engagement
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "iOS Development",
                desc: "Native iPhone and iPad apps with seamless Apple ecosystem integration.",
                icon: <Laptop className="w-8 h-8" />,
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Android Development",
                desc: "Powerful Android apps optimized for all device sizes and versions.",
                icon: <Smartphone className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Cross-Platform",
                desc: "Single codebase solutions with Flutter and React Native for efficiency.",
                icon: <Tablet className="w-8 h-8" />,
                color: "from-pink-500 to-rose-500"
              },
              {
                title: "Web Applications",
                desc: "Responsive web apps that work seamlessly across all browsers and devices.",
                icon: <Laptop className="w-8 h-8" />,
                color: "from-rose-500 to-red-500"
              },
              {
                title: "Progressive Web Apps",
                desc: "Native-app-like experience delivered through web browsers with offline capability.",
                icon: <Code className="w-8 h-8" />,
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Backend Services",
                desc: "Robust server infrastructure and API development for mobile connectivity.",
                icon: <Server className="w-8 h-8" />,
                color: "from-orange-500 to-amber-500"
              }
            ].map((platform, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-3 text-center group-hover:text-indigo-700 transition-colors">
                  {platform.title}
                </h3>
                <p className="text-indigo-700 text-center leading-relaxed">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: App Development Process */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DEVELOPMENT PROCESS
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Systematic approach to deliver high-quality applications
            </motion.p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-16 bottom-16 w-4 bg-gradient-to-b from-indigo-400 to-pink-500 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {[
                {
                  step: "PLAN",
                  title: "Requirement Analysis",
                  desc: "Understanding your business needs and defining app specifications",
                  color: "from-indigo-500 to-purple-500",
                  delay: 0.1
                },
                {
                  step: "DESIGN",
                  title: "UI/UX Design",
                  desc: "Creating intuitive interfaces and user experience flows",
                  color: "from-purple-500 to-pink-500",
                  delay: 0.2
                },
                {
                  step: "DEVELOP",
                  title: "App Development",
                  desc: "Coding the application with best practices and testing",
                  color: "from-pink-500 to-rose-500",
                  delay: 0.3
                },
                {
                  step: "TEST",
                  title: "Quality Assurance",
                  desc: "Thorough testing across devices and platforms for reliability",
                  color: "from-rose-500 to-red-500",
                  delay: 0.4
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className={`p-8 bg-gradient-to-br ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'} bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-indigo-200 shadow-xl`}
                  initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.7 + phase.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full mb-6 text-white font-bold text-xl font-mono shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className="text-indigo-500 text-lg font-bold mb-4">{phase.step}</div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">{phase.title}</h3>
                  <p className="text-indigo-700 text-lg">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: App Performance Metrics */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-indigo-100/40 to-pink-100/40 rounded-3xl border border-indigo-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              APP PERFORMANCE
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our app development projects
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Uptime", icon: <Server className="w-6 h-6" /> },
              { number: "<100ms", label: "Load Time", icon: <Smartphone className="w-6 h-6" /> },
              { number: "4.8★", label: "Rating", icon: <Code className="w-6 h-6" /> },
              { number: "100%", label: "Compatibility", icon: <Laptop className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white/80 to-indigo-50/80 rounded-2xl border border-indigo-200 backdrop-blur-sm hover:border-indigo-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-indigo-800 mb-2 font-mono">{metric.number}</div>
                <div className="text-indigo-700 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with App Store Feel */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-indigo-500 to-pink-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* App store pattern overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              LAUNCH YOUR APP TODAY
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Transform your ideas into successful applications with our expert development team
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-indigo-600 font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                BUILD APP NOW
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white hover:text-indigo-600 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW PORTFOLIO
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
                  icon: <Smartphone className="w-8 h-8" />,
                  title: "Mobile-First",
                  desc: "Apps designed for mobile users with responsive scaling"
                },
                {
                  icon: <Code className="w-8 h-8" />,
                  title: "Code Quality",
                  desc: "Clean, maintainable code with extensive documentation"
                },
                {
                  icon: <Server className="w-8 h-8" />,
                  title: "Scalable Backend",
                  desc: "Robust infrastructure that grows with your user base"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}