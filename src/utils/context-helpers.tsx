import { AppContext } from '../context-provider';
import { useContext } from 'react';

export const useGetConfig = () => {
  const { config } = useContext(AppContext);
  return config;
};

export const useGetDocument = () => {
  const { document } = useContext(AppContext);
  return document;
};
