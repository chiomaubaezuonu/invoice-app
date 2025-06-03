import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Invoice } from "./Model/invoice.js";

const app = express();
dotenv.config();
const port = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb successfully connected"))
  .catch((err) => console.error(err));

app.get("/invoice", (req, res) => {
  Invoice.find().then((result) => res.json(result));
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.get("/invoice/:id", async(req, res) => {
  try {
    const { id } = req.params
    const invoice = await Invoice.findById(id)

    if(!invoice){
      return res.status(404).json({message: "Invoice not found"})
    }
    res.status(200).json(invoice)
  } catch (error) {
   res.status(500).json({message: "Something went wrong", error: error.message})
  }
} )

app.post("/invoice", async (req, res) => {
  try {
    const newInvoiceData = req.body;
    const savedInvoice = await Invoice.create(newInvoiceData);
    res
      .status(201)
      .json({ message: "Invoice created successfully", invoice: savedInvoice });
  } catch (error) {
    console.error("Error creating invoice: ", error);
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});


app.put("/invoice/:id", async (req, res) => {
  const invoiceId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating Invoice");
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

//for delete request
app.delete('/invoice/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      message: "Invoice deleted successfully",
      invoice: deletedInvoice
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

