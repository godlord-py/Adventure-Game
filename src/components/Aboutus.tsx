import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { SiVisualstudiocode } from "react-icons/si";
import AOS from "aos";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
        duration: 500,
        easing: 'ease-in-out',
        once: true
    });
}, []);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="z-20 text-5xl text-center mb-14 font-bold">About Us</h1>
      <hr className="mb-10 dark:text-white text-black"/> 
      <p className="mb-4 text-lg font-semibold">
        Welcome to <span className="text-green-600">Deadlift Esports</span>, where passion for gaming meets competitive excellence. Founded by <span className="text-orange-600">Rajesh "Newcoln" Sumar</span>, Deadlift Esports strives to push the boundaries of gaming performance while fostering a vibrant community of gamers.
      </p>
      <h2 className="text-2xl font-bold mb-10">Meet Our Team :</h2>
      <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="blur dark:blur"></div>
        <div className="bg-red-600 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><FaCrown className="inline-block mb-2 mr-2 text-yellow-400"/>Founder</h3>
          <p className="font-mono">Rajesh "Newcoln" Sumar</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><GrUserManager className="inline-block mb-2 mr-2"/>Operational Manager</h3>
          <p className="font-mono">Pranav "CLxW" Nair</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><IoShareSocialSharp className="inline-block mb-2 mr-2"/>Promotional & Social Media Manager</h3>
          <p className="font-mono">Somesh "Alpha" Baibhav</p>
        </div>
        <div className="bg-orange-600 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><RiTeamFill className="inline-block mb-2 mr-2"/>Lineup Manager</h3>
          <p className="font-mono">Anjali "Aries" Lastname</p>
        </div>
        <div className="bg-green-600 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><RiTeamFill className="inline-block mb-2 mr-2"/>Lineup Manager</h3>
          <p className="font-mono">Naman "MnM" Gaur</p>
        </div>
        <div className="card bg-yellow-500 p-4 rounded-lg hover:scale-110 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-2"><SiVisualstudiocode className="inline-block mb-2 mr-2 text-blue-400"/>Developer</h3>
          <p className="font-mono p-2">Aayush "GOD LORD" Pathak</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
