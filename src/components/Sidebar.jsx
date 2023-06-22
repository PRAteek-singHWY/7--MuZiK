
import { useState } from "react";
// Nav-Link creates an anchor element
import { NavLink } from "react-router-dom";
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

import { RiCloseLine } from "react-icons/ri"
import { logo } from "../assets"
import { links } from "../assets/constants";




//navbar is going to be reusable depending upon the screen size whether moible or bigger and we are going to use it on both by reusing
const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        className="flex flex-row justify-start items-center my-6 text-sm font-medium text-gray-300 hover:text-yellow-400"
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
)



const Sidebar = () => {
  //to know if mobile navbar is currently open if we are currently on mobile or not
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>


      {/* //div for wrapping entire navigation bar for non-mobile view  desktop menu */}
      <div className=" md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#121a12]" >
        <img
          src={logo}
          alt="logo" className="
          w-[150px] px-4    object-contain "
        />
        {/* NavBar Right below our app's logo using navlinks component having all the navlinks  ⬇️*/}
        <NavLinks />
      </div>


      {/* //mobile view Div// */}
      <div className=" absolute  md:hidden block top-4 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine onClick={()=>setMobileMenuOpen(false)} className="w-6 h-6 text-white mr-2 cursor-pointer " />
        ) : <HiOutlineMenu  onClick={()=>setMobileMenuOpen(true)} className="w-6 h-6 text-white mr-2 cursor-pointer" />}
      </div>

      {/* this div is absolutely positioned to the main div of app.js which is relative and it shows up only when mobile view is open (i.e the hamburger is clicked) */}
      <div className={`flex flex-col absolute top-0 h-screen 
      w-2/3  from-white/10 to-[#83bc79] backdrop-blur-lg  z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen? "left-0":"-left-full" } `} >
        <img
          src={logo}
          alt="logo" className="w-full h-14 object-contain"
        />
        
        <NavLinks 
        
        />
      </div>

    </>
  )
}
export default Sidebar;
