import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div>
      <div>
        <input
          className="min-w-[1000px] border-2 border-gray-300 rounded-md p-1 mt-16 bg-gray-200"
          text="text"
          placeholder="Search Title here..."
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div
        className="max-w-[100px] border-x-2 border-t-2 mx-auto border-gray-300 rounded-md mt-6 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(paste.content);
          toast.success("copied to clipboard");
        }}
      >
        <i className="fa-regular fa-copy text-xl p-2"></i>
      </div>

      <div>
        <textarea
          className="min-w-[1000px] h-130 border-2 border-gray-300 rounded-md p-2 bg-gray-200"
          value={paste.content}
          disabled
          placeholder="Write your content here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
