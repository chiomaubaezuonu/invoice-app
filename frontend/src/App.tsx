import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import InvoiceDetail from "./InvoiceDetail";
import Sidebar from "./Sidebar";

const App = () => {
 
   return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </div>
  );
};

export default App;
