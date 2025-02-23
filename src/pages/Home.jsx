import { useEffect, useState } from 'react';
import BlogHomepage2 from './blog page/home';
import toast from 'react-hot-toast';
import { baseURL } from '../util';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const res = await fetch(`${baseURL}/post/getPosts`);
          const data = await res.json();
          setPosts(data.posts);
    
          const res2 = await fetch(`${baseURL}/featured/get`);
          const data2 = await res2.json();
          
          const init = data.posts?.find(el => el._id === data2.postId)
          if(init){
           return  setFeaturedPost(init)
          }
            
        return setFeaturedPost(data[0])
      } catch (error) {
        toast.error(error.message)
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 py-10 px-3 max-w-6xl mx-auto '>
        <BlogHomepage2 featuredPost={featuredPost} data={posts}/>
      </div>
     
    </div>
  );
}
