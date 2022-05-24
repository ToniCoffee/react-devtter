import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import AppLayout from '../components/app-layout/index'
import styles from '../styles/Home.module.css'
import { Button } from '../components/button'
import Github from '../components/icons/github'

import { loginWithGithub } from '../firebase/client'

export default function Home() {
	const handleLogin = () => {
		loginWithGithub()
			.then(result => console.log(result))
			.catch(err => console.log(err));
	}

  return (
    <>
      <Head>
        <title>Devtter 🐰</title>
        <meta name="description" content="Twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section className={styles.section}>
					<div></div>
					<div>
						<Image src={'/vercel.svg'} alt='logo' width={150} height={50} />
					</div>
					<h1>Devtter</h1>
					<h2>Talk about development  with developers 👧👦</h2>

					<Button onClick={handleLogin}>
						<Github fill='#fff' />
						Login with Github
					</Button>
					{/* <h1>
						<Link href="https://nextjs.org">Devtter</Link>
					</h1> */}
				</section>
      </AppLayout>
    </>
  )
}

/* return (
	<div className={styles.container}>
		<Head>
			<title>Devtter 🐰</title>
			<meta name="description" content="Twitter clone" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<AppLayout className={styles.main}>
			<h1 className={styles.title}>
				<Link href="https://nextjs.org">Devtter</Link>
			</h1>
		</AppLayout>
	</div>
) */
