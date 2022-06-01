import Head from 'next/head';
import { useRouter } from 'next/router';
import { /* useState, */ useEffect } from 'react';

import Button from 'components/button';
import Avatar from 'components/avatar';
import Github from 'components/icons/github';
import Logo from 'components/icons/logo';

import useUser from 'hooks/useUser';

import { loginWithGithub } from '_firebase/client';

import styles from 'styles/home.module.css';
import { colors } from 'styles/theme';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleLogin = () => {
    loginWithGithub()
      // .then(setUser)
      .catch(console.log);
  };

  return (
    <>
      <Head>
        <title>Devtter 🐰</title>
        <meta name="description" content="Twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.section}>
        <div></div>
        <div>
          <Logo width={200} height={50} fill={colors.terciary} />
        </div>
        <h1>Devtter</h1>
        <h2>Talk about development  with developers 👧👦</h2>

        <div>
          { user === null && 
              <Button onClick={handleLogin}>
                <Github fill='#fff' />
                Login with Github
              </Button>
          }
          { user && user.avatar && 
              <Avatar 
                src={user.avatar} 
                alt={user.username} 
                text={user.username}
              />
          }
        </div>
      </section>

      <style jsx>{`
        h1 {
          color: ${colors.terciary};
          font-size: 1.75em;
        }

        h2 {
          color: ${colors.primary};
          font-size: 1.25em;
        }
      `}</style>
    </>
  );
}
