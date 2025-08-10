import React, { useState, useEffect, ReactNode } from 'react';

type MathElement = {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  animationDuration: number;
  animationDelay: number;
  direction: number;
};

const MathBackground = ({children}: {children: ReactNode}) => {
  const [mathElements, setMathElements] = useState<MathElement[]>([]);

  const mathSymbols = [
    '∑', '∫', '∂', '∆', '∞', 'π', 'α', 'β', 'γ', 'θ', 'λ', 'μ', 'σ', 'φ', 'ω',
    '√', '∛', '±', '≤', '≥', '≠', '≈', '∝', '∈', '∉', '⊂', '⊃', '∪', '∩',
    'x²', 'y³', 'f(x)', 'dx', 'dy', 'sin', 'cos', 'tan', 'log', 'ln',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'x = 2y + 1', 'y = mx + b', 'E = mc²', 'a² + b² = c²', 'lim', 'max', 'min'
  ];

  useEffect(() => {
    const generateMathElements = () => {
      const elements = [];
      for (let i = 0; i < 50; i++) {
        elements.push({
          id: i,
          symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 12,
          opacity: Math.random() * 0.4 + 0.1,
          rotation: Math.random() * 360,
          animationDuration: Math.random() * 20 + 10,
          animationDelay: Math.random() * 10,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
      setMathElements(elements);
    };

    generateMathElements();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Grid Paper Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FEE2E2 0%, #E0F2FE 100%)',
          opacity: 0.3
        }}
      />

      {/* Floating Math Elements */}
      <div className="absolute inset-0">
        {mathElements.map((element) => (
          <div
            key={element.id}
            className="absolute text-gray-600 font-mono select-none pointer-events-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation}deg)`,
              animation: `float-${element.id} ${element.animationDuration}s ease-in-out infinite ${element.animationDelay}s alternate`
            }}
          >
            {element.symbol}
          </div>
        ))}
      </div>

      {/* Content Area */}
      {children}

      {/* Dynamic CSS for floating animations */}
      <style jsx>{`
        ${mathElements.map(element => `
          @keyframes float-${element.id} {
            0% {
              transform: rotate(${element.rotation}deg) translateY(0px);
            }
            100% {
              transform: rotate(${element.rotation + (element.direction * 15)}deg) translateY(${element.direction * -20}px);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default MathBackground;