import { useEffect, useState } from "react"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styles from '../styles/Home.module.css';




export default function Polychromatic() {

    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState("loading");
    const [date, setDate] = useState('');
    const [coords, setCoords] = useState({});

    const apiKey = 'JMK9dEHJzXFtiBa4yWaMia2RQ00L2yaZQZSrax17';
    const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;

    const getPolychromaticData = async () => {
        const res = await axios.get(url);
        const data = await res.data;
        console.log(data);

        const caption = data[0].caption;
        const date = data[0].date.split(" ")[0];

        const date_formatted = date.replaceAll("-","/")
        console.log(date_formatted);

        let times = [];
        let images = [];

        for(let i = 0; i < data.length; i++) {
            let time = data[i].date.split(" ")[1];
            let coords = data[i].centroid_coordinates;
            let imagePath = data[i].image;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`

            times.push(time);
            images.push({
                image: image,
                time: time,
                coords: coords
            })
        }

        setDate(date);
        setImages(images);
        setImage(images[0].image);
        setTime(time[0])
        setCoords([images[0].coords.lat, images[0].coords.lon])

        console.log(image)
    }

    useEffect(() => {
        getPolychromaticData();

    }, [])

    return (
        <><div className={styles.container}>
            <div className={styles.topBar} >
                            <img  src="nasa-logo.svg"/>
            </div>
        <div className={styles.main}>
           
            <h1 style={{fontSize:40}}>Polychromatic Earth</h1>
            <Image style={{margin:'4%'}} src={image} alt={image} width={200} height={200}/>
            <div>{time}</div>
            <div>{coords[0]}, {coords[1]}</div>
            
        

            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody style={{display:'flex', flexDirection:'column'}}>
                    {
                        images.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.time}</td>
                                    <td>{e.coords.lat}</td>
                                    <td>{e.coords.lon}</td>
                                    <td><Image src={e.image} alt={i} width={200} height={200}/></td>
                                    <td>
                                        <button onClick={() => {
                                            setImage(e.image);
                                            setTime(e.time);
                                            setCoords([e.coords.lat, e.coords.lon])
                                            console.log(images[i].image)
                                            document.body.scrollIntoView();
                                        }}>View</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div> 
        </div></>
    )
}