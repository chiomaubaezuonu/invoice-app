import { useParams } from "react-router-dom";
import type { Invoice } from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
          <button className="edit-btn" onClick={handleOk}>Edit</button>
          <button className="delete-btn" onClick={showModal}>
            delete
          </button>
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
