import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface PrintContextProps {
  printTimeline: boolean;
  setPrintTimeline: Dispatch<SetStateAction<boolean>>;
}

export const PrintContext = createContext<PrintContextProps>({
  printTimeline: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPrintTimeline: () => {},
});

interface PrintProviderProps {
  children: ReactNode;
}

export const PrintProvider: React.FC<PrintProviderProps> = ({ children }) => {
  const [printTimeline, setPrintTimeline] = useState(true);

  return (
    <PrintContext.Provider value={{ printTimeline, setPrintTimeline }}>
      {children}
    </PrintContext.Provider>
  );
};
