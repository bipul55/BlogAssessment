export default function TextArea(props) {
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
        <div className="mt-1">
          <textarea
            id={props.id}
            name={props.name}
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            className={`appearance-none resize-none rounded-md relative block w-full px-3 py-2 border overflow-y-scroll textarea-with-custom-scrollbar ${
              props.error ? "border-red-600" : "border-gray-300"
            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
              props.className
            }`}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </>
  );
}
