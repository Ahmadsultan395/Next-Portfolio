import { gsap } from "gsap";

export const HeroAnimation = (container: HTMLElement) => {
  const ctx = gsap.context(() => {
    const q = gsap.utils.selector(container);
    const tl = gsap.timeline();

    tl.from(q(".hero-title"), {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
    })
      .from(
        q(".hero-typing"),
        { opacity: 0, x: -40, duration: 0.6, ease: "power2.out" },
        "-=0.6",
      )
      .from(
        q(".hero-button"),
        {
          opacity: 0,
          y: 40,
          scale: 0.85,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )
      .from(
        q(".hero-image"),
        { opacity: 0, scale: 0.5, duration: 1, ease: "power3.out" },
        "-=0.8",
      );

    gsap.to(q(".hero-image"), {
      y: -20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(q(".glow-ring"), {
      scale: 1.2,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power2.out",
    });
  }, container);

  return ctx;
};
