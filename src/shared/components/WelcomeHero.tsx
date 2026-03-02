import { Sparkles, Layers, Search, PlusCircle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WelcomeHero() {
  const stats = [
    { icon: Activity, label: "System Status", value: "Online", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Search, label: "Search Index", value: "98.2%", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Layers, label: "OCR Accuracy", value: "99.9%", color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { icon: PlusCircle, label: "Cloud Upload", value: "Enabled", color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="relative overflow-hidden p-8 rounded-4xl bg-card/20 border border-border backdrop-blur-3xl shadow-xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-[10px] font-bold text-primary border border-primary/20 uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            New Beta: AI Summary Engine
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
            Unlock the secrets <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-indigo-600 to-purple-400">
              hidden in your documents.
            </span>
          </div>
          <p className="text-foreground/50 text-lg max-w-lg leading-relaxed font-medium">
            Simply upload your PDF, and our AI will analyze, summarize, and answer any questions you have in seconds. 
            No more manual scrolling through hundreds of pages.
          </p>
        </div>

        {/* Quick Actions Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 rounded-4xl bg-card border border-border hover:border-primary/20 transition-all group overflow-hidden relative">
              <div className={cn("inline-flex p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              
              {/* Subtle hover reveal pulse */}
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
