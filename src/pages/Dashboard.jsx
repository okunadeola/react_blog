import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, User, MessageSquare, LogOut } from 'lucide-react';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import BlogEditor from './Editor';
import { useDispatch } from "react-redux";
import { baseURL } from '../util';
import { signoutSuccess } from '../redux/user/userSlice';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [tab, setTab] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        // On desktop, always show the sidebar.
        setSidebarOpen(true);
      } else {
        // On mobile, close the sidebar by default when resizing.
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Call once on mount
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]);





  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const signOut = async () => {
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

  const toCreatePost = () => {
    navigate('/dashboard?tab=create&action=0');
  };



  // Helper to build the className based on query string matching.
  const getNavLinkClass = (expectedQuery) =>
    `block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-[#69696b] ${
      location.search === expectedQuery ? 'bg-[#333235] dark:bg-gray-700 !text-white' : ''
    }`;

  return (
    <div className="flex h-screen font-mono">
      {/* Sidebar with AnimatePresence for mounting/unmounting animations */}
      <AnimatePresence>
        {(isDesktop || isSidebarOpen) && (
          <motion.div
            className="bg-[#222124] dark:bg-[#1f2937] text-white w-64 p-4 fixed inset-y-0 left-0 z-20 lg:static h-screen flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,  
              duration: 0.5,
            }}
          >
            <div className="flex flex-col">
              <div className="h-20 w-full p-10 flex items-center justify-center border-b border-[#2c2c2e] mx-auto mb-4">
                <NavLink
                  to="/"
                  className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold"
                  
                >
                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-zinc-500 rounded-lg text-white">
                    Tech
                  </span>
                  Blog
                </NavLink>
              </div>

              <nav className="my-auto">
                <ul className="space-y-4">
                  <li className="mb-4 rounded-md">
                    <NavLink
                      to="/dashboard?tab=dash"
                      end
                      // className={({ isActive }) =>
                      //   `block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-[#69696b] ${
                      //     isActive ? 'bg-[#333235] active-link' : ''
                      //   }`
                      // }
                      className={() => getNavLinkClass('?tab=dash')}
                    >
                      <div className="flex gap-5 items-center">
                        <Home className="h-4 w-4 text-[#959497]" />
                        <span>Dashboard</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-4 rounded-md">
                    <NavLink
                      to="/dashboard?tab=posts"
                      end
                      // className={({ isActive }) =>
                      //   `block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-[#69696b] ${
                      //     isActive ? 'bg-[#333235] active-link' : ''
                      //   }`
                      // }
                      className={() => getNavLinkClass('?tab=posts')}
                    >
                      <div className="flex gap-5 items-center">
                        <FileText className="h-4 w-4 text-[#959497]" />
                        <span>Posts</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-4 rounded-md">
                    <NavLink
                      to="/dashboard?tab=users"
                      end
                      // className={({ isActive }) =>
                      //   `block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-[#69696b] ${
                      //     isActive ? 'bg-[#333235] active-link' : ''
                      //   }`
                      // }
                      className={() => getNavLinkClass('?tab=users')}
                    >
                      <div className="flex gap-5 items-center">
                        <User className="h-4 w-4 text-[#959497]" />
                        <span>Users</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="mb-4 rounded-md">
                    <NavLink
                      to="/dashboard?tab=comments"
                      end
                      // className={({ isActive }) =>
                      //   `block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-[#69696b] ${
                      //     isActive ? 'bg-[#333235] active-link' : ''
                      //   }`
                      // }
                      className={() => getNavLinkClass('?tab=comments')}
                    >
                      <div className="flex gap-5 items-center">
                        <MessageSquare className="h-4 w-4 text-[#959497]" />
                        <span>Comments</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              className="mt-auto h-20 w-full p-10 flex items-center justify-center border-y border-[#2c2c2e] mx-auto mb-4 cursor-pointer"
              onClick={signOut}
            >
              <div className="self-center whitespace-nowrap text-sm sm:text-md font-semibold">
                <div className="px-2 flex gap-2 items-center py-1 bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-500 rounded-lg text-white hover:bg-gradient-to-l">
                  <LogOut className="h-4 w-4 text-black" />
                  Sign Out
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile only */}
      <AnimatePresence>
        {!isDesktop && isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 cursor-pointer lg:hidden"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 flex flex-col">
        {/* Navbar */}
        <div className="bg-white dark:bg-[#0f172a] border-b dark:border-none p-4 flex justify-between items-center">
          {/* Sidebar Toggle (visible on small screens) */}
          <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold dark:text-white">Admin Dashboard</h1>
          <button
            className="ring-1 text-gray-900 dark:text-white px-4 py-2 rounded cursor-pointer"
            onClick={toCreatePost}
          >
            Create Post
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 overflow-auto bg-[#f5f5f5] dark:bg-[#0f1527]">
          {/* <Outlet /> */}
                <div className='flex-1'>
                    {tab === 'profile' && <DashProfile  />}
                    {/* posts... */}
                    {tab === 'posts' && <DashPosts />}
                    {/* users */}
                    {tab === 'users' && <DashUsers />}
                    {/* comments  */}
                    {tab === 'comments' && <DashComments />}
                    {/* dashboard comp */}
                    {tab === 'dash' && <DashboardComp />}
                    {tab === "create" && <BlogEditor />}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
