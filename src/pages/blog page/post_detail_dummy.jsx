import { useState } from 'react';
import { Calendar, Clock, Heart, MessageCircle, Bookmark, Facebook, Twitter, Linkedin , Copy, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPostDetailDummy = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const post = {
    title: "The Future of Web Development in 2025: AI, WebAssembly, and Beyond",
    excerpt: "An in-depth look at how emerging technologies are reshaping web development, with practical insights and future predictions.",
    author: {
      name: "Sarah Chen",
      role: "Senior Developer Advocate",
      avatar: "/api/placeholder/100/100",
      bio: "Sarah is a web development expert with 10+ years of experience in building scalable applications."
    },
    publishDate: "Jan 13, 2025",
    readTime: "8 min read",
    category: "Technology",
    tags: ["Web Development", "AI", "WebAssembly", "Future Tech"],
    image: "/api/placeholder/1200/600",
    content: [
      {
        type: "paragraph",
        content: "The landscape of web development is evolving at an unprecedented pace. As we look towards 2025, several transformative technologies are converging to reshape how we build and interact with web applications."
      },
      {
        type: "heading",
        content: "The Rise of AI-Powered Development"
      },
      {
        type: "paragraph",
        content: "Artificial Intelligence is no longer just a buzzword in web development. It's becoming an integral part of our development workflow, from code completion to automated testing and optimization."
      },
      {
        type: "quote",
        content: "AI isn't replacing developers - it's augmenting their capabilities and allowing them to focus on higher-level problems."
      },
      {
        type: "heading",
        content: "WebAssembly: Breaking Performance Barriers"
      },
      {
        type: "paragraph",
        content: "WebAssembly continues to push the boundaries of what's possible in web applications, enabling near-native performance for complex computations and graphics-intensive applications."
      }
    ],
    relatedPosts: [
      {
        title: "Understanding Modern State Management",
        excerpt: "A comprehensive guide to state management in modern web applications.",
        image: "/api/placeholder/400/200",
        author: "Michael Brown",
        date: "Jan 10, 2025"
      },
      {
        title: "The Evolution of Frontend Architecture",
        excerpt: "Exploring how frontend architecture has evolved over the years.",
        image: "/api/placeholder/400/200",
        author: "Emma Wilson",
        date: "Jan 8, 2025"
      }
    ]
  };

  const handleShare = (platform) => {
    // Share functionality implementation
    console.log(`Sharing on ${platform}`);
  };

  const handleCopyLink = () => {
    // Copy URL functionality
    console.log('URL copied to clipboard');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between mb-8">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full ${
              isBookmarked ? 'text-blue-500' : 'text-gray-500'
            } hover:bg-gray-100 transition-colors`}
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 text-gray-500 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {post.publishDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-center space-x-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{post.author.role}</p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <figure className="max-w-4xl mx-auto mb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-lg"
        />
      </figure>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto prose prose-lg prose-blue">
        {post.content.map((section, index) => {
          switch (section.type) {
            case 'heading':
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>;
            case 'paragraph':
              return <p key={index} className="mb-6 text-gray-700 leading-relaxed">{section.content}</p>;
            case 'quote':
              return (
                <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700">
                  {section.content}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </article>

      {/* Tags */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="max-w-4xl mx-auto mt-12 flex items-center justify-between py-6 border-t border-b">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              hasLiked ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-500 transition-colors`}
          >
            <Heart className={`h-6 w-6 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
            <MessageCircle className="h-6 w-6" />
            <span>24 Comments</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 ${
              isBookmarked ? 'text-blue-500' : 'text-gray-500'
            } hover:text-blue-500 transition-colors`}
          >
            <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-50 rounded-xl p-8">
        <div className="flex items-start space-x-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
            <p className="text-gray-600 mb-4">{post.author.bio}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {post.relatedPosts.map((relatedPost, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                {relatedPost.title}
              </h3>
              <p className="text-gray-600 mb-2">{relatedPost.excerpt}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <span>{relatedPost.author}</span>
                <span className="mx-2">•</span>
                <span>{relatedPost.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto mt-16 flex justify-between">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="h-5 w-5" />
          <div className="text-left">
            <div className="text-sm text-gray-500">Previous Article</div>
            <div className="font-medium">Building Scalable Frontend Architecture</div>
          </div>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <div className="text-right">
            <div className="text-sm text-gray-500">Next Article</div>
            <div className="font-medium">Modern CSS Techniques</div>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogPostDetailDummy;