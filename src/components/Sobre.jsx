import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sello from "../images/sello.png";

// Colores
const TERRACOTA = "#9c4328";

// Línea de los pliegues
const LINEA_PLIEGUE = "rgba(0, 0, 0, 0.0)";

// Sombra de las solapas
const SOMBRA_SOLAPA = "rgba(70, 20, 10, 0.20)";

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
            }}
            animate={
              abriendo
                ? { x: "-100%" }
                : { x: 0 }
            }
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              {/* Pliegue superior */}
              <line
                x1={`${TOPX}%`}
                y1="0%"
                x2={`${CX}%`}
                y2={`${CY}%`}
                stroke={LINEA_PLIEGUE}
                strokeWidth="1"
              />

              {/* Pliegue inferior */}
              <line
                x1={`${CX}%`}
                y1={`${CY}%`}
                x2={`${BOTX}%`}
                y2="100%"
                stroke={LINEA_PLIEGUE}
                strokeWidth="1"
              />
            </svg>
          </motion.div>


          {/* Sombras solapa derecha */}
          <motion.div
            className="absolute inset-0 z-[15] pointer-events-none"
            animate={
              abriendo
                ? { x: "100%" }
                : { x: 0 }
            }
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >

              <defs>
                {/* Desenfoque de la sombra */}
                <filter
                  id="blurSombra"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>


              {/* sombra superior */}
              <line
                x1={`${TOPX}%`}
                y1="0%"
                x2={`calc(${CX}% - 5px)`}
                y2={`calc(${CY}% + 2px)`}
                stroke={SOMBRA_SOLAPA}
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#blurSombra)"
              />

              {/* Línea más definida de la sombra superior */}
              <line
                x1={`${TOPX}%`}
                y1="0%"
                x2={`calc(${CX}% - 2px)`}
                y2={`${CY}%`}
                stroke="rgba(60, 15, 5, 0.16)"
                strokeWidth="3"
                strokeLinecap="round"
              />


              {/* sombra inferiror*/}
              <line
                x1={`calc(${CX}% - 5px)`}
                y1={`calc(${CY}% + 2px)`}
                x2={`calc(${BOTX}% - 5px)`}
                y2="100%"
                stroke={SOMBRA_SOLAPA}
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#blurSombra)"
              />

              {/* Línea más definida de la sombra inferior */}
              <line
                x1={`calc(${CX}% - 2px)`}
                y1={`${CY}%`}
                x2={`calc(${BOTX}% - 2px)`}
                y2="100%"
                stroke="rgba(60, 15, 5, 0.16)"
                strokeWidth="3"
                strokeLinecap="round"
              />

            </svg>
          </motion.div>


          {/* Solapa derecha*/}
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
            }}
            animate={
              abriendo
                ? { x: "100%" }
                : { x: 0 }
            }
            transition={{
              duration: 2.0,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              {/* Pliegue superior */}
              <line
                x1={`${TOPX}%`}
                y1="0%"
                x2={`${CX}%`}
                y2={`${CY}%`}
                stroke={LINEA_PLIEGUE}
                strokeWidth="1"
              />

              {/* Pliegue inferior */}
              <line
                x1={`${CX}%`}
                y1={`${CY}%`}
                x2={`${BOTX}%`}
                y2="100%"
                stroke={LINEA_PLIEGUE}
                strokeWidth="1"
              />
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

            // Centra el sello
            initial={{
              x: "-50%",
              y: "-50%",
            }}

            animate={
              abriendo
                ? {
                    opacity: 0,
                    scale: 0.5,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }

            transition={{
              duration: 0.4,
            }}
          >
            <img
              src={sello}
              alt="Sello MC"
              className="
                w-full
                h-full
                object-contain
                filter
                drop-shadow-[2px_6px_12px_rgba(0,0,0,0.40)]
                transition-transform
                hover:scale-105
              "
            />
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}