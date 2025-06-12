import axios from "axios";
import { useEffect, useState } from "react";
function App() {

const[invoices, setInvoices] = useState([])

useEffect(() => {
  axios.get("http://localhost:3000/invoice")
  .then(response => setInvoices(response.data))
  .catch(error => console.error(error))
},[])
invoices.length > 0 ? console.log(invoices) : []
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="logo-div">
            <img src="/images/logo.svg" className="logo" alt="" />
          </div>
          <div className="sidebar-content-div">
            <div className="moon-div">
              <img
                src="/images/icon-moon.svg"
                className="moon-img"
                alt="moon"
              />
            </div>
            <div className="user-div">
              <img src="/images/user.jpg" alt="user" className="user-img" />
            </div>
          </div>
        </div>
        <div className="dashboard">
          <div className="dashboard-header">
            <div>
              <h1>Invoices</h1>
              <p>There are 8 total invoices </p>
            </div>
            <div>
              <select name="Filter by status" id="">
                <option value="">Filter by status</option>
              </select>
            </div>
            <div>
               <select name="Sort by" id="">
                <option value="">Sort by</option>
              </select>
              </div>
            <button>New Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
