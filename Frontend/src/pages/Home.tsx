import { useState, useEffect } from 'react';
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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white">
            <span className="sr-only">Company Logo</span>
            <span className="inline-block">Bridge</span>
          </a>
          <div className="ml-auto">
            <button onClick={() => navigate('/login')}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition-colors">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-center space-y-6 w-full">
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
            Bridge AI is the next big agro-financial AI in Nigeria. Experience real time profile analysis, smart financial
            decision making, and a new level of control.
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
      <section className="w-full bg-white mt-24 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-16">
            Why Choose Bridge?
          </h2>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
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

      {/* Project Background Section */}
      <section className="w-full bg-gray-50 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-12">
            Our Project: Addressing Key Challenges in Nigerian Agriculture
          </h2>
          <div className="mt-8 max-w-4xl mx-auto text-gray-700 text-lg space-y-6 leading-relaxed">
            <p>
              Agriculture in Nigeria is critical to the economy but faces major barriers that hinder youth participation and productivity. Two of the most pressing challenges are:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Access to Finance:</strong> Youth in rural areas struggle to secure financing for agricultural ventures. The EFInA 2020 survey found that only 27% of rural adults have access to formal financial services, limiting the potential for young agripreneurs. (<a href="https://efina.org.ng/wp-content/uploads/2021/02/A2F-2020-Final-Report.pdf" className="text-green-700 underline" target="_blank">EFInA, 2020</a>)
              </li>
              <li>
                <strong>Post-Harvest Losses:</strong> Nigeria experiences 30%-50% post-harvest losses due to poor storage and logistics, costing the economy $9 billion annually. This discourages young people from engaging in agriculture. (<a href="https://fmard.gov.ng/" className="text-green-700 underline" target="_blank">FMARD, 2022</a>)
              </li>
            </ul>

            <p>
              By focusing on these critical barriers, this hackathon aims to inspire innovative solutions that can enhance productivity, reduce waste, and create new opportunities for young agripreneurs in Nigeria.
            </p>

            <h3 className="text-2xl font-semibold text-green-800 mt-8">Our Focus: Access to Affordable Finance</h3>
            <p>
              Our team chose to address the issue of <strong>Access to Affordable Finance</strong>. Access to finance remains one of the biggest barriers preventing young Nigerians from entering agriculture. Commercial banks consider agriculture too risky due to climate unpredictability, lack of credit history, and land tenure issues.
            </p>

            <h3 className="text-2xl font-semibold text-green-800 mt-8">Our Solution: Data-Driven Connection</h3>
            <p>
              Our solution uses an algorithm to predict a user’s ability to repay loans, helping them understand their chances of accessing funding. But we didn’t stop there. We trained an AI model on several risk factors specific to Nigerian farming, enabling users to chat with the AI and learn what they can do to improve their creditworthiness and financial status.
            </p>

            <p>
              Service providers can also visit <a href="https://agricredscore.onrender.com/dashboard" target="_blank" className="text-green-700 underline">agricredscore.onrender.com/dashboard</a> to view and connect with registered farmers based on their profiles. This project aims to connect farmers and lenders automatically — using data, AI, and empathy to bridge one of Nigeria’s biggest development gaps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 w-full bg-gray-100">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} Bridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;