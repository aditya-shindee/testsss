
import React from 'react';
import Header from '@/components/Header';

interface QuizLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const QuizLayout = ({ children, className = 'bg-[#FEF6F1]' }: QuizLayoutProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <Header />
      {children}
    </div>
  );
};
