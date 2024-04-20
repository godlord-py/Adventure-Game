import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import FirstPage from '../components/pone';
import Aboutus from '../components/Aboutus';
const router = createBrowserRouter([
  {
      path: '/',
      element:(   
          <>
          <FirstPage />
          </>
      ),
},
{
  path: 'aboutus',
  element: (
    <Aboutus/>
  )
}
]);

export default router;