import React, { useEffect } from "react";
import AOS from 'aos';



const SecondPage = () => {

  useEffect(() => {
    AOS.init({
        duration: 500,
        easing: 'ease-in-out',
        once: true
    });
}, []);


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#111010]">
      <div data-aos="fade-up" className="max-w-screen-md w-full mr-10 bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">ROSTER</h1>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">⚫Valorant - Team <span className="text-red-700">Deadlift</span></h2>
            <ul className="grid grid-cols-1 gap-2">
              <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-all">
                1.DL x Newcoln RADIANT 69
              </li>
              <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-all ">
               2. DL x CLxW RADIANT 69
              </li>
              <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-all">
                3.DL x Alpha RADIANT 69
              </li>
              <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-all">
                4.DL x Aries RADIANT 69
              </li>
              <li className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-all">
               5. DL x MnM RADIANT 69
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
