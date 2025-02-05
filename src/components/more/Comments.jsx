import { Heart, MessageCircle, Share2, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
// import moment from "moment"
// import { Spinner } from "flowbite-react";
import { useState } from 'react';

const Comments = () => {
    const [comments, setComments] = useState({
        1: [
          { id: 1, user: "Sarah Chen", content: "Great article!", timestamp: "2 hours ago", likes: 5 },
          { id: 2, user: "John Doe", content: "Very insightful perspective.", timestamp: "1 hour ago", likes: 3 }
        ]
      });
    const [editingComment, setEditingComment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


     // Comment handling functions remain the same...
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
    <div  className='flex flex-col gap-4'>
       {/* Comments Section - Enhanced with animations and better spacing */}
       <section className="mb-16">
        <h3 className="text-2xl font-bold mb-8">Comments</h3>
        <div className="space-y-6">
          {comments[1]?.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div>
                    <h4 className="font-semibold text-lg">{comment.user}</h4>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditComment(1, comment.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(1, comment.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              {editingComment?.id === comment.id ? (
                <div className="mt-4">
                  <textarea
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    value={editingComment.content}
                    onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                    rows={3}
                  />
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      onClick={() => setEditingComment(null)}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(1, comment.id, editingComment.content)}
                      className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-gray-700">{comment.content}</p>
              )}
              <div className="flex items-center space-x-6 mt-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination - Enhanced with better styling */}
      <div className="flex justify-center items-center space-x-2 mb-16">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {[1, 2, 3].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full transition-colors ${
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
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default Comments
