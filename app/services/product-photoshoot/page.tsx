'use client';

import { motion } from 'framer-motion';
import { Camera, Aperture, ZoomIn, Palette, Sparkles, Star } from 'lucide-react';

export default function Page() {
  // Photography-themed animation variants
  const photoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const photoItemVariants: import('framer-motion').Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const zoomVariants = {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
    }
  };

  const flashVariants = {
    animate: {
      opacity: [0.8, 1, 0.8],
      scale: [1, 1.1, 1]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Studio lighting effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200/10 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={photoContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Studio-Style Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={photoItemVariants}
        >
          <motion.div
            className="mb-12 relative inline-block"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-2xl opacity-75"
                animate={flashVariants}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <div className="relative w-36 h-36 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center"
                  animate={zoomVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Camera className="w-12 h-12 text-amber-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            PRODUCT PHOTOGRAPHY
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-amber-800 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Capture the essence of your products with professional studio photography
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['Canon', 'Sony', 'Nikon', 'Adobe', 'Lightroom', 'Photoshop'].map((brand, index) => (
              <motion.span
                key={brand}
                className="px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full text-amber-800 font-medium text-sm hover:scale-105 transition-transform cursor-pointer shadow-sm"
                whileHover={{ scale: 1.1, borderColor: '#f59e0b' }}
                whileTap={{ scale: 0.95 }}
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Studio Equipment Showcase */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PROFESSIONAL STUDIO EQUIPMENT
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"
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
                className="text-3xl font-bold text-amber-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Premium Photography Services
              </motion.h3>

              <motion.p
                className="text-lg text-amber-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our state-of-the-art photography studio features professional lighting equipment, seamless backdrops, and high-end cameras to capture your products in the best possible light. We create compelling visuals that tell your brand story and drive customer engagement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-amber-900 mb-6 text-center">Photography Specialties:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Camera className="w-5 h-5" />, text: "Product Studio Photography" },
                    { icon: <Aperture className="w-5 h-5" />, text: "Macro Detail Shots" },
                    { icon: <ZoomIn className="w-5 h-5" />, text: "Close-up & Texture Details" },
                    { icon: <Palette className="w-5 h-5" />, text: "Color-Corrected Imagery" },
                    { icon: <Sparkles className="w-5 h-5" />, text: "Lifestyle & Contextual Shots" },
                    { icon: <Star className="w-5 h-5" />, text: "360° Product Views" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 hover:border-amber-400 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-amber-800 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-amber-200 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={zoomVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-2xl">
                    <Camera className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">Professional Studio</h3>
                  <p className="text-amber-700 mb-6">Premium equipment for exceptional results</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-6 bg-amber-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Studio equipment overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 left-4 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Photography Styles Gallery */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-amber-100/50 to-orange-100/50 rounded-3xl border border-amber-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PHOTOGRAPHY STYLES
            </motion.h2>
            <motion.p
              className="text-xl text-amber-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Diverse approaches to showcase your products in the best light
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "White Background",
                desc: "Clean, professional shots ideal for e-commerce platforms.",
                icon: <Aperture className="w-8 h-8" />,
                color: "from-white to-amber-50"
              },
              {
                title: "Lifestyle Context",
                desc: "Products in real-world settings to show practical use.",
                icon: <Sparkles className="w-8 h-8" />,
                color: "from-amber-50 to-orange-50"
              },
              {
                title: "Detailed Macro",
                desc: "Close-up shots highlighting texture and fine details.",
                icon: <ZoomIn className="w-8 h-8" />,
                color: "from-orange-50 to-yellow-50"
              },
              {
                title: "Color-Corrected",
                desc: "Accurate representation of product colors and materials.",
                icon: <Palette className="w-8 h-8" />,
                color: "from-yellow-50 to-amber-100"
              },
              {
                title: "360° Views",
                desc: "Complete product visualization from all angles.",
                icon: <Camera className="w-8 h-8" />,
                color: "from-amber-100 to-orange-100"
              },
              {
                title: "Creative Staging",
                desc: "Artistic compositions that tell a compelling brand story.",
                icon: <Star className="w-8 h-8" />,
                color: "from-orange-100 to-yellow-100"
              }
            ].map((style, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${style.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-amber-200`}>
                  {style.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3 text-center group-hover:text-amber-700 transition-colors">
                  {style.title}
                </h3>
                <p className="text-amber-700 text-center leading-relaxed">{style.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Lighting Techniques */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              LIGHTING TECHNIQUES
            </motion.h2>
            <motion.p
              className="text-xl text-amber-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Professional lighting setups for perfect product illumination
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "3-Point", label: "Studio Setup", icon: <Aperture className="w-6 h-6" /> },
              { number: "Softbox", label: "Diffused Light", icon: <Sparkles className="w-6 h-6" /> },
              { number: "Ring Light", label: "Even Illumination", icon: <Camera className="w-6 h-6" /> },
              { number: "Backlight", label: "Depth & Dimension", icon: <ZoomIn className="w-6 h-6" /> }
            ].map((lighting, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white/80 to-amber-50/80 rounded-2xl border border-amber-200 backdrop-blur-sm hover:border-amber-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 text-white">
                  {lighting.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">{lighting.number}</div>
                <div className="text-amber-700 font-medium">{lighting.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Post-Production Services */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-3xl border border-amber-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              POST-PRODUCTION SERVICES
            </motion.h2>
            <motion.p
              className="text-xl text-amber-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Professional editing and enhancement for flawless results
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Background Removal', color: 'from-white to-amber-50' },
              { name: 'Color Correction', color: 'from-amber-50 to-orange-50' },
              { name: 'Retouching', color: 'from-orange-50 to-yellow-50' },
              { name: 'Shadow Adjustment', color: 'from-yellow-50 to-amber-100' },
              { name: 'Image Enhancement', color: 'from-amber-100 to-orange-100' },
              { name: 'Logo Placement', color: 'from-orange-100 to-yellow-100' }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                className={`px-6 py-4 bg-gradient-to-r ${service.color} rounded-xl text-amber-800 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-amber-200`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Studio Feel */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Studio lighting overlay */}
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
              CAPTURE YOUR PRODUCTS
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Professional photography that makes your products stand out
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-amber-600 font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK STUDIO TIME
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white hover:text-amber-600 min-w-[240px] text-lg"
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
                  icon: <Camera className="w-8 h-8" />,
                  title: "Professional Quality",
                  desc: "Stunning imagery that showcases your products perfectly"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Creative Vision",
                  desc: "Unique perspectives that make your products memorable"
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Fast Turnaround",
                  desc: "Quick delivery without compromising on quality"
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