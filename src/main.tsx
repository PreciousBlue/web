import './main.css';
import comingSoon from './assets/coming-soon.png';
import ParallaxCityscape from "./skyline.tsx";

export function Main() {
    return (
        <>
            <ParallaxCityscape/>
            <div className="main">
                <div>
                    <img src={comingSoon} alt="Coming Soon..."/>
                </div>
            </div>
        </>
    );
}
