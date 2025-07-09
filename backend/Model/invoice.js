import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: true,
    // unique: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  paymentDue: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  paymentTerms: {
    type: Number,
    // required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "pending", "paid"],
    default: "pending",
  },
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
  total: {
    type: Number,
    // required: true,
  },
}, { timestamps: true });

export const Invoice = mongoose.model("Invoice", InvoiceSchema, "invoice");
