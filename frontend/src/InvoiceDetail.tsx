import { useParams } from "react-router-dom";
import type { Invoice } from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/invoice/${id}`)
        .then((response) => setInvoice(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);
  invoice? console.log(invoice.clientEmail) : []

  return (
    <div className="invoice-detail-container">
      <div className="goBack-arrow-div">
        <img src="/images/arrow-left.svg" alt="arrow left" />
        <p>Go back</p>
      </div>
      <div className="invoiceDetail-header">
       
        </div>
      <div></div>
    </div>
  );
};

export default InvoiceDetail;
