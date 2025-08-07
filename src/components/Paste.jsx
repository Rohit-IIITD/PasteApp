import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    // For example, you can dispatch an action to remove the paste from the store
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="min-w-[1000px] border-2 border-gray-300 rounded-md p-1 mt-16"
        type="search"
        placeholder="Search Pastes Here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-2.5 border-2 border-gray-300 w-[1000px] mx-auto rounded-md p-4">
        <h1 className="font-bold text-left text-4xl  border-b-2 border-gray-300 pb-2 pl-4">
          All Pastes
        </h1>
        <div className="flex flex-col gap-4 mt-4 w-[1000px] mx-auto rounded-md p-2 ">
          {filteredData.length === 0 ? (
            <p className="font-bold text-2xl text-center">Pastes Empty</p>
          ) : (
            filteredData.map((paste) => {
              return (
                <div
                  className="border-2 border-gray-300 w-[950px] h-[110px]"
                  key={paste?._id}
                >
                  <div className="text-2xl font-bold text-left p-3">
                    {paste.title}
                  </div>
                  {/* <div>{paste.content}</div> */}
                  <div className="flex flex-row place-content-end gap-x-4 w-[950px] -mt-8 pr-4">
                    <button className="border-2 border-gray-300 rounded-md p-1.5">
                      <a href={`/?pasteId=${paste?._id}`}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </a>
                    </button>
                    <button className="border-2 border-gray-300 rounded-md p-1.5">
                      <a href={`/pastes/${paste?._id}`}>
                        <i class="fa-solid fa-eye"></i>
                      </a>
                    </button>
                    <button
                      className="hover:cursor-pointer border-2 border-gray-300 rounded-md p-1.5"
                      onClick={() => handleDelete(paste?.id)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      className="hover:cursor-pointer border-2 border-gray-300 rounded-md p-1.5"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <i class="fa-regular fa-copy"></i>
                    </button>

                    <button className="border-2 border-gray-300 rounded-md p-1.5">
                      <i class="fa-solid fa-share-nodes"></i>
                    </button>
                  </div>
                  <div className="text-right p-2 flex items-center justify-end gap-x-4">
                    <i class="fa-regular fa-calendar"></i>
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
