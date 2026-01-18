"use client";

import { useState, useEffect } from "react";
import DevModal from "@/components/DevModal";

export default function MotoPage() {
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  useEffect(() => {
    setIsDevModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <DevModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </div>
  );
}
