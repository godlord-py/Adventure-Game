import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import FirstPage from '../components/pone';
import Aboutus from '../components/Aboutus';
import SecondPage from '../components/teams';
import NotFound from '../components/notFound';
import Community from '../components/community';
import ContactUs from '../components/contactus';
import Matches from '../components/matches';


const router = createBrowserRouter([
        {
          path: '/',
          element:(   
              <>
              <FirstPage />
              <Community/>
              <Matches/>
              </>
          ),
        },
        {
          path: 'aboutus',
          element: (
            <Aboutus/>
          )
        },

        {
          path: 'teams',
          element: (
            <SecondPage/>
          )
        },
        {
          path:'*',
          element: (
            <NotFound/>
          )
        },
        {
          path:'contactus',
          element: (
            <ContactUs/>
          )
        }
    ]);

export default router;