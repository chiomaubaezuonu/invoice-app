import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Invoice = {
  id: string;
  // _id?: string;
  _id: string;
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
function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/invoice")
      .then((response) => setInvoices(response.data))
      .catch((error) => console.error(error));
  }, []);

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
          {/* <a href="#"> */}
          <div className="invoices">
            {invoices &&
              invoices.map((invoice) => {
                return (
                  <Link key={invoice._id} to={`/invoice/${invoice._id}`}>
                    <div
                      key={invoice._id}
                      className="invoice"
                      // onClick={() => handleInvoice(invoice._id)}
                    >
                      <p>{invoice.id}</p>
                      <p>Due {invoice.paymentDue}</p>
                      <p>{invoice.clientName}</p>
                      <p>${invoice.items.map((item) => item?.price)}</p>
                      <button>{invoice.status}</button>
                      <div>
                        <img src="/images/arrow-right.svg" alt="right-arrow" />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
