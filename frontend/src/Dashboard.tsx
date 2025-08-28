import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "./globalContext";
import { Invoice } from "./globalContext";
import Form from "./Form";

function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const originalInvoice = useRef<Invoice[] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [checkedBox, setCheckedBox] = useState({
    Draft: false,
    pending: false,
    paid: false,
    name: false,
    status: false,
    duedate: false,
    total: false,
  });
  const { isFormOpen, theme, openForm } = useGlobalContext();

  useEffect(() => {
    axios
      .get("https://invoice-app-4x3d.onrender.com/invoice")
      .then((response) => {
        setInvoices(response.data);
        if (originalInvoice.current === null) {
          originalInvoice.current = response.data;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    // Update the checkbox state
    setCheckedBox((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Create a copy of the invoices to avoid direct state mutation
    let sortedInvoices = [...invoices];

    // Add the 'total' property to each invoice for sorting
    sortedInvoices = sortedInvoices.map((invoice) => ({
      ...invoice,
      total: invoice.items.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      ),
    }));

    // Conditionally sort based on the checked checkboxes
    if (name === "name" && checked) {
      sortedInvoices.sort((a, b) => a.clientName.localeCompare(b.clientName));
    } else if (name === "status" && checked) {
      sortedInvoices.sort((a, b) => a.status.localeCompare(b.status));
    } else if (name === "total" && checked) {
    } else if (name === "Draft" && checked) {
      sortedInvoices = sortedInvoices.filter(
        (invoice) => invoice.status.toLowerCase() === "draft"
      );
      if (name === "Draft" && !checked) {
        if (originalInvoice.current) {
          setInvoices(originalInvoice.current);
        }
      }
    } else if (name === "pending" && checked) {
      sortedInvoices = sortedInvoices.filter(
        (invoice) => invoice.status.toLowerCase() === "pending"
      );
      if (name === "pending" && !checked) {
        if (originalInvoice.current) {
          setInvoices(originalInvoice.current);
        }
      }
    } else if (name === "paid" && checked) {
      sortedInvoices = sortedInvoices.filter(
        (invoice) => invoice.status.toLowerCase() === "paid"
      );
      if (name === "paid" && !checked) {
        if (originalInvoice.current) {
          setInvoices(originalInvoice.current);
        }
      }
    }

    // Handle the 'uncheck' case by resetting to the original list
    if (!checked) {
      if (originalInvoice.current) {
        setInvoices(originalInvoice.current);
      }
    } else {
      // Set the state with the final sorted array
      setInvoices(sortedInvoices);
    }
  };

  return (
    <div className={`container ${!theme ? "container--darkTheme" : ""}`}>
      <div className="dashboard">
        {/* <Sidebar /> */}
        <div className="main">
          <div className="dashboard-header">
            <div>
              <h1>Invoices</h1>
              <p className="invoice-length">
                There are {invoices.length} total invoices{" "}
              </p>
            </div>
            <div className="sortBy-wrapper">
              <div
                className="caret-div"
                onClick={() => setStatusDropdown(!statusDropdown)}
              >
                <p className="sortBy-title">Filter by status</p>
                <img
                  src="/images/icon-caret-down.svg"
                  className={`caret ${statusDropdown ? " clicked" : ""}`}
                  alt="icon-caret-down"
                />
              </div>
              {statusDropdown && (
                <div className="dropdown-div">
                  <div className="dropdown-contents">
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="Draft"
                        checked={checkedBox.Draft}
                        onChange={handleCheckbox}
                      />
                      <p>Draft</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="pending"
                        checked={checkedBox.pending}
                        onChange={handleCheckbox}
                      />
                      <p>Pending</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="paid"
                        checked={checkedBox.paid}
                        onChange={handleCheckbox}
                      />
                      <p>Paid</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="sortBy-wrapper">
              <div
                className="caret-div"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p className="sortBy-title">Sort By</p>
                <img
                  src="/images/icon-caret-down.svg"
                  className={`caret ${isDropdownOpen ? " clicked" : ""}`}
                  alt="icon-caret-down"
                />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-div">
                  <div className="dropdown-contents">
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="name"
                        checked={checkedBox.name}
                        // onChange={handleCheckbox}
                        onChange={handleCheckbox}
                      />
                      <p>Name</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="status"
                        checked={checkedBox.status}
                        onChange={handleCheckbox}
                      />
                      <p>Status</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="dueDate"
                        checked={checkedBox.duedate}
                        onChange={handleCheckbox}
                      />
                      <p>Due Date</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="total"
                        checked={checkedBox.total}
                        onChange={handleCheckbox}
                      />
                      <p>Total</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="open-form-btn" onClick={openForm}>
              <div className="plus-icon-div">
                <img src="/images/plus-icon.svg" alt="plus" />
              </div>
              <span> New Invoice</span>
            </button>
          </div>
          <div className="mobile-dashboard-header">
            <div style={{ marginRight: "auto" }}>
              <h1>Invoices</h1>
              <p className="mobile-invoice-length">
                {invoices.length} invoices
              </p>
            </div>
            <div className="sortBy-wrapper">
              <div>
                <div
                  className="caret-div"
                  onClick={() => setStatusDropdown(!statusDropdown)}
                >
                  <img
                    className="filter-icon"
                    src="/images/filter-icon.svg"
                    alt="filter"
                  />
                </div>
                {statusDropdown && (
                  <div className="dropdown-div">
                    <div className="dropdown-contents">
                      <div className="checkbox-div">
                        <input
                          type="checkbox"
                          name="Draft"
                          checked={checkedBox.Draft}
                          onChange={handleCheckbox}
                        />
                        <p>Draft</p>
                      </div>
                      <div className="checkbox-div">
                        <input
                          type="checkbox"
                          name="pending"
                          checked={checkedBox.pending}
                          onChange={handleCheckbox}
                        />
                        <p>Pending</p>
                      </div>
                      <div className="checkbox-div">
                        <input
                          type="checkbox"
                          name="paid"
                          checked={checkedBox.paid}
                          onChange={handleCheckbox}
                        />
                        <p>Paid</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sortBy-wrapper">
              <div
                className="caret-div"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  className="filter-icon"
                  src="/images/dropdown.svg"
                  alt="dropdown"
                />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-div">
                  <div className="dropdown-contents">
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="name"
                        checked={checkedBox.name}
                        onChange={handleCheckbox}
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="status"
                        checked={checkedBox.status}
                        onChange={handleCheckbox}
                      />
                      <p>Status</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="dueDate"
                        checked={checkedBox.duedate}
                        onChange={handleCheckbox}
                      />
                      <p>Due Date</p>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        name="total"
                        checked={checkedBox.total}
                        onChange={handleCheckbox}
                      />
                      <p>Total</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="open-form-btn" onClick={openForm}>
              <div className="plus-icon-div">
                <img src="/images/plus-icon.svg" alt="plus" />
              </div>
              <span> New</span>
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
            <div>
              <div className="invoices">
                {invoices &&
                  invoices.map((invoice) => {
                    return (
                      <Link key={invoice._id} to={`/invoice/${invoice._id}`}>
                        <div key={invoice._id} className="invoice">
                          <div className="invoice-left">
                            <p className="invoice-id">
                              <span className="hash">#</span>
                              {invoice.id}
                            </p>
                            <p className="payment-date">
                              Due {invoice.paymentDue}
                            </p>
                            <p className="clientsNames">{invoice.clientName}</p>
                          </div>
                          <div className="invoice-right">
                            <p className="dashboard-total-price">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2, // change to 2 if you want cents
                              }).format(
                                invoice.items.reduce((acc, item) => {
                                  return (
                                    acc +
                                    Number(item?.price) * Number(item?.quantity)
                                  );
                                }, 0)
                              )}
                            </p>
                            <div
                              className={`status status--${invoice?.status.toLowerCase()}`}
                            >
                              <div className="status__dot"></div>
                              <span className="status__label">
                                {invoice?.status}
                              </span>
                            </div>

                            <div>
                              <img
                                src="/images/arrow-right.svg"
                                alt="right-arrow"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>

              {/* mobile-invoices */}
              <div className="mobile-invoices">
                {invoices &&
                  invoices.map((invoice) => {
                    return (
                      <Link key={invoice._id} to={`/invoice/${invoice._id}`}>
                        <div key={invoice._id} className="invoice">
                          <div className="mobile-invoice-left">
                            <p className="invoice-id">
                              <span className="hash">#</span>
                              {invoice.id}
                            </p>
                            <p className="payment-date">
                              Due {invoice.paymentDue}
                            </p>
                            <p className="dashboard-total-price">
                              $
                              {invoice.items
                                .reduce(
                                  (acc, item) =>
                                    acc +
                                    Number(item?.price) *
                                      Number(item?.quantity),
                                  0
                                )
                                .toFixed(2)}
                            </p>
                          </div>
                          <div className="mobile-invoice-right">
                            <p className="clientsNames">{invoice.clientName}</p>
                            <div className="dot-status-div">
                              <div className="dot"></div>
                              <span className="invoice-status">
                                {invoice?.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
          {isFormOpen && <Form />}
        </div>
        {/* <Link to="/test" style={{backgroundColor:"purple"}}>Click</Link> */}
      </div>
    </div>
  );
}

export default Dashboard;
