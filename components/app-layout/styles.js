import css from 'styled-jsx/css';

import { colors, fonts } from 'styles/theme';
import { addOpacityToColor } from 'styles/util';

const pointsBackgroundColor = addOpacityToColor(colors.primary, 1);

export const globalStyles = css.global`
*,
*::before,
*::after {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

html,
body {
	background-image: 
		radial-gradient(${pointsBackgroundColor}, 1px, transparent 1px),
		radial-gradient(${pointsBackgroundColor}, 1px, transparent 1px);
	background-position: 0 0, 25px 25px;
	background-size: 50px 50px;
	font-family: ${fonts.base};
	font-size: 1rem;
}

body {
	padding: 1em 0;
	overflow: hidden;
}

main {
	min-height: calc(100vh - 2em);
	max-height: calc(100vh - 2em);
	width: 100vw;
	margin: auto;
	border-radius: 7px;
	box-shadow: 0px 0px 10px #aaa;
	backdrop-filter: blur(4px);
	overflow-x: hidden;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}

textarea, input {
	font-family: ${fonts.base};
}

@media only screen and (min-width: 300px) {
	body {
		padding: 1em;
	}

	main {
		width: calc(300px - 2em);
	}
}
`;