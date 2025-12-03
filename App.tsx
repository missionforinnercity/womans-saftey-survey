import React from 'react';
import { ScrollyContainer } from './components/ScrollyContainer';
import { StoryBlock } from './types';

const App: React.FC = () => {

  const storyBlocks: StoryBlock[] = [
    {
      id: 'block-1',
      visualType: 'HERO',
      title: 'The Silent Crisis',
      content: (
        <>
          <p>
            For women in Cape Town's CBD, safety is not a guarantee—it's a daily gamble. 
            We surveyed <strong>42 women</strong> who navigate these streets daily.
          </p>
          <p className="text-brand-danger font-display tracking-wide text-xl mt-2">
            THE RESULTS ARE ALARMING.
          </p>
          <p>
             Not a single respondent marked public toilets as "Very Safe". 
             Over 90% have experienced harassment in the last year alone.
          </p>
        </>
      ),
    },
    {
      id: 'block-2',
      visualType: 'PERCEPTION',
      title: 'A City of Two Times',
      content: (
        <>
          <p>
            When asked "How safe do you feel?", the divide is temporal.
          </p>
          <p>
            During the day, there is a fragile sense of security (40% somewhat safe). 
            But as the sun sets, confidence collapses.
          </p>
          <blockquote className="border-l-4 border-brand-danger pl-4 italic text-brand-mission-pink my-6 font-serif text-2xl leading-tight">
            "Somewhat safe during the day, <span className="text-brand-danger font-bold">VERY unsafe</span> after dark."
          </blockquote>
          <p>
            Less than 5% feel "Very Safe" at any time.
          </p>
        </>
      ),
    },
    {
      id: 'block-3',
      visualType: 'HARASSMENT',
      title: 'Daily Operational Reality',
      content: (
        <>
          <p>
            Harassment isn't an anomaly; it's the norm.
          </p>
          <p>
            Over <strong>50%</strong> of respondents selected "Often" or "Always" when describing the frequency of harassment.
          </p>
          <p>
            From catcalling to intimidation, the data suggests that for a woman in the CBD, harassment is as predictable as the tides.
          </p>
        </>
      ),
    },
    {
      id: 'block-4',
      visualType: 'MAP',
      title: 'Geography of Fear',
      content: (
        <>
          <p>
            Danger has an address.
          </p>
          <ul className="list-disc list-inside space-y-2 marker:text-brand-danger">
            <li>
              <strong className="text-brand-danger font-display tracking-wide">THE STATION / GOLDEN ACRE:</strong> The epicenter of anxiety. 90% of maps circled this transport hub.
            </li>
            <li>
              <strong className="text-brand-danger font-display tracking-wide">LONG STREET:</strong> Synonymous with drugs and harassment.
            </li>
          </ul>
          <p className="mt-4">
            Conversely, <strong className="text-brand-mission-mint">St Georges Mall</strong> and <strong className="text-brand-mission-mint">Bree Street</strong> are the few corridors offering a semblance of safety, acting as vital arteries through a hostile grid.
          </p>
        </>
      ),
    },
    {
      id: 'block-5',
      visualType: 'SOLUTIONS',
      title: 'What Women Want',
      content: (
        <>
          <p>
            The solution isn't abstract design—it's protection.
          </p>
          <p>
            The top request? <strong className="text-brand-mission-mint text-xl font-display">VISIBLE SECURITY</strong>. 
            It outpolled "Better Lighting" by a factor of 2 to 1.
          </p>
          <p>
            Women are asking for a human presence. Eyes on the street. Authority figures who care.
          </p>
        </>
      ),
    },
    {
      id: 'block-6',
      visualType: 'WORDCLOUD',
      title: 'In Their Own Words',
      content: (
        <>
          <p>
            We asked for open-ended thoughts. The vocabulary of safety in Cape Town is telling.
          </p>
          <p>
            Words like <strong>Police</strong>, <strong>Security</strong>, and <strong>Men</strong> dominate the conversation.
          </p>
          <p>
            There is a specific, repeated request for <span className="text-brand-mission-pink font-serif italic text-lg">"Female Police Officers"</span>—a desire for authority without the gendered threat often associated with male interactions.
          </p>
        </>
      ),
    },
    {
      id: 'block-7',
      visualType: 'INFRASTRUCTURE',
      title: 'The Broken Trust',
      content: (
        <>
          <p>
            Perhaps the most damning statistic is the "Toilet Trust" score.
          </p>
          <p>
            <strong className="text-brand-danger text-4xl font-display">0% VERY SAFE.</strong>
          </p>
          <p>
            Public infrastructure is viewed as a trap, not a utility. It is the most unified negative consensus in the entire survey.
          </p>
          <div className="mt-8 p-6 glass-card rounded-lg border border-brand-mission-mint/30 text-center relative overflow-hidden">
             {/* Decorative Circumpunct in bg */}
             <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-[12px] border-brand-mission-mint opacity-10 pointer-events-none"></div>
             
             <h4 className="font-serif italic text-2xl text-brand-mission-mint mb-2">The Mission</h4>
             <p className="text-brand-mission-offwhite font-display uppercase tracking-widest text-sm">
                A cleaner, well-lit city patrolled by female-inclusive security forces. That is the mandate.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-transparent min-h-screen text-brand-mission-offwhite selection:bg-brand-mission-mint selection:text-brand-dark font-sans">
      {/* Intro Header with Mission CI */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 pointer-events-none flex justify-between items-start">
        {/* Recreated Code Logo */}
        <div className="pointer-events-auto">
          <img
            src="/mission-logo.png"
            alt="Mission for Inner City Cape Town"
            className="w-32 md:w-40 drop-shadow-lg"
          />
        </div>
        
        <div className="hidden md:flex flex-col items-end pointer-events-auto">
             <div className="bg-brand-mission-mint text-brand-dark font-display font-bold uppercase text-xs px-3 py-1 rounded-sm mb-2">
                 Doc. 01
             </div>
             <div className="text-brand-mission-offwhite/50 text-xs font-mono uppercase tracking-widest">
                 Safety Report 2025
             </div>
        </div>
      </header>

      <main>
        <ScrollyContainer blocks={storyBlocks} />
      </main>

      <footer className="w-full py-16 text-center text-slate-400 text-sm glass-panel border-t-0 relative mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent">
             <img
               src="/mission-logo.png"
               alt="Mission for Inner City Cape Town"
               className="scale-75 origin-center w-32 md:w-40 opacity-50"
             />
        </div>
        <div className="max-w-md mx-auto px-6 mt-12">
            <h3 className="font-serif text-2xl text-brand-mission-mint mb-2">I'M ON A MISSION.</h3>
            <p className="mb-8">Mission for Inner City Cape Town</p>
            <p className="text-xs font-mono opacity-50">
                Data visualization prototype.<br/>
                All copyright laws apply - 2025
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
