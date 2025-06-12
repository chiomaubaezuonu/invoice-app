import { useParams } from 'react-router-dom'

const InvoiceDetail = () => {

    const { id } = useParams()
    console.log("Invoice ID from URL:", id);
  return (
    <div>InvoiceDetail for ID: {id}</div>
  )
}

export default InvoiceDetail