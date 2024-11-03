import { useState } from "react";
import { getFullPokedexNumber, pokemonList } from "../utils";

export default function SideNav({}) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <nav className="flex max-h-[calc(100vh-80px)] w-fit flex-col items-start gap-2 pr-2">
            <div className="mb-2">
                <input
                    className="border-b-2 bg-transparent p-2 outline-0 focus:border-blue-500"
                    placeholder="E.g. 001 or Bulba..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="w-full overflow-auto pr-2">
                {pokemonList.map((pokemon, pokemonIndex) => {
                    return (
                        <button
                            className="flex w-full gap-2 rounded p-2 leading-none hover:bg-slate-100 dark:hover:bg-slate-700"
                            key={pokemonIndex}
                        >
                            <span>{getFullPokedexNumber(pokemonIndex)}</span>
                            <span>{pokemon}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
