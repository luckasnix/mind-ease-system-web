import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-72 transition-all duration-500 ease-calm">
        <div className="min-h-screen p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
