import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';



export default function Home() {

  const [data, setData] = useState();

    const apiKey = "JMK9dEHJzXFtiBa4yWaMia2RQ00L2yaZQZSrax17";
    const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`;

    const getTechTransferData = async () => {
      const res = await axios.get(url);
      const info = await res.data;
      console.log(info);
      setData(info);
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
        <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>

      </Head>

      <main style={{display:'flex', justifyContent:'center', marginLeft:'10%', marginRight:'30%', marginTop:'50%'}}>

        <Link href="/polychromatic">Polychromatic</Link>

    
        <Carousel >
      
        {
          data && data.results.map((tech, index) => {
            return (
              <div key={index}>
               
                  {
                    tech && tech.map((t, ind) => {
                      if (ind === 10) {
                        return (
                          
                             <Image src={t} width={100}
                              height={100} key={ind} alt={t}/>
                         
                             
                          
                        )
                      }
                    })
                  } 
                
              </div>
             
            )
          })
        }
        </Carousel>
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