import ErrorPage from 'pages/ErrorPage/ErrorPage'
import HistoryPage from 'pages/History/HistoryPage'
import Home from 'pages/Home/Home'
import Inquiry from 'pages/Inquiry/Inquiry'
import Payment from 'pages/Payment/Payment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="history" element={<HistoryPage />} />
        <Route path="inquiry" element={<Inquiry />} />
        <Route path="payment" element={<Payment />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
