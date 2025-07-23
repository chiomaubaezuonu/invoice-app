import { Link, useNavigate, useParams } from "react-router-dom";
import type { Invoice } from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useGlobalContext } from "./globalContext";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFormOpen, setIsFormOpen, theme } = useGlobalContext();

  const navigate = useNavigate()

  const showModal = () => {
    setIsModalOpen(true);
  };


  const updateInvoice = () => {
    setIsFormOpen(!isFormOpen);
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
    if(!invoice) return;
    setIsModalOpen(true);
    if (!invoice?._id) return;

    try {
      await axios.delete(`https://invoice-app-4x3d.onrender.com/invoice/${id}`);
      setIsModalOpen(false)
      navigate("/")
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
    <div className="invoice-detail-container">
      <div className="single-invoice">
        <div className="goBack-arrow-div">
          <img src="/images/arrow-left.svg" alt="arrow left" />
          <Link to="/">Go back</Link>
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
            <button
              className="edit-btn"
              onClick={updateInvoice}
            >
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
              <p className="date-div-text">Send To</p>
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
                    {invoice?.items.map((item) => item.price * item.quantity)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="total-container">
              <p className="amount-due">Amount Due</p>
              <span className="total">$  {invoice?.items.map((item) => item.price * item.quantity)}</span>
            </div>
          </div>
        </div>
        <>
          <Modal
            closable={false}
            centered={true}
            open={isModalOpen}
            onOk={handleDelete}
            okText = "Delete"
            onCancel={() =>setIsModalOpen(false)}
          >
            <h2>Confirm Deletion</h2>
            <p className="modal-text">
              Are you sure you want delete invoice {" "}
              <span style={{ fontWeight: "700" }}>
                #{invoice?.id}.</span> This action cannot be undone.
              
            </p>
          </Modal>
        </>
        <div></div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
