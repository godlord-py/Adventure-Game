import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center font-bold mb-8">Contact DeadLift Esports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">We'd love to hear from you. Feel free to reach out to us with any questions, feedback, or inquiries you may have.</p>
          <a href="mailto:info@deadliftesports.com" className="text-lg text-blue-500 block mb-4 flex items-center"><FaEnvelope className="inline-block mr-2" />Email: deadliftesports@gmail.com</a>
          <a href="tel:+11234567890" className="text-lg text-blue-500 block flex items-center"><FaPhone className="inline-block mr-2" />Phone: teri mummy</a>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
          <p className="text-lg mb-4">You can also visit our office during our working hours:</p>
          <p className="text-lg">Address: Discord</p>
          <p className="text-lg"></p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-10">Connect with Us on Social Media</h2>
        <div className="flex items-center space-x-8">
          <a href="https://discord.com/invite/wud3RJWU" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
          <a href="https://www.youtube.com/@DeadlifteSports/videos" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
          <a href="https://www.instagram.com/deadlift_esports/" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
          <a href="#" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
