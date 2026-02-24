'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play, Palette, Zap, Star, Heart } from 'lucide-react';

export default function Page() {
  // Animation-themed variants
  const animationContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [0, 5, -5, 0]
    }
  };

  const spinVariants = {
    animate: {
      rotate: [0, 360],
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating cartoon elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-purple-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={animationContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Cartoon-Style Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }
          }}
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
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-2xl opacity-75"
                animate={spinVariants}
                transition={{ duration: 8, repeat: Infinity, ease: [0.5, 0.5, 0.5, 0.5] }}
              ></motion.div>
              <div className="relative w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-28 h-28 bg-white rounded-full flex items-center justify-center"
                  animate={bounceVariants}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Play className="w-14 h-14 text-pink-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            3D ANIMATION
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-purple-800 max-w-5xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Bring your imagination to life with magical 3D animation magic!
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['Blender', 'Maya', 'Cinema 4D', 'Unreal Engine', 'After Effects', 'Unity'].map((tool, index) => (
              <motion.span
                key={tool}
                className="px-6 py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl text-pink-800 font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg"
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

        {/* Section 2: Animated Characters Showcase */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-purple-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CHARACTER ANIMATION
            </motion.h2>
            <motion.div
              className="w-40 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
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
                className="text-4xl font-bold text-purple-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Magical Character Creation
              </motion.h3>

              <motion.p
                className="text-xl text-purple-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our artists craft enchanting characters that come alive with personality and emotion. From cute mascots to epic heroes, we bring your characters to life with smooth animation and expressive details that connect with audiences of all ages.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-2xl font-semibold text-purple-900 mb-6 text-center">Character Specialties:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: <Heart className="w-6 h-6" />, text: "Cute & Adorable Characters" },
                    { icon: <Star className="w-6 h-6" />, text: "Fantasy & Adventure Heroes" },
                    { icon: <Sparkles className="w-6 h-6" />, text: "Expressive & Emotional" },
                    { icon: <Zap className="w-6 h-6" />, text: "Dynamic Action Poses" },
                    { icon: <Palette className="w-6 h-6" />, text: "Vibrant Color Design" },
                    { icon: <Play className="w-6 h-6" />, text: "Smooth Motion Animation" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-200 hover:border-pink-400 transition-all duration-300 group shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-purple-800 font-bold text-lg">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl border-4 border-white p-10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-white flex items-center justify-center aspect-square">
                <motion.div
                  className="text-center p-8"
                  animate={bounceVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                    animate={spinVariants}
                    transition={{ duration: 6, repeat: Infinity, ease: [0.5, 0.5, 0.5, 0.5] }}
                  >
                    <Play className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-purple-900 mb-4">Animated Magic</h3>
                  <p className="text-purple-700 text-xl mb-6">Characters that come alive with personality</p>
                  <div className="flex justify-center space-x-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 bg-pink-500 rounded-full"
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

        {/* Section 3: Animation Styles Gallery */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-pink-100/60 to-purple-100/60 rounded-3xl border-4 border-white backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ANIMATION STYLES
            </motion.h2>
            <motion.p
              className="text-2xl text-purple-700 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Diverse animation approaches to bring your stories to life
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Cartoon Style",
                desc: "Fun, colorful characters with exaggerated expressions and movements.",
                icon: <Sparkles className="w-10 h-10" />,
                color: "from-yellow-300 to-pink-300"
              },
              {
                title: "Anime Style",
                desc: "Detailed, expressive characters with dynamic poses and emotions.",
                icon: <Star className="w-10 h-10" />,
                color: "from-pink-300 to-purple-300"
              },
              {
                title: "Realistic Style",
                desc: "Life-like characters with natural movements and detailed features.",
                icon: <Heart className="w-10 h-10" />,
                color: "from-purple-300 to-indigo-300"
              },
              {
                title: "Stop Motion",
                desc: "Frame-by-frame animation creating unique tactile visual appeal.",
                icon: <Play className="w-10 h-10" />,
                color: "from-indigo-300 to-blue-300"
              },
              {
                title: "3D Modeling",
                desc: "Fully dimensional characters with realistic lighting and textures.",
                icon: <Zap className="w-10 h-10" />,
                color: "from-blue-300 to-cyan-300"
              },
              {
                title: "Motion Graphics",
                desc: "Animated graphics and typography for engaging visual storytelling.",
                icon: <Palette className="w-10 h-10" />,
                color: "from-cyan-300 to-teal-300"
              }
            ].map((style, index) => (
              <motion.div
                key={index}
                className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:transform hover:scale-105 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -15 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${style.color} rounded-3xl flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {style.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center group-hover:text-purple-700 transition-colors">
                  {style.title}
                </h3>
                <p className="text-purple-700 text-lg leading-relaxed text-center">{style.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Animation Process Flow */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CREATION PROCESS
            </motion.h2>
            <motion.p
              className="text-2xl text-purple-700 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Step-by-step journey from idea to animated masterpiece
            </motion.p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-16 bottom-16 w-4 bg-gradient-to-b from-pink-400 to-purple-500 transform -translate-x-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {[
                {
                  step: "IDEA",
                  title: "Concept Development",
                  desc: "Transforming your vision into detailed character concepts and storylines",
                  color: "from-pink-500 to-rose-500",
                  delay: 0.1
                },
                {
                  step: "MODEL",
                  title: "3D Modeling",
                  desc: "Creating detailed 3D models with textures and materials",
                  color: "from-purple-500 to-indigo-500",
                  delay: 0.2
                },
                {
                  step: "ANIMATE",
                  title: "Character Animation",
                  desc: "Bringing characters to life with smooth, expressive movements",
                  color: "from-indigo-500 to-blue-500",
                  delay: 0.3
                },
                {
                  step: "RENDER",
                  title: "Final Rendering",
                  desc: "Polishing with lighting, effects, and final quality touches",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.4
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className={`p-8 bg-gradient-to-br ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'} bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-200 shadow-xl`}
                  initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.7 + phase.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full mb-6 text-white font-bold text-xl font-mono shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className="text-pink-500 text-lg font-bold mb-4">{phase.step}</div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">{phase.title}</h3>
                  <p className="text-purple-700 text-lg">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: Animation Features */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-3xl border-4 border-white backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-purple-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ANIMATION FEATURES
            </motion.h2>
            <motion.p
              className="text-2xl text-purple-700 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Amazing capabilities that make your animations come alive
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { number: "100%", label: "Custom Characters", icon: <Heart className="w-8 h-8" /> },
              { number: "4K+", label: "Resolution", icon: <Star className="w-8 h-8" /> },
              { number: "24fps", label: "Smooth Motion", icon: <Play className="w-8 h-8" /> },
              { number: "∞", label: "Creative Ideas", icon: <Sparkles className="w-8 h-8" /> }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-200 backdrop-blur-sm hover:border-pink-400 transition-all duration-300 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 text-white shadow-lg">
                  {feature.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 font-mono">{feature.number}</div>
                <div className="text-purple-800 font-bold text-xl">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Animation Magic */}
        <motion.section
          className="py-24 px-8 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Animated background elements */}
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
              ANIMATE YOUR DREAMS
            </motion.h2>

            <motion.p
              className="text-2xl md:text-3xl mb-16 opacity-90 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Create magical 3D animations that captivate and inspire your audience
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
                animate={bounceVariants}
                transition={{ duration: 3, repeat: Infinity }}
              >
                START ANIMATION
              </motion.button>
              <motion.button
                className="border-4 border-white text-white font-bold py-6 px-12 rounded-3xl transition-all duration-300 hover:bg-white hover:text-pink-600 min-w-[300px] text-2xl"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 10
                }}
                whileTap={{ scale: 0.95 }}
                animate={bounceVariants}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                VIEW SHOWREEL
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
                  icon: <Sparkles className="w-10 h-10" />,
                  title: "Magical Stories",
                  desc: "Compelling narratives that capture hearts and minds"
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  title: "Professional Quality",
                  desc: "Studio-grade production values and attention to detail"
                },
                {
                  icon: <Heart className="w-10 h-10" />,
                  title: "Emotional Impact",
                  desc: "Animations that create lasting connections with viewers"
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