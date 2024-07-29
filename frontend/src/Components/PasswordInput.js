import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PassWordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {props.label}{" "}
          {props.required && <label className="text-red-600">*</label>}
        </label>
        <div className="mt-1 relative">
          <input
            id={props.id}
            name={props.name}
            type={showPassword ? "text" : "password"}
            onChange={props.onChange}
            value={props.value}
            className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
              props.error ? "border-red-600" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm ${
              props.className
            }`}
            placeholder={props.placeholder}
          />
          <div
            className="absolute right-[5px] top-[25%] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
    </>
  );
}
