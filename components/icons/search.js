const SearchIcon = (props) => (
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
      <circle cx={8.5} cy={8.5} r={5} />
      <path d="M17.571 17.5 12 12" />
    </g>
  </svg>
);

export default SearchIcon;
