import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Resultado = ({ desafio, onNovoJogo }) => {
  return (
    <AnimatePresence>
      {desafio && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-pink-300 p-8 text-center">
            {/* Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <span className="text-3xl">🎉</span>
              <h2 className="text-2xl font-bold text-purple-600">Desafio Sorteado!</h2>
              <span className="text-3xl">🎉</span>
            </motion.div>

            {/* Desafio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 border-l-4 border-pink-400"
            >
              <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                {desafio}
              </p>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-600 font-medium">
                Divirta-se! 😄
              </p>
              
              <motion.button
                onClick={onNovoJogo}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎲 Novo Desafio
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Resultado;

