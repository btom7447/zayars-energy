"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import PostsSection from "@/components/PostsSection";
import EditPostModal from "@/components/EditPostModal";
import CreatePostModal from "@/components/CreatePostModal";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [creating, setCreating] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Fetch posts
  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-white text-black overflow-auto">
      <AdminHeader />
      <div className="p-6">
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
      </div>

      {/* Create Modal */}
      {creating && (
        <CreatePostModal
          onClose={() => setCreating(false)}
          refreshPosts={fetchPosts}
        />
      )}

      {/* Edit Modal */}
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
