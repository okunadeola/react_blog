/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import  { useEffect, useRef, useState } from 'react';
import { Card, Button, TextInput, Badge, Select, Checkbox } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import RelatedPostTool from '../components/tools/RelatedPostTool';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const BlogEditor = () => {
  const ejInstance = useRef();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [featuredImage, setFeaturedImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const readDuration = 5;
  const [status, setStatus] = useState('draft');
  const [inputCategory, setInputCategory] = useState('');
  const [inputTag, setInputTag] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);



  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message)
          return;
        }
        if (res.ok) {
          const res = data.posts[0]
          autoPopulateData(res?.content)
          setTitle(res?.title)
          setSubTitle(res?.subtitle)
          setFeaturedImage({url: res?.image})
          setFeatured(res?.featured)
          setInputCategory(res?.category)
          setTags(res?.tags?.split(','))
          setStatus(res?.status)
        }
      };
      
      if(postId){
        fetchPost();
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [postId]);


  // Initialize EditorJS
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);



  

  const autoPopulateData = (content)=>{
    const data = JSON.parse(content)
    setTimeout( async () => {
        console.log(data)
        if (ejInstance.current) {
          ejInstance?.current?.destroy()
            initEditor(data);
        } else {
          initEditor(data);
        }
    }, 5000);
  }

  const initEditor = (data = {}) => {
    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Let\'s write an awesome story!',
      data: data,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3],
            defaultLevel: 2
          }
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile: async (file)=> {
                // -------------------------- base64-----------------
                // return new Promise((resolve) => {
                //   const reader = new FileReader();
                //   reader.onload = (e) => {
                //     resolve({
                //       success: 1,
                //       file: {
                //         url: e.target.result
                //       }
                //     });
                //   };
                //   reader.readAsDataURL(file);
                // });
                // -------------------------- base64-----------------
                try {
                  const imageUrl = await uploadToCloudinary(file);
                  return {
                    success: 1,
                    file: {
                      url: imageUrl
                    }
                  };
                } catch (error) {
                  console.error('Image upload failed:', error);
                  return {
                    success: 0,
                    error: 'Image upload failed'
                  };
                }
              }
            }
          }
        },
        quote: Quote,
        code: CodeTool,
        embed: Embed,
        table: Table,
        relatedPost: {
          class: RelatedPostTool
        },
        // onReady: () => {
        //   // Ensure the editor starts at the top after data is loaded
        //   const editorContainer = document.getElementById('editorjs');
        //   if (editorContainer) {
        //     editorContainer.scrollTop = 0;
        //   }
        // },
        // autofocus: false 
      }
    });

    ejInstance.current = editor;
  };


  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', '...'); // Replace with your Cloudinary upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/.../image/upload`, // Replace with your Cloudinary cloud name
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleFeaturedImageUpload = async (event) => {
    const file = event.target.files[0];
    const res = await uploadToCloudinary(file)
    setFeaturedImage({
      url: res,
      name: file.name
    });
  };
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputTag.trim()) {
      setTags([...new Set([...tags, inputTag.trim()])]);
      setInputTag('');
    }
  };

  const removeCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePreview = async () => {
    if (ejInstance.current) {
      const data = await ejInstance.current.save();
      setPreviewContent(data);
      setShowPreview(true);
    }
  };

  const handleSave = async () => {
    if (ejInstance.current) {
      const editorData = await ejInstance.current.save();
      const postData = {
        title,
        status,
        content: JSON.stringify(editorData),
        image:featuredImage,
        tags : tags?.join(','),
        category: inputCategory,
        readTime: readDuration,
        subtitle: subTitle,
        featured: featured
      };
     await handleSubmit(postData)
    }
  };

  const handleSubmit = async (formData) => {
    if(loading)return 
    setLoading(true)
    try {
      const res = await fetch( !postId ? '/api/post/create' : `/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: !postId ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false)
        return;
      }

      if (res.ok) {
        setLoading(false)
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false)
    }
  };

// Sample recent blogs
const recentBlogs = [
    { id: 1, title: 'Getting Started with React', excerpt: 'Learn the basics...', tags: ['React', 'Frontend'] },
    { id: 2, title: 'Modern Web Development', excerpt: 'Explore modern...', tags: ['Web', 'Dev'] }
    ];


    const RelatedPostBlock = ({ data }) => (
      <div className="related-post-display">
        <a href={data.url} target="_blank" rel="noopener noreferrer">
         <h3>{data.title}</h3>
        </a>
        <p>{data.description}</p>
        {/* <a href={data.url} target="_blank" rel="noopener noreferrer">
          Read More →
        </a> */}
      </div>
    );
    

    const PreviewPanel = () => {
        const renderContent = (content) => {
          if (typeof content === 'string') return content;
          if (Array.isArray(content)) return content.map(renderContent);
          if (typeof content === 'object' && content !== null) {
            // Handle nested content
            return JSON.stringify(content);
          }
          return '';
        };
      
        const renderBlocks = (blocks) => {
          if (!blocks || !blocks.blocks) return null;
      
          return blocks.blocks.map((block, index) => {
            switch (block.type) {
              case 'header':
                const HeaderTag = `h${block.data.level}`;
                return <HeaderTag key={index} className="text-2xl font-bold mb-4">{block.data.text}</HeaderTag>;
              
              case 'paragraph':
                return <p
                 key={index}
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      (block.data.text),
                  }}
                  />;
              
              case 'image':
                return (
                  <figure className="my-8">
                  <img
                    src={block.data.file.url}
                    alt={block.data.caption || ''}
                    className="rounded-lg w-full"
                  />
                  {block.data.caption && (
                    <figcaption className="text-center text-gray-500 mt-2">
                      {block.data.caption}
                    </figcaption>
                  )}
                </figure>
                 
                );
              
              case 'list':
                const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                return (
                  <ListTag key={index} className="list-decimal ml-6 mb-4">
                    {block.data.items.map((item, i) => (
                      <li key={i}>
                        {typeof item === 'string' ? item : renderContent(item.content)}
                      </li>
                     
                    ))}
                  </ListTag>
                );
      
              case 'quote':
                return (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-4">
                    <p className="italic">{block.data.text}</p>
                    {block.data.caption && (
                      <cite className="block mt-2 text-sm">— {block.data.caption}</cite>
                    )}
                  </blockquote>
                  
                );
      
              case 'code':
                return (
                  <pre key={index} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <code>{block.data.code}</code>
                  </pre>
                );
      
              case 'table':
                return (
                  <div key={index} className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-200">
                      <tbody>
                        {block.data.content.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-200 p-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

                case 'link':
                  return (
                    <a
                      href={block.data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {block.data.text}
                    </a>
                  );
                
                  case 'relatedPost':
                    return <RelatedPostBlock data={block.data} />;
      
              default:
                console.log('Unhandled block type:', block.type);
                return null;
            }
          });
        };
      
        return (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-2xl overflow-y-auto z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title || 'Untitled Post'}</h2>
                <Button color="gray" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
              </div>
              {featuredImage && (
                <img
                  src={featuredImage.url}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}
              <div className="prose max-w-none">
                {previewContent && renderBlocks(previewContent)}
              </div>
            </div>
          </motion.div>
        );
      };
    

  return (
    <div className="container mx-auto p-6 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2">
          <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create New Blog Post
            </h5>
            
            <div className="space-y-4">
              <TextInput
                sizing="lg"
                type="text"
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
               <TextInput
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="Enter your blog subtitle..."
                   sizing="lg"
                />
              
              <div className="min-h-[500px] border rounded-lg p-4 bg-white">
                <div id="editorjs" />
              </div>

              <div className="flex justify-end gap-2">
                <Button color="gray" onClick={handlePreview}>
                  Preview
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {
                    postId ? "Edit Post" : "Save Post"
                  }
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-4">
          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Publishing Options
            </h5>
            
            <div className="space-y-4">
              {/* Featured Image Upload */}
              <div>
                <p className="mb-2 text-sm font-medium">Featured Image</p>
                <div className="flex items-center justify-center w-full">
                  {featuredImage ? (
                    <div className="relative w-full">
                      <img
                        src={featuredImage.url}
                        alt="Featured"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        size="xs"
                        color="failure"
                        className="absolute top-2 right-2"
                        onClick={() => setFeaturedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFeaturedImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="mb-2 text-sm font-medium">Categories</p>
                <TextInput
                  type="text"
                  value={inputCategory}
                  onChange={(e) => setInputCategory(e.target.value)}
                  placeholder="Press Enter to add category"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(category => (
                    <Badge
                      key={category}
                      color="info"
                      className="cursor-pointer"
                      onClick={() => removeCategory(category)}
                    >
                      {category} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <div className='border border-gray-300 p-2 rounded-md cursor-pointer' onClick={()=>setFeatured(!featured)}>
                <p className="mb-2 text-sm font-medium">Feature Post</p>
                <div className='flex gap-x-4 items-center justify-between'>
                  <div className='text-gray-400 italic'>
                    set as featured post
                  </div>
                  <Checkbox checked={featured}  
                      onChange={(e) => setFeatured(e.target.checked)}  type="checkbox"   />
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="mb-2 text-sm font-medium">Tags</p>
                <TextInput
                  type="text"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  onKeyPress={handleAddTag}
                  placeholder="Press Enter to add tag"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags?.map(tag => (
                    <Badge
                      key={tag}
                      color="success"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-sm font-medium">Status</p>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </Select>
              </div>
            </div>
          </Card>
          {/* Recent Posts */}
          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recent Posts
            </h5>
            
            <div className="space-y-4">
              {recentBlogs.map(blog => (
                <div key={blog.id} className="space-y-2">
                  <h6 className="font-medium hover:text-blue-600 cursor-pointer">
                    {blog.title}
                  </h6>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {blog.excerpt}
                  </p>
                  <div className="flex gap-2">
                    {blog.tags.map(tag => (
                      <Badge key={tag} color="info" className="cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Preview Panel */}
      <AnimatePresence>
        {showPreview && <PreviewPanel />}
      </AnimatePresence>

     
    </div>
  );
};

export default BlogEditor;