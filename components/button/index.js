export default function Button({children, onClick, disabled}) {
	return (
		<>
			<button disabled={disabled} onClick={onClick}>{children}</button>
			<style jsx>{`
				button {
					display: flex;
					align-items: center;
					gap: 0 16px;
					cursor: pointer;
					background-color: #333;
					color: #fff;
					font-weight: bold;
					padding: .5em 1.5em;
					width: fit-content;
					/*margin: auto;*/
					/*margin-top: 24px;*/
					border-radius: 10px;
					border: none;
					transition: opacity .3s ease;
					user-select: none;
				}

				button[disabled] {
					opacity: .2;
					pointer-events: none;
				}

				button:hover {
					opacity: .7;
				}
			`}</style>
		</>
	);
}