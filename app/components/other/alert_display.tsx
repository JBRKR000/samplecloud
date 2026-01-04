'use client';
import { useAlert } from "@/app/(lib)/api/contextAPI";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircleWarning, Check, Info, CircleQuestionMark } from "lucide-react";

export function AlertDisplay() {
  const { alerts, removeAlert } = useAlert();

  const getIcon = (type: string) => {
    switch(type) {
      case 'error': return <MessageCircleWarning />;
      case 'success': return <Check />;
      case 'info': return <Info />;
      default: return <CircleQuestionMark />;
    }
  };

  const getStyles = (type: string) => {
    const baseStyles = "backdrop-blur-md border z-100";
    switch(type) {
      case 'error': 
        return `${baseStyles} bg-red-500/10 border-red-500/30 text-red-100`;
      case 'success': 
        return `${baseStyles} bg-green-500/10 border-green-500/30 text-green-100`;
      case 'info': 
        return `${baseStyles} bg-blue-500/10 border-blue-500/30 text-blue-100`;
      default: 
        return `${baseStyles} bg-slate-500/10 border-slate-500/30 text-slate-100`;
    }
  };

  return (
    <AnimatePresence>
      {alerts.map((alert) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed bottom-4 left-4 px-4 py-3 rounded-lg border-2 z-100 ${getStyles(alert.type)} flex items-center gap-3 max-w-sm shadow-lg`}
        >
          <span className="text-lg">{getIcon(alert.type)}</span>
          <p className="flex-1 text-sm font-medium">{alert.message}</p>
          <button
            onClick={() => removeAlert(alert.id)}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}