import { useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";

export default function App() {
    const [selectedPokemon, setSelectedPokemon] = useState(0);

    return (
        <>
            <Header />
            <main className="flex gap-16">
                <SideNav
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                />
                <div className="flex justify-center">
                    <PokeCard selectedPokemon={selectedPokemon} />
                </div>
            </main>
        </>
    );
}
