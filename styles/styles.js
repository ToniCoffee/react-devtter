import css from 'styled-jsx/css';
import { colors } from './theme';

export const h1 = css`
	h1 {
		color: ${colors.terciary};
		padding: .5em 0;
		font-size: 1.75em;
	}
`;

export const h2 = css`
	h2 {
		color: ${colors.primary};
		font-size: 1.25em;
		margin-bottom: 1em;
	}
`;

export const a = css`
	color: inherit;
	text-decoration: none;
`;