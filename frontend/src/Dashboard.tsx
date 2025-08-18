import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "./globalContext";
import { Invoice } from "./globalContext";
import Form from "./Form";

function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [checkedBox, setCheckedBox] = useState({
    name: false,
    status: false,
    dueDate: false,
    total: false,
  });
  const [checkedStatus, setCheckedStatus] = useState({
    draft: false,
    pending: false,
    paid: false,
  });
  const { isFormOpen, theme, openForm } = useGlobalContext();

  useEffect(() => {
    axios
      .get("https://invoice-app-4x3d.onrender.com/invoice")
      .then((response) => setInvoices(response.data))
      .catch((error) => console.error(error));
  }, []);

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  //   if (typeof dateString === "string") {
  //     const formatted = dayjs(dateString).format("MMM D, YYYY");
  //     setFormData((prev) => ({
  //       ...prev,
  //       paymentDue: formatted,
  //     }));
  //   }
  // };
  // const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
  //   alert("clicked");
  //   e.preventDefault();
  //   axios.post("https://invoice-app-4x3d.onrender.com/invoice", formData);
  //   setFormData({
  //     createdAt: "",
  //     paymentDue: "",
  //     description: "",
  //     paymentTerms: 0,
  //     clientName: "",
  //     clientEmail: "",
  //     status: "draft",
  //     senderAddress: {
  //       street: "",
  //       city: "",
  //       postCode: "",
  //       country: "",
  //     },
  //     clientAddress: {
  //       street: "",
  //       city: "",
  //       postCode: "",
  //       country: "",
  //     },
  //     items: [
  //       {
  //         name: "",
  //         quantity: 0,
  //         price: 0,
  //         total: 0,
  //       },
  //     ],
  //     total: 0,
  //   });
  // };
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name.includes(".")) {
  //     const [parent, child] = name.split(".")
  //     setFormData((prev) => ({
  //       ...prev,
  //       [parent]: {
  //         ...prev,
  //         [child]: value,
  //       },
  //     }));
  //      }   else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //    }
  //   }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckedBox((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };
  const handleStatusCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckedStatus((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  return (
   
      <div className={`container ${theme ? "" : " darkTheme"}`}>
        <div className= "dashboard">
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
                          name="draft"
                          checked={checkedStatus.draft}
                          onChange={handleStatusCheckbox}
                        />
                        <p>Draft</p>
                      </div>
                      <div className="checkbox-div">
                        <input
                          type="checkbox"
                          name="pending"
                          checked={checkedStatus.pending}
                          onChange={handleStatusCheckbox}
                        />
                        <p>Pending</p>
                      </div>
                      <div className="checkbox-div">
                        <input
                          type="checkbox"
                          name="paid"
                          checked={checkedStatus.paid}
                          onChange={handleStatusCheckbox}
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
                          checked={checkedBox.dueDate}
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
                <p className="invoice-length">
                  There are {invoices.length} total invoices{" "}
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
                            name="draft"
                            checked={checkedStatus.draft}
                            onChange={handleStatusCheckbox}
                          />
                          <p>Draft</p>
                        </div>
                        <div className="checkbox-div">
                          <input
                            type="checkbox"
                            name="pending"
                            checked={checkedStatus.pending}
                            onChange={handleStatusCheckbox}
                          />
                          <p>Pending</p>
                        </div>
                        <div className="checkbox-div">
                          <input
                            type="checkbox"
                            name="paid"
                            checked={checkedStatus.paid}
                            onChange={handleStatusCheckbox}
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
                          checked={checkedBox.dueDate}
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
                              <p className="clientsNames">
                                {invoice.clientName}
                              </p>
                            </div>
                            <div className="invoice-right">
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
                              <div className="dot-status-div">
                                <div className="dot"></div>
                                <span className="invoice-status">
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
                              <p className="clientsNames">
                                {invoice.clientName}
                              </p>
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
