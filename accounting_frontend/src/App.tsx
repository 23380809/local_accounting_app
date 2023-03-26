import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import OrderView from './Pages/OrderView';
import OrderCreateView from './Pages/OrderCreateView';
import OrderEditView from './Pages/OrderEditView';
import CompanyProfileView from './Pages/CompanyProfileView';
import CompanyProfileEditView from './Pages/CompanyProfileEditView';
import ContactCreateView from './Pages/ContactCreateView';
import ContactEditView from './Pages/ContactEditView';
import Navbar from './Components/NavBar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderView />} />
          <Route path="/order/create" element={<OrderCreateView />} />
          <Route path="/order/edit/:id" element={<OrderEditView />} />
          <Route path="/company/:id" element={<CompanyProfileView />} />
          <Route path="/company/edit/:id" element={<CompanyProfileEditView />} />
          <Route path="/contact/create" element={<ContactCreateView />} />
          <Route path="/contact/edit/:id" element={<ContactEditView />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
