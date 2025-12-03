import React, { useEffect, useRef, useState } from 'react';
import { StoryBlock } from '../types';
import {
  PerceptionChart,
  HarassmentDonut,
  StylizedMap,
  SolutionsChart,
  WordCloud,
  InfrastructureViz,
  HeroViz
} from './Visuals';

interface ScrollyContainerProps {
  blocks: StoryBlock[];
}

export const ScrollyContainer: React.FC<ScrollyContainerProps> = ({ blocks }) => {
  // Safe initialization - use a fallback if blocks is undefined or empty
  const [activeStepId, setActiveStepId] = useState<string>('');
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to set initial state safely after mount if blocks exist
  useEffect(() => {
    if (blocks && blocks.length > 0 && !activeStepId) {
      setActiveStepId(blocks[0].id);
    }
  }, [blocks]);

  useEffect(() => {
    if (!blocks || blocks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStepId(entry.target.getAttribute('data-id') || '');
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Active when element is in the middle 20% of screen
        threshold: 0.1,
      }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [blocks]);

  // Handle empty blocks case immediately to prevent downstream errors
  if (!blocks || blocks.length === 0) {
      return <div className="text-white p-10 flex justify-center items-center">Loading Content...</div>;
  }

  // Determine which visual to show based on active step, with fallback
  const activeBlock = blocks.find((b) => b.id === activeStepId) || blocks[0];

  const renderVisual = (visualType: StoryBlock['visualType']) => {
    switch (visualType) {
      case 'HERO': return <HeroViz />;
      case 'PERCEPTION': return <PerceptionChart />;
      case 'HARASSMENT': return <HarassmentDonut />;
      case 'MAP': return <StylizedMap />;
      case 'SOLUTIONS': return <SolutionsChart />;
      case 'WORDCLOUD': return <WordCloud />;
      case 'INFRASTRUCTURE': return <InfrastructureViz />;
      default: return <div className="text-slate-500">Visual not found</div>;
    }
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto">
      {/* Sticky Graphic Container for desktop/tablet */}
      <div className="hidden md:flex md:fixed md:inset-0 md:z-0 md:w-full md:h-full md:pointer-events-none">
        <div className="md:static md:h-screen md:w-1/2 md:ml-auto md:sticky md:top-0 flex items-center justify-center w-full h-full">
          <div className="w-full h-full max-w-2xl max-h-[80vh] p-4 transition-opacity duration-500 ease-in-out">
              {/* Glass Panel Container - Cleaner look */}
              <div className="w-full h-full rounded-3xl overflow-hidden glass-panel shadow-2xl pointer-events-auto">
                  {renderVisual(activeBlock.visualType)}
              </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Content */}
      <div className="relative z-10 w-full md:w-1/2">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            data-id={block.id}
            ref={(el) => { observerRefs.current[index] = el; }}
            className="min-h-screen flex flex-col justify-center p-6 md:p-12 pointer-events-auto"
          >
            {/* Inline visual for mobile to avoid overlap */}
            <div className="md:hidden mb-6">
              <div className="w-full h-[320px] rounded-2xl overflow-hidden glass-panel shadow-2xl">
                {renderVisual(block.visualType)}
              </div>
            </div>
            {/* Glass Card for Text - Lighter and Cleaner */}
            <div className={`glass-card p-8 rounded-2xl transition-all duration-700 transform ${activeStepId === block.id ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-8'}`}>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-800 mb-6 uppercase leading-tight tracking-tighter">
                {block.title}
                </h2>
                <div className="text-lg md:text-xl text-slate-600 leading-relaxed space-y-4 font-light">
                {block.content}
                </div>
            </div>
          </div>
        ))}
        {/* Footer spacer */}
        <div className="h-[20vh]"></div>
      </div>
    </div>
  );
};
