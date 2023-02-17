import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from "../styles/Home.module.css";




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
    <div className={styles.container} >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />


      </Head>

      <main className={styles.main}>

        <div style={{display:'flex', flexDirection:'column'}}>
           <h1 className={styles.poly}>NASA Earth</h1>
    <Link className={styles.poly} href="/polychromatic">Polychromatic</Link>
        </div>

       
        

    
        
     
      
        {
          data && data.results.map((tech, index) => {
            return (
              <div  key={index}>
        
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
       
    
       
      </main>

     
    </div>
  )
}
