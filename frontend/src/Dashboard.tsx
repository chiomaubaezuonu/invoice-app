import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export type Invoice = {
  id: string;
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
  const [isFormOpen, setIsFormOpen] = useState(false);

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
            <button onClick={() => setIsFormOpen(!isFormOpen)}>
              New Invoice
            </button>
          </div>
          {invoices.length === 0 ? (
            <div className="no-invoice-div">
              <img
                src="/images/illustration-empty.svg"
                alt="illustration-empty"
              />
              <h2 className="no-invoice-title">There is nothing here</h2>
              <p className="no-invoice-text">
                Create an invoice by clicking the New Invoice button and get
                started
              </p>
            </div>
          ) : (
            <div className="invoices">
              {invoices &&
                invoices.map((invoice) => {
                  return (
                    <Link key={invoice._id} to={`/invoice/${invoice._id}`}>
                      <div key={invoice._id} className="invoice">
                        <p>{invoice.id}</p>
                        <p>Due {invoice.paymentDue}</p>
                        <p>{invoice.clientName}</p>
                        <p>${invoice.items.map((item) => item?.price)}</p>
                        <button>{invoice.status}</button>
                        <div>
                          <img
                            src="/images/arrow-right.svg"
                            alt="right-arrow"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
          {isFormOpen && (
            <div className={`invoice-form-div${isFormOpen ? " open" : ""}`}>
              <form action="">
              <h2>Create Form</h2>
              <h4 className="form-subText">Bill From</h4>
              <div className="form-input-grp-col">
                <label className="form-label-grp" htmlFor="streetAddress">Street Address</label>
                <input type="text" placeholder="street address" required />
              </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
