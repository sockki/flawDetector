'use client';

import { useState } from 'react';

export const useModal = (): [boolean, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickTrigger = () => {
    setIsModalOpen(prev => !prev);
  };

  return [isModalOpen, handleClickTrigger];
};
