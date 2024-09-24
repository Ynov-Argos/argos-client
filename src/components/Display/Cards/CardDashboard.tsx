import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardDataStatsProps {
  title: string;
  number: string;
  children: ReactNode;
  path: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, number, children, path, }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(path );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
      onClick={handleOnClick}>
      {children}

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {number}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
