import React from "react";
import JapaCounter from "./JapaCounter";

const Hero: React.FC = () => {
  return (
    <header
      className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      data-purpose="hero-section"
      style={{ backgroundImage: "url('/chant banner.jpg')" }}
    >
      {/* Dark tint overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* Bottom fade into the page background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream-50 dark:from-gray-950 via-transparent to-transparent"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl text-white drop-shadow-lg mb-4">
          Focus Your Mind, Connect Your Soul
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light italic mb-12">
          &quot;In this age of Kali, there is no alternative, there is no alternative, there is no alternative for spiritual progress than the chanting of the holy name.&quot;
        </p>

      </div>
    </header>
  );
};

export default Hero;
