import { useState } from "react";
import { getFullPokedexNumber, pokemonList } from "../utils";

export default function SideNav({
    selectedPokemon,
    setSelectedPokemon,
    showSideMenu,
    handleCloseMenu,
}) {
    const [searchValue, setSearchValue] = useState("");

    const filteredPokemon = pokemonList.filter((item, itemIndex) => {
        return (
            getFullPokedexNumber(itemIndex).includes(searchValue) ||
            item.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    return (
        <nav
            className={
                "flex-col items-start gap-2 sm:sticky sm:flex sm:w-fit" +
                (showSideMenu
                    ? " fixed left-0 flex h-[calc(100vh-100px)] w-full bg-white px-4 dark:bg-slate-800"
                    : " hidden")
            }
        >
            <div className="mb-2 w-full">
                <input
                    className="w-full border-b-2 bg-slate-100 p-2 outline-0 focus:border-blue-500 sm:w-auto dark:bg-slate-700"
                    placeholder="E.g. 001 or Bulba..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="w-full overflow-auto pr-2">
                {filteredPokemon.map((pokemon, pokemonIndex) => {
                    const truePokedexNumber = pokemonList.indexOf(pokemon);
                    return (
                        <button
                            onClick={() => {
                                setSelectedPokemon(truePokedexNumber);
                                handleCloseMenu();
                            }}
                            className={
                                "flex w-full gap-2 rounded p-2 leading-none duration-200 hover:bg-slate-100 dark:hover:bg-slate-700" +
                                (pokemonIndex === selectedPokemon
                                    ? " bg-slate-100 dark:bg-slate-700"
                                    : "")
                            }
                            key={pokemonIndex}
                        >
                            <span>
                                {getFullPokedexNumber(truePokedexNumber)}
                            </span>
                            <span>{pokemon}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
