'use client';

import { motion } from 'framer-motion';
import { Palette, Brush, Eye, Heart, Sparkles, Star } from 'lucide-react';

export default function Page() {
  // Creative design-themed animation variants
  const designContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const designItemVariants = {
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

  const brushVariants = {
    animate: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Creative floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-violet-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-10 h-10 bg-blue-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-rose-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={designContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Creative Design Studio Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={designItemVariants}
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full blur-2xl opacity-75"
                animate={pulseVariants}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <div className="relative w-40 h-40 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-28 h-28 bg-white rounded-full flex items-center justify-center"
                  animate={brushVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Palette className="w-14 h-14 text-pink-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            WEB DESIGNING
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-purple-800 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Craft stunning digital experiences that captivate your audience and elevate your brand
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['Figma', 'Adobe XD', 'Sketch', 'Webflow', 'Photoshop', 'Illustrator'].map((tool, index) => (
              <motion.span
                key={tool}
                className="px-6 py-4 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl text-pink-800 font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg"
                whileHover={{ scale: 1.15, borderColor: '#ec4899' }}
                whileTap={{ scale: 0.95 }}
                animate={floatVariants}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Design Philosophy Overview */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-purple-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CREATIVE DESIGN PHILOSOPHY
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto rounded-full"
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
                className="text-3xl font-bold text-purple-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Beautiful Design Meets Functionality
              </motion.h3>

              <motion.p
                className="text-lg text-purple-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our web design philosophy centers on creating beautiful, intuitive interfaces that not only capture attention but also deliver exceptional user experiences. We believe that great design should be both aesthetically pleasing and highly functional, creating digital experiences that users love to interact with and that drive meaningful business results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-purple-900 mb-6 text-center">Design Specialties:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Brush className="w-5 h-5" />, text: "UI/UX Design & Prototyping" },
                    { icon: <Eye className="w-5 h-5" />, text: "Visual Identity & Branding" },
                    { icon: <Heart className="w-5 h-5" />, text: "User Experience Optimization" },
                    { icon: <Sparkles className="w-5 h-5" />, text: "Interactive Elements & Animations" },
                    { icon: <Star className="w-5 h-5" />, text: "Responsive & Mobile Design" },
                    { icon: <Palette className="w-5 h-5" />, text: "Color Theory & Typography" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 hover:border-purple-400 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-purple-800 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-purple-200 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-indigo-100 border-2 border-purple-200 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={brushVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-3xl mb-6 shadow-2xl">
                    <Eye className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">Design Studio</h3>
                  <p className="text-purple-700 mb-6">Creating beautiful digital experiences</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-6 bg-pink-500 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Design Elements Gallery */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-pink-100/60 to-indigo-100/60 rounded-3xl border-2 border-purple-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DESIGN ELEMENTS
            </motion.h2>
            <motion.p
              className="text-xl text-purple-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Essential components that make your website visually stunning
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Color Theory",
                desc: "Harmonious palettes that evoke emotion and reinforce brand identity.",
                icon: <Palette className="w-10 h-10" />,
                color: "from-pink-400 to-rose-400"
              },
              {
                title: "Typography",
                desc: "Strategic font selection that enhances readability and visual hierarchy.",
                icon: <Brush className="w-10 h-10" />,
                color: "from-purple-400 to-indigo-400"
              },
              {
                title: "Layout Design",
                desc: "Thoughtful arrangement of elements that guides user attention effectively.",
                icon: <Eye className="w-10 h-10" />,
                color: "from-indigo-400 to-blue-400"
              },
              {
                title: "Visual Hierarchy",
                desc: "Strategic emphasis that highlights important content and calls to action.",
                icon: <Star className="w-10 h-10" />,
                color: "from-blue-400 to-cyan-400"
              },
              {
                title: "Interactive Elements",
                desc: "Engaging buttons, forms, and micro-interactions that delight users.",
                icon: <Sparkles className="w-10 h-10" />,
                color: "from-cyan-400 to-teal-400"
              },
              {
                title: "Brand Consistency",
                desc: "Coherent visual language that strengthens brand recognition and trust.",
                icon: <Heart className="w-10 h-10" />,
                color: "from-teal-400 to-green-400"
              }
            ].map((element, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -15 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${element.color} rounded-3xl flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {element.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center group-hover:text-purple-700 transition-colors">
                  {element.title}
                </h3>
                <p className="text-purple-700 text-lg leading-relaxed text-center">{element.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Creative Process Flow */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CREATIVE PROCESS
            </motion.h2>
            <motion.p
              className="text-xl text-purple-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Step-by-step journey from concept to beautiful finished design
            </motion.p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-16 bottom-16 w-4 bg-gradient-to-b from-pink-400 to-indigo-500 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {[
                {
                  step: "CONCEPT",
                  title: "Ideation & Discovery",
                  desc: "Understanding your brand and creating initial design concepts",
                  color: "from-pink-500 to-rose-500",
                  delay: 0.1
                },
                {
                  step: "SKETCH",
                  title: "Wireframing & Layout",
                  desc: "Creating structural blueprints and user flow diagrams",
                  color: "from-purple-500 to-indigo-500",
                  delay: 0.2
                },
                {
                  step: "VISUAL",
                  title: "Visual Design",
                  desc: "Developing the visual identity and aesthetic elements",
                  color: "from-indigo-500 to-blue-500",
                  delay: 0.3
                },
                {
                  step: "REFINE",
                  title: "Iteration & Feedback",
                  desc: "Refining designs based on user testing and feedback",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.4
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className={`p-8 bg-gradient-to-br ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'} bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-purple-200 shadow-xl`}
                  initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.7 + phase.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full mb-6 text-white font-bold text-xl font-mono shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className="text-purple-500 text-lg font-bold mb-4">{phase.step}</div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">{phase.title}</h3>
                  <p className="text-purple-700 text-lg">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: Design Impact Metrics */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-pink-100/50 to-indigo-100/50 rounded-3xl border-2 border-purple-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DESIGN IMPACT
            </motion.h2>
            <motion.p
              className="text-xl text-purple-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our creative design approach
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "User Satisfaction", icon: <Heart className="w-8 h-8" /> },
              { number: "85%", label: "Engagement Rate", icon: <Eye className="w-8 h-8" /> },
              { number: "75%", label: "Conversion Increase", icon: <Sparkles className="w-8 h-8" /> },
              { number: "100%", label: "Brand Recognition", icon: <Star className="w-8 h-8" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-purple-200 backdrop-blur-sm hover:border-purple-400 transition-all duration-300 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mb-6 text-white shadow-lg">
                  {metric.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 font-mono">{metric.number}</div>
                <div className="text-purple-800 font-bold text-xl">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Creative Feel */}
        <motion.section
          className="py-24 px-8 rounded-3xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Creative pattern overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-30"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
                backgroundSize: '80px 80px'
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-6xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              CREATE BEAUTIFUL DESIGNS
            </motion.h2>

            <motion.p
              className="text-2xl md:text-3xl mb-16 opacity-90 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Transform your vision into stunning digital experiences with our creative design team
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-12 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-pink-600 font-bold py-6 px-12 rounded-3xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[300px] text-2xl"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  x: -10
                }}
                whileTap={{ scale: 0.95 }}
                animate={pulseVariants}
                transition={{ duration: 3, repeat: Infinity }}
              >
                START DESIGN
              </motion.button>
              <motion.button
                className="border-4 border-white text-white font-bold py-6 px-12 rounded-3xl transition-all duration-300 hover:bg-white hover:text-pink-600 min-w-[300px] text-2xl"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 10
                }}
                whileTap={{ scale: 0.95 }}
                animate={pulseVariants}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                VIEW PORTFOLIO
              </motion.button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-12 border-t-4 border-white/30"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            >
              {[
                {
                  icon: <Brush className="w-10 h-10" />,
                  title: "Artistic Vision",
                  desc: "Creative designs that tell your brand story and captivate audiences"
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  title: "Professional Quality",
                  desc: "Industry-standard design principles and pixel-perfect execution"
                },
                {
                  icon: <Heart className="w-10 h-10" />,
                  title: "Emotional Connection",
                  desc: "Designs that create lasting impressions and drive user engagement"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-2xl mb-4">{benefit.title}</h3>
                  <p className="text-white/90 text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}