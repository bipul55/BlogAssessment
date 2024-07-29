import { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "Chocolate", label: "Chocolate" },
  { value: "Strawberry", label: "Strawberry" },
  { value: "Vanilla", label: "Vanilla" },
];
export default function CategoryDropDown(props) {
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
          <Select
            defaultValue={
              props.value
                ? JSON.parse(props.value).map((v) => {
                    return { value: v, label: v };
                  })
                : []
            }
            onChange={(value) => {
              if (props.onChange) {
                if (value.length >= 1) {
                  props.onChange(JSON.stringify(value.map((v) => v.value)));
                } else {
                  props.onChange("");
                }
              }
            }}
            value={
              props.value
                ? JSON.parse(props.value).map((v) => {
                    return { value: v, label: v };
                  })
                : []
            }
            options={options}
            isMulti={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: props.error ? "rgb(255,0,0)" : "rgb(209 213 219)",
              }),
            }}
          />
        </div>
      </div>
    </>
  );
}
