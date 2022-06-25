import './BackToTopButton.scss'
import { useEffect, useState } from "react"

const BackToTopButton = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        })
    }, [])

    const handleToTop = () => {
        console.log('test')
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <>
            {showButton ? (<button className="backToTop" onClick={handleToTop}><i className="bi bi-arrow-up"></i></button>) : null}
        </>
    )
}

export default BackToTopButton