"use client";
import { useAssignTags } from "@/hooks/usePosts";
import { useGetTags } from "@/hooks/useTags";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Select from "react-select";

interface AssignTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  currentTags: string[];
}

export default function AssignTagsModal({ isOpen, onClose, postId, currentTags }: AssignTagsModalProps) {
 const router = useRouter();
  const { data: tagsData, loading: tagsLoading } = useGetTags();
  const [assignTags] = useAssignTags();
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (tagsData?.tags) {
      setSelectedTags(
        tagsData.tags
          .filter((tag: { name: string }) => currentTags.includes(tag.name))
          .map((tag: { name: string }) => ({ value: tag.name, label: tag.name }))
      );
    }
  }, [isOpen, tagsData, currentTags]);

  const handleSubmit = async () => {
    await assignTags({
      variables: {
        request: {
          postId,
          tags: selectedTags.map((tag) => tag.value),
        },
      },
    });

    alert("Tags updated!");
    onClose();
    router.refresh()
  };

  return (
    <Dialog open={isOpen} onClose={onClose} title="Assign Tags" className="fixed inset-0 flex items-center justify-center z-50"> 
      <div className="p-4 bg-white p-6 rounded-md shadow-lg z-50 w-96">
        {tagsLoading ? (
          <p>Loading tags...</p>
        ) : (
            
          <Select
            isMulti
            options={tagsData?.tags.map((tag: { name: string }) => ({ value: tag.name, label: tag.name }))}
            value={selectedTags}
            onChange={(selected) => setSelectedTags(selected as { value: string; label: string }[])}
            className="w-full text-black"
          />
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save Tags
        </button>
      </div>
    </Dialog>
  );
}