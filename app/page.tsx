"use client";
import PostCard from "@/components/PostCard";
import { useGetAllPosts } from "@/hooks/usePosts";
import {post} from "@/types/post"
export default function Home() {
    const { data, loading, error } = useGetAllPosts();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.getAllPosts.posts.map((post: post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
}
