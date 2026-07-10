import Image from "next/image";

export function HeroSignalBackground() {
  return (
    <div className="hero-signal pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="signal-space" />
      <div className="signal-dust" />
      <div className="signal-transition-glow" />

      <div className="signal-visual-stage">
        <Image
          src="/hero/mikianeli-acquisition-system-final.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 48vw, (min-width: 768px) 62vw, 100vw"
          className="signal-visual-image"
        />
        <div className="signal-official-mark">
          <Image
            src="/mikianeli-symbol-light.png"
            alt=""
            fill
            sizes="80px"
            className="signal-official-mark-image"
          />
        </div>
        <div className="signal-visual-glow" />
        <div className="signal-visual-sheen" />
      </div>

      <div className="signal-vignette" />
    </div>
  );
}
