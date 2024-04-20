import React, { useState, useEffect, useContext } from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { motion, useAnimation, useScroll } from "framer-motion";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { ThemeContext } from "../context/theme";
import "/home/godlord/Deadliftwebapp/deadliftwebapp/src/styles/pone.css";
import "/home/godlord/Deadliftwebapp/deadliftwebapp/src/global.css"
import Deadlift from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/Deadlift.jpg"
import logo from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/DeadLift Esports.png";
const FirstPage = () => {
    const { theme } = useContext(ThemeContext);
    const [imagePosition, setImagePosition] = useState("top-16");
    const controls = useAnimation();

    const linkedin = () => {
        window.open("https://www.linkedin.com/in/aayush-pathak-81525a258/");
    }
    const scrollTo = () => {
        window.scrollTo({
          top: 780,
          behavior: 'smooth'
        });
      };

    return (    
        <div className="page page1 dark:bg-[#111010] min-h-screen relative">
            <div className="blur"></div>
            <motion.div
                className="p-3 dark:text-red-500 font-bold mt-10 text-green-900  absolute z-10"
                style={{ top: "40%", left: "34%", transform: "translate(-15%, -30%)" }}
                animate={controls}
            >
                <div className="flex items-center"> 
                    <h1 className="slide relative">
                        <span className={`flex text-7xl slide ml-2 text-transparent font-sans underline-offset-8 decoration-stone-700 ${theme === 'dark' ? 'dark:bg-gradient-to-r dark:from-blue-600 dark:to-red-600' : 'bg-gradient-to-r from-red-600 to-blue-500'} bg-clip-text gradient-animation`}>
                           DeadLift Esports
                        </span>
                    </h1>
                    <img src={logo} className="dark:text-white text-gray-700 w-20 h-20 ml-3 mt-5 z-10 mix-blend-difference" /> 
                </div>
                <p className="p-3 text-2xl mt-4 font-mono font-black text-gray-600 dark:text-white">
                    Experience the thrill of competitive gaming like<br/>never before with <span className="text-green-500 font-bold">Deadlift Esports</span> #LiftWell
                </p>
                <div className="p-10 ml-52 text-xl text-blue-500 dark:text-rose-500 font-bold">#LIFTING</div>
                <button onClick={scrollTo} className="p-4 ml-64 mt-20 dark:bg-[#221f22] dark:text-white bg-blue-600 text-white border border-blue-600 text-xl px-6 py-3 rounded-full dark:hover:bg-green-600 hover:bg-green-600 hover:text-white">
                    <AiOutlineArrowDown/>
                </button>
            </motion.div>
        </div>
    );
};

export default FirstPage;
