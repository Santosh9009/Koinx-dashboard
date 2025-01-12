"use client";
import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Logo from "../../public/1. KoinX Logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white text-light p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="24 md:w-36">
          <Image src={Logo} alt="KoinX Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 ml-auto">
          <Link href="/crypto-taxes" className="text-light">
            Crypto Taxes
          </Link>
          <Link href="/free-tools" className="text-light">
            Free Tools
          </Link>
          <Link href="/resource-center" className="text-light">
            Resource Center
          </Link>

          {/* Get Started Button */}
          <Link
            href="/get-started"
            className="bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] text-white px-6 py-2 rounded-lg hover:scale-105 duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/crypto-taxes" className="text-light">
            Crypto Taxes
          </Link>
          <Link href="/free-tools" className="text-light">
            Free Tools
          </Link>
          <Link href="/resource-center" className="text-light">
            Resource Center
          </Link>

          {/* Mobile Get Started Button */}
          <Link
            href="/get-started"
            className="bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] text-white px-6 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
