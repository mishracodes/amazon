import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
const Header = () => {
  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            width={97}
            height={30}
            alt=""
            priority
            className="cursor-pointer object-contain"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 mx-4">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right */}
        <div className="flex text-white items-center space-x-5 whitespace-nowrap m-2">
            <div className="link" onClick={signIn}>
                <p className="text-xs font-normal">Hello, Amit</p>
                <p className="text-xm font-bold md:text-sm">Accounts & Lists</p>
            </div>
            <div className="link">
                <p className="text-xs">Reurns</p>
                <p className="text-xm font-bold md:text-sm">& Orders</p>
            </div>
            <div className="relative flex items-center link ">
                <span className="absolute top-0 -right-2 md:right-5 text-xs h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
                <ShoppingCartIcon className="h-8 w-8"/>
                <p className="hidden md:inline font-bold md:text-sm mt-2">Cart</p>
                
            </div>

        </div>
      </div>
      {/* Bottom Nav */}
      <div className="flex items-center content-center h-10 bg-gray-700 text-white text-sm">
        <MenuIcon className="h-6 w-6 mx-2"/>
        <div className="flex-grow">
          <ul className="flex items-center space-x-3">
            <li className="link">All</li>
            <li className="link">Fresh</li>
            <li className="link">Amazon Pay</li>
            <li className="link">Gift Cards</li>
            <li className="link">Coupons</li>
            <li className="link hidden md:inline-flex">Health & Personal Care</li>
            <li className="link hidden md:inline-flex">Best Sellers</li>
            <li className="link hidden md:inline-flex">Amazon miniTV</li>
            <li className="link hidden lg:inline-flex">Buy Again</li>
            <li className="link hidden lg:inline-flex">Toys & Games</li>
            <li className="link hidden lg:inline-flex">Baby</li>
            <li className="link hidden lg:inline-flex">Browsing History</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
