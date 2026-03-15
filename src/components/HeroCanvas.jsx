export function HeroCanvas() {
  return (
    <div className="orbital-bg" aria-hidden="true">
      <div className="gradient-mesh" />

      <div className="orbital-arc orbital-arc--1" />
      <div className="orbital-arc orbital-arc--2" />
      <div className="orbital-arc orbital-arc--3" />

      <div className="orbital-ring">
        <div className="ring-dot" />
        <div className="ring-dot" />
        <div className="ring-dot" />
      </div>

      <div className="floating-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              opacity: 0.15 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="light-streak light-streak--1" />
      <div className="light-streak light-streak--2" />
      <div className="light-streak light-streak--3" />
    </div>
  )
}
