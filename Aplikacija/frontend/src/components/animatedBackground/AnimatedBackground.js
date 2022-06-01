import React from "react";

import "./AnimatedBackground.style.css";

function AnimatedBackground() {
  const particles = [];
  const particleCount = window.innerWidth / 100;

  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 75 + 20 + "px";
    const s = {
      left: (i / particleCount) * 100 + "%",
      width: size,
      height: size,
      animationDelay: Math.random() * 10 + "s",
      animationDuration: Math.random() * 33 + 15 + "s",
    };
    particles.push(<li style={s} key={i}></li>);
  }

  return (
    <div class="background">
      <ul class="particles">{particles}</ul>
    </div>
  );
}

export default AnimatedBackground;
