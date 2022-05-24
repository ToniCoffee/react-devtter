// import '../../styles/global.css'
import { colors, fonts } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/util'

const pointsBackgroundColor = addOpacityToColor(colors.primary, 1);

export default function AppLayout({ children }) {
	return (
		<>
			<main>{children}</main>
			<style jsx global>{`
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
				
				h1 {
					color: ${colors.secondary};
					padding: .5em 0;
					font-size: 1.75em;
				}

				h2 {
					color: ${colors.primary};
					font-size: 1.25em;
				}
				
				a {
					color: inherit;
					text-decoration: none;
				}
			`}</style>
		</>
	)
}

// font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
// 						Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;