import React from "react";

const Input = ({ labelName, type = "text", placeholder = "", ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium leading-none text-[#3E362E] mb-1">
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-200 mt-2 text-sm w-full h-10 rounded-md px-3 text-gray-900 border-2 border-[#93785B] focus:border-[#3e362e] outline-none"
        {...props}
      />
    </div>
  );
};

export default Input;
