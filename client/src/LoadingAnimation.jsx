import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import logo from'./Assets/logo.png';

function LoadingAnimation({ onLoadingComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 1, ease: 'easeInOut' } }
  };

  return (
    <motion.div className="card" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <div className="front-card">
      <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            <motion.img initial="hidden" animate="visible" src={logo} alt="Logo Alt Text" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoadingAnimation;
