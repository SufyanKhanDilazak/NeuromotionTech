'use client';

import { motion } from 'framer-motion';
import { Search, TrendingUp, Globe, BarChart3, Target, Zap } from 'lucide-react';

export default function Page() {
  // SEO-themed animation variants
  const seoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

const seoItemVariants: import('framer-motion').Variants = {    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8]
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5]
    }
  };

  const rankVariants = {
    animate: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Search engine floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-teal-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyan-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-green-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={seoContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: SEO Dashboard Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={seoItemVariants}
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
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-2xl opacity-75"
                animate={pulseVariants}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <div className="relative w-36 h-36 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center"
                  animate={rankVariants}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Search className="w-12 h-12 text-emerald-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SEARCH ENGINE OPTIMIZATION
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-emerald-800 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Boost your online visibility and climb search rankings with our data-driven SEO strategies
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['Google', 'Bing', 'Yahoo', 'Keywords', 'Rankings', 'Traffic'].map((term, index) => (
              <motion.span
                key={term}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-800 font-medium text-sm hover:scale-105 transition-transform cursor-pointer shadow-sm"
                whileHover={{ scale: 1.1, borderColor: '#10b981' }}
                whileTap={{ scale: 0.95 }}
                animate={floatVariants}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                {term}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: SEO Strategy Overview */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              COMPREHENSIVE SEO STRATEGY
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"
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
                className="text-3xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Data-Driven SEO Solutions
              </motion.h3>

              <motion.p
                className="text-lg text-emerald-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our SEO approach combines technical expertise with strategic insight to improve your search engine rankings and drive organic traffic. We analyze market trends, competitor performance, and user behavior to create effective SEO strategies that deliver measurable results and sustainable growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-emerald-900 mb-6 text-center">SEO Services:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Search className="w-5 h-5" />, text: "Keyword Research & Analysis" },
                    { icon: <Globe className="w-5 h-5" />, text: "On-Page Optimization" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "Technical SEO Audits" },
                    { icon: <BarChart3 className="w-5 h-5" />, text: "Link Building Strategy" },
                    { icon: <Target className="w-5 h-5" />, text: "Local SEO Optimization" },
                    { icon: <Zap className="w-5 h-5" />, text: "Content Strategy & SEO" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 hover:border-emerald-400 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-emerald-800 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-emerald-200 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 border-2 border-emerald-200 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={rankVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl mb-6 shadow-2xl">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">SEO Dashboard</h3>
                  <p className="text-emerald-700 mb-6">Tracking your search performance</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-emerald-500 rounded-full"
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

        {/* Section 3: SEO Ranking Factors */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-emerald-100/50 to-cyan-100/50 rounded-3xl border border-emerald-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              RANKING FACTORS
            </motion.h2>
            <motion.p
              className="text-xl text-emerald-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Key elements that influence search engine rankings
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Content Quality",
                desc: "High-value, relevant content that addresses user search intent effectively.",
                icon: <Search className="w-8 h-8" />,
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Technical SEO",
                desc: "Site speed, mobile responsiveness, and technical optimization factors.",
                icon: <Zap className="w-8 h-8" />,
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "Backlinks",
                desc: "High-authority, relevant links that boost domain authority.",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "from-teal-500 to-green-500"
              },
              {
                title: "User Experience",
                desc: "Site navigation, engagement metrics, and user satisfaction signals.",
                icon: <Globe className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Local Signals",
                desc: "Location-based factors for local search optimization.",
                icon: <Target className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Social Signals",
                desc: "Social media engagement and sharing that influences rankings.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              }
            ].map((factor, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${factor.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white`}>
                  {factor.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center group-hover:text-emerald-700 transition-colors">
                  {factor.title}
                </h3>
                <p className="text-emerald-700 text-center leading-relaxed">{factor.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: SEO Performance Metrics */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PERFORMANCE METRICS
            </motion.h2>
            <motion.p
              className="text-xl text-emerald-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our SEO campaigns
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100%", label: "ROI Increase", icon: <BarChart3 className="w-6 h-6" /> },
              { number: "85%", label: "Traffic Growth", icon: <TrendingUp className="w-6 h-6" /> },
              { number: "Top 3", label: "Ranking Positions", icon: <Target className="w-6 h-6" /> },
              { number: "95%", label: "Visibility Score", icon: <Search className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white/80 to-emerald-50/80 rounded-2xl border border-emerald-200 backdrop-blur-sm hover:border-emerald-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2">{metric.number}</div>
                <div className="text-emerald-700 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: SEO Tools & Technologies */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-emerald-100/40 to-cyan-100/40 rounded-3xl border border-emerald-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              SEO TOOLS & ANALYTICS
            </motion.h2>
            <motion.p
              className="text-xl text-emerald-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Industry-leading tools for comprehensive SEO analysis
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Google Analytics', color: 'from-emerald-500 to-teal-500' },
              { name: 'Search Console', color: 'from-cyan-500 to-blue-500' },
              { name: 'SEMrush', color: 'from-teal-500 to-green-500' },
              { name: 'Ahrefs', color: 'from-blue-500 to-cyan-500' },
              { name: 'Moz', color: 'from-green-500 to-emerald-500' },
              { name: 'Hotjar', color: 'from-purple-500 to-pink-500' }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                className={`px-6 py-4 bg-gradient-to-r ${tool.color} rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with SEO Feel */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Search pattern overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 8,
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
              RANK AT THE TOP
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Optimize your website for maximum visibility and organic traffic growth
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-emerald-600 font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                OPTIMIZE NOW
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white hover:text-emerald-600 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                ANALYZE WEBSITE
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
                  icon: <Search className="w-8 h-8" />,
                  title: "First Page Rankings",
                  desc: "Achieve top positions for your target keywords"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Organic Traffic Growth",
                  desc: "Increase qualified visitors to your website"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Measurable ROI",
                  desc: "Track and measure your SEO investment returns"
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