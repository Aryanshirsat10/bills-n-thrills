import React from 'react';
import { motion } from 'framer-motion';

const UnrevealingTextAnimation = (props) => {
  return (
    <div style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>
      <motion.span
        animate={{
          y: ['0%', '-10%', '0%'], // Adjust the bounce distance as needed
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse', // This creates a continuous bounce effect
        }}
        whileHover={{ color: 'rgb(43, 232, 42)' }}
        style={{
          display: 'inline-block',
        }}
      >
       {props.name}
      </motion.span>
    </div>
  );
};

export default UnrevealingTextAnimation;
