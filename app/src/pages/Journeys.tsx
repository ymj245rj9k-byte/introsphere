import { Link } from 'react-router-dom';
import { journeys } from '@/data/journeys';

export function Journeys() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Journeys</h1>
        <p className="text-muted-foreground text-center">
          Choose a reflection journey to begin
        </p>
         <div className="space-y-4">
           {journeys.map((journey) => (
             <Link
               key={journey.id}
               to={`/journey/${journey.id}`}
               className="group block p-6 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98]"
               style={{
                 backgroundColor: 'var(--atmosphere-bg-secondary)',
                 borderColor: 'var(--atmosphere-border)',
               }}
             >
               <div className="flex items-start gap-4">
                 <div className="text-4xl">{journey.icon}</div>
                 <div className="flex-1 space-y-2">
                   <h2 className="text-xl font-bold">{journey.titleEn}</h2>
                   <p className="text-muted-foreground">{journey.subtitleEn}</p>
                   <p className="text-xs text-muted-foreground">
                     {journey.toneEn}
                   </p>
                 </div>
               </div>
             </Link>
           ))}
         </div>
      </div>
    </div>
  );
}