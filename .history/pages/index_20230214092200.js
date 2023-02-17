import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';


export default function Home() {

    const apiKey = "JMK9dEHJzXFtiBa4yWaMia2RQ00L2yaZQZSrax17";
    const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

    const getTechTransferData = async () => {
      const res = await axios.get(url);
      const data = await res.data;
      console.log(data);
    }

    useEffect(() => {
      getTechTransferData();
    }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
