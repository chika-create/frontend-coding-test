import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CheckboxContextType {
  selectedPrefs: string[];
  handleCheckboxChange: (code: string) => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(
  undefined
);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "useCheckboxContext must be used within a CheckboxProvider"
    );
  }
  return context;
};

interface CheckboxProviderProps {
  children: ReactNode;
}

export const CheckboxProvider: FC<CheckboxProviderProps> = ({ children }) => {
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  const handleCheckboxChange = (code: string) => {
    setSelectedPrefs((currentSelected) => {
      if (currentSelected.includes(code)) {
        return currentSelected.filter((selectedCode) => selectedCode !== code);
      } else {
        return [...currentSelected, code];
      }
    });
  };

  return (
    <CheckboxContext.Provider value={{ selectedPrefs, handleCheckboxChange }}>
      {children}
    </CheckboxContext.Provider>
  );
};
