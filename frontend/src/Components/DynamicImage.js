export default function DynamicImage({ image, className, style, ...rest }) {
  return (
    <img
      src={`http://localhost:3001/file/${image}`}
      className={className}
      style={style}
      {...rest}
    />
  );
}
