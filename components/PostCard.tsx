import Link from "next/link";
import { post } from "../types/post";

export default function PostCard({ post }: { post: post }) {
  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/post/${post.id}`} className="text-blue-500 mt-4 block">
        Read More
      </Link>
    </div>
  );
}
