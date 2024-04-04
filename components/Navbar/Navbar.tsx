"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import "./style.css";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Logo from "../../assets/logo.png";
import LogoPrimary from "../../assets/logo_primary.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const currentPath = usePathname();

  const router = useRouter();

  const handleNav = () => {
    setShowMenu(!showMenu);
  };

  const removeToken = () => {
    deleteCookie("id");
    deleteCookie("token");
    router.replace("/auth/signIn");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu]);

  return (
    <div>
      <div className="flex justify-between w-full bg-primary min-h-[60px] px-6 items-center">
        <div className="flex items-center gap-5">
          {/* Hambuger Icon */}
          <div className=" md:hidden cursor-pointer text-white">
            <FaBars onClick={handleNav} className="text-2xl" />
          </div>
          <div className="text-white">
            <Link href="/booking">
              <Image
                src={Logo}
                alt="logo"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="md:flex hidden items-center gap-5 text-white">
          <ul className="flex gap-10 tracking-wide relative">
            <li
              className={
                currentPath === "/booking" || currentPath.startsWith("/booking")
                  ? "active-link"
                  : ""
              }
            >
              <Link href="/booking" className="custom-link py-5">
                Booking
              </Link>
            </li>
            <li className={currentPath === "/ticket" ? "active-link" : ""}>
              <Link href="/ticket" className="custom-link py-5">
                Ticket
              </Link>
            </li>
            <li className={currentPath === "/history" ? "active-link" : ""}>
              <Link href="/history" className="custom-link py-5">
                History
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <ul className="md:flex hidden justify-between gap-5 items-center ">
            <li className={currentPath === "/profile" ? "active-link" : ""}>
              <Link href="/profile" className="custom-linkp">
                <AiOutlineUser className="w-6 h-14" />
              </Link>
            </li>

            <div>|</div>
            <div
              onClick={removeToken}
              className="uppercase cursor-pointer custom-link py-3"
            >
              Log out
            </div>
          </ul>
        </div>
      </div>

      {showMenu ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"
          onClick={handleNav}
        ></div>
      ) : null}

      <div
        className={
          showMenu
            ? "fixed top-0 left-0 w-[50%] h-screen bg-background z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-background z-10 duration-300"
        }
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <ul className="flex flex-col gap-10 pl-2">
              <Link href="/booking">
                <Image
                  src={LogoPrimary}
                  alt="logo"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              </Link>

              <li
                onClick={handleNav}
                className={
                  currentPath === "/booking"
                    ? "text-primary border-r-4 border-primary transition-all duration-500"
                    : "w-full mt-10 hover:border-r-4 hover:text-primary hover:border-primary transition-all duration-500 text-muted-foreground"
                }
              >
                <Link href="/booking">
                  <h4>Booking</h4>
                </Link>
              </li>
              <li
                onClick={handleNav}
                className={
                  currentPath === "/ticket"
                    ? "text-primary border-r-4 border-primary transition-all duration-500"
                    : "w-full hover:border-r-4 hover:text-primary hover:border-primary text-muted-foreground"
                }
              >
                <Link href="/ticket" className="custom-link">
                  <h4>Tickets</h4>
                </Link>
              </li>
              <li
                onClick={handleNav}
                className={
                  currentPath === "/history"
                    ? "text-primary border-r-4 border-primary transition-all duration-500"
                    : "w-full hover:border-r-4 hover:text-primary hover:border-primary text-muted-foreground"
                }
              >
                <Link href="/history" className="custom-link">
                  <h4>History</h4>
                </Link>
              </li>
              <li
                onClick={handleNav}
                className={
                  currentPath === "/profile"
                    ? "text-primary border-r-4 border-primary transition-all duration-500"
                    : "w-full hover:border-r-4 hover:text-primary hover:border-primary text-muted-foreground"
                }
              >
                <Link href="/profile" className="custom-link">
                  <h4>Profile</h4>
                </Link>
              </li>
            </ul>
          </div>
          <div onClick={handleNav} className="flex justify-center">
            <button
              className="w-full bg-destructive py-2 text-white"
              onClick={removeToken}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
