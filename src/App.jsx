import React from 'react'
import './App.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Dashboard from './containers/Dashboard'
import LoginPage from './containers/LoginPage'
import Footer from './components/Footer'
import LabServicesPage from './containers/LabServicesPage'
import CaregivingPage from './containers/CaregivingPage'
import AboutUsPage from './containers/AboutUsPage'
import HelpPage from './containers/HelpPage'
import PageNotFound from './containers/PageNotFound'
import RegisterPage from './containers/RegisterPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppointmentPage from './containers/AppointmentPage'
import CaregivingDetail from './containers/CaregivingPage/CaregivingDetail'
import ProfilePage from './containers/ProfilePage'
import AppointmentDetailPage from './containers/AppointmentDetail'
import ForgotPasswordPage from './containers/ForgotPassword'

const App = () => {
  const location = useLocation()
  const { pathname } = location
  const hasHeaderFooter = !['/login', '/register', '/forgot-password'].includes(pathname)
  const hasNoFooter = !['/chat'].includes(pathname)

  return (
    <div className="App">
      <ToastContainer />
      <div className="container-fluid">
        {hasHeaderFooter ? <Header /> : ''}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-account" element={<ProfilePage />} />
          <Route path="/my-appointments" element={<AppointmentDetailPage />} />
          <Route path="/caregiving" element={<CaregivingPage />} />
          <Route path="/caregiving/:caregiverId" element={<CaregivingDetail />} />
          <Route path="/caregiving/:uuid/book-appointment" element={<AppointmentPage page="Caregiving" />} />
          <Route path="/lab-services" element={<LabServicesPage />} />
          <Route path="/lab-services/:uuid/book-appointment" element={<AppointmentPage page="Lab Services" />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {hasHeaderFooter && hasNoFooter ? <Footer /> : ''}
      </div>
    </div>
  )
}

export default App
