import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Roleta from './components/Roleta';
import Resultado from './components/Resultado';
import { desafios } from './data/desafios';
import './App.css';

function App() {
  const [desafio, setDesafio] = useState('');
  const [girando, setGirando] = useState(false);

  const handleGirar = () => {
    setGirando(true);
    setDesafio(''); // Limpa o desafio anterior
  };

  const handleResultado = () => {
    // Sorteia um desafio aleatório
    const indiceAleatorio = Math.floor(Math.random() * desafios.length);
    const desafioSorteado = desafios[indiceAleatorio];
    
    setDesafio(desafioSorteado);
    setGirando(false);

    // Simula vibração no mobile (se disponível)
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  const handleNovoJogo = () => {
    setDesafio('');
  };

  return (
    <div className="game-container min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        className="text-center py-8 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="game-title text-4xl md:text-6xl font-bold mb-4">
          🎲 Roleta do Desafio Bobo
        </h1>
        <p className="text-white text-lg md:text-xl font-medium opacity-90">
          Gire e divirta-se com desafios engraçados!
        </p>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Roleta */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Roleta 
            onGirar={handleGirar}
            girando={girando}
            onResultado={handleResultado}
          />
        </motion.div>

        {/* Resultado */}
        <div className="w-full max-w-4xl px-4">
          <Resultado 
            desafio={desafio}
            onNovoJogo={handleNovoJogo}
          />
        </div>

        {/* Instruções */}
        {!desafio && !girando && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white text-lg font-medium opacity-80">
              👆 Clique no botão para começar a diversão!
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        className="text-center py-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-white opacity-70 text-sm">
          Desenvolvido com ❤️ para diversão em família
        </p>
      </motion.footer>
    </div>
  );
}

export default App;

