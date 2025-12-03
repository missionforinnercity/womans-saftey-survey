import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Label
} from 'recharts';
import { MapContainer, TileLayer, Circle, Marker, Tooltip as LeafletTooltip } from 'react-leaflet';
import L from 'leaflet';
import {
  PERCEPTION_DATA,
  HARASSMENT_DATA,
  SOLUTIONS_DATA,
  MAP_POINTS,
  WORD_CLOUD_WORDS
} from '../constants';
import { ZoneType, MapPoint } from '../types';
import { Layers, UserX, X, ArrowRight } from 'lucide-react';

// --- Perception Bar Chart ---
export const PerceptionChart: React.FC = () => {
  if (!PERCEPTION_DATA) return <div className="text-white">Loading Data...</div>;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 animate-fade-in">
      <h3 className="text-xl font-display uppercase tracking-widest text-slate-200 mb-6">Safety Perception Levels</h3>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PERCEPTION_DATA} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
            <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
            <YAxis 
                dataKey="category" 
                type="category" 
                stroke="#faf7f5" 
                width={100} 
                tick={{ fontSize: 12, fontFamily: 'Libre Franklin' }} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#faf7f5', backdropFilter: 'blur(10px)' }}
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            />
            <Bar 
                dataKey="value" 
                radius={[0, 2, 2, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
            >
              {PERCEPTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 flex gap-8 text-sm animate-slide-up delay-500 font-mono text-xs md:text-sm text-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-mission-mint"></div>
          <span>Daytime: 40% Confidence</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-danger"></div>
          <span>Nighttime: &lt;10% Confidence</span>
        </div>
      </div>
    </div>
  );
};

// --- Harassment Donut Chart ---
export const HarassmentDonut: React.FC = () => {
  // Use Mission Palette: Mint, Teal, Orange, Pink, Red
  const COLORS = ['#6bd69e', '#14b8a6', '#ff8533', '#f7b8d6', '#ff3366'];
  
  if (!HARASSMENT_DATA) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 animate-zoom-in">
      <h3 className="text-xl font-display uppercase tracking-widest text-slate-200 mb-2">Frequency of Harassment</h3>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={HARASSMENT_DATA as any[]}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              nameKey="frequency"
              animationDuration={1500}
              animationEasing="ease-in-out"
              stroke="rgba(255,255,255,0.2)" // Light border
              strokeWidth={1}
            >
              {HARASSMENT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                value="95% Experienced"
                position="center"
                fill="#faf7f5"
                style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Oswald' }}
              />
            </Pie>
            <Tooltip
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        return (
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#faf7f5', backdropFilter: 'blur(10px)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <span className="font-mono text-sm">{`${payload[0].value}%`}</span>
                            </div>
                        );
                    }
                    return null;
                }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-slate-200 font-mono">
        {HARASSMENT_DATA.map((d, i) => (
          <div key={i} className="flex items-center gap-1 animate-fade-in" style={{ animationDelay: `${i * 100 + 500}ms` }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
            <span className="uppercase">{d.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Robust Leaflet Map Implementation ---
export const StylizedMap: React.FC = () => {
  const [showDanger, setShowDanger] = useState(true);
  const [showSafe, setShowSafe] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  // Center of Cape Town CBD
  const centerPosition: [number, number] = [-33.9230, 18.4220];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden rounded-xl animate-fade-in">
      {/* Map Information Overlay */}
      <div className="absolute top-4 left-4 z-[500] bg-white/90 backdrop-blur p-3 rounded-sm border-l-4 border-brand-mission-mint shadow-lg pointer-events-none">
        <h4 className="font-display text-sm text-brand-dark flex items-center gap-2 tracking-widest font-bold">
            CBD HOTSPOTS
        </h4>
        <div className="flex flex-col gap-2 mt-2 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-danger animate-pulse"></span> High Intensity
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-mission-mint"></span> Safe Corridor
          </div>
        </div>
      </div>

      {/* Interactive Layer Controls */}
      <div className="absolute top-4 right-4 z-[500] bg-white/90 backdrop-blur p-3 rounded-sm border border-slate-200 shadow-lg flex flex-col gap-2 min-w-[140px]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 border-b border-slate-200 pb-1">
              <Layers size={12} /> Layers
          </div>
          <label className="flex items-center gap-2 cursor-pointer group select-none pointer-events-auto">
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${showDanger ? 'bg-brand-danger border-brand-danger' : 'border-slate-300 bg-transparent'}`}>
                  {showDanger && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="checkbox" checked={showDanger} onChange={() => setShowDanger(!showDanger)} className="hidden" />
              <span className={`text-sm font-display transition-colors ${showDanger ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>DANGER ZONES</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group select-none pointer-events-auto">
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${showSafe ? 'bg-brand-mission-mint border-brand-mission-mint' : 'border-slate-300 bg-transparent'}`}>
                  {showSafe && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="checkbox" checked={showSafe} onChange={() => setShowSafe(!showSafe)} className="hidden" />
              <span className={`text-sm font-display transition-colors ${showSafe ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>SAFE ZONES</span>
          </label>
      </div>

      {/* Point Detail Modal */}
      {selectedPoint && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-[80%] max-w-sm">
             <div className="glass-card p-6 rounded-lg text-slate-900 shadow-2xl animate-zoom-in relative">
                <button 
                  onClick={() => setSelectedPoint(null)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${selectedPoint.type === ZoneType.DANGER ? 'text-brand-danger' : 'text-brand-mission-mint'}`}>
                    {selectedPoint.type} ZONE
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-slate-900">{selectedPoint.label}</h3>
                <p className="text-slate-700 font-sans leading-relaxed text-sm mb-4 border-l-2 border-slate-300 pl-3">
                    {selectedPoint.description}
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
             </div>
          </div>
      )}

      <div className="w-full h-full relative z-0">
         <MapContainer 
            center={centerPosition} 
            zoom={15} 
            scrollWheelZoom={false} 
            style={{ width: '100%', height: '100%', background: '#f8fafc' }}
            zoomControl={false}
         >
            <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            {MAP_POINTS.map((point) => {
                const isVisible = (point.type === ZoneType.DANGER && showDanger) || 
                                  (point.type === ZoneType.SAFE && showSafe);
                
                if (!isVisible) return null;

                const color = point.type === ZoneType.DANGER ? '#ff3366' : '#6bd69e'; // Red or Mint
                
                // Custom Icon with tailwind animation for pulse effect
                const customIcon = L.divIcon({
                    className: 'custom-icon',
                    html: `
                        <div class="relative w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                             <div class="absolute w-full h-full rounded-full opacity-40 animate-ping" style="background-color: ${color}"></div>
                             <div class="relative w-3 h-3 rounded-full border border-white shadow-lg" style="background-color: ${color}"></div>
                        </div>
                    `
                });

                return (
                    <React.Fragment key={point.id}>
                        {/* Heat Radius Circle */}
                        <Circle 
                            center={[point.lat, point.lng]}
                            radius={point.radius}
                            pathOptions={{ 
                                color: color, 
                                fillColor: color, 
                                fillOpacity: 0.2, 
                                weight: 1,
                                opacity: 0.6
                            }}
                        />
                        {/* Pulsing Marker */}
                        <Marker 
                            position={[point.lat, point.lng]} 
                            icon={customIcon}
                            eventHandlers={{
                                click: () => setSelectedPoint(point)
                            }}
                        >
                            <LeafletTooltip 
                                direction="top" 
                                offset={[0, -10]} 
                                opacity={1}
                                interactive={true}
                            >
                                <div className="font-display font-bold uppercase tracking-wider text-xs bg-white px-2 py-1 border border-slate-200 text-black shadow-md flex flex-col items-center gap-1 min-w-[120px]">
                                    <span className="font-black text-black">{point.label}</span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedPoint(point);
                                        }}
                                        className="mt-1 flex items-center gap-1 text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded-full text-black font-bold transition-colors"
                                    >
                                        Learn More <ArrowRight size={10} />
                                    </button>
                                </div>
                            </LeafletTooltip>
                        </Marker>
                    </React.Fragment>
                );
            })}
         </MapContainer>
      </div>
    </div>
  );
};

// --- Solutions Pyramid/Bar ---
export const SolutionsChart: React.FC = () => {
  if (!SOLUTIONS_DATA) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 animate-fade-in">
      <h3 className="text-xl font-display uppercase tracking-widest text-slate-200 mb-6">Requested Improvements</h3>
      <div className="w-full max-w-md space-y-6">
        {SOLUTIONS_DATA.map((item, index) => (
          <div key={index} className="relative group">
            <div className="flex justify-between items-end mb-1">
              <span className="font-display font-bold text-xl text-white uppercase">{item.solution}</span>
              <span className="text-brand-mission-mint font-mono">{item.votes}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-none overflow-hidden">
              <div 
                className={`h-full transition-all duration-[2000ms] ease-out ${index === 0 ? 'bg-brand-mission-mint' : 'bg-slate-400'}`}
                style={{ 
                    width: `${item.votes}%`,
                    animation: `growWidth 1.5s ease-out forwards`,
                    transformOrigin: 'left' 
                }}
              ></div>
            </div>
            {index === 0 && (
                <div className="text-lg text-brand-mission-pink mt-2 font-serif italic animate-bounce delay-1000">
                    * Outpolled "Better Lighting" by 2:1
                </div>
            )}
          </div>
        ))}
        <style>{`
            @keyframes growWidth {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
            }
        `}</style>
      </div>
    </div>
  );
};

// --- Word Cloud ---
export const WordCloud: React.FC = () => {
  if (!WORD_CLOUD_WORDS) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
       <div className="flex flex-wrap justify-center items-center gap-6 max-w-2xl p-10 glass-card animate-zoom-in relative">
         {/* Corner Decorations */}
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-mission-mint"></div>
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-mission-mint"></div>
         
         {WORD_CLOUD_WORDS.map((word, idx) => {
             let colorClass = 'text-slate-300 font-sans';
             if (word.type === 'primary') colorClass = 'text-brand-mission-offwhite font-display font-bold uppercase';
             if (word.type === 'negative') colorClass = 'text-brand-danger font-display font-bold uppercase';
             if (word.type === 'secondary') colorClass = 'text-brand-mission-mint font-serif italic';
             
             return (
                 <span 
                    key={idx}
                    className={`${colorClass} transition-all duration-300 hover:scale-110 cursor-default animate-fade-in`}
                    style={{ 
                        fontSize: `${Math.max(0.8, word.size / 14)}rem`, 
                        lineHeight: '1',
                        animationDelay: `${idx * 50}ms`
                    }}
                 >
                     {word.text}
                 </span>
             )
         })}
       </div>
    </div>
  );
};

// --- Infrastructure Failure ---
export const InfrastructureViz: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <div className="relative mb-12 group animate-zoom-in">
            {/* Mission Circumpunct as a background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-danger/10 rounded-full blur-xl"></div>
            
            <div className="w-48 h-48 rounded-full border-2 border-brand-danger flex items-center justify-center glass-card relative z-10">
                <UserX size={80} className="text-brand-danger drop-shadow-[0_0_10px_rgba(255,51,102,0.8)]" />
            </div>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-danger text-white font-display font-bold text-3xl px-6 py-2 shadow-2xl animate-slide-up delay-300 whitespace-nowrap z-20">
                95% UNSAFE
            </div>
        </div>
        <h3 className="text-3xl font-serif italic text-white text-center mb-4 animate-fade-in delay-500">Public Infrastructure Failure</h3>
        <p className="text-center text-slate-200 max-w-md animate-fade-in delay-700 font-sans leading-relaxed">
            "Comfortable using public toilets?"<br/>
            Almost universal negative consensus. The "Toilet Trust" score is effectively zero.
        </p>
    </div>
  );
};

// --- Hero Viz ---
export const HeroViz: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 2000; // 2 seconds to count up
        const targetValue = 42;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quart for smooth landing
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeProgress * targetValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center animate-fade-in">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="glass-card p-6 rounded-sm border-brand-mission-mint/20 flex flex-col items-center hover:bg-white/10 transition-colors duration-300">
                    <span className="text-5xl font-display font-bold text-white mb-2 counter-reset">{count}</span>
                    <span className="text-xs uppercase tracking-widest text-slate-300 font-mono">Respondents</span>
                </div>
                <div className="glass-card p-6 rounded-sm border-brand-danger/30 flex flex-col items-center hover:bg-brand-danger/10 transition-colors duration-300">
                    <span className="text-5xl font-display font-bold text-brand-danger mb-2">0%</span>
                    <span className="text-xs uppercase tracking-widest text-brand-danger font-mono">Toilet Trust</span>
                </div>
                <div className="col-span-2 glass-panel p-10 rounded-sm border-t-4 border-brand-warning flex flex-col items-center shadow-2xl">
                     <span className="text-6xl font-display font-bold text-brand-warning mb-2 animate-heartbeat">&gt;90%</span>
                     <span className="text-sm uppercase tracking-widest text-slate-200 font-bold">Harassment Rate</span>
                     <p className="text-xs text-brand-mission-pink font-serif italic mt-2">Reported in last 12 months</p>
                </div>
            </div>
        </div>
    )
}