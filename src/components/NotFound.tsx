import React from 'react';
import { Home, ArrowLeft, Plane } from 'lucide-react';
import Logo from './Logo';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <header className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto">
            <Plane className="w-10 h-10 transform -rotate-45" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
            <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The page or destination route you are looking for doesn't exist or has been moved. Let's get you back on course.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleGoHome}
              className="w-full py-3.5 px-6 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to ABBASU Travels Homepage
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-white border-t border-slate-100 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ABBASU Travels & Tours. All rights reserved.
      </footer>
    </div>
  );
}
