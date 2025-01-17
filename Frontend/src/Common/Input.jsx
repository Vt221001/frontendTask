import React from "react";

const Input = ({ labelName, type = "text", placeholder = "", ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium leading-none text-gray-700">
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-200 mt-2 text-sm w-full h-10 rounded-md px-3 text-gray-900 border-2 border-gray-300 focus:border-purple-500 outline-none"
        {...props}
      />
    </div>
  );
};

export default Input;
