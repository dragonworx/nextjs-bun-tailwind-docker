'use client'

interface HeroProps {
  title: string
  subtitle?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 text-white p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl mb-8 transform hover:scale-[1.02] transition-all duration-500 group">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white/5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.03'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20V0c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-xl animate-bounce [animation-duration:3s]"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full blur-lg animate-ping [animation-duration:2s]"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-400/20 rounded-full blur-md animate-pulse [animation-delay:1s]"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="m-0 mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform duration-300">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse mt-4"></div>
        </div>
        
        {subtitle && (
          <div className="mb-8">
            <p className="m-0 text-lg sm:text-xl lg:text-2xl font-light text-white/90 max-w-3xl leading-relaxed group-hover:text-white transition-colors duration-300">
              {subtitle}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:scale-105 transition-transform duration-200 group/badge">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Next.js 14
          </span>
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:scale-105 transition-transform duration-200 group/badge">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            Server Components
          </span>
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:scale-105 transition-transform duration-200 group/badge">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            Dynamic Routing
          </span>
        </div>
        
        {/* Performance indicators */}
        <div className="flex items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <span>Fast Refresh</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span>TypeScript Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <span>SSR Enabled</span>
          </div>
        </div>
      </div>
    </div>
  )
}
