import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { FeatureCard } from "../components/ui/feature-card";
import { motion } from "motion/react";

// Import icons
import { 
  HiOutlineSearch, 
  HiOutlinePencil, 
  HiOutlineSave, 
  HiOutlineCollection, 
  HiOutlineLockClosed 
} from "react-icons/hi";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const words = 'Discover and create personalized wellness sessions for yoga, meditation, and other mindfulness practices.';

  const features = [
    {
      icon: <HiOutlineSearch className="w-6 h-6" />,
      title: "Browse Sessions",
      description: "Explore a wide variety of wellness sessions created by experts and community members."
    },
    {
      icon: <HiOutlinePencil className="w-6 h-6" />,
      title: "Create Custom Sessions",
      description: "Design your own personalized wellness sessions with our intuitive creation tools."
    },
    {
      icon: <HiOutlineSave className="w-6 h-6" />,
      title: "Auto-save Drafts",
      description: "Never lose your work with automatic saving as you create and edit your content."
    },
    {
      icon: <HiOutlineCollection className="w-6 h-6" />,
      title: "Content Management",
      description: "Easily organize and access all your drafts and published sessions in one place."
    },
    {
      icon: <HiOutlineLockClosed className="w-6 h-6" />,
      title: "Secure Authentication",
      description: "Rest easy knowing your account and personal data are protected with secure authentication."
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background positioned with lowest z-index */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: "0" }}
      >
        <BackgroundBeamsWithCollision />
      </div>

      {/* Content positioned above background with higher z-index, 
          but below navbar (assuming navbar has z-index: 10) */}
      <div className="relative z-[1] w-full h-full overflow-auto">
        {/* Added padding-top to ensure content starts below navbar */}
        <div className="pt-16 sm:pt-20 min-h-screen">
          <div className="container px-4 py-8 sm:py-12 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              {/* Improved heading with better mobile visibility */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 pb-2">
                    Welcome to Wellness
                  </span>
                  <br />
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-indigo-300 mt-1">
                    Session Platform
                  </span>
                </h1>
              </motion.div>

              {/* Text animation with improved contrast */}
              <div className="text-base sm:text-lg mb-8 text-white px-2 sm:px-0">
                <TextGenerateEffect words={words}/>
              </div>

              {/* Call to action buttons with enhanced styling */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="mt-8"
              >
                {isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/dashboard" className="btn btn-primary relative overflow-hidden group">
                      <span className="relative z-10">Browse Sessions</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <Link to="/my-sessions" className="btn btn-secondary">
                      My Sessions
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/login" className="btn btn-primary relative overflow-hidden group">
                      <span className="relative z-10">Login</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <Link to="/register" className="btn btn-secondary">
                      Register
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Section header with animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-16 sm:mt-24 mb-8 relative"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                    Features
                  </span>
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-2"></div>
              </motion.div>
            </div>

            {/* Feature cards grid with improved spacing for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Added footer section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-center text-sm text-gray-400 mt-16 pb-8"
            >
              <p>© 2025 Wellness Session Platform. All rights reserved.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;