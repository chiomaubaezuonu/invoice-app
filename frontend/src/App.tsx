import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import InvoiceDetail from './InvoiceDetail'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/invoice/:id' element={<InvoiceDetail />} />
   </Routes>  
  )
}

export default App