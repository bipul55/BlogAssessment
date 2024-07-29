import loading from "../Images/loading.svg";

export default function Button(props) {
  return (
    <button
      type="button"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => {
        if (!props.loading && props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.loading ? <img src={loading} className="h-5" /> : props.title}
    </button>
  );
}
