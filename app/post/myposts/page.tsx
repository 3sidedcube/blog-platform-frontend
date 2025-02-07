"use client";
import { useRouter } from "next/navigation";
import {
  useAssignTags,
  useDeletePost,
  useGetMyPosts,
  useUpdatePost
} from "@/hooks/usePosts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EditPostModal from "@/components/EditPostModal";
import { useGetTagsWithPostCount } from "@/hooks/useTags";
import Navbar from "@/components/Navbar";

export default function MyPostsPage() {
  const router = useRouter();
  const { data, loading, error } = useGetMyPosts();
  const { data: tagsData, loading: tagsLoading } = useGetTagsWithPostCount();
  const [deletePost] = useDeletePost();
  const [updatePost] = useUpdatePost();
  const [assignTags] = useAssignTags();

  const handleDelete = async (id: string) => {
    await deletePost({ variables: { id } });
    alert("Post deleted!");
    router.refresh();
  };

  const handleUpdate = async (updatedData: { title: string; content: string; id: string }) => {
    await updatePost({ variables: { request: updatedData } });
    alert("Post updated!");
    router.refresh();
  };

  const handleAssignTags = async (postId: string) => {
    const tags = prompt("Enter tags (comma separated):");
    if (tags) {
      await assignTags({
        variables: {
          data: { postId, tags: tags.split(",").map((t) => t.trim()) },
        },
      });
      alert("Tags assigned!");
      router.refresh();
    }
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const openEditModal = (post: any) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts.</p>;

  return (
    <><Navbar /><div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Posts Section */}
          <div className="lg:col-span-3">
              <h1 className="text-3xl font-bold mb-6">My Posts</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {data.getMyPosts.length === 0 ? (
                      <p>No posts found.</p>
                  ) : (
                      data.getMyPosts.posts.map((post: any) => (
                          <div key={post.id} className="border p-6 rounded-lg shadow-lg bg-white relative">
                              {/* Post Title */}
                              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                              <p className="text-gray-700 mt-2">{post.content.substring(0, 100)}...</p>

                              {/* Tags */}
                              <p className="text-sm text-gray-500 mt-2">
                                  <strong>Tags:</strong>{" "}
                                  {post.tags.length > 0 ? post.tags.map((tag: any) => tag.name).join(", ") : "No tags"}
                              </p>

                              {/* Action Menu */}
                              <Menu as="div" className="absolute top-3 right-3">
                                  <MenuButton className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                                      <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                                  </MenuButton>
                                  <MenuItems className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg p-1">
                                      <MenuItem as="div">
                                          <button
                                              type="button"
                                              className="block w-full text-black bg-white text-left px-4 py-2 text-sm"
                                              onClick={() => openEditModal(post)}
                                          >
                                              Edit Post
                                          </button>
                                      </MenuItem>
                                      <MenuItem as="div">
                                          <button
                                              type="button"
                                              className="block w-full text-black bg-white text-left px-4 py-2 text-sm"
                                              onClick={() => handleAssignTags(post.id)}
                                          >
                                              Assign Tags
                                          </button>
                                      </MenuItem>
                                      <MenuItem as="div">
                                          <button
                                              type="button"
                                              className="block w-full text-left px-4 py-2 text-sm text-red-600"
                                              onClick={() => handleDelete(post.id)}
                                          >
                                              Delete Post
                                          </button>
                                      </MenuItem>
                                  </MenuItems>
                              </Menu>
                          </div>
                      ))
                  )}
              </div>
          </div>

          {/* Sidebar - Tags with Post Count */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-black font-bold mb-4">Tags & Post Count</h2>
              {tagsLoading ? (
                  <p>Loading tags...</p>
              ) : (
                  <ul className="space-y-2">
                      {tagsData?.getTagsWithPostCount?.length > 0 ? (
                          tagsData.getTagsWithPostCount.map((tag: any, index: number) => (
                              <li key={index} className="flex justify-between text-gray-700 border-b pb-2">
                                  <span>#{tag.name}</span>
                                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                      {tag.postCount} Posts
                                  </span>
                              </li>
                          ))
                      ) : (
                          <p>No tags available.</p>
                      )}
                  </ul>
              )}
          </div>

          {/* Edit Post Modal */}
          {selectedPost && (
              <EditPostModal
                  isOpen={isEditModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  post={selectedPost}
                  onSave={handleUpdate} />
          )}
      </div></>
  );
}