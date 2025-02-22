import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import BlogEditor from './pages/Editor';
import { Toaster } from 'react-hot-toast';
import PostDetail from './pages/PostDetail';
import UserLayout from './layout/UserLayout';
import Dashboard from './pages/Dashboard';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path='' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/post/:postSlug' element={<PostDetail />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/dashboard/create-post/:postId' element={<BlogEditor />} />
        </Route>

        
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}
