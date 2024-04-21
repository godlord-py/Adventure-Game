import React, { useContext, useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch, Link, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, Avatar } from "@nextui-org/react";
import { ThemeContext } from "../context/theme";
import { BsDiscord, BsInstagram, BsYoutube } from "react-icons/bs";
import DeadLift from "/home/godlord/Deadliftwebapp/deadliftwebapp/src/assets/Deadlift.jpg";
import { FaTwitter } from "react-icons/fa";


const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === 'dark');
  const scrollTo = () => {
    window.scrollTo({
      top: 780,
      behavior: 'smooth'
    });
  };
  
  const discord = () => {
    window.open("https://discord.gg/wud3RJWU");
  };

  const Instagram = () => {
    window.open("https://www.instagram.com/deadlift_esports/");
  };

  const YouTube = () => {
    window.open("https://www.youtube.com/@DeadlifteSports/videos");
  };

  useEffect(() => {
    setEnabled(theme === 'dark');
  }, [theme]);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBordered>
      <NavbarContent className="hidden sm:flex gap-4 cursor-crosshair" justify="start">
      <NavbarItem>
        <Link href="/" aria-current="page">Home</Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/aboutus" aria-current="page">About Us</Link>
      </NavbarItem>
      {/* <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              radius="sm"
              variant="solid"
            >
              Teams ⮟
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="Teams Dropdown"
          className="w-[340px] dark:bg-black"
          itemClasses={{
            base: "gap-4",
          }}
        >
          <DropdownItem
            key="VALORANT"
            description="Check out our competitive Valorant team."
          >
            VALORANT
          </DropdownItem>
          <DropdownItem
            key="CS 2"
            description="Experience the thrill with our Counter-Strike 2 squad."
          >
            CS 2
          </DropdownItem>
          <DropdownItem
            key="BGMI"
            description="Join us for some intense battles in BGMI."
          >
            BGMI
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <NavbarItem>
        <Link href="/teams" aria-current="page" className="relative">
          Teams
        </Link>
      </NavbarItem>
    </NavbarContent>

      <NavbarContent className='flex justify-end align-end'>
        <Switch
          checked={enabled === false}
          onChange={toggleTheme}
        />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="ml-10">
          <BsDiscord onClick={discord} className="text-4xl hover:text-blue-800" style={{ color: "#7289d9", cursor: "pointer" }} />
        </NavbarItem>
        <NavbarItem className="ml-2">
          <BsInstagram onClick={Instagram} className="text-3xl" style={{ cursor: "pointer" }} />
        </NavbarItem>
        <NavbarItem className="ml-2">
          <BsYoutube onClick={YouTube} className="text-4xl" style={{ color: "#FF0020", cursor: "pointer" }} />
        </NavbarItem>
        <NavbarItem className="ml-2">
          <FaTwitter onClick={YouTube} className="text-4xl" style={{ cursor: "pointer" }} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="DeadLift Esports"
              size="sm"
              src={DeadLift}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem href="/">Home</DropdownItem>
            <DropdownItem href="/contactus">Contact Us</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
