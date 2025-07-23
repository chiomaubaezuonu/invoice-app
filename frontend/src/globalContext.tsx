import { DatePickerProps } from "antd";
import dayjs from "dayjs";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

export type Invoice = {
  id?: string;
  _id?: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
};

interface GlobalContextType {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  formData: Invoice
  setFormData: React.Dispatch<React.SetStateAction<Invoice>>,
  onChange: DatePickerProps["onChange"]
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [theme, setTheme] = useState(false);

  const [formData, setFormData] = useState<Invoice>({
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 0,
    clientName: "",
    clientEmail: "",
    status: "draft",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ],
    total: 0,
  });

  const toggleTheme = () => {
    setTheme(!theme);
  };
   const onChange: DatePickerProps["onChange"] = (date, dateString) => {
      console.log(date, dateString);
      if (typeof dateString === "string") {
        const formatted = dayjs(dateString).format("MMM D, YYYY");
        setFormData((prev) => ({
          ...prev,
          paymentDue: formatted,
          createdAt: formatted
        }))
      }
    };

  return (
    <GlobalContext.Provider
      value={{
        isFormOpen,
        setIsFormOpen,
        theme,
        setTheme,
        toggleTheme,
        formData,
        setFormData,
        onChange
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
