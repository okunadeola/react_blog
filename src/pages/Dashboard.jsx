import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import { useSelector } from 'react-redux';
import {  Button } from 'flowbite-react';
import {Link} from "react-router-dom"

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-row  justify-between'>
      <div className='sm:w-56 hidden sm:block'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
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
      </div>



        {currentUser.isAdmin && (
          <Link to={'/create-post'} className="fixed right-2 bottom-2 rounded-full shadow-2xl  duration-1000 delay-1000 animate-bounce" >
            <Button
              type='button'
              gradientDuoTone="greenToBlue"
              className="p-10 rounded-full shadow-2xl w-24 h-24 flex flex-col gap-2 items-center justify-center"
            >
             {/* <div className='text-xl'>+</div>  */}
             <div>Create Post</div> 
            </Button>
          </Link>
        )}
    </div>
  );
}
