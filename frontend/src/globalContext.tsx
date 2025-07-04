import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

interface GlobalContextType {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <GlobalContext.Provider
      value={{
        isFormOpen,
        setIsFormOpen,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//custom hook for easy access
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
