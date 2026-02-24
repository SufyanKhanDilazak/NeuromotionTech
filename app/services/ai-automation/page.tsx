'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Cpu, Bot, Activity, Target } from 'lucide-react';

export default function Page() {
  // Robotic-themed animation variants
  const robotContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const robotItemVariants = {
    hidden: { y: 50, opacity: 0 },
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
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Robotic background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={robotContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Cybernetic Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={robotItemVariants}
        >
          <motion.div
            className="mb-10 relative inline-block"
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
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-cyan-300 shadow-2xl">
                <motion.div
                  className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center"
                  animate={pulseVariants}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-12 h-12 text-cyan-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI AUTOMATION
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100 max-w-4xl mx-auto mb-10 leading-relaxed px-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Transform your business with cutting-edge artificial intelligence and robotic process automation systems
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['TensorFlow', 'PyTorch', 'Python', 'Azure AI', 'OpenAI', 'AWS SageMaker'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-200 font-medium text-sm hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.1, borderColor: '#22d3ee' }}
                animate={floatVariants}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Robotic Process Automation Grid */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ROBOTIC PROCESS AUTOMATION
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
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
                className="text-3xl font-bold text-cyan-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Automated Intelligence Solutions
              </motion.h3>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our AI automation platform leverages advanced neural networks and machine learning algorithms to create intelligent systems that can learn, adapt, and continuously optimize your business processes. Experience unprecedented efficiency gains with our robotic workforce.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-white mb-6 text-center">Core Automation Capabilities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Bot className="w-5 h-5" />, text: "Intelligent Bots & RPA" },
                    { icon: <Brain className="w-5 h-5" />, text: "Neural Network Integration" },
                    { icon: <Activity className="w-5 h-5" />, text: "Real-time Analytics" },
                    { icon: <Target className="w-5 h-5" />, text: "Predictive Modeling" },
                    { icon: <Zap className="w-5 h-5" />, text: "NLP & Computer Vision" },
                    { icon: <Cpu className="w-5 h-5" />, text: "Decision Engine Systems" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-gray-200 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-400/20 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={pulseVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
                    <Bot className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Automation Core</h3>
                  <p className="text-gray-300 mb-6">AI-driven robotic process automation engine</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Circuit board overlay effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-10" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path d="M0,0 L400,0 L400,300 L0,300 Z" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3"/>
                    <path d="M50,50 L350,50 L350,250 L50,250 Z" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.2"/>
                    <circle cx="100" cy="100" r="5" fill="#22d3ee" opacity="0.4"/>
                    <circle cx="300" cy="200" r="5" fill="#60a5fa" opacity="0.4"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Neural Network Visualization */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl border border-cyan-400/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              NEURAL NETWORK ARCHITECTURE
            </motion.h2>
            <motion.p
              className="text-xl text-cyan-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.6 }}
          >
            Advanced AI systems powered by deep learning and neural network architectures
          </motion.p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Deep Learning",
                desc: "Advanced neural networks that learn complex patterns and relationships in your data.",
                icon: <Brain className="w-8 h-8" />,
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "Predictive Analytics",
                desc: "Forecast trends and behaviors using machine learning algorithms and statistical models.",
                icon: <Activity className="w-8 h-8" />,
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Natural Language",
                desc: "Process and understand human language for automated communication and analysis.",
                icon: <Zap className="w-8 h-8" />,
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Computer Vision",
                desc: "Visual recognition and analysis capabilities for automated image processing.",
                icon: <Target className="w-8 h-8" />,
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Robotic Process",
                desc: "Automated execution of routine tasks across your business applications.",
                icon: <Bot className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Decision Engine",
                desc: "Intelligent systems that make autonomous decisions based on data analysis.",
                icon: <Cpu className="w-8 h-8" />,
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Performance Metrics */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PERFORMANCE METRICS
            </motion.h2>
            <motion.p
              className="text-xl text-cyan-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our AI automation implementations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "85%", label: "Cost Reduction", icon: <Zap className="w-6 h-6" /> },
              { number: "92%", label: "Efficiency Gain", icon: <Target className="w-6 h-6" /> },
              { number: "78%", label: "Accuracy Increase", icon: <Brain className="w-6 h-6" /> },
              { number: "24/7", label: "Operational Hours", icon: <Activity className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-gray-800/60 to-gray-900/60 rounded-2xl border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{metric.number}</div>
                <div className="text-gray-300 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Tech Stack Visualization */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl border border-cyan-400/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              TECHNOLOGY STACK
            </motion.h2>
            <motion.p
              className="text-xl text-cyan-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Enterprise-grade AI platforms and frameworks powering our solutions
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'TensorFlow', color: 'from-orange-500 to-red-500' },
              { name: 'PyTorch', color: 'from-blue-500 to-indigo-500' },
              { name: 'Python', color: 'from-yellow-500 to-green-500' },
              { name: 'Azure AI', color: 'from-blue-400 to-cyan-400' },
              { name: 'OpenAI', color: 'from-black to-gray-800' },
              { name: 'AWS SageMaker', color: 'from-orange-400 to-yellow-400' },
              { name: 'Google AI', color: 'from-blue-500 to-green-500' },
              { name: 'Keras', color: 'from-purple-500 to-pink-500' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`px-6 py-4 bg-gradient-to-r ${tech.color} rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Robotic Elements */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
                backgroundSize: '50px 50px'
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
              READY TO AUTOMATE?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Deploy intelligent automation systems that think, learn, and evolve with your business
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-cyan-600 font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                Deploy AI System
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white hover:text-cyan-600 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
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
                  icon: <Bot className="w-8 h-8" />,
                  title: "24/7 Operations",
                  desc: "Automated systems that work continuously without breaks"
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Learning Systems",
                  desc: "AI that improves performance over time through experience"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Instant Processing",
                  desc: "Real-time data processing and decision making capabilities"
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