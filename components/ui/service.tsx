// src/components/ServiceCard.tsx
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface ServiceCardProps {
  serviceName: string;
  icon?: React.ReactNode;

}

const Service: React.FC<ServiceCardProps> = ({ serviceName, icon = <FaCheck /> }) => {
  return (
    <div className="bg-transparent gap-2 p-1 shadow-md rounded-md">
      <div className="flex flex-col items-center px-4">
        <div className="text-white text-center text-xl font-medium mx-12">{icon}</div>
        <p className="text-sm text-center font-medium mx-6">{serviceName}</p>
      </div>
    </div>
  );
};

export default Service;
