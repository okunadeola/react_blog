import { useState } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import propTypes from "prop-types";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PostcardLarge from "../../components/PostcardLarge";
import PostcardMd from "../../components/PostcardMd";

const BlogHomepage2 = ({ featuredPost, data }) => {
  const [showNextRecentPosts, setShowNextRecentPosts] = useState(false);
  const [showNextRelatedPosts, setShowNextRelatedPosts] = useState(false);
  const navigate = useNavigate();

  // Carousel navigation functions
  const handleNextRecentPosts = () => {
    setShowNextRecentPosts(!showNextRecentPosts);
  };
  const handleNextRelatedPosts = () => {
    setShowNextRelatedPosts(!showNextRelatedPosts);
  };

  const viewDetail = (post) => {
    navigate(`/post/${post?.slug}`);
  };

  return (
    <div className="h-full min-h-[50vh] items-center">
      {!featuredPost ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section
            className="mb-16 cursor-pointer"
            onClick={() => viewDetail(featuredPost)}
          >
            <div className="relative rounded-xl overflow-hidden group">
              <img
                src={featuredPost?.image}
                alt={featuredPost?.title}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8">
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm mb-4">
                    {featuredPost?.category}
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredPost?.title}
                  </h2>
                  <p className="text-gray-200 text-lg mb-4">
                    {featuredPost?.subtitle}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      {moment(featuredPost?.createdAt).format("MMM D, YYYY")}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      {(featuredPost.content.length / 1000).toFixed(0)} mins read
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Posts - Now with Swiper-like behavior */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Latest Posts</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleNextRecentPosts}
                  className={`p-2 rounded-full ${
                    showNextRecentPosts
                      ? "bg-gray-200"
                      : "bg-blue-500 text-white"
                  } hover:bg-blue-600 transition-colors`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextRecentPosts}
                  className={`p-2 rounded-full ${
                    !showNextRecentPosts
                      ? "bg-gray-200"
                      : "bg-blue-500 text-white"
                  } hover:bg-blue-600 transition-colors`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${
                    showNextRecentPosts ? "-50%" : "0"
                  })`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-w-full ">
                  {data?.map((post, index) => (
                    <PostcardLarge key={index} post={post}/>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts - Also with Swiper-like behavior */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">More Posts</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleNextRelatedPosts}
                  className={`p-2 rounded-full ${
                    showNextRelatedPosts
                      ? "bg-gray-200"
                      : "bg-blue-500 text-white"
                  } hover:bg-blue-600 transition-colors`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextRelatedPosts}
                  className={`p-2 rounded-full ${
                    !showNextRelatedPosts
                      ? "bg-gray-200"
                      : "bg-blue-500 text-white"
                  } hover:bg-blue-600 transition-colors`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${
                    showNextRelatedPosts ? "-50%" : "0"
                  })`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full">
                  {data?.slice(0, 3).map((post, index) => (
                   <PostcardMd   post={post} key={index}/>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

BlogHomepage2.propTypes = {
  featuredPost: propTypes.any,
  data: propTypes.any,
};

export default BlogHomepage2;
