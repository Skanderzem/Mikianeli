"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Enhancement only: server-rendered content is visible without this controller.
const revealSelectors = [
  ".section h2",
  ".section .eyebrow",
  ".section .section-copy",
  ".stack-intro > p:not(.eyebrow)",
  ".method-heading > p:last-child",
  ".personal-grid > div:not(.personal-portrait)",
  ".scope-v3 .container > div > p",
  ".agency-alliance .container > div:not(.alliance-link)",
  ".agency-promise .container > *",
  ".agency-signal-grid > div",
  ".story-narrative > h2",
  ".story-narrative dl > div",
  ".story-context",
  ".result-index nav",
  ".faq details",
  ".closing h2",
  ".closing-grid p",
  ".closing-grid > .button",
  ".closing-note",
];

export function MotionDirector() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 901px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      const added: HTMLElement[] = [];
      document
        .querySelectorAll<HTMLElement>(revealSelectors.join(","))
        .forEach((el) => {
          // Reveal groups once; do not nest opacity transitions or animate form controls.
          if (!el.closest("[data-reveal], .prose-legal, .contact-form")) {
            el.dataset.reveal = "up";
            added.push(el);
          }
        });
      const elements = [
        ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ].filter((el) => !desktop.matches || !el.matches(".journey > li"));
      const panels = [
        ...document.querySelectorAll<HTMLElement>(".stack-panel"),
      ];
      const scenes = [
        ...document.querySelectorAll<HTMLElement>("[data-motion-scene]"),
      ];
      const hero = document.querySelector<HTMLElement>(".hero-v3");
      const art = hero?.querySelector<HTMLElement>(".signal-art");
      const journey = document.querySelector<HTMLOListElement>(".journey");
      const steps = journey
        ? [...journey.querySelectorAll<HTMLElement>(":scope > li")]
        : [];
      const clear = () => {
        elements.forEach((el) => {
          el.classList.remove("will-reveal");
          el.style.removeProperty("--reveal-delay");
        });
        added.forEach((el) => delete el.dataset.reveal);
        panels.forEach((el) => el.style.removeProperty("--compression"));
        ["--drift", "--pointer-x", "--pointer-y", "--pointer-turn"].forEach(
          (key) => art?.style.removeProperty(key),
        );
        if (journey) {
          delete journey.dataset.journey;
          journey.style.removeProperty("--journey-progress");
          steps.forEach((step) => {
            delete step.dataset.stepState;
            step.classList.remove("is-reached");
          });
        }
      };
      if (reduced.matches) {
        root.dataset.motion = "reduced";
        dispose = clear;
        return;
      }
      root.dataset.motion = "ready";
      if (journey && desktop.matches) journey.dataset.journey = "scroll";
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { rootMargin: "0px 0px -24px 0px", threshold: 0.06 },
      );

      for (const selector of [
        ".proof-v3-grid",
        ".journey",
        ".problem-lines",
        ".story-narrative dl",
        ".faq",
        ".agency-signal-grid",
      ]) {
        document.querySelectorAll(selector).forEach((group) => {
          [...group.children].forEach((el, i) =>
            (el as HTMLElement).style.setProperty(
              "--reveal-delay",
              `${Math.min(i, 3) * 85}ms`,
            ),
          );
        });
      }
      // Read all geometry before writing classes, avoiding a layout per element.
      const belowFold = elements.map(
        (el) => el.getBoundingClientRect().top > innerHeight - 24,
      );
      elements.forEach((el, i) => {
        if (belowFold[i] && !el.classList.contains("is-visible")) {
          el.classList.add("will-reveal");
          observer.observe(el);
        } else el.classList.add("is-visible");
      });
      const sceneObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("has-entered");
              sceneObserver.unobserve(entry.target);
            }
          }),
        { threshold: 0.15 },
      );
      scenes.forEach((el) => sceneObserver.observe(el));

      let frame = 0;
      let lastStep = -1;
      let lastJourneyProgress = -1;
      let pointer: { x: number; y: number } | null = null;
      const draw = () => {
        frame = 0;
        const scroll = window.scrollY;
        const progress = scroll / Math.max(1, root.scrollHeight - innerHeight);
        const overlaps = desktop.matches
          ? panels.map((panel) => {
              const next = panel.nextElementSibling;
              return next
                ? Math.max(
                    0,
                    Math.min(1, (390 - next.getBoundingClientRect().top) / 280),
                  )
                : 0;
            })
          : [];
        const bounds =
          art && pointer && desktop.matches
            ? hero!.getBoundingClientRect()
            : null;
        // The existing row crosses the reading area; no pinning or extra scroll distance.
        const journeyProgress =
          journey && desktop.matches
            ? Math.max(
                0,
                Math.min(
                  1,
                  (innerHeight * 0.82 - journey.getBoundingClientRect().top) /
                    (innerHeight * 0.56),
                ),
              )
            : 0;
        // All reads precede writes; updates happen only after scroll/pointer/resize events.
        root.style.setProperty("--page-progress", String(progress));
        root.dataset.scrolled = scroll > 30 ? "true" : "false";
        if (art) {
          art.style.setProperty(
            "--drift",
            `${desktop.matches ? Math.min(scroll * 0.06, 36) : 0}px`,
          );
          const x =
            bounds && pointer
              ? (pointer.x - bounds.left) / bounds.width - 0.5
              : 0;
          const y =
            bounds && pointer
              ? (pointer.y - bounds.top) / bounds.height - 0.5
              : 0;
          art.style.setProperty(
            "--pointer-x",
            `${Math.max(-6, Math.min(6, x * 12))}px`,
          );
          art.style.setProperty(
            "--pointer-y",
            `${Math.max(-4, Math.min(4, y * 8))}px`,
          );
          art.style.setProperty(
            "--pointer-turn",
            `${Math.max(-0.6, Math.min(0.6, x * 1.2))}deg`,
          );
        }
        panels.forEach((panel, i) =>
          panel.style.setProperty(
            "--compression",
            String(1 - (overlaps[i] || 0) * 0.045),
          ),
        );
        if (
          journey &&
          desktop.matches &&
          journeyProgress !== lastJourneyProgress
        ) {
          journey.style.setProperty(
            "--journey-progress",
            String(journeyProgress),
          );
          lastJourneyProgress = journeyProgress;
          const current = Math.floor(journeyProgress * (steps.length - 1));
          if (current !== lastStep) {
            steps.forEach((step, i) => {
              step.dataset.stepState =
                i < current
                  ? "complete"
                  : i === current
                    ? "active"
                    : "upcoming";
              // Once read, copy stays revealed even when the visitor scrolls back.
              if (i <= current) step.classList.add("is-reached");
            });
            lastStep = current;
          }
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(draw);
      };
      const onPointer = (event: PointerEvent) => {
        if (
          !desktop.matches ||
          !finePointer.matches ||
          event.pointerType === "touch"
        )
          return;
        pointer = { x: event.clientX, y: event.clientY };
        schedule();
      };
      const resetPointer = () => {
        pointer = null;
        schedule();
      };
      const reveal = (el: Element) => {
        el.classList.add("is-visible");
        observer.unobserve(el);
      };
      const onFocus = (event: FocusEvent) => {
        let el = (event.target as Element)?.closest(".will-reveal");
        while (el) {
          reveal(el);
          el = el.parentElement?.closest(".will-reveal") || null;
        }
      };
      const onHash = () => {
        let id: string;
        try {
          id = decodeURIComponent(location.hash.slice(1));
        } catch {
          return;
        }
        const target = document.getElementById(id);
        if (target) {
          if (target.matches(".will-reveal")) reveal(target);
          target.querySelectorAll(".will-reveal").forEach(reveal);
        }
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      window.addEventListener("hashchange", onHash);
      document.addEventListener("focusin", onFocus);
      hero?.addEventListener("pointermove", onPointer, { passive: true });
      hero?.addEventListener("pointerleave", resetPointer);
      onHash();
      draw();
      dispose = () => {
        observer.disconnect();
        sceneObserver.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("hashchange", onHash);
        document.removeEventListener("focusin", onFocus);
        hero?.removeEventListener("pointermove", onPointer);
        hero?.removeEventListener("pointerleave", resetPointer);
        clear();
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    desktop.addEventListener("change", setup);
    return () => {
      dispose();
      reduced.removeEventListener("change", setup);
      desktop.removeEventListener("change", setup);
    };
  }, [path]);
  return null;
}
