import style from "./Arrow.module.css";

const Arrow = () => {
  return (
    <div className={style.container}>
      <svg
        width="89"
        height="50"
        viewBox="0 0 89 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999998 8.50003L44.5 48.5L88 8.5C88.2328 3.06437 86.7949 1.54407 81.5 1.5L44.5 36.5L7.5 1.50003C2.2051 1.5441 0.767212 3.0644 0.999998 8.50003Z"
          fill="black"
          stroke="black"
        />
      </svg>
    </div>
  );
};

export { Arrow };
