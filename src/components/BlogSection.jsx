"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ClockIcon, X } from "lucide-react";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  // Friendly date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="bg-white py-20 px-5 lg:px-20 relative">
      <span className="block mx-auto text-black text-md lg:text-xl text-center">
        [Blog]
      </span>
      <h2 className="text-black text-3xl xl:text-6xl font-light text-center mb-10 xl:mb-20">
        Stay Informed
      </h2>

      {/* Blog Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {posts.map((post) => (
          <motion.article
            layoutId={`card-${post._id}`}
            key={post._id}
            className="bg-white rounded-3xl  transition  cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            {post.imageUrl && (
              <motion.img
                layoutId={`image-${post._id}`}
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-40 lg:h-60 object-cover rounded-3xl mb-4"
              />
            )}
            <div className="p-5">
              <motion.h2
                layoutId={`title-${post._id}`}
                className="text-2xl font-semibold text-gray-900 mb-3"
              >
                {post.title}
              </motion.h2>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <p className="text-sm text-gray-600 flex items-center gap-3">
                  <ClockIcon size={20} strokeWidth={1} />
                  {formatDate(post.createdAt)}
                </p>
                <span className="flex items-center text-lg text-blue-600 hover:text-blue-800 font-medium">
                  Read Post
                  <ArrowUpRight size={25} strokeWidth={1} />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedPost._id}`}
              className="bg-white w-full max-w-[90%] max-h-[95%] overflow-y-auto rounded-3xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 text-white cursor-pointer"
              >
                <X size={24} />
              </button>

              {selectedPost.imageUrl && (
                <motion.img
                  layoutId={`image-${selectedPost._id}`}
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-60 lg:h-80 object-cover rounded-3xl"
                />
              )}
              <div className="p-10">
                <motion.h2
                  layoutId={`title-${selectedPost._id}`}
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  {selectedPost.title}
                </motion.h2>
                <p className="text-md text-gray-600 flex items-center gap-3 mb-6">
                  <ClockIcon size={20} strokeWidth={1} />
                  {formatDate(selectedPost.createdAt)}
                </p>
                <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
