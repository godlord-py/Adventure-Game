import React, { useContext, useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Switch, Link } from "@nextui-org/react";
import { ThemeContext } from "../context/theme";
import { BsDiscord, BsInstagram, BsYoutube} from "react-icons/bs";
import DeadLift from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/Deadlift.jpg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === 'dark')

  const discord = () => {
    window.open("https://discord.gg/wud3RJWU");
}
 const Instagram = () => {
    window.open("https://www.instagram.com/deadlift_esports/");
 }
 const YouTube = () => {
    window.open("https://www.youtube.com/@DeadlifteSports/videos")
 }
  useEffect(() => {
    setEnabled(theme === 'dark');
  }, [theme]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: '/aboutus' },
    { name: "Teams", onclick: {discord}}
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBordered>
      <NavbarContent>
        <NavbarBrand>
            <img src={DeadLift} alt="DeadLift Logo" className="w-10 h-10"/>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" sm:flex gap-4" justify="start">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link href={item.path} aria-current="page">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className='flex justify-end align-end'>
        <Switch
          checked={enabled===false}
          onChange={toggleTheme}
        />
      </NavbarContent>
      <NavbarContent justify="end">
            <NavbarItem className="ml-10">
            <BsDiscord  onClick={discord}className="text-4xl hover:text-blue-800" style={{color:"#7289d9" , cursor:"pointer"}}/>
            </NavbarItem>
            <NavbarItem className="ml-2">
            <BsInstagram onClick={Instagram}className="text-3xl" style={{ cursor:"pointer"}}/>
            </NavbarItem>
            <NavbarItem className="ml-2">
            <BsYoutube onClick={YouTube}className="text-4xl" style={{ color: "#FF0020" ,  cursor:"pointer"}}/>
            </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
