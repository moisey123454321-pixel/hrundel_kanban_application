import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
