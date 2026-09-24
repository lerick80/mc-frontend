import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sello from "../images/sello.png";

// Colores
const TERRACOTA = "#9c4328";

// Línea de los pliegues
const LINEA_PLIEGUE = "rgba(40, 15, 5, 0.35)";

// Posiciones
const CX = 50;
const CY = 50;

const TOPX = 65;
const BOTX = 35;

export default function Sobre({ open, onOpen }) {
  const [abriendo, setAbriendo] = useState(false);

  const handleClick = () => {
    if (abriendo) return;
    setAbriendo(true);
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-[100] w-full h-full overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Solapa izquierda */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: TERRACOTA,
              clipPath: `polygon(
                0% 0%,
                ${TOPX}% 0%,
                ${CX}% ${CY}%,
                ${BOTX}% 100%,
                0% 100%
              )`,
              filter: "drop-shadow(-10px 0 18px rgba(0,0,0,0.35))",
            }}
            animate={abriendo ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <line x1={`${TOPX}%`} y1="0%" x2={`${CX}%`} y2={`${CY}%`} stroke={LINEA_PLIEGUE} strokeWidth="1.5" />
              <line x1={`${CX}%`} y1={`${CY}%`} x2={`${BOTX}%`} y2="100%" stroke={LINEA_PLIEGUE} strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Solapa derecha */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              backgroundColor: TERRACOTA,
              clipPath: `polygon(
                ${TOPX}% 0%,
                100% 0%,
                100% 100%,
                ${BOTX}% 100%,
                ${CX}% ${CY}%
              )`,
              filter: "drop-shadow(10px 0 18px rgba(0,0,0,0.35))",
            }}
            animate={abriendo ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <line x1={`${TOPX}%`} y1="0%" x2={`${CX}%`} y2={`${CY}%`} stroke={LINEA_PLIEGUE} strokeWidth="1.5" />
              <line x1={`${CX}%`} y1={`${CY}%`} x2={`${BOTX}%`} y2="100%" stroke={LINEA_PLIEGUE} strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Sello */}
          <motion.button
            onClick={handleClick}
            className="absolute z-30 cursor-pointer focus:outline-none"
            style={{
              left: `${CX}%`,
              top: `${CY}%`,
              width: 90,
              height: 90,
            }}
            initial={{ x: "-50%", y: "-50%" }}
            animate={abriendo ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={sello}
              alt="Sello MC"
              className="w-full h-full object-contain filter drop-shadow-[2px_6px_12px_rgba(0,0,0,0.40)] transition-transform hover:scale-105"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}