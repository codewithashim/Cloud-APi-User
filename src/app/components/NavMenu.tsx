"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  return (
    <header
      className={`md:py-6  dark:text-gray-100 ${
        isScrolled ? "bg-[#454444cc] backdrop-blur-md" : "bg-[#454444f1]"
      } sticky top-0 z-50`}
    >
      <div className="mx-auto my-4 container  flex items-center justify-between">
        <ul className="items-stretch hidden space-x-4 gap-3 lg:flex">
          <NavItem href="/" label="Home" />
          {session?.user ? (
            <>
              <button
                onClick={() => signOut()}
                className="text-gray-200 hover:text-white duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
              >
                Logout
              </button>
              <NavItem href="/add_customer" label="Add Customer" />
            </>
          ) : (
            <div
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => signIn()} 
              className="text-gray-200 hover:text-white duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
            >
              Login
            </div>
          )}
        </ul>

        <button onClick={() => setOpen(!open)} className="p-4 lg:hidden">
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>

        {open && (
          <div className="absolute lg:hidden px-8 pb-8 bg-gray-700 w-full left-0 top-20">
            <ul className="  gap-3 flex flex-col py-4">
              <NavItem href="/" label="Home" />
              {session?.user ? (
                <>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-200 hover:text-white duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                  <NavItem href="/add_customer" label="Add Customer" />
                </>
              ) : (
                <div
                  onClick={() => signIn()}
                  style={{ textDecoration: "none", color: "white" }}
                  className="text-gray-200 hover:text-white duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer"
                >
                  Login
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

const NavItem = ({ href, label }: any) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

  return (
    <li className="flex">
      <Link
        href={href}
        className={`text-gray-200 hover:text-white duration-200 text-[18px] font-semibold active:font-semibold cursor-pointer ${
          isActive ? "text-green-500 underline font-bold" : ""
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default Navbar;
