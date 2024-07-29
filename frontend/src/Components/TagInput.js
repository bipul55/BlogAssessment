import React, { useEffect, useState } from "react";

export default function TagInput(props) {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      props.onChange([...props.value, input.trim()]);
      setInput("");
    }
    if (e.key == " ") {
      e.preventDefault(); // Prevent space from being entered
      return;
    }
  };

  const handleRemoveTag = (index) => {
    props.onChange(props.value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}{" "}
        {props.required && <label className="text-red-600">*</label>}
      </label>
      <div className="mt-1">
        <div className="w-full">
          <div
            className={` flex flex-wrap items-center appearance-none rounded-md relative block w-full px-3 py-2 border ${
              props.error ? "border-red-600" : "border-gray-300"
            }  text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
              props.className
            }`}
          >
            {props.value.map((tag, index) => (
              <div
                key={index}
                className="flex items-center text-center text-xs bg-gray-200 text-gray-900 rounded p-1  mr-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow p-1 m-1 border-none focus:outline-none h-4 placeholder-gray-500"
              placeholder="Enter a tag and press Enter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
