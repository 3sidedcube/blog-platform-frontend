"use client";
import PostCard from "@/components/PostCard";
import { useGetAllPosts, useSearchPosts } from "@/hooks/usePosts";
import { post } from "@/types/post";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data, loading, error } = useGetAllPosts();
  const { data: searchResults, loading: searchLoading } = useSearchPosts(submittedQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(search);
  };

  const posts = search
    ? searchResults?.searchPosts?.posts || []
    : data?.getAllPosts.posts || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl mb-10">
        <Image
          src="/banner.jpg" 
          alt="Blog Banner"
          width={1200}
          height={400}
          className="w-full h-64 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Micheal's Blog</h1>
          <p className="text-lg text-gray-200">
            Discover insightful articles, tutorials, and stories.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search posts by title or tags..."
            className="border text-black bg-white p-4 w-full rounded-full pl-12 shadow-md focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
        </form>
      </div>

      {/* Blog Posts Section */}
      <h2 className="text-3xl font-bold text-white-900 text-center mb-6">Latest Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          posts.map((post: post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}