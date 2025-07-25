import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Roleta = ({ onGirar, girando, onResultado }) => {
  const [rotacao, setRotacao] = useState(0);

  const cores = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];

  const segmentos = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    cor: cores[i],
    angulo: (360 / 12) * i
  }));

  const handleGirar = () => {
    if (girando) return;
    
    onGirar();
    
    // Giros aleatórios entre 5 e 8 voltas completas + ângulo final aleatório
    const voltasCompletas = Math.floor(Math.random() * 4) + 5; // 5-8 voltas
    const anguloFinal = Math.random() * 360; // Ângulo final aleatório
    const novaRotacao = rotacao + (voltasCompletas * 360) + anguloFinal;
    
    setRotacao(novaRotacao);
    
    // Simular resultado após 3 segundos
    setTimeout(() => {
      onResultado();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Container da Roleta */}
      <div className="relative">
        {/* Ponteiro */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
        </div>
        
        {/* Roleta */}
        <motion.div
          className="w-80 h-80 rounded-full border-8 border-gray-800 shadow-2xl relative overflow-hidden"
          animate={{ rotate: rotacao }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        >
          {/* Segmentos da roleta */}
          {segmentos.map((segmento, index) => (
            <div
              key={segmento.id}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${segmento.angulo}deg)`,
                transformOrigin: 'center'
              }}
            >
              <div
                className="absolute w-0 h-0"
                style={{
                  left: '50%',
                  top: '50%',
                  borderLeft: '160px solid transparent',
                  borderRight: '160px solid transparent',
                  borderBottom: `160px solid ${segmento.cor}`,
                  transform: 'translateX(-50%) translateY(-50%) rotate(-15deg)',
                  transformOrigin: 'center bottom'
                }}
              />
              
              {/* Número do segmento */}
              <div
                className="absolute text-white font-bold text-lg"
                style={{
                  left: '50%',
                  top: '25%',
                  transform: 'translateX(-50%) translateY(-50%)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}
              >
                {index + 1}
              </div>
            </div>
          ))}
          
          {/* Centro da roleta */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-2xl">🎲</span>
          </div>
        </motion.div>
      </div>

      {/* Botão */}
      <motion.button
        onClick={handleGirar}
        disabled={girando}
        className={`px-8 py-4 rounded-full text-xl font-bold text-white shadow-lg transition-all duration-200 ${
          girando 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95'
        }`}
        whileHover={!girando ? { scale: 1.05 } : {}}
        whileTap={!girando ? { scale: 0.95 } : {}}
      >
        {girando ? (
          <span className="flex items-center space-x-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Girando...</span>
          </span>
        ) : (
          '🎲 Girar Roleta'
        )}
      </motion.button>
    </div>
  );
};

export default Roleta;

