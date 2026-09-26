import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Countdown from "../components/Countdown";
import FadeIn from "../components/FadeIn";
import Sobre from "../components/Sobre";
import fondo from "../images/CarlosMagali.jpg";
import church from "../images/church2.png";
import cheers from "../images/cheers.png";
import vestimenta from "../images/vestimenta.png";
import whatsapp from "../images/whatsapp.png"
import cancion from "../images/musica.mp3";

import anillos from "../images/anillos.png";
import drink from "../images/drink.png";
import door from "../images/door.png";
import restaurant from "../images/restaurant.png";

import foto1 from "../images/CarlosMagali.jpg";
import foto2 from "../images/CarlosMagali2.jpg";
import foto3 from "../images/CarlosMagali3.jpg";
import foto4 from "../images/CarlosMagali4.jpg";
import foto5 from "../images/CarlosMagali5.jpg";

import florArriba from "../images/flowers_up.png";
import florAbajo from "../images/flowers_up.png";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [openGifts, setOpenGifts] = useState(false);
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState(null);
  const fotos = [foto1, foto2, foto3, foto4, foto5];
  const audioRef = useRef(null);
  const [sonando, setSonando] = useState(true);

  const [fotoActual, setFotoActual] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFotoActual((i) => (i === fotos.length - 1 ? 0 : i + 1));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!code) return;
    axios.get(`${API}/guest/${code}`).then((res) => setGuest(res.data)).catch(() => { });
  }, [code]);

  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f3ed] text-center px-6">
        <div>
          <h1 className="text-2xl mb-4" style={{ fontFamily: "Cormorant Garamond" }}>Invitación no válida</h1>
          <p className="text-[#4a4038]">Por favor utiliza el enlace que te enviaron.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f9f3ed] text-[#4a4038]" style={{ fontFamily: "Cormorant Garamond" }}>
      <Sobre open={opened} onOpen={() => { setOpened(true); audioRef.current.play(); }} />

      {/* hero */}
      <section
        id="inicio"
        className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url(${fondo})`,
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <FadeIn>
          <div className="relative text-center px-4">
            {/*<p className="tracking-widest text-sm mb-2">
                    ¡NOS CASAMOS!
                  </p>*/}

            <h1 className="text-6xl text-[#f9f3ed]  md:text-7xl" style={{ fontFamily: "Great Vibes" }}>
              Magali & Carlos
            </h1>

            {/*<p className="mt-4 text-sm">
                    ESTAMOS MUY FELICES DE INVITARTE A NUESTRA BODA
                  </p>
                  <p className="mt-4 text-sm">
                    27 Junio 2026
                  </p>*/}
          </div>
        </FadeIn>
      </section>

      {/* Imagen 
      <section id="inicio" className="pt-8 pb-1 px-8 flex flex-col items-center text-center">
        <FadeIn>
          <div
            className="w-full max-w-[280px] aspect-[3/4] overflow-hidden shadow-md"
            style={{ borderRadius: "140px 140px 0 0" }}
          >
            <img src={fondo} alt="Carlos y Magali" className="w-full h-full object-cover" />
          </div>
        </FadeIn>
      </section>*/}

      {/* Frase */}
      <section className="relative overflow-hidden py-16 px-21 text-center max-w-md mx-auto">
        <img
          src={florArriba}
          alt=""
          className="absolute -top-10 -left-14 w-48 md:w-60 pointer-events-none select-none"
        />

        <FadeIn>
          <h3 className="text-s tracking-widest text-[#523324]">
            “De nadie seré, sólo de ti, hasta que mis huesos se vuelvan ceniza y mi corazón deje de latir.”
          </h3>
          <p className="text-s tracking-widest text-[#523324]">Pablo Neruda</p>
        </FadeIn>
      </section>

      {/* padres */}
      <section className="py-10 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <h3 className="text-xs tracking-widest uppercase text-[#6e2c3a] mb-4">
            Con la bendición de Dios y en agradecimiento a nuestros padres
          </h3>
          <p className="text-s text-[#523324]">Sonia González Cerritos</p>
          <p className="text-s text-[#523324]">Sergio Pérez Orduña</p>
          <br />
          <p className="text-s text-[#523324]">Josefina González Reyes</p>
          <p className="text-s text-[#523324]">Florencio Rendón Hernández</p>
        </FadeIn>
      </section>

      {/* Nombres 
      <section id="inicio" className=" pb-1 px-8 flex flex-col items-center text-center">
        <FadeIn>
          <p className="tracking-[3px] text-xs text-[#a74e2a] mb-2"></p>
          <h1 className="text-6xl leading-[1.4] text-[#a74e2a] mb-8" style={{ fontFamily: "Great Vibes" }}>
            Magali<br />&<br />Carlos
          </h1>
        </FadeIn>
      </section>*/}

      {/* Texto */}
      <section className="pt-8 px-21 text-center max-w-md mx-auto">
        <FadeIn>
          <h3 className="text-s tracking-widest text-[#523324] mb-10">
            Tenemos el honor de invitarlos a la celebración de nuestro matrimonio, que se llevará a cabo el día
          </h3>
        </FadeIn>
      </section>

      {/* fecha grande */}
      <section className="py-14 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <div className="flex items-center justify-center gap-6">
            <div>
              <h3 className="text-sm tracking-widest text-[#523324]">NOVIEMBRE</h3>
              <h3 className="text-9xl text-[#a74e2a] font-serif leading-none">21</h3>
              <h3 className="text-sm tracking-widest text-[#523324]">2026</h3>
            </div>
            <div className="w-px h-40 bg-[#523324]"></div>
            <div>
              <h3 className="text-5xl text-[#523324] font-serif">4:00</h3>
              <p className="text-xs tracking-widest text-[#a74e2a] mt-1">P.M.</p>
            </div>
          </div>
        </FadeIn>
        <img
            src={florAbajo}
            alt=""
            className="absolute -top-10 -right-14 w-48 md:w-60 pointer-events-none select-none"
          />
      </section>

      {/* ceremonia */}
      <section id="evento" className="py-14 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <img src={church} alt="iglesia" className="w-18 h-auto mx-auto mb-3" />
          <h2 className="text-lg tracking-widest uppercase text-[#d86f3a] font-medium">Parroquia de la Merced</h2>
          <p className="text-[#4a4038] mt-2">Av. J. M. Morelos Y P. 812, Barrio de la Merced, 50080 Toluca de Lerdo, Méx.</p>
          <a href="https://maps.app.goo.gl/t8yMU7UJqenibN5x7" target="_blank" rel="noopener noreferrer" className="inline-block mt-5 px-6 py-2 rounded-full bg-[#a74e2a] text-white text-xs tracking-widest uppercase">
            Ver ubicación
          </a>
        </FadeIn>
      </section>

      {/* recepcion */}
      <section className="py-14 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <p className="mt-15 text-4xl text-[#aa5532]" style={{ fontFamily: "Great Vibes" }}>Recepción a seguir</p>
          <br />
          <img src={cheers} alt="cheers" className="w-20 h-auto mx-auto mb-3" />
          <h2 className="text-lg tracking-widest uppercase text-[#d86f3a] font-medium">Hacienda grand san pedro</h2>
          <p className="text-[#4a4038] mt-2">Av. Educación 11, 50900 Barrio San Pedro, Méx.</p>
          <p className="text-[#4a4038]">6:30 P.M.</p>
          <a href="https://maps.app.goo.gl/yRSFhMBYxug9468r9" target="_blank" rel="noopener noreferrer" className="inline-block mt-5 px-6 py-2 rounded-full bg-[#a74e2a] text-white text-xs tracking-widest uppercase">
            Ver ubicación
          </a>
        </FadeIn>
      </section>

      {/* Falta agregar la imágen*/}

      {/* itinerario */}
      <section id="itinerario" className="py-20 px-6 max-w-md mx-auto relative">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-12 text-center" style={{ fontFamily: "Great Vibes" }}>Itinerario</h2>

          <div className="relative">
            {/* línea vertical */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#4a4038] -translate-x-1/2"></div>

            {[
              ["4:00 P.M.", "Ceremonia", anillos],
              ["6:30 P.M.", "Recepción y Cóctel", drink],
              ["7:00 P.M.", "Ingreso", door],
              ["7:30 P.M.", "Cena", restaurant],
            ].map(([hora, evento, icono], i) => {
              const textoIzquierda = i % 2 === 0;
              return (
                <div key={evento} className="flex items-center justify-between py-10 relative">
                  <div className="w-[42%] flex justify-end">
                    {textoIzquierda ? (
                      <div className="text-right">
                        <p className="text-lg text-[#c98a5e]" style={{ fontFamily: "Cormorant Garamond" }}>{evento}</p>
                        <p className="text-[#523324]">{hora}</p>
                      </div>
                    ) : (
                      <img src={icono} alt={evento} className="w-16 h-16 object-contain" />
                    )}
                  </div>

                  <div className="absolute left-1/2 top-1/2 w-6 h-px bg-[#4a4038] -translate-x-1/2 -translate-y-1/2"></div>

                  <div className="w-[42%] flex justify-start">
                    {textoIzquierda ? (
                      <img src={icono} alt={evento} className="w-16 h-16 object-contain" />
                    ) : (
                      <div className="text-left">
                        <p className="text-lg text-[#c98a5e]" style={{ fontFamily: "Cormorant Garamond" }}>{evento}</p>
                        <p className="text-[#4a4038]">{hora}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </section>


      {/* countdown 
      <section id="countdown" className="py-16 text-center px-6">
        <p className="text-xs tracking-widest uppercase text-[#d86f3a] mb-2">Faltan</p>
        <Countdown date="2026-11-21 16:00:00" />
        <p className="text-xs tracking-widest uppercase text-[#d86f3a] mt-4">para nuestro gran día</p>
      </section> */}

      {/* galeria */}
      <section className="py-14 max-w-md mx-auto bg-[f9f3ed]">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-10 text-center" style={{ fontFamily: "Great Vibes" }}>Galería</h2>

          <div className="relative">
            <img
              src={fotos[fotoActual]}
              alt={`Foto ${fotoActual + 1}`}
              className="w-full aspect-[4/5] object-cover"
            />

            <button
              onClick={() => setFotoActual((i) => (i === 0 ? fotos.length - 1 : i - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ‹
            </button>
            <button
              onClick={() => setFotoActual((i) => (i === fotos.length - 1 ? 0 : i + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {fotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setFotoActual(i)}
                className={`w-2 h-2 rounded-full ${i === fotoActual ? "bg-[#4a4038]" : "bg-[#d8c9ac]"}`}
              />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* vestimenta */}
      <section className="py-14 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-3" style={{ fontFamily: "Great Vibes" }}>Vestimenta</h2>
          <img src={vestimenta} alt="cheers" className="w-20 h-auto mx-auto mb-3" />
          <p className="text-2xl text-[#523324]">Formal</p>
          <p className="text-[#523324] mt-2">Se reservan los colores blanco, beige y rojo para los novios.</p>
        </FadeIn>
      </section>

      {/* no ninos */}
      <section className="py-16 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-3" style={{ fontFamily: "Great Vibes" }}>No niños</h2>
          <p className="text-[#523324] leading-relaxed">
            Nuestra boda tiene un código secreto: Adultos Solamente. Amamos a sus peques,
            pero esta vez queremos ver a los papás dándolo todo en la pista de baile hasta el amanecer.
          </p>
          <br />
          <p className="text-[#523324] leading-relaxed">
            ¡Agradecemos su comprensión y esperamos puedan acompañarnos a celebrar este dia tan importante para nosotros!
          </p>
        </FadeIn>
      </section>

      {/* regalos 
      <section className="py-16 px-6 text-center max-w-md mx-auto border-t border-[#e4d8c6]">
        <FadeIn>
          <h2 className="text-3xl mb-4" style={{ fontFamily: "Great Vibes" }}>Regalos</h2>
          <p className="text-[#523324] mb-5">
            Su presencia y buenos deseos son nuestro mejor regalo, pero si desean obsequiarnos algo contaremos con un buzón para la lluvia de sobres.
          </p>
          <button onClick={() => setOpenGifts(!openGifts)} className="px-6 py-2 rounded-full border border-[#a98b5f] text-[#6e2c3a] text-xs tracking-widest uppercase">
            Mesa de regalos
          </button>

          {openGifts && (
            <div className="mt-8 space-y-4 text-left">
              <div className="border border-[#e4d8c6] p-4 rounded-lg">
                <h3 className="font-medium mb-1">Liverpool</h3>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#6e2c3a] underline text-sm">Ver mesa de regalos</a>
              </div>
            </div>
          )}
        </FadeIn>
      </section>*/}

      {/* pases reservados */}
      {guest && (
        <section className="py-16 px-6 text-center max-w-md mx-auto">
          <FadeIn>
            <p className="text-4xl text-[#aa5532] mb-3" style={{ fontFamily: "Great Vibes" }}>Hemos reservado</p>
            <p className="text-8xl my-2 text-[#523324]" style={{ fontFamily: "Great Vibes" }}>{guest.guests_allowed}</p>
            <p className="text-s tracking-widest uppercase text-[#523324]">
              {guest.guests_allowed === 1 ? "lugar" : "lugares"} en su honor
            </p>
            <p className="text-[#523324] mt-3 font-medium text-lg">{guest.name}</p>
          </FadeIn>
        </section>
      )}

      {/* rsvp */}
      <section id="rsvp" className="py-12 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-4" style={{ fontFamily: "Great Vibes" }}>Confirma tu asistencia</h2>
          <p className="text-[#523324] mb-6 text-sm">Nos complacerá tu confirmación antes del 20 de Octubre 2026.</p>
          <Link to={`/rsvp?code=${code}`} className="inline-block bg-[#aa5532] text-white px-8 py-3 rounded-full text-sm tracking-widest uppercase">
            Confirmar asistencia
          </Link>
        </FadeIn>
      </section>

      {/* contacto */}
      <section className="py-16 px-6 text-center max-w-md mx-auto">
        <FadeIn>
          <h2 className="text-4xl text-[#aa5532] mb-3" style={{ fontFamily: "Great Vibes" }}>¿Dudas?</h2>
          <p className="text-[#523324] leading-relaxed">
            Para más información o dudas acerca del evento, podrás comunicarte al siguiente número:
          </p>
          <br />
          <a href="https://wa.me/7224981180" target="_blank" rel="noopener noreferrer" className="inline-block" >
            <img src={whatsapp} alt="WhatsApp" className="w-16 h-16" />
          </a>
        </FadeIn>
      </section>

      <footer className="py-10 text-center">
        <p className="text-3xl text-[#aa5532]" style={{ fontFamily: "Great Vibes" }}>Magali & Carlos</p>
        <p className="mt-4 text-xs text-[#a98b5f]">© Powered by Erick LG</p>
      </footer>

      <audio ref={audioRef} src={cancion} loop />

      {/*<button
        onClick={() => {
          if (sonando) audioRef.current.pause();
          else audioRef.current.play();
          setSonando(!sonando);
        }}
       </div>*className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#6e2c3a] text-white flex items-center justify-center shadow-lg"
      >
        {sonando ? "🔊" : "🔇"} 
      </button>*/}
    </div>
  );
} 