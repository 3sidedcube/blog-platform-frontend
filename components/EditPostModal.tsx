"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { post } from '../types/post';
interface EditPostModal{
    isOpen : boolean;
    onClose: ()=> void;
    post : post;
    onSave(updatedData: {title:string; content:string, id:string}):void
}
export default function EditPostModal({ isOpen, onClose, post:post, onSave }:EditPostModal) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const[id, setId]= useState(post.id)
  const handleSubmit = () => {
    onSave({title, content,id});
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 fixed inset-0" />
      <div className="bg-white p-6 rounded-md shadow-lg z-50 w-96">
        <Dialog.Title className="text-lg font-bold">Edit Post</Dialog.Title>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border text-black bg-white p-2 w-full mt-3"
          placeholder="Post Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border text-black bg-white p-2 w-full mt-3"
          placeholder="Post Content"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </Dialog>
  );
}