import { useParams } from "react-router-dom";
import type { Invoice } from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useGlobalContext } from "./globalContext";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
const { isFormOpen, setIsFormOpen } = useGlobalContext()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const updateInvoice = () => {
    alert("hellos")
    setIsFormOpen(true);
    if (!invoice?._id) {
      return;
    }
    try {
      axios.put(`http://localhost:3000/invoice/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    if (!invoice?._id) return;

    try {
      await axios.delete(`http://localhost:3000/invoice/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/invoice/${id}`)
        .then((response) => setInvoice(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);
useEffect(() => {
  if (invoice) {
    console.log(invoice.clientAddress.city);
  }
}, [invoice]);
  return (
    <div className="invoice-detail-container">
      <div className="goBack-arrow-div">
        <img src="/images/arrow-left.svg" alt="arrow left" />
        <p>Go back</p>
      </div>
      <div className="invoiceDetail-header">
        <div style={{ display: "flex" }}>
          <span>status</span>
          <div></div>
          <span>{invoice?.status}</span>
        </div>
        <div className="btns">
          <button
            className="edit-btn"
            onClick={updateInvoice}
            // onClick={handleOk}
          >
            Edit
          </button>
          <button className="delete-btn" onClick={showModal}>
            delete
          </button>
        </div>
      </div>
      <div className="invoice-detail-div">
        <div className="sender-info">
          <div>
            <p>{invoice?.id}</p>
            <p>{invoice?.description}</p>
          </div>
          <div className="sender-address">
            <p>{invoice?.senderAddress.street}</p>
            <p>{invoice?.senderAddress.city}</p>
            <p>{invoice?.senderAddress.postCode}</p>
            <p>{invoice?.senderAddress.country}</p>
          </div>
        </div>
        <div className="client-info">
          <div>
            <div>
              <p>Invoice Date</p>
              <p>{invoice?.createdAt}</p>
            </div>
            <div>
              <p>Payment Due</p>
              <p>{invoice?.paymentDue}</p>
            </div>
          </div>
          <div className="bill-to">
            <div>
              <p>Bill To</p>
              <p>{invoice?.clientName}</p>
            </div>
            <div className="client-address">
              <p>{invoice?.clientAddress.street}</p>
              <p>{invoice?.clientAddress.city}</p>
              <p>{invoice?.clientAddress.postCode}</p>
              <p>{invoice?.clientAddress.country}</p>
            </div>
            <div className="client-email">
              <p>Send To</p>
              <p>{invoice?.clientEmail}</p>
            </div>
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
                <td className="table-data">{invoice?.items.map(item => item.name)}</td>
                <td className="quantity">{invoice?.items.map(item => item.quantity)}</td>
                <td className="price">{invoice?.items.map(item => item.price)}</td>
                <td className="table-data">{invoice?.items.map(item => item.total)}</td>
              </tr>
            </tbody>
          </table>
          <div className="total-container">
            <p className="amount-due">Amount Due</p>
            <span className="total">$ {invoice?.total}</span>
          </div>
        </div>
      </div>
      <>
        <Modal
          title="Basic Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h2>Confirm Deletion</h2>
          <p>
            Are you sure you want delete invoice{" "}
            <span style={{ fontWeight: "700" }}>
              {invoice?.id} .This action cannot be undone.
            </span>
          </p>
          <p>Some contents...</p>
        </Modal>
      </>
      <div></div>
    </div>
  );
};

export default InvoiceDetail;
