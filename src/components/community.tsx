import React from "react";
import AOS from 'aos';


const Community = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#111010] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 data-aos="zoom-in" className="text-4xl font-bold mb-8 text-center">Welcome to Deadlift Esports!</h1>
        
        {/* Community Updates Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Community Updates</h2>
          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Individual Update Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600">
            <h3 className="text-lg font-semibold mb-2">New Community Event</h3>
            <p className="text-gray-600 dark:text-gray-300">Join us for a fun gaming event this weekend! Details coming soon.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600">
            <h3 className="text-lg font-semibold mb-2">Weekly Livestream</h3>
            <p className="text-gray-600 dark:text-gray-300">Tune in to our weekly livestream on Twitch every Friday at 8 PM EST.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600">
            <h3 className="text-lg font-semibold mb-2">YAHA AUR ADD HOGE NOOBS</h3>
            <p className="text-gray-600 dark:text-gray-300">Tune in to our weekly livestream on Twitch every Friday at 8 PM EST.</p>
          </div>

            {/* Add more update cards as needed */}
          </div>
        </section>
        
        {/* Upcoming Matches Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Upcoming Matches </h2>
          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Individual Match Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-400 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-2">Deadlift vs. Team Alpha</h3>
              <p className="text-gray-600 dark:text-gray-300">Date: April 25th, 2024 | Time: 7:00 PM EST</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-400 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-2">Deadlift vs. Team Beta</h3>
              <p className="text-gray-600 dark:text-gray-300">Date: April 28th, 2024 | Time: 6:30 PM EST</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-400 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-2">YAHA AUR ADD HOGE NOOBS</h3>
              <p className="text-gray-600 dark:text-gray-300">Tune in to our weekly livestream on Twitch every Friday at 8 PM EST.</p>
            </div>
            {/* Add more match cards as needed */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;
