import { useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";

export default function App() {
    const [selectedPokemon, setSelectedPokemon] = useState(0);
    const [showSideMenu, setShowSideMenu] = useState(false);

    function handleToggleMenu() {
        setShowSideMenu(!showSideMenu);
    }

    function handleCloseMenu() {
        setShowSideMenu(false);
    }

    return (
        <>
            <Header
                handleToggleMenu={handleToggleMenu}
                showSideMenu={showSideMenu}
            />
            <main
                className={
                    "mx-auto flex max-w-screen-2xl gap-6 px-5 sm:max-h-[calc(100vh-128px)] md:px-10 lg:gap-16 xl:px-24" +
                    (showSideMenu ? " max-h-[calc(100vh-100px)]" : "")
                }
            >
                <SideNav
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                    showSideMenu={showSideMenu}
                    handleCloseMenu={handleCloseMenu}
                />
                <PokeCard selectedPokemon={selectedPokemon} />
            </main>

            <Footer />
        </>
    );
}
