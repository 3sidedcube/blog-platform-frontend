"use client";
import Link from "next/link";
import { post } from "../types/post";

export default function PostCard({ post }: { post: post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6">
      {/* Post Title */}
      <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>

      {/* Post Content */}
      <p className="text-gray-600 mt-2">
        {post.content.length > 100
          ? post.content.substring(0, 100) + "..."
          : post.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {post?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* Read More Link */}
      <Link
        href={`/post/${post.id}`}
        className="mt-4 inline-block text-blue-600 font-medium hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}
