import  { useState } from 'react';
import { Menu, Search, Calendar, Clock, Heart, MessageCircle, Share2, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogHomepageDummy = () => {
  const [comments, setComments] = useState({
    1: [
      { id: 1, user: "Sarah Chen", content: "Great article!", timestamp: "2 hours ago", likes: 5 },
      { id: 2, user: "John Doe", content: "Very insightful perspective.", timestamp: "1 hour ago", likes: 3 }
    ]
  });
  
  const [editingComment, setEditingComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const featuredPost = {
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring the latest trends in web development and what they mean for developers...",
    author: "Alex Johnson",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    image: "/api/placeholder/800/400",
    category: "Technology"
  };

  const recentPosts = [
    {
      title: "Understanding Modern State Management",
      excerpt: "A deep dive into state management solutions...",
      date: "Jan 11, 2025",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Building Scalable Frontend Architecture",
      excerpt: "Best practices for creating maintainable applications...",
      date: "Jan 10, 2025",
      image: "/api/placeholder/400/200"
    }
  ];

  const relatedPosts = [
    {
      title: "React Performance Optimization",
      category: "Development",
      date: "Jan 9, 2025",
      image: "/api/placeholder/300/150"
    },
    {
      title: "Modern CSS Techniques",
      category: "Design",
      date: "Jan 8, 2025",
      image: "/api/placeholder/300/150"
    }
  ];

  const handleEditComment = (postId, commentId) => {
    const comment = comments[postId].find(c => c.id === commentId);
    setEditingComment({ ...comment, postId });
  };

  const handleUpdateComment = (postId, commentId, newContent) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => 
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    }));
    setEditingComment(null);
  };

  const handleDeleteComment = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].filter(comment => comment.id !== commentId)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6" />
            <h1 className="text-2xl font-bold">TechBlog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Featured Post */}
      <section className="mb-12">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <span className="text-sm text-blue-400">{featuredPost.category}</span>
            <h2 className="text-3xl font-bold text-white mt-2">{featuredPost.title}</h2>
            <p className="text-gray-200 mt-2">{featuredPost.excerpt}</p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                {featuredPost.date}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                {featuredPost.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {recentPosts.map((post, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">{post.title}</h4>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <div className="flex items-center mt-4">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-blue-500">{post.category}</span>
                <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
                <div className="flex items-center mt-4">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        <div className="space-y-6">
          {comments[1]?.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <h4 className="font-semibold">{comment.user}</h4>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditComment(1, comment.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(1, comment.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              {editingComment?.id === comment.id ? (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    value={editingComment.content}
                    onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setEditingComment(null)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(1, comment.id, editingComment.content)}
                      className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2">{comment.content}</p>
              )}
              <div className="flex items-center space-x-4 mt-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                  <Heart className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                  <MessageCircle className="h-4 w-4" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mb-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="p-2 rounded-full hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {[1, 2, 3].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogHomepageDummy;