import { Link, useNavigate, useParams } from "react-router-dom";
// import type { Invoice } from "./Dashboard";
import { Invoice } from "./globalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useGlobalContext } from "./globalContext";
import Item from "antd/es/list/Item";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFormOpen, setIsFormOpen, theme, onChange } = useGlobalContext();

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateInvoice = () => {
    setIsFormOpen(true);
    if (!invoice?._id) {
      return;
    }
    try {
      axios.put(`https://invoice-app-4x3d.onrender.com/invoice/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!invoice) return;
    setIsModalOpen(true);
    if (!invoice?._id) return;

    try {
      await axios.delete(`https://invoice-app-4x3d.onrender.com/invoice/${id}`);
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`https://invoice-app-4x3d.onrender.com/invoice/${id}`)
        .then((response) => setInvoice(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div>
      <div className="invoice-detail-container">
        <div className="single-invoice">
          <div className="goBack-arrow-div">
            <img src="/images/arrow-left.svg" alt="arrow left" />
            <Link to="/" className="homeLink">
              Go back
            </Link>
          </div>
          <div className="invoiceDetail-header">
            <div className="status-div">
              <span className="status-title">Status</span>
              <div className="dot-status-div">
                <div className="dot"></div>
                <span className="invoice-status">{invoice?.status}</span>
              </div>
            </div>
            <div className="btns">
              <button className="edit-btn" onClick={updateInvoice}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setIsModalOpen(true)}
              >
                delete
              </button>
              {invoice?.status !== "paid" && (
                <button className="mark-paid-btn">Mark as Paid</button>
              )}
            </div>
          </div>
          <div className="invoice-detail-div">
            <div className="sender-info">
              <div>
                <p className="id">
                  <span className="hash">#</span>
                  {invoice?.id}
                </p>
                <p className="invoice-desc">{invoice?.description}</p>
              </div>
              <div className="sender-address">
                <p>{invoice?.senderAddress.street}</p>
                <p>{invoice?.senderAddress.city}</p>
                <p>{invoice?.senderAddress.postCode}</p>
                <p>{invoice?.senderAddress.country}</p>
              </div>
            </div>
            <div className="client-info-div">
              <div className="date-div">
                <div>
                  <p className="date-div-text">Invoice Date</p>
                  <p className="client-info">{invoice?.createdAt}</p>
                </div>
                <div className="payment-due-wrapper">
                  <p className="date-div-text">Payment Due</p>
                  <p className="payment-due">{invoice?.paymentDue}</p>
                </div>
              </div>
              <div className="bill-to-wrapper">
                <div>
                  <p className="date-div-text">Bill To</p>
                  <p className="client-info">{invoice?.clientName}</p>
                </div>
                <div className="client-address">
                  <p>{invoice?.clientAddress.street}</p>
                  <p>{invoice?.clientAddress.city}</p>
                  <p>{invoice?.clientAddress.postCode}</p>
                  <p>{invoice?.clientAddress.country}</p>
                </div>
              </div>
              <div className="client-email">
                <p className="date-div-text">Sent To</p>
                <p className="client-info">{invoice?.clientEmail}</p>
              </div>
            </div>
            <div className="item-wrapper">
              <table className="item-table">
                <thead>
                  <tr>
                    <th className="table-title">Item Name</th>
                    <th className="table-title">Qty.</th>
                    <th className="table-title">Price</th>
                    <th className="table-title">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-data">
                      {invoice?.items.map((item) => item.name)}
                    </td>
                    <td className="quantity">
                      {invoice?.items.map((item) => item.quantity)}
                    </td>
                    <td className="price">
                      {invoice?.items.map((item) => item.price)}
                    </td>
                    <td className="table-data">
                      $
                      {invoice?.items.reduce(
                        (acc, item) =>
                          acc + Number(item.price) * Number(item.quantity),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mobile-item-table-wrapper">
                <table>
                  <thead></thead>
                  {invoice?.items.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="">{item.name}</td>
                          <td className="mobile-totalPrice">$ {item.price}</td>
                        </tr>
                        <tr>
                          <td className="mobile-item-qty">{item.quantity} x $ {item.price}</td>
                        </tr>
                        <tr>
                          <td className="_itemName_8sg6q_291">{item.name}</td>

                          <td className="totalOfItem">$  {item.price}</td>
                        </tr>
                        <tr>
                          <td className="_quantity_8sg6q_303">{item.quantity} x $ {item.price}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
              <div className="total-container">
                <p className="amount-due">Amount Due</p>
                <div className="grand-total">Grand Total</div>
                <span className="total">
                  ${" "}
                  {invoice?.items.map(
                    (item) => Number(item.price) * Number(item.quantity)
                  )}
                </span>
              </div>
            </div>
          </div>
          <>
            <Modal
              closable={false}
              centered={true}
              open={isModalOpen}
              onOk={handleDelete}
              okText="Delete"
              onCancel={() => setIsModalOpen(false)}
            >
              <h2>Confirm Deletion</h2>
              <p className="modal-text">
                Are you sure you want delete invoice{" "}
                <span style={{ fontWeight: "700" }}>#{invoice?.id}.</span> This
                action cannot be undone.
              </p>
            </Modal>
          </>
          <div></div>
        </div>
      </div>
      {/* <div className="_buttons_8sg6q_41">
        <button
          className="_button_1mui2_5 _editButton_1mui2_123"
      
        >
          <span className="text-center">Edit</span>
        </button>
        <button
          className="_button_1mui2_5 _deleteButton_1mui2_95"

        >
          <span className="text-center">Delete</span>
        </button>
        <button className="_button_1mui2_5 undefined">
          <span className="text-center">Mark as Paid</span>
        </button>
      </div> */}
      <div className="footer-btns">
        <button className="edit-btn" onClick={updateInvoice}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => setIsModalOpen(true)}>
          delete
        </button>
        {invoice?.status !== "paid" && (
          <button className="mark-paid-btn">Mark as Paid</button>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
