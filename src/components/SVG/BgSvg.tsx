const BgSvg = () => {
  return (
    <>
      <svg
        className="svgClass
        "
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="100"
            height="3"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 100V.5M.5 .5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        ></rect>
      </svg>
    </>
  );
};

export default BgSvg;
