// import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page1 from './Component/Page1'
import Page2 from './Component/Page2';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/page2" element = {<Page2/>}/>
          <Route path="/" element={<Page1 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
 