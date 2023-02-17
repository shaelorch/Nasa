import { useEffect } from "react"


export default function Polychromatic() {

    useEffect(() => {
        getPolychromaticData();

    }, [])

    return (
        <>
        Polychromatic
        </>
    )
}