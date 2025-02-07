"use client";
import { useGetPostById } from "@/hooks/usePosts";
import { tag } from "@/types/tag";
import { useParams, useRouter } from "next/navigation";

export default function PostDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, loading, error } = useGetPostById(id!);

  if (loading)
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading post...</p></div>;
  if (error)
    return <div className="flex justify-center items-center h-screen"><p className="text-lg text-red-500">Error loading post.</p></div>;
  if (!data || !data.getPostById)
    return <div className="flex justify-center items-center h-screen"><p className="text-lg text-gray-500">Post not found.</p></div>;

  const { title, content, tags } = data.getPostById;

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-5">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 hover:text-blue-700 flex items-center mb-6 transition"
        >
          ← Back to All Posts
        </button>

        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

        {/* Post Content */}
        <p className="text-lg text-gray-700 leading-relaxed">{content}</p>

        {/* Tags */}
        <div className="mt-6">
          <strong className="text-gray-600 text-lg">Tags:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.length > 0 ? (
              tags.map((tag: tag, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  #{tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}