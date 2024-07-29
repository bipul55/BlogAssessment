import React, { useEffect, useState } from "react";
import loading from "../Images/loading.svg";

const FileUploadComponent = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setErrorMessage("");
      handleUpload(file);
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/apiV1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSelectedFile(data.file);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Error uploading file");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (props.onChange) {
      props.onChange(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (props.value) {
      setSelectedFile(props.value);
    }
  }, [props.value]);
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {props.label}{" "}
        {props.required && <span className="text-red-600">*</span>}
      </label>
      <label
        className={`appearance-none rounded-md relative block w-full px-3 py-2 border h-10 ${
          props.error || errorMessage ? "border-red-600" : "border-gray-300"
        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
          props.className
        }flex items-center justify-center cursor-pointer`}
      >
        <input
          id={props.id}
          name={props.name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {loading ? (
          <img src={loading} className="h-4" />
        ) : (
          <>
            {!errorMessage && selectedFile && (
              <p className="text-sm text-gray-900">{selectedFile}</p>
            )}
            {!selectedFile && (
              <p className="text-sm text-gray-500">
                Click Here To Upload Image
              </p>
            )}
          </>
        )}
      </label>
    </div>
  );
};

export default FileUploadComponent;
