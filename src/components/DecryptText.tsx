import { useState, useEffect } from "react";

interface DecryptTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

export default function DecryptText({
  text,
  delay = 0,
  duration = 800,
  className = "",
  trigger = true,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!trigger) return;

    let isMounted = true;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";
    let start: number | null = null;

    const triggerAnimation = () => {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        const decryptedCount = Math.floor(text.length * percentage);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < decryptedCount) {
            result += text[i];
          } else if (text[i] === " " || text[i] === "\n") {
            result += text[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        if (isMounted) {
          setDisplayText(result);
        }

        if (percentage < 1) {
          requestAnimationFrame(step);
        } else {
          if (isMounted) setDisplayText(text);
        }
      };
      requestAnimationFrame(step);
    };

    const timeoutId = setTimeout(triggerAnimation, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [text, delay, duration, trigger]);

  return <span className={className}>{displayText || text}</span>;
}
