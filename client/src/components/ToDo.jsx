import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
<div className="flex items-center text-xl p-2 justify-between border-b bg-white rounded-lg border-gray-300 py-2 w-full">
  {text}
  <div className="flex items-center space-x-2">
    <div className="flex-grow"></div>
    <button className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 rounded" onClick={updateToDo}>
      Update
    </button>
    <button className="bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-1 px-2 rounded" onClick={deleteTodo}>
      Delete
    </button>
  </div>
</div>



  );
};

export default ToDo;