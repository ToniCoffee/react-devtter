export default function Portal({text = 'Default text'}) {
  return (
    <>
      <div id='portal-root'>{text}</div>
      <style jsx>{`
				div {
					padding: .5em 1em;
					border-radius: 9999px;
					background-color: #fff;
					box-shadow: 0px 0px 10px #aaa;
					font-weight: bold;
					position: absolute;
					bottom: 32px;
					right: -200px;
					display: none;
					z-index: 10;
					animation-duration: 5s;
  				animation-name: portal;
				}

				@keyframes portal {
					25% {
						right: 32px;
					}

					75% {
						right: 32px;
					}

					100% {
						right: -200px;
						display: none;
					}
				}
			`}</style>
    </>
  );
}