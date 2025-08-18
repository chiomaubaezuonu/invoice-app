import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import InvoiceDetail from "./InvoiceDetail";
import Sidebar from "./Sidebar";
import Form from "./Form";
import { useGlobalContext } from "./globalContext";
// import Test from "./test";

const App = () => {
  const { theme } = useGlobalContext();
   return (
  //   <div className={`app ${theme ? " " : " darkTheme"}`}>
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        {/* <Route path="/test" element={<Test />}/> */}
      </Routes>
    </div>
  );
};

export default App;
