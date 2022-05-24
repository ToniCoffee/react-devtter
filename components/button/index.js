export const Button = ({children, onClick}) => {
	return (
		<>
			<button onClick={onClick}>{children}</button>
			<style jsx>{`
				button {
					display: flex;
					align-items: center;
					gap: 0 16px;
					cursor: pointer;
					background-color: #333;
					color: #fff;
					font-weight: bold;
					padding: 1em 1.5em;
					width: fit-content;
					margin: auto;
					margin-top: 24px;
					border-radius: 10px;
					border: none;
					transition: opacity .3s ease;
				}

				button:hover {
					opacity: .7;
				}
			`}</style>
		</>
	)
};