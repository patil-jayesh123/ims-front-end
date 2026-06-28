import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // Default: open on desktop, closed on mobile
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);

  // Close on mobile when route changes (handled by Sidebar via useEffect)
  const toggle = () => setIsOpen((prev) => !prev);
  const close  = () => setIsOpen(false);
  const open   = () => setIsOpen(true);

  // On resize: auto-open on desktop, auto-close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);