"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function MotionDirector() {
  const path = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      const elements = [
        ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ];
      if (reduced.matches) {
        document.documentElement.dataset.motion = "reduced";
        elements.forEach((el) => el.classList.remove("will-reveal"));
        return;
      }
      document.documentElement.dataset.motion = "ready";
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { rootMargin: "0px 0px -35px 0px", threshold: 0.08 },
      );
      elements.forEach((el) => {
        // Initial viewport content is always readable, including with slow JS.
        if (el.getBoundingClientRect().top > innerHeight - 30) {
          el.classList.add("will-reveal");
          observer.observe(el);
        }
      });
      let frame = 0;
      const draw = () => {
        frame = 0;
        document.documentElement.style.setProperty(
          "--page-progress",
          String(
            scrollY /
              Math.max(1, document.documentElement.scrollHeight - innerHeight),
          ),
        );
        document.documentElement.dataset.scrolled =
          scrollY > 30 ? "true" : "false";
        const art = document.querySelector<HTMLElement>(".hero-v3 .signal-art");
        if (art && scrollY < innerHeight)
          art.style.setProperty("--drift", `${Math.min(scrollY * 0.07, 42)}px`);
        if (innerWidth > 900)
          document
            .querySelectorAll<HTMLElement>(".stack-panel")
            .forEach((panel) => {
              const next = panel.nextElementSibling;
              const overlap = next
                ? Math.max(
                    0,
                    Math.min(1, (390 - next.getBoundingClientRect().top) / 280),
                  )
                : 0;
              panel.style.setProperty(
                "--compression",
                String(1 - overlap * 0.035),
              );
            });
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(draw);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      draw();
      dispose = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        elements.forEach((el) => el.classList.remove("will-reveal"));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => {
      dispose();
      reduced.removeEventListener("change", setup);
    };
  }, [path]);
  return null;
}
