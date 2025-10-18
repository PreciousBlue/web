import './main.css';
import ParallaxCityscape from "./skyline.tsx";
import {useEffect, useState} from "react";

export function Main() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <ParallaxCityscape/>
            <div className="main">
                <div className="youtube">
                    <iframe
                        height={windowWidth * 9 / 32} width={windowWidth / 2}
                        src="https://www.youtube.com/embed/DG19mQ0SPIo?si=Rhqf3SHYCpb8Rhtz"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </div>
        </>
    );
}
