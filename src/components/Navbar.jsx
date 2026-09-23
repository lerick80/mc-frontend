import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    ["#inicio", "INICIO"],
    ["#evento", "EVENTO"],
    ["#countdown", "TIEMPO"],
    ["#rsvp", "RSVP"],
    ["#contacto", "CONTACTO"],
    ["#regalos", "REGALOS"],
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all ${scrolled ? "bg-black/80 backdrop-blur text-white" : "bg-transparent text-white"}`}>
      <div className="flex justify-center items-center px-4 py-3 md:px-6 md:py-4">
        <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm tracking-wide md:tracking-widest">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:opacity-70">{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}