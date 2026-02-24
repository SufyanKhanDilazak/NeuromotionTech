'use client';

import { motion } from 'framer-motion';
import { Share2, TrendingUp, Users, BarChart3, MessageCircle, Heart } from 'lucide-react';

export default function Page() {
  // Digital marketing-themed animation variants
  const socialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const socialItemVariants = {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Social media floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-indigo-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-pink-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={socialContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Social Media Dashboard Hero */}
        <motion.section
          className="text-center mb-24 py-16 relative"
          variants={socialItemVariants}
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
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-75"
                animate={pulseVariants}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <div className="relative w-36 h-36 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <motion.div
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center"
                  animate={pulseVariants}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Share2 className="w-12 h-12 text-blue-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SOCIAL MEDIA MARKETING
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-blue-800 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Connect, engage, and grow your audience across all major social platforms
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map((platform, index) => (
              <motion.span
                key={platform}
                className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-800 font-medium text-sm hover:scale-105 transition-transform cursor-pointer shadow-sm"
                whileHover={{ scale: 1.1, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.95 }}
                animate={floatVariants}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
              >
                {platform}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 2: Social Strategy Overview */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              STRATEGIC SOCIAL ENGAGEMENT
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
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
                className="text-3xl font-bold text-blue-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Data-Driven Social Strategies
              </motion.h3>

              <motion.p
                className="text-lg text-blue-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Our social media marketing approach combines analytics with creative content to build authentic connections with your target audience. We develop comprehensive strategies that align with your business goals and drive measurable results across all social platforms.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Social Media Services:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <MessageCircle className="w-5 h-5" />, text: "Content Creation & Strategy" },
                    { icon: <Users className="w-5 h-5" />, text: "Community Management" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "Paid Advertising Campaigns" },
                    { icon: <BarChart3 className="w-5 h-5" />, text: "Analytics & Reporting" },
                    { icon: <Heart className="w-5 h-5" />, text: "Influencer Partnerships" },
                    { icon: <Share2 className="w-5 h-5" />, text: "Cross-Platform Integration" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-blue-800 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200 p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200 flex items-center justify-center aspect-video">
                <motion.div
                  className="text-center p-8"
                  animate={pulseVariants}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                    <Share2 className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">Social Hub</h3>
                  <p className="text-blue-700 mb-6">Connecting brands with their audiences</p>
                  <div className="flex justify-center space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-blue-500 rounded-full"
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

        {/* Section 3: Platform Strategy Grid */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-3xl border border-blue-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PLATFORM STRATEGIES
            </motion.h2>
            <motion.p
              className="text-xl text-blue-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Customized approaches for each social media platform
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Facebook",
                desc: "Community building and targeted advertising for diverse audiences.",
                icon: <Share2 className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Instagram",
                desc: "Visual storytelling and influencer partnerships for brand awareness.",
                icon: <Heart className="w-8 h-8" />,
                color: "from-pink-500 to-purple-500"
              },
              {
                title: "LinkedIn",
                desc: "B2B networking and thought leadership for professional growth.",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-600 to-indigo-600"
              },
              {
                title: "Twitter",
                desc: "Real-time engagement and trending conversations management.",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "from-sky-500 to-blue-500"
              },
              {
                title: "TikTok",
                desc: "Viral content creation and Gen-Z audience targeting.",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "YouTube",
                desc: "Long-form content and video marketing strategies.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "from-red-500 to-pink-500"
              }
            ].map((platform, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 text-center group-hover:text-blue-700 transition-colors">
                  {platform.title}
                </h3>
                <p className="text-blue-700 text-center leading-relaxed">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Engagement Metrics */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ENGAGEMENT METRICS
            </motion.h2>
            <motion.p
              className="text-xl text-blue-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Measurable results from our social media campaigns
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "200%", label: "Engagement Rate", icon: <Heart className="w-6 h-6" /> },
              { number: "150%", label: "Reach Growth", icon: <Users className="w-6 h-6" /> },
              { number: "85%", label: "Conversion Rate", icon: <TrendingUp className="w-6 h-6" /> },
              { number: "95%", label: "Brand Awareness", icon: <Share2 className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-b from-white/80 to-blue-50/80 rounded-2xl border border-blue-200 backdrop-blur-sm hover:border-blue-400 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">{metric.number}</div>
                <div className="text-blue-700 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Content Strategy */}
        <motion.section
          className="mb-24 py-16 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-3xl border border-blue-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CONTENT STRATEGY
            </motion.h2>
            <motion.p
              className="text-xl text-blue-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Creative content approaches for maximum engagement
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Video Content', color: 'from-blue-500 to-cyan-500' },
              { name: 'Interactive Posts', color: 'from-purple-500 to-pink-500' },
              { name: 'Live Streaming', color: 'from-red-500 to-orange-500' },
              { name: 'User-Generated', color: 'from-green-500 to-teal-500' },
              { name: 'Storytelling', color: 'from-indigo-500 to-blue-500' },
              { name: 'Hashtag Campaigns', color: 'from-yellow-500 to-orange-500' }
            ].map((strategy, index) => (
              <motion.div
                key={strategy.name}
                className={`px-6 py-4 bg-gradient-to-r ${strategy.color} rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {strategy.name}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Final CTA with Social Feel */}
        <motion.section
          className="py-20 px-8 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* Social media pattern overlay */}
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
              CONNECT WITH YOUR AUDIENCE
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              Build meaningful relationships and grow your social media presence
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-white text-blue-600 font-bold py-5 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:bg-gray-100 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                  x: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                START CAMPAIGN
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 hover:bg-white hover:text-blue-600 min-w-[240px] text-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                ANALYZE AUDIENCE
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
                  icon: <Share2 className="w-8 h-8" />,
                  title: "Cross-Platform",
                  desc: "Unified strategy across all social media channels"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Measurable Results",
                  desc: "Trackable metrics and ROI-focused campaigns"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Audience Growth",
                  desc: "Organic and paid strategies for sustainable growth"
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