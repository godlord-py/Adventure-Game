import React from "react";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">
            <BiLogoGmail className="inline-block mb-1 mr-1"/>  Email: <a href="mailto:deadliftesports@gmail.com" className="ml-2 text-blue-300">deadliftesports@gmail.com</a>
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">© 2024 Deadlift Esports</h3>
            <p className="text-sm">All rights reserved.</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Developed by</h3>
            <p className="text-sm flex items-center">
              Aayush Pathak
              <a href="https://github.com/godlord-py/" className="ml-1 text-blue-300" target="_blank" rel="noopener noreferrer">
                <FaGithub className="inline-block mb-1 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
