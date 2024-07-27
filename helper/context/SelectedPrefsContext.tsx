import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CheckboxContextType {
  checkedPrefs: string[];
  updateCheckedPrefs: (code: string) => void;
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

export const CheckboxProvider: FC<CheckboxProviderProps> = ({ children }) => {
  // 選択された都道府県コードを管理
  const [checkedPrefs, setCheckedPrefs] = useState<string[]>([]);

  const updateCheckedPrefs = (code: string) => {
    setCheckedPrefs((currentSelected) => {
      if (currentSelected.includes(code)) {
        // currentSelectedにcodeが含まれている場合、そのコードを配列から削除
        return currentSelected.filter((checkedPrefs) => checkedPrefs !== code);
      } else {
        // 既存の配列を展開し、新しい要素（code）を追加した新しい配列を作成
        return [...currentSelected, code];
      }
    });
  };

  return (
    <CheckboxContext.Provider
      value={{ checkedPrefs, updateCheckedPrefs }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
