import React from "react";

const Matches = () => {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-[#111010] py-12 px-4 sm:px-6 lg:px-8">
     <h2 data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-infinite className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">ANIMATION DAL DUGA BADMEN BHAI EXAMS HE</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Individual Match Cards */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 hover:bg-gray-800 transition duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Deadlift vs. Team Alpha</h3>
          <p className="text-gray-400">Date: April 25th, 2024 | Time: 7:00 PM EST</p>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6 hover:bg-gray-800 transition duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Deadlift vs. Team Beta</h3>
          <p className="text-gray-400">Date: April 28th, 2024 | Time: 6:30 PM EST</p>
        </div>
        {/* Add more match cards as needed */}
      </div>
    </section>
  );
};

export default Matches;
