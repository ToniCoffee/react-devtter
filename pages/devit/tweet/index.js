import { useState, useEffect } from 'react';

import Avatar from 'components/avatar';
import Button from 'components/button';
import useUser from 'hooks/useUser';

import { addDevit, uploadImage, getImgURL } from '_firebase/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

const STATES = {
	USER_NOT_KNOWN: 0,
	LOADING: 1,
	SUCCESS: 2,
	ERROR: -1
};

const DRAG_IMAGE_STATES = {
	ERROR: -1,
	NONE: 0,
	DRAG_OVER: 1,
	UPLOADING: 2,
	COMPLETE: 3
};

export default function DevitForm() {
	const [message, setMessage] = useState('');
	const [state, setState] = useState(STATES.USER_NOT_KNOWN);

	const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
	const [task, setTask] = useState(null);
	const [imgURL, setImgURL] = useState(null);
	
	const router = useRouter();
	const user = useUser();

	useEffect(() => {
		if(task) {
			const onStateChange = () => {};
			const onError = (err) => {
				console.log(err);
			};
			const onComplete = () => {
				getImgURL(task).then(setImgURL);
			};

			task.on('state_changed', onStateChange, onError, onComplete);
		}
	}, [task]);

	const handleSubmit = e => {
		e.preventDefault();
		setState(STATES.LOADING);
		const devit = { message, uid: user.uid, avatar: user.avatar, email: user.email, username: user.username, img: imgURL };
		const portal = document.getElementById('portal-root');
		addDevit(devit)
			.then(() => {
				portal.style.display = 'block';
				portal.innerText = 'Devit added succesfully!';
				portal.onanimationend = () => {
					portal.style.display = 'none';
					router.push('/home');
				};
			})
			.catch(err => {
				console.log(err);
				portal.innerText = 'An error occurred when trying add devit.';
				portal.style.display = 'block';
				portal.onanimationend = () => portal.style.display = 'none';
			});
	};

	const handleDragEnter = e => {
		e.preventDefault();
		setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
	};

	const handleDragLeave = e => {
		e.preventDefault();
		setDrag(DRAG_IMAGE_STATES.NONE);
	};

	const handleDrop = e => {
		e.preventDefault();
		setDrag(DRAG_IMAGE_STATES.NONE);
		setTask(uploadImage(e.dataTransfer.files[0]));
	};

	const isButtonDisabled = message.length === 0 || state === STATES.LOADING;

	return (
		<>
			<Head>
				<title>Crear un devit / Devtter</title>
			</Head>
			<form onSubmit={handleSubmit}>
				<div>
					{user && <Avatar src={user.avatar} alt={user.username} />}
					<textarea 
						placeholder="Que está pasando?"
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop} 
						onChange={e => setMessage(e.target.value)} 
						value={message} >
					</textarea>
				</div>
				{imgURL && (
					<section>
						<button onClick={() => setImgURL(null)}>x</button>
						<img src={imgURL} alt='image url' />
					</section>
				)}
				<Button disabled={isButtonDisabled}>Send</Button>
			</form>
			<style jsx>{`
					form {
						padding: 1em;
						height: calc(100vh - 2em);
						backdrop-filter: blur(2px);
					}

					form div {
						display: flex;
						align-items: flex-start;
						gap: 8px;
						border: 1px solid #ccc;
						border-radius: 7px;
						margin-bottom: 10px;
						padding: .5em;
					}

					textarea {
						outline: none;
						border-radius: 10px;
						border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? '3px dashed #09f' : '3px solid transparent'};
						resize: none;
						width: 100%;
						height: 200px;
						margin-bottom: 1em;
					}

					section {
						position: relative;
					}

					button {
						position: absolute;
						top: 15px;
						right: 15px;
						background-color: #0003;
						border-radius: 9999px;
						border: none;
						color: #fff;
						width: 32px;
						height: 32px;
						font-size: 24px;
					}

					img {
						border-radius: 10px;
						height: auto;
						width: 100%;
					}
				`}</style>
		</>
	);
}