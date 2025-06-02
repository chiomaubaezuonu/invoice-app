import mongoose from "mongoose";
const InvoiceSchema = new mongoose.Schema({
  id: String,
  createdAt: String,
  paymentDue: String,
  description: String,
  paymentTerms: Number,
  clientName: String,
  clientEmail: String,
  status: String,
  senderAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  clientAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  total: Number,
}, 
{timestamps: true});

export const Invoice = mongoose.model("Invoice", InvoiceSchema);
