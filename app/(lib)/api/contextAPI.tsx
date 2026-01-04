'use client';
import { createContext, useContext, useState } from "react";

interface Alert {
    id: string; //recognizing which alert it is
    message: string;
    type: "success" | "error" | "info";
}

interface AlertContextType {
    alerts: Alert[];
    addAlert: (message: string, type: Alert['type']) => void;
    removeAlert: (id: string) => void;
}

const alertContext = createContext<AlertContextType | undefined>(undefined);

export default function AlertProvider({ children }: { children: React.ReactNode }) {

    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = (message: string, type: Alert['type']) => {
        const id = Math.random().toString(36).substring(2, 9);
        setAlerts(prev => [...prev, { id, message, type }]);
        setTimeout(() => { removeAlert(id) }, 3000);
    };

    const removeAlert = (id: string) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }

    return (
        <alertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </alertContext.Provider>
    )
}

export function useAlert() {
    const context = useContext(alertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}