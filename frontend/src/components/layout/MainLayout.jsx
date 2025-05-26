import React from 'react';
import Header from './Header';

const MainLayout = ({ children, onJobCreated }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onJobCreated={onJobCreated} />
      <main className="container mx-auto px-4 py-3">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;