import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const existPaste = allPastes.find((p) => p._id === pasteId);
      setTitle(existPaste.title);
      setValue(existPaste.content);
    }
  }, [pasteId]);

  const dispatch = useDispatch();
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    //after creating or updating, reset the form
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row place-content-center gap-10 mt-6">
        <input
          className="min-w-[800px] border-2 border-gray-300 rounded-md p-1 "
          text="text"
          placeholder="Enter Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="text-white text-xl font-semibold bg-blue-500 hover:bg-blue-600 pl-2 pr-2 rounded-md hover:cursor-pointer"
        >
          {pasteId ? "Update My Paste" : "Create Paste"}
        </button>
      </div>
      <div
        className="max-w-[100px] border-x-2 border-t-2 mx-auto border-gray-300 rounded-md mt-6 cursor-pointer"
        onClick={() => { 
          if(value){
            navigator.clipboard
            .writeText(value)
            .then(() => toast.success("Content copied to clipboard!"))
            .catch((err) => console.error("Copy failed: ", err));
          }
          else{
            toast.error("Nothing to copy!");
          }
        }}
      >
        <i className="fa-regular fa-copy text-xl p-2"></i>
      </div>

      <div>
        <textarea
          className="min-w-[1000px] h-130 border-2 border-gray-300 rounded-md p-2"
          value={value}
          placeholder="Write your content here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
