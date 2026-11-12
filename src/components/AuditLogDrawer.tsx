import React from 'react';
import { X, History, ShieldAlert, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { AuditLogEntry } from '../types/dashboard';

interface AuditLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLogEntry[];
  onClearLogs: () => void;
  isRtl: boolean;
}

export const AuditLogDrawer: React.FC<AuditLogDrawerProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  isRtl
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`fixed inset-y-0 ${isRtl ? 'left-0' : 'right-0'} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-slate-900 border-x border-slate-800 text-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <History className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isRtl ? 'سجل التدقيق والعمليات (Audit Log)' : 'System Audit Trail'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isRtl ? 'توثيق فوري لكافة الاعتمادات وتغيير الحالات' : 'Tamper-proof administrative event log'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                {isRtl ? 'لا توجد سجلات تدقيق حالياً' : 'No audit records logged yet.'}
              </div>
            ) : (
              logs.map((log) => {
                const isCritical = log.severity === 'critical';
                const isWarning = log.severity === 'warning';
                return (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs space-y-1.5 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-orange-400 font-bold">
                        {log.id}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{log.timestamp}</span>
                      </span>
                    </div>

                    <div className="font-semibold text-white">
                      {isRtl ? log.actionAr : log.actionEn}
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {log.details}
                    </p>

                    <div className="pt-1.5 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{log.userName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                        {log.moduleName}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">
              {logs.length} {isRtl ? 'عمليات موثقة' : 'logged events'}
            </span>
            <button
              onClick={onClearLogs}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'مسح السجلات التجريبية' : 'Clear Test Logs'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
