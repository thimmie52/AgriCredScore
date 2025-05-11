import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dataAnalysisImage from '../assets/vecteezy_data-analysis-concept-illustration-flat-vector-design_10869737.png';
import { useNavigate } from 'react-router-dom';
import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.png';
import feature3 from '../assets/feature3.png';

const Home = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = dataAnalysisImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-green-900 w-full">
        <div className="max-w-7xl flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white">
            <span className="sr-only">Company Logo</span>
            <span className="inline-block">Bridge</span>
          </a>
          <div className="ml-auto">
            <button onClick={() => navigate('/signup')}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition-colors absolute right-4 top-2">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-center space-y-6 w-full">
          {/* Analytics Image */}
          <div className="mb-4">
            {imageError ? (
              <div className="text-center text-red-500">Failed to load image.</div>
            ) : !imageLoaded ? (
              <div className="text-center text-gray-500 animate-pulse">Loading image...</div>
            ) : (
              <img
                src={dataAnalysisImage}
                alt="Analytics Illustration"
                className="rounded-lg shadow-lg w-full mx-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-800 tracking-tight w-full"
          >
            Bridging the Gap between Farmers and Lenders.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 w-full"
          >
            The future of banking is here. Experience seamless transactions, smart financial
            management, and a new level of control.
          </motion.p>

          <div className="w-full flex justify-end mt-6 px-4">
            <button onClick={() => navigate('/signup')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors flex items-center">
              Open an Account <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="w-full bg-white mt-32 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-16">
            Why Choose Bridge?
          </h2>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-4 max-w-xs"
            >
              <img src={feature1} alt="Feature 1" className="mx-auto w-20 h-20" />
              <h3 className="text-xl font-semibold text-gray-800">Improve Creditworthiness</h3>
              <p className="text-gray-600">
                Chat with our advanced AI and understand the steps you need to improve your creditworthiness.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4 max-w-xs"
            >
              <img src={feature2} alt="Feature 2" className="mx-auto w-20 h-20" />
              <h3 className="text-xl font-semibold text-gray-800">Smart Farmer Profiles</h3>
              <p className="text-gray-600">
                Easily manage your farm data and let lenders find you based on your performance.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center space-y-4 max-w-xs"
            >
              <img src={feature3} alt="Feature 3" className="mx-auto w-20 h-20" />
              <h3 className="text-xl font-semibold text-gray-800">Smart Farm Dashboards</h3>
              <p className="text-gray-600">
                See clear and insightful analytics of different farmers and insights to help you make decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} Bridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
