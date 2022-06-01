const HomeIcon = (props) => (
  <svg 
    width={props.width ? props.width : 21}
    height={props.height ? props.height : 21}
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill={props.fill ? props.fill : 'none'}
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m1.5 10.5 9-9 9 9" />
      <path d="M3.5 8.5v8a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-8" />
    </g>
  </svg>
);

export default HomeIcon;
