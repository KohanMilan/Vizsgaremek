import "./Home.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Home({isLoggedIn}) {
    const navigate = useNavigate();
    useEffect(()=>{
        if (!isLoggedIn) {
            navigate("/Login")
        }
    },[]);
    return (

        <div className="home-container">

            <div className="content">

                <header>

                    <h1 className="title">Fotodokumentációs Térinformatikai Rendszer</h1>

                </header>

                <main>

                    <section className="summary">

                        <h2>Miért válasszon minket?</h2>

                        <p>A Fotodokumentációs Térinformatikai Rendszer lehetővé teszi a térképi adatok és fotó dokumentációk egyszerű kezelését és vizualizációját, hogy hatékonyan segítse Önt a döntéshozatalban és az elemzésekben.</p>

                        <p>Fedezze fel a legújabb funkciókat és bővítse tudását a rendszerünk által nyújtott lehetőségekről.</p>

                    </section>

                    <section className="animation">

                        <div className="div-container">

                            <div className="earth"></div>

                            <div className="camera-icon"></div>

                        </div>

                    </section>

                </main>

            </div>

        </div>

    );

}