import React, { useEffect } from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { ThemeContext } from "../context/theme";
import "/home/godlord/Deadliftwebapp/deadliftwebapp/src/styles/pone.css";
import "/home/godlord/Deadliftwebapp/deadliftwebapp/src/global.css";
import AOS from 'aos';
import logo from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/DL LOGO.png"
import giphy from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/GIPHY.gif"
import 'aos/dist/aos.css';

const FirstPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const scrollTo = () => {
        window.scrollTo({
          top: 780,
          behavior: 'smooth'
        });
    };

    return (    
        <div className="page page1 dark:bg-[#111010] min-h-screen relative overflow-hidden">
            <div
                className="IFuOkc absolute top-0 left-0 w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${giphy})`, filter: "blur(5px)"}}
            ></div>
            <div
                className="p-3 dark:text-red-500 font-bold mt-10 text-green-900  absolute z-10"
                style={{ top: "40%", left: "29.8%", transform: "translate(-15%, -30%)" }}
                data-aos="fade-up" 
            >
                <div className="flex items-center"> 
                    <h1 className="slide relative">
                        <span data-aos="zoom-out" data-aos-duration="1200" data-aos-easing="ease-in-sine" className={`flex text-8xl slide ml-2 text-transparent font-sans underline-offset-8 decoration-stone-700 bg-gradient-to-r from-red-600 to-blue-500 bg-clip-text gradient-animation`}>
                           DeadLift Esports
                        </span>
                    </h1>
                    <img src={logo} data-aos="zoom-out" data-aos-duration="1200" data-aos-easing="ease-in-sine" className="dark:text-white text-gray-700 w-20 h-15 ml-3 mt-5 z-10 mix-blend-difference" /> 
                </div>
                <p className="p-3 text-2xl mt-8 ml-24 font-mono font-black text-white">
                    Experience the thrill of competitive gaming like<br/>never before with <span className="text-green-500 font-bold">Deadlift Esports</span> #LiftWell
                </p>
                <div className="p-10 ml-72 text-3xl text-green-200 dark:text-orange-400 font-bold">#LIFTING</div>
                <button onClick={scrollTo} className="buttonm p-4  mt-20 dark:bg-[#221f22] dark:text-white bg-blue-600 text-white border border-blue-600 text-xl px-6 py-3 rounded-full dark:hover:bg-green-600 hover:bg-green-600 hover:text-white">
                    <AiOutlineArrowDown/>
                </button>
            </div>
        </div>
    );
};

export default FirstPage;
