import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { useGlobalContext } from "./globalContext";
import dayjs from "dayjs";
import { Invoice } from "./globalContext";

function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const { isFormOpen, setIsFormOpen, theme, formData, setFormData, onChange } =
    useGlobalContext();

  

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
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    alert("clicked");
    e.preventDefault();
    axios.post("https://invoice-app-4x3d.onrender.com/invoice", formData);
    setFormData({
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
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard">
      <div className={`container ${theme ? "" : " darkTheme"}`}>
        {/* <Sidebar /> */}
        {isFormOpen && (
          <div className={`invoice-form-div ${isFormOpen ? " open" : ""}`}>
            <form onSubmit={handleForm}>
              <h2>Create Form</h2>
              <h4 className="form-subText">Bill From</h4>
              <div className="form-input-grp-col">
                <label className="form-label-grp" htmlFor="streetAddress">
                  Street Address
                </label>
                <input
                  name="streetAddress"
                  type="text"
                  className="input"
                  placeholder="street address"
                  required
                />
              </div>
              <div className="form-input-grp-row">
                <div className="form-row-div">
                  <label htmlFor="city" className="form-label-grp">
                    City
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="city"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row-div">
                  <label htmlFor="post-code" className="form-label-grp">
                    Post Code
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="post-code"
                    required
                  />
                </div>
                <div className="form-row-div">
                  <label htmlFor="country" className="form-label-grp">
                    Country
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="country"
                    required
                  />
                </div>
              </div>
              <div className="form-client-info">
                <h4 className="form-subText">Bill To</h4>
                <div className="form-input-grp-col">
                  <label className="form-label-grp" htmlFor="streetAddress">
                    Client's Name
                  </label>
                  <input
                    name="clientName"
                    type="text"
                    className="input"
                    placeholder="client's name"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input-grp-col">
                  <label className="form-label-grp" htmlFor="clientEmail">
                    Client's Email
                  </label>
                  <input
                    name="clientEmail"
                    type="text"
                    className="input"
                    placeholder="street address"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input-grp-col">
                  <label className="form-label-grp" htmlFor="clientEmail">
                    Street Address
                  </label>
                  <input
                    name="streetAddress"
                    type="text"
                    className="input"
                    placeholder="street address"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input-grp-row">
                  <div className="form-row-div">
                    <label htmlFor="city" className="form-label-grp">
                      City
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="city"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="post-code" className="form-label-grp">
                      Post Code
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="post-code"
                      required
                    />
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="country" className="form-label-grp">
                      Country
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="country"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-payment-row">
                <div className="form-row-div">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                  </Space>
                </div>
                <div className="form-row-div">
                  <label htmlFor="invoiceDate">Payment Terms</label>
                  <select name="" id="" className="select">
                    Next 30 Days
                    <option value=""> Next 30 Days </option>
                    <option value=""> Next 14 Days </option>
                    <option value=""> Next 7 Days </option>
                    <option value=""> Next 1 Day </option>
                  </select>
                </div>
              </div>
              <div className="form-input-grp-col">
                <label className="form-label-grp" htmlFor="project-desc">
                  Project Description
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="project description"
                  required
                />
              </div>
              <div>
                <h2>Item List</h2>
                {formData.items.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <p>Item Name</p>
                        <p>{item.name}</p>
                        <input
                          value={item.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              items: formData.items.map((itm, i) =>
                                i === index
                                  ? { ...itm, name: e.target.value }
                                  : itm
                              ),
                            })
                          }
                          type="text"
                          className="input"
                          placeholder="project description"
                          required
                        />
                      </div>
                      <div>
                        <p>Qty</p>
                        <input
                          type="text"
                          className="input"
                          placeholder="project description"
                          value={item.quantity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              items: formData.items.map((itm, i) =>
                                i === index
                                  ? { ...itm, quantity: Number(e.target.value) }
                                  : itm
                              ),
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <p>Price</p>
                        <input
                          type="text"
                          className="input"
                          placeholder="project description"
                          value={item.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              items: formData.items.map((itm, i) =>
                                i === index
                                  ? { ...itm, price: Number(e.target.value) }
                                  : itm
                              ),
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  );
                })}
                <div>
                  <p style={{ background: "red" }}>
                    {formData.items.map((item) => item.price * item.quantity)}
                  </p>
                  <img src="/images/icon-delete.svg" alt="icon-delete" />
                </div>
              </div>
              <button className="add-new-invoice-btn">+ Add New Item</button>
            </form>
          </div>
        )}
        <div className="main">
          <div className="dashboard-header">
            <div>
              <h1>Invoices</h1>
              <p>There are {invoices.length} total invoices </p>
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
                    <Link
                      className="link"
                      key={invoice._id}
                      to={`/invoice/${invoice._id}`}
                    >
                      <div key={invoice._id} className="invoice">
                        <p className="invoice-id">
                          <span className="hash">#</span>
                          {invoice.id}
                        </p>
                        <p className="payment-date">Due {invoice.paymentDue}</p>
                        <p className="clientsNames">{invoice.clientName}</p>
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
          {/* {isFormOpen && (
            <div className={`invoice-form-div ${isFormOpen ? " open" : ""}`}>
              <form onSubmit={handleForm}>
                <h2>Create Form</h2>
                <h4 className="form-subText">Bill From</h4>
                <div className="form-input-grp-col">
                  <label className="form-label-grp" htmlFor="streetAddress">
                    Street Address
                  </label>
                  <input
                    name="streetAddress"
                    type="text"
                    className="input"
                    placeholder="street address"
                    required
                  /> 
                </div>
                <div className="form-input-grp-row">
                  <div className="form-row-div">
                    <label htmlFor="city" className="form-label-grp">
                      City
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="city"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="post-code" className="form-label-grp">
                      Post Code
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="post-code"
                      required
                    />
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="country" className="form-label-grp">
                      Country
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="country"
                      required
                    />
                  </div>
                </div>
                <div className="form-client-info">
                  <h4 className="form-subText">Bill To</h4>
                  <div className="form-input-grp-col">
                    <label className="form-label-grp" htmlFor="streetAddress">
                      Client's Name
                    </label>
                    <input
                      name="clientName"
                      type="text"
                      className="input"
                      placeholder="client's name"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input-grp-col">
                    <label className="form-label-grp" htmlFor="clientEmail">
                      Client's Email
                    </label>
                    <input
                      name="clientEmail"
                      type="text"
                      className="input"
                      placeholder="street address"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input-grp-col">
                    <label className="form-label-grp" htmlFor="clientEmail">
                      Street Address
                    </label>
                    <input
                      name="streetAddress"
                      type="text"
                      className="input"
                      placeholder="street address"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input-grp-row">
                    <div className="form-row-div">
                      <label htmlFor="city" className="form-label-grp">
                        City
                      </label>
                      <input
                        className="input"
                        type="text"
                        placeholder="city"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-row-div">
                      <label htmlFor="post-code" className="form-label-grp">
                        Post Code
                      </label>
                      <input
                        className="input"
                        type="text"
                        placeholder="post-code"
                        required
                      />
                    </div>
                    <div className="form-row-div">
                      <label htmlFor="country" className="form-label-grp">
                        Country
                      </label>
                      <input
                        className="input"
                        type="text"
                        placeholder="country"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-payment-row">
                  <div className="form-row-div">
                    <label htmlFor="invoiceDate">Invoice Date</label>
                    <Space direction="vertical">
                      <DatePicker onChange={onChange} />
                    </Space>
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="invoiceDate">Payment Terms</label>
                    <select name="" id="" className="select">
                      Next 30 Days
                      <option value=""> Next 30 Days </option>
                      <option value=""> Next 14 Days </option>
                      <option value=""> Next 7 Days </option>
                      <option value=""> Next 1 Day </option>
                    </select>
                  </div>
                </div>
                <div className="form-input-grp-col">
                  <label className="form-label-grp" htmlFor="project-desc">
                    Project Description
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="project description"
                    required
                  />
                </div>
                <div>
                  <h2>Item List</h2>
                  <div>
                    <p>Item Name</p>
                    <input
                      type="text"
                      className="input"
                      placeholder="project description"
                      required
                    />
                  </div>
                  <div>
                    <p>Qty</p>
                    <input
                      type="text"
                      className="input"
                      placeholder="project description"
                      required
                    />
                  </div>
                  <div>
                    <p>Price</p>
                    <input
                      type="text"
                      className="input"
                      placeholder="project description"
                      required
                    />
                  </div>
                  <div>
                    <p style={{background: "red"}}>{formData.items.map(item => item.price * item.quantity)}</p>
                    <img src="/images/icon-delete.svg" alt="icon-delete" />
                  </div>
                </div>
                <button className="add-new-invoice-btn">+ Add New Item</button>
              </form>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
