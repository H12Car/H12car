// context/ModalContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isDevisModalOpen: boolean;
  setIsDevisModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isDevisModalOpen, setIsDevisModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}