import { useState } from "react";
import Header from "./components/Header";
import PokeCard from "./components/PokeCard";
import SideNav from "./components/SideNav";

export default function App() {
    const [selectedPokemon, setSelectedPokemon] = useState(0);

    return (
        <>
            <Header />
            <main className="flex max-h-[calc(100vh-104px)] gap-6 lg:gap-16">
                <SideNav
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                />
                <PokeCard selectedPokemon={selectedPokemon} />
            </main>
        </>
    );
}
