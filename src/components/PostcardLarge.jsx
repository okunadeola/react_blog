/* eslint-disable react/prop-types */
import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PostcardLarge = ({ post }) => {
  const navigate = useNavigate();

  const viewDetail = (post) => {
    navigate(`/post/${post?.slug}`);
  };
  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer min-w-[500px]"
      onClick={() => viewDetail(post)}
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="relative p-6">
        <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm mb-3">
          {post.category}
        </span>
        <h4 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h4>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.subtitle}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                {" "}
                {moment(post?.createdAt).format("MMM D, YYYY")}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                {(post.content.length / 1000).toFixed(0)} mins read
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcardLarge;
