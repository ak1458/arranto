'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  lineClassName?: string;
  innerClassName?: string;
}

export const SplitText = forwardRef<HTMLHeadingElement, SplitTextProps>(
  (
    {
      children,
      className = '',
      lineClassName = 'overflow-hidden block w-full relative',
      innerClassName = 'line inline-block will-change-transform',
    },
    ref
  ) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const [lines, setLines] = useState<string[][]>([]);
    // Lines start pushed out of their overflow-hidden wrapper, waiting for the caller's
    // GSAP reveal. Callers skip that timeline under reduced motion AND below the 1024px
    // desktop breakpoint (same convention as Hero's pin/TickerSection's pin), so without
    // this the text would simply never come back — hidden content, not a calmer animation.
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
      const skipsReveal =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(min-width: 1024px)').matches;
      setReduced(skipsReveal);
    }, []);

    // Forward the internal DOM element to the parent ref
    useImperativeHandle(ref, () => containerRef.current!);

    useEffect(() => {
      const handleResize = () => {
        const container = containerRef.current;
        if (!container) return;

        const text = children.trim();
        if (!text) return;

        const words = text.split(/\s+/);
        
        // Temporary render words to measure offsets
        container.innerHTML = words
          .map((word) => `<span class="word-measure" style="display: inline-block; white-space: nowrap;">${word}</span>`)
          .join(' ');

        const wordSpans = container.querySelectorAll('.word-measure');
        const groupedLines: string[][] = [];
        let currentLine: string[] = [];
        let currentOffset = -9999;

        wordSpans.forEach((span, idx) => {
          const element = span as HTMLElement;
          const offset = element.offsetTop;
          const word = words[idx];

          if (Math.abs(offset - currentOffset) > 5) {
            if (currentLine.length > 0) {
              groupedLines.push(currentLine);
            }
            currentLine = [word];
            currentOffset = offset;
          } else {
            currentLine.push(word);
          }
        });

        if (currentLine.length > 0) {
          groupedLines.push(currentLine);
        }

        setLines(groupedLines);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [children]);

    // SSR Fallback (rendered before JS loads in browser)
    if (lines.length === 0) {
      return (
        <h3 ref={containerRef} className={className}>
          {children}
        </h3>
      );
    }

    return (
      <h3 ref={containerRef} className={className}>
        {lines.map((lineWords, lineIdx) => (
          <span key={lineIdx} className={lineClassName}>
            <span
              className={innerClassName}
              style={reduced ? undefined : { transform: 'translateY(100%)' }}
            >
              {lineWords.join(' ')}
            </span>
          </span>
        ))}
      </h3>
    );
  }
);

SplitText.displayName = 'SplitText';
