import axios from "axios";
import { useGlobalContext } from "./globalContext";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const Form = () => {
  const [newItemInput, setNewItemInput] = useState<number[]>([1]);

  const [showPymtOptions, setShowPymtOptions] = useState(false);
  const { formData, setFormData, isFormOpen, onChange, setIsFormOpen } =
    useGlobalContext();

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
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
          quantity: "",
          price: "",
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
  const handleNewItem = () => {
    setNewItemInput((prev) => [...prev, prev.length]);
  };

  return (
    <div>
      {isFormOpen && (
        <div className={`invoice-form-div ${isFormOpen ? " open" : ""}`}>
          <form onSubmit={handleForm}>
            <h2>Create Form</h2>
            <h4 className="form-subText">Bill From</h4>
            <div className="scrollable-form-contents">
              <div className="form-input-grp-col">
                <label className="form-label-grp" htmlFor="streetAddress">
                  Street Address
                </label>
                <input
                  value={formData.senderAddress.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        street: e.target.value,
                      },
                    })
                  }
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
                    value={formData.senderAddress.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        senderAddress: {
                          ...prev.senderAddress,
                          city: e.target.value,
                        },
                      }))
                    }
                    type="text"
                    placeholder="city"
                    required
                  />
                </div>
                <div className="form-row-div">
                  <label htmlFor="post-code" className="form-label-grp">
                    Post Code
                  </label>
                  <input
                    className="input"
                    value={formData.senderAddress.postCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        senderAddress: {
                          ...formData.senderAddress,
                          postCode: e.target.value,
                        },
                      })
                    }
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
                    value={formData.senderAddress.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        senderAddress: {
                          ...formData.senderAddress,
                          country: e.target.value,
                        },
                      })
                    }
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
                    value={formData.clientName}
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
                    value={formData.clientEmail}
                    type="text"
                    className="input"
                    placeholder="Client's email"
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
                    value={formData.clientAddress.street}
                    type="text"
                    className="input"
                    placeholder="street address"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        clientAddress: {
                          ...formData.clientAddress,
                          street: e.target.value,
                        },
                      }))
                    }
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
                      value={formData.clientAddress.city}
                      type="text"
                      placeholder="city"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          clientAddress: {
                            ...formData.clientAddress,
                            city: e.target.value,
                          },
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-row-div">
                    <label htmlFor="post-code" className="form-label-grp">
                      Post Code
                    </label>
                    <input
                      className="input"
                      value={formData.clientAddress.postCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clientAddress: {
                            ...formData.clientAddress,
                            postCode: e.target.value,
                          },
                        })
                      }
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
                      value={formData.clientAddress.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clientAddress: {
                            ...formData.clientAddress,
                            country: e.target.value,
                          },
                        })
                      }
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
                    <DatePicker
                      value={
                        formData.paymentDue
                          ? dayjs(formData.paymentDue)
                          : undefined
                      }
                      onChange={onChange}
                    />
                  </Space>
                </div>
                {/* <div className="form-row-div">
                  <label htmlFor="invoiceDate">Payment Terms</label>
                  <select name="" id="" className="select">
                    Next 30 Days
                    <option value={formData.paymentTerms}>
                      {" "}
                      Next 30 Days{" "}
                    </option>
                    <option value={formData.paymentTerms}>
                      {" "}
                      Next 14 Days{" "}
                    </option>
                    <option value={formData.paymentTerms}> Next 7 Days </option>
                    <option value={formData.paymentTerms}> Next 1 Day </option>
                  </select>
                </div> */}
                <div className="sortBy-wrapper">
                  <div
                    className="caret-div"
                    onClick={() => setShowPymtOptions(!showPymtOptions)}
                  >
                    <p className="sortBy-title">Filter by status</p>
                    <img
                      src="/images/icon-caret-down.svg"
                      className={`caret ${showPymtOptions ? " clicked" : ""}`}
                      alt="icon-caret-down"
                    />
                  </div>
                  {showPymtOptions && (
                    <div className="dropdown-div">
                      <div className="dropdown-contents">
                        <div className="checkbox-div">
                          <input type="checkbox" name="draft" />
                          <p>Draft</p>
                        </div>
                        <div className="checkbox-div">
                          <input type="checkbox" name="pending" />
                          <p>Pending</p>
                        </div>
                        <div className="checkbox-div">
                          <input type="checkbox" name="paid" />
                          <p>Paid</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-input-grp-col">
                <label className="form-label-grp" htmlFor="project-desc">
                  Project Description
                </label>
                <input
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                  type="text"
                  className="input"
                  placeholder="project description"
                  required
                />
              </div>
              <div>
                <h2 className="item-list-title">Item List</h2>
                {formData.items.map((item, index) => {
                  return (
                    <div key={index} className="item-list-div">
                      <div className="items-titles">
                        <p className="form-item-name">Item Name</p>
                        <p className="form-qty">Qty.</p>
                        <p className="form-price">Price</p>
                        <p className="form-total">Total</p>
                      </div>
                      <div className="item-wrapper">
                        {newItemInput.map((_, index) => {
                          return (
                            <div className="item" key={index}>
                              <div className="single-item">
                                <input
                                  value={item.name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      items: formData.items.map((item, i) =>
                                        i === index
                                          ? { ...item, name: e.target.value }
                                          : item
                                      ),
                                    })
                                  }
                                  type="text"
                                  className="item-name-input"
                                  required
                                />
                              </div>
                              <div className="single-item">
                                <input
                                  value={item.quantity}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      items: formData.items.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              quantity: e.target.value,
                                            }
                                          : item
                                      ),
                                    })
                                  }
                                  type="text"
                                  className="item-name-input"
                                  required
                                />
                              </div>
                              <div className="single-item">
                                <input
                                  value={item.price}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      items: formData.items.map((item, i) =>
                                        i === index
                                          ? { ...item, price: e.target.value }
                                          : item
                                      ),
                                    })
                                  }
                                  type="text"
                                  className="item-name-input"
                                  required
                                />
                              </div>
                              {/* <div className="single-item"> */}
                              <div className="delete-item-content">
                                <p className="item-total">
                                  $
                                  {formData.items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        Number(item.price) *
                                          Number(item.quantity),
                                      0
                                    )
                                    .toFixed(2)}
                                </p>
                                <img
                                  className="delete-icon"
                                  src="/images/icon-delete.svg"
                                  alt="icon-delete"
                                />
                                {/* </div> */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* <div className="item-info-wrapper">
                        <p className="form-item-name">Item Name</p>
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
                          className="item-name-input"
                          required
                        />
                      </div>
                      <div className="item-info-wrapper">
                        <p className="form-qty">Qty</p>
                        <input
                          type="text"
                          className="item-qty-input"
                          placeholder="project description"
                          value={item.quantity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              items: formData.items.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      quantity: Number(e.target.value),
                                    }
                                  : item
                              ),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="item-info-wrapper">
                        <p className="form-price">Price</p>
                        <input
                          type="text"
                          className="item-price-input"
                          placeholder="project description"
                          value={item.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              items: formData.items.map((item, i) =>
                                i === index
                                  ? { ...item, price: Number(e.target.value) }
                                  : item
                              ),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="item-info-wrapper">
                        <p className="form-total">Total</p>
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            alignItems: "center",
                          }}
                        >
                          <p className="item-total">
                            {formData.items.map(
                              (item) => item.price * item.quantity
                            )}
                          </p>
                          <img
                            className="delete-icon"
                            src="/images/icon-delete.svg"
                            alt="icon-delete"
                          />
                        </div>
                      </div> */}
                    </div>
                  );
                })}
              </div>
              <button
                className="add-new-item-btn"
                type="button"
                onClick={handleNewItem}
              >
                + Add New Item
              </button>
            </div>
            <div className="form-btns-grp">
              <button
                className="discard-btn"
                onClick={() => setIsFormOpen(false)}
              >
                Discard
              </button>
              <button className="save-as-draft-btn">Save as Draft</button>
              <button className="send-btn">Save & Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
