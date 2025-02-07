"use client";
import Navbar from "@/components/Navbar";
import { useCreatePost } from "@/hooks/usePosts";
import { useGetTags } from "@/hooks/useTags";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<{label:string;value:string}[]>([]);
  const [errorMessage, setErrorMesage] = useState("");
  const { data: tagsData, loading: tagsLoading } = useGetTags();
  const [createPost] = useCreatePost();
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMesage("");
    try {
      await createPost({
        variables: {
          request: {
            title,
            content,
            tags: selectedTags.map(tag=>tag.value),
          },
        },
      });
      alert("Post created!");
      router.push("/");
    } catch (error: any) {
      if (error.message.includes("No Token provided")) {
        setErrorMesage("Unauthorized");
      } else {
        setErrorMesage("Error creating post.Please try again.");
      }
    }
  };

  return (
    <><Navbar /><div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Create a New Post</h1>
          <h3>
              <p className="text-red-500">{errorMessage}</p>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="text"
                  placeholder="Title"
                  className="border text-black bg-white p-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              <textarea
                  placeholder="Content"
                  className="border text-black bg-white p-2 w-full"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />
              {/* Tags Multi-Select */}{" "}
              {tagsLoading ? (
                  <p>Loading tags...</p>
              ) : (
                  <Select
                      isMulti
                      options={tagsData.tags.map((tag: { name: string; id: string; }) => ({ value: tag.id, label: tag.name }))}
                      className="basic-multi-select text-black"
                      classNamePrefix="select"
                      onChange={(selectedOptions) => setSelectedTags(selectedOptions as any)} />
              )}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                  Submit
              </button>
          </form>
      </div></>
  );
}
