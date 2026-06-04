import React, { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Watch for window resize dynamically
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic Blob definitions for 5 sleek, slow-moving, glowing entities
    interface FluidBlob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      phase: number;      // Individual phase offset for color morphing
      colorSpeed: number; // Speed of transitioning color state
      pulseSpeed: number; // Speed of breathing breathing scale
    }

    const blobs: FluidBlob[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        vx: 0.22,
        vy: -0.15,
        baseRadius: Math.min(width, height) * 0.35,
        radius: 0,
        phase: 0,
        colorSpeed: 0.0012,
        pulseSpeed: 0.002,
      },
      {
        x: width * 0.75,
        y: height * 0.2,
        vx: -0.18,
        vy: 0.22,
        baseRadius: Math.min(width, height) * 0.42,
        radius: 0,
        phase: Math.PI / 3,
        colorSpeed: 0.0009,
        pulseSpeed: 0.0015,
      },
      {
        x: width * 0.35,
        y: height * 0.7,
        vx: -0.15,
        vy: -0.25,
        baseRadius: Math.min(width, height) * 0.38,
        radius: 0,
        phase: Math.PI / 1.5,
        colorSpeed: 0.0016,
        pulseSpeed: 0.0025,
      },
      {
        x: width * 0.8,
        y: height * 0.8,
        vx: 0.25,
        vy: -0.12,
        baseRadius: Math.min(width, height) * 0.45,
        radius: 0,
        phase: Math.PI,
        colorSpeed: 0.001,
        pulseSpeed: 0.0018,
      },
      {
        x: width * 0.5,
        y: height * 0.45,
        vx: 0.12,
        vy: 0.18,
        baseRadius: Math.min(width, height) * 0.32,
        radius: 0,
        phase: Math.PI * 1.5,
        colorSpeed: 0.0014,
        pulseSpeed: 0.0022,
      }
    ];

    let time = 0;

    const render = () => {
      if (!ctx || !canvas) return;

      // Ensure the canvas fully clears to prevent stack leaks while maintaining sleek glow integration
      ctx.fillStyle = "#040405"; // Deep dark background ecosystem
      ctx.fillRect(0, 0, width, height);

      time += 1;

      blobs.forEach((blob) => {
        // Slowly update positions with bouncing boundary logic
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce back from boundaries with soft padding margin
        const margin = 100;
        if (blob.x < -margin) {
          blob.x = -margin;
          blob.vx = Math.abs(blob.vx);
        } else if (blob.x > width + margin) {
          blob.x = width + margin;
          blob.vx = -Math.abs(blob.vx);
        }

        if (blob.y < -margin) {
          blob.y = -margin;
          blob.vy = Math.abs(blob.vy);
        } else if (blob.y > height + margin) {
          blob.y = height + margin;
          blob.vy = -Math.abs(blob.vy);
        }

        // Apply a gentle breathing scaling animation (pulsing radius)
        const pulse = Math.sin(time * blob.pulseSpeed) * 0.1 + 1.0;
        blob.radius = blob.baseRadius * pulse;

        // Smoothly interpolate colors from glowing yellow (Amber) to slate silver-grey
        // State 0: Amber-Yellow (e.g. hsl(46, 95%, 62%))
        // State 1: Dark Slate Silver-Grey (e.g. hsl(210, 8%, 42%))
        const colorFactor = Math.sin(time * blob.colorSpeed + blob.phase) * 0.5 + 0.5;

        // Linear interpolation helper
        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

        // Hue transition: Yellow-Amber (46) -> Slate-Grey (214)
        const h = Math.round(lerp(46, 214, colorFactor));
        // Saturation transition: High vibrance (92%) down to muted elegant steel (8%)
        const s = Math.round(lerp(95, 8, colorFactor));
        // Lightness transition: Glow brightness (58%) to soft backdrop silver (35%)
        const l = Math.round(lerp(58, 35, colorFactor));

        // Keep opacity low (0.16) so it is extremely subtle, sleek & premium
        const alpha = 0.16;

        // Draw radial glowing blob
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const bgGrad = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );

        bgGrad.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${alpha})`);
        bgGrad.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, ${alpha * 0.45})`);
        bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid-glow-canvas"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden"
      style={{
        mixBlendMode: "screen",
        opacity: 0.95,
        filter: "blur(120px) contrast(1.1)",
        WebkitFilter: "blur(120px) contrast(1.1)",
        maskImage: "radial-gradient(circle at 50% 50%, black 50%, rgba(0,0,0,0.65) 85%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 50%, rgba(0,0,0,0.65) 85%, transparent 100%)",
      }}
    />
  );
}
