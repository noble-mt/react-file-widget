import { RFW_AppProps, RFW_File } from "modals";
import React, { createContext, FC, ReactNode, useEffect, useState } from "react";

export interface ContextProps extends Omit<RFW_AppProps, 'file' | 'renderers'> {
  
}

interface ProviderProps extends RFW_AppProps {
  children: ReactNode
}

const AppContext = createContext<{
  document?: RFW_File;
  config?: ContextProps,
}>({  
  document: undefined,
  config: {}
});

const AppProvider = ({ file, children, ...rest}: ProviderProps) => {
  const [document, setDocument] = useState<RFW_File | undefined>(file);
  const [config, setConfig] = useState<ContextProps>(rest);

  useEffect(() => {
    setDocument(file);
  }, [file]);

  useEffect(() => {
    setConfig(rest);
  }, [rest]);

  

  return (
    <AppContext.Provider value={{ document, config }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
  