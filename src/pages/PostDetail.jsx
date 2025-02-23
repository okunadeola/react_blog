/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CommentSection from "../components/CommentSection";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import ListBlock from "../components/ListBlock";
import { baseURL } from "../util";

export default function PostDetail() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`${baseURL}/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const author = {
    name: "Sarah Chen",
    role: "Senior Developer Advocate",
    avatar: "/api/placeholder/100/100",
    bio: `${post?.userId?.username} is a web development expert with 10+ years of experience in building scalable applications.`,
  };

  const RelatedPostBlock = ({ data }) => (
    <div className="related-post-display">
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <h3>{data.title}</h3>
      </a>
      <p>{data.description}</p>
    </div>
  );


  const renderContent = (content) => {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) return content.map(renderContent);
    if (typeof content === "object" && content !== null) {
      // Handle nested content
      return JSON.stringify(content);
    }
    return "";
  };

  const renderBlocks = (blocks) => {
    if (!blocks || !blocks.blocks) return null;

    return blocks.blocks.map((block, index) => {
      switch (block.type) {
        case "header":
          const HeaderTag = `h${block.data.level}`;
          return (
            <HeaderTag key={index} className="text-2xl font-bold mb-4">
              {block.data.text}
            </HeaderTag>
          );

        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: block.data.text,
              }}
            />
          );

        case "image":
          return (
            <figure className="my-8" key={index}>
              <img
                src={block.data.file.url}
                alt={block.data.caption || ""}
                className="rounded-lg max-h-[30rem] object-contain "
              />
              {block.data.caption && (
                <figcaption className="text-gray-500 mt-2">
                  {block.data.caption}
                </figcaption>
              )}
            </figure>
          );

        case "list":
          const ListTag = block.data.style === "ordered" ? "ol" : "ul";
          return (

            <ListBlock block={block} key={index}/>
            // <ListTag key={index} className={`${ListTag === "ol" ? 'list-decimal' : 'list-disc'} ml-6 mb-4`}>
            //   {block.data.items.map((item, i) => (
            //     <li key={i}>
            //       {typeof item === "string"
            //         ? item
            //         : renderContent(item.content)}
            //     </li>
            //   ))}
            // </ListTag>
          );

        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-blue-500 pl-4 my-4"
            >
              <p className="italic">{block.data.text}</p>
              {block.data.caption && (
                <cite className="block mt-2 text-sm">
                  — {block.data.caption}
                </cite>
              )}
            </blockquote>
          );

        case "code":
          return (
            <pre
              key={index}
              className="bg-gray-200 p-4 rounded-lg my-4 overflow-x-auto"
            >
              <code>{block.data.code}</code>
            </pre>
          );

        case "table":
          return (
            <div key={index} className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-200">
                <tbody>
                  {block.data.content.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-200 p-2"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case "link":
          return (
            <a
              href={block.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              key={index}
            >
              {block.data.text}
            </a>
          );

        case "relatedPost":
          return <RelatedPostBlock data={block.data} key={index} />;

        default:
          console.log("Unhandled block type:", block.type);
          return null;
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <p className="text-sm text-gray-600  text-center mx-auto lg:text-lg">
        {post?.subtitle}
      </p>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full  text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div className="p-3  mx-auto w-full post-content mt-10">
        {post.content && renderBlocks(JSON.parse(post.content))}
      </div>

      {/* Tags */}
      <div className="max-w-4xl  ">
        <div className="flex flex-wrap gap-2">
          {post.tags?.split(",")?.map((tag, index) => (
            <Button key={index} color="gray" pill size="xs">
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-50 rounded-xl p-8">
        <div className="flex items-start space-x-6">
          <img
            src={post?.userId?.profilePicture}
            alt={post?.userId?.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {post?.userId?.username}
            </h3>
            <p className="text-gray-600 mb-4">{author.bio}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
      <CommentSection postId={post._id} />

      {/* Related Posts */}
      <section className="md:max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {recentPosts?.map((relatedPost, index) => (
            <div key={index} className="group cursor-pointer max-w-[400px]">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                {relatedPost.title}
              </h3>
              <p className="text-gray-600 mb-2">{relatedPost.excerpt}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <span>{relatedPost.author}</span>
                <span className="mx-2">•</span>
                <span>
                  {moment(relatedPost?.createdAt).format("MMM D, YYYY")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link to={"/"}>
        <button className="flex items-center space-x-2 mt-5 text-gray-600 hover:text-gray-900 transition-colors max-w-4xl ">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>
      </Link>
    </main>
  );
}
