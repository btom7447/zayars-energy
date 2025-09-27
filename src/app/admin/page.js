// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import PostsSection from "@/components/PostsSection";
import EditPostModal from "@/components/EditPostModal";
import CreatePostModal from "@/components/CreatePostModal";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [creating, setCreating] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="">
      <h2 className="text-xl lg:text-3xl text-black font-semibold slate">Blog Post</h2>
      <PostsSection
        posts={posts}
        fetchPosts={fetchPosts}
        onEdit={setEditingPost}
        onCreate={() => setCreating(true)}
        viewMode={viewMode}
        toggleView={() =>
          setViewMode(viewMode === "grid" ? "list" : "grid")
        }
      />

      {creating && (
        <CreatePostModal
          onClose={() => setCreating(false)}
          refreshPosts={fetchPosts}
        />
      )}

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          refreshPosts={fetchPosts}
        />
      )}
    </div>
  );
}
