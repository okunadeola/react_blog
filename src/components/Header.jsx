import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Menu, X} from "lucide-react"
import DashSidebar from "./DashSidebar";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);




  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


  const openModal = ()=>{
    setShowMenu(true)
  }

  const ShowdashboardMenu = ()=>{
   return <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full bg-transparent shadow-2xl overflow-y-auto z-50 sm:hidden overflow-x-hidden"
          >
            <div className="  w-full overflow-x-hidden flex items-center relative h-full" >
              <div className="overflow-x-hiddens p-2 md:p-6 h-full bg-[#f9fafb] dark:bg-[#1f2937] w-1/2">

                  <div className="flex items-center mb-6 w-full">
                
                    <Button color="gray" className="rounded-full w-10 h-10 flex items-center"  onClick={() => setShowMenu(false)}>
                      <X className="text-gray-500"/>
                    </Button>
                  </div>

                  <DashSidebar onAim={()=>setShowMenu(false)} />
              </div>
              <div className=" bg-gray-500 opacity-40 w-1/2  absolute right-0 h-full cursor-pointer" onClick={()=>setShowMenu(false)}>
                
              </div>
            </div>
          </motion.div>
  }

  return (
    <div className={`flex flex-col ${location.pathname.includes('/dashboard')|| location.pathname.includes('/search') ? "pt-20" :"pt-40"}`}>
      <Navbar className={`py-6 bg-[#333333] text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-[#333333]/80 backdrop-blur-sm' 
        : 'bg-[#333333]'}
        `}>
      {/*  bg-gradient-to-r from-blue-500 to-purple-600 */}
      <div className="flex gap-2">
        { path.includes("dashboard") &&
            <div onClick={openModal} className="rounded shadow  flex items-center justify-center w-10 h-10 bg-gray-700 cursor-pointer sm:hidden">
              <Menu/>
            </div>

        }
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-zinc-500 rounded-lg text-white">
            Tech
          </span>
          Blog
        </Link>

      </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline !bg-red-700 !rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "#eef",
              borderRadius: "20px",
              border: "none",
              boxShadow: "none",
            }}
          />
        </form>
        {/* <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button> */}
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-10 h-10  sm:inline rounded-full !p-0  flex items-center dark:bg-black"
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle className="bg-white" />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="border-zinc-400 hover:bg-black cursor-pointer" active={path === "/"} as={"div"}>
            <Link
              className={`${path === "/" ? "text-white" : "text-gray-500"}`}
              to="/"
            >
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link className="border-zinc-400 hover:bg-black cursor-pointer" active={path === "/about"} as={"div"}>
            <Link
              className={`${path === "/about" ? "text-white" : "text-gray-500"}`}
              to="/about"
            >
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link className="border-zinc-400 hover:bg-black cursor-pointer" active={path === "/projects"} as={"div"}>
            <Link
              className={`${
                path === "/projects" ? "text-white" : "text-gray-500"
              }`}
              to="/projects"
            >
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>

      </Navbar>
        <AnimatePresence>
          {showMenu && <ShowdashboardMenu />}
        </AnimatePresence>

    </div>
  );
}
