// context/ToastContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";

type ToastVariant = "success" | "error" | "warning";

type ToastContextType = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showToast = (message: string, variant: ToastVariant = "success") => {
    switch (variant) {
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.custom(message);
        break;
      default:
        toast.success(message);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {isClient ? <Toaster /> : null}
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
