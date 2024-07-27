import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CheckboxContextType {
  checkedPrefs: Prefecture[];
  updateCheckedPrefs: (code: string, name: string) => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(
  undefined
);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "useCheckboxContext は CheckboxProvider 内で使用する必要があります"
    );
  }
  return context;
};

interface CheckboxProviderProps {
  children: ReactNode;
}

interface Prefecture {
  code: string;
  name: string;
}

export const CheckboxProvider: FC<CheckboxProviderProps> = ({ children }) => {
  // 選択された都道府県コードを管理
  const [checkedPrefs, setCheckedPrefs] = useState<Prefecture[]>([]);

  const updateCheckedPrefs = (code: string, name: string) => {
    setCheckedPrefs((currentSelected) => {
      const exists = currentSelected.some((pref) => pref.code === code);
      if (exists) {
        return currentSelected.filter((pref) => pref.code !== code);
      } else {
        return [...currentSelected, { code, name }];
      }
    });
  };
  
  return (
    <CheckboxContext.Provider value={{ checkedPrefs, updateCheckedPrefs }}>
      {children}
    </CheckboxContext.Provider>
  );
};
