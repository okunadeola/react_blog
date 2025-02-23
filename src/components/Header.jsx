import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { baseURL } from "../util";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      const res = await fetch(`${baseURL}/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
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





  return (
    <div
      className={`flex flex-col w-full ${
        location.pathname.includes("/search") ? "pt-20" : "pt-40"
      }`}
    >
      <div className={`  fixed top-0 left-0 right-0 z-50 transition-all duration-300    ${isScrolled ? "bg-white/80 backdrop-blur-sm dark:bg-[#1f2937] bg-opacity-50 " : "bg-white dark:bg-[#1f2937]"}`}>

        <Navbar
          className={`py-6  mx-auto max-w-6xl  bg-transparent   text-white 
       
          `}
        >

          <div className="flex gap-2">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-zinc-500 rounded-lg text-white">
                Tech
              </span>
              <span className="text-gray-700 dark:text-white">Blog</span>
              
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              className="lg:inline !rounded-2xl shadow-none "
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

          <div className="flex gap-2 md:order-2">
            
            <Button
              className="w-10 h-10  rounded-full !text-center !flex !items-center j!ustify-center !p-0   dark:bg-black"
              color="gray"
              onClick={() => dispatch(toggleTheme())}
              label={theme === "light" ? <FaSun  /> : <FaMoon />}
              
            >
              {/* {} */}
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
                  <span className="block text-sm text-gray-400">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate text-gray-500">
                    {/* {currentUser.email} */}
                  </span>
                </Dropdown.Header>
                <Link to={"/dashboard?tab=dash"}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
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
            <Navbar.Link
              className="border-zinc-400 hover:bg-black cursor-pointer"
              active={path === "/"}
              as={"div"}
            >
              <Link
                className={`${path === "/" ? "text-black" : "text-gray-500"}`}
                to="/"
              >
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link
              className="border-zinc-400 hover:bg-black cursor-pointer"
              active={path === "/about"}
              as={"div"}
            >
              <Link
                className={`${
                  path === "/about" ? "text-black" : "text-gray-500"
                }`}
                to="/about"
              >
                About
              </Link>
            </Navbar.Link>
            <Navbar.Link
              className="border-zinc-400 hover:bg-black cursor-pointer"
              active={path === "/projects"}
              as={"div"}
            >
              <Link
                className={`${
                  path === "/projects" ? "text-black" : "text-gray-500"
                }`}
                to="/projects"
              >
                Projects
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>

        </Navbar>
      </div>
    </div>
  );
}
