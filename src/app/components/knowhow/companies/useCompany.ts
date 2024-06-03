'use client'
import { useState } from 'react';

export const useCompanyId = (initialId) => {
  const [companyId, setCompanyId] = useState(initialId);

  const updateCompanyId = (id) => {
    setCompanyId(id);
  };

  return { companyId, updateCompanyId };
};