import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-[#233152] bg-[#0c1220] text-slate-100';
        let icon = <Info className="h-4 w-4 text-blue-400 shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/30 bg-[#0a141d] text-emerald-100';
          icon = <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/30 bg-[#190d14] text-rose-100';
          icon = <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 fade-in duration-200 ${borderClass}`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <p className="text-xs font-semibold leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded p-1 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
