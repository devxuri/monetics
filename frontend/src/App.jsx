import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import DashboardPage from './pages/Analytics.jsx';
import UploadPage from './pages/Upload.jsx';
import TransactionsPage from './pages/Transactions.jsx';
import ChatbotPage from './pages/Chatbot.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/analytics" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
