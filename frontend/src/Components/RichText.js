import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
export default function RichText(props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 "
      >
        {props.label}{" "}
        {props.required && <span className="text-red-600">*</span>}
      </label>
      {/* overflow-y-scroll textarea-with-custom-scrollbar */}
      <div
        className={`${
          props.error && "border border-red-600"
        } overflow-y-hidden`}
      >
        <ReactQuill
          className="h-[310px]  block rounded-[6px]  pt-3 text-txt   text-black w-full  "
          modules={modules}
          label="Description"
          name="investemntMemoText"
          id="investemntMemoText"
          value={props.value ? props.value : ""}
          onChange={(value) => {
            if (props.onChange) {
              props.onChange(value);
            }
          }}
        />
      </div>
    </div>
  );
}
