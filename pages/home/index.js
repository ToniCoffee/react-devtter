import { useState, useEffect } from 'react';
import { Devit } from 'components/devit';
import { /* fetchLatestDevits, */ listenLatestDevits } from '_firebase/client';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import CreateIcon from 'components/icons/create';
import HomeIcon from 'components/icons/home';
import SearchIcon from 'components/icons/search';
import LikeIcon from 'components/icons/like';
import { colors } from 'styles/theme';
import Head from 'next/head';

export default function HomePage() {
	const [timeline, setTimeline] = useState([]);
	const user = useUser();

	useEffect(() => {
		/* fetch('http://localhost:3000/api/statuses/home_timeline')
			.then(res => {
				if(!res.ok) throw new Error('Error fetching data at HomePage.');
				return res;
			})
			.then(res => res.json())
			.then(res => setTimeline(res.data))
			.catch(err => console.log(err)); */

		/* user && fetchLatestDevits()
			.then(response => {
				// console.log(response);
				setTimeline(response);
			})
			.catch(err => console.log(err)); */

		let unsubscribe = null;

		if(user) {
			unsubscribe = listenLatestDevits(setTimeline);
		}

		return () => unsubscribe && unsubscribe();
	}, [user]);

	return (
		<>
			<Head>
				<title>Inicio / Devtter</title>
			</Head>
			<header>
				<h2>Inicio</h2>
			</header>

			<section>
				{/* <div></div> */}
				{
					timeline.map(data => (
						<Devit
							key={data.id}
							id={data.id}
							avatar={data.avatar}
							username={data.username}
							img={data.img}
							name={data.username}
							message={data.message}
							createdAt={data.createdAt}
						/>
					))
				}
			</section>

			<nav>
				<Link href='/home'>
					<a><HomeIcon width={32} height={32} /></a>
				</Link>
				<Link href='/devit/tweet'>
					<a><SearchIcon width={32} height={32} /></a>
				</Link>
				<Link href='/devit/tweet'>
					<a><LikeIcon width={32} height={32} /></a>
				</Link>
				<Link href='/devit/tweet'>
					<a><CreateIcon width={32} height={32} /></a>
				</Link>
			</nav>

			<style jsx>{`
				header {
					display: flex;
					align-items: center;
					border-bottom: 1px solid #ccc;
					background-color: #fff7;
					backdrop-filter: blur(16px);
					width: 100%;
					min-height: 49px;
					padding: 0 1em;
					position: sticky;
					top: 0;
					z-index: 10;
				}

				h2 {
					font-size: 21px;
					font-weight: 500;
				}

				section {
					/*height: 100%;*/
					position: relative;
					backdrop-filter: blur(2px);
					flex-grow: 1;
				}

				section > div:first-child {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: #ccc7;
					backdrop-filter: blur(4px);
					/*z-index: -1;*/
				}

				nav {
					/*background-color: #004cff;*/
					background-color: #fff;
					border-top: 1px solid #ccc;
					width: 100%;
					min-height: 49px;
					position: sticky;
					bottom: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				nav a {
					flex-grow: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				nav a:hover {
					background: radial-gradient(#0099ff22 15%, transparent 16%);
					background-size: 180px 180px;
					background-position: center;
				}

				nav a:hover > :global(svg) {
					stroke: ${colors.red};
					fill: ${colors.red};
				}
			`}</style>
		</>
	);
}