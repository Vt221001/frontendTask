import React, { useState } from "react";

const FormButton = ({ name, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    await onClick(e);
    setLoading(false);
  };

  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-[#3f2e1d] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#724d2a] transition duration-200 ease-in-out shadow-md"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Loading..." : name}
      </button>
    </div>
  );
};

export default FormButton;
