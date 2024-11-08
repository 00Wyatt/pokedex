import { useEffect, useState } from "react";
import TypeCard from "./TypeCard";
import {
    capitalise,
    fetchData,
    getFullPokedexNumber,
    getPokedexNumber,
} from "../utils";

export default function PokeCard({ selectedPokemon }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } =
        data || {};

    useEffect(() => {
        if (loading || !localStorage) return;

        let cache = {};

        if (localStorage.getItem("pokedex")) {
            cache = JSON.parse(localStorage.getItem("pokedex"));
        }

        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon]);
            console.log("Found pokemon in cache");
            console.log(data);
            return;
        }

        async function fetchPokemonData() {
            setLoading(true);
            const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
            const pokemonNumber = getPokedexNumber(selectedPokemon);
            const pokemonData = await fetchData(baseUrl + pokemonNumber);

            if (pokemonData) {
                setData(pokemonData);
                console.log("Fetched pokemon data");
                cache[selectedPokemon] = pokemonData;

                localStorage.setItem("pokedex", JSON.stringify(cache));
            }
            setLoading(false);
        }
        fetchPokemonData();
    }, [selectedPokemon]);

    if (loading || !data) {
        return (
            <div>
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-2xl">
                    #{getFullPokedexNumber(selectedPokemon)}
                </span>
                <h2 className="text-3xl font-medium capitalize">{name}</h2>
            </div>
            <div className="flex gap-1">
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    );
                })}
            </div>
            <div>
                <img
                    className="max-w-80"
                    src={sprites?.other?.["official-artwork"]?.front_default}
                    alt={`${name} artwork`}
                />
            </div>
            <div className="rounded-md bg-slate-200 p-4 dark:bg-slate-700">
                <h3 className="mb-2 text-2xl font-bold">Stats</h3>
                <div className="w-56">
                    {stats.map((statObj, statIndex) => {
                        const { stat, base_stat } = statObj;
                        return (
                            <p
                                key={statIndex}
                                className="flex justify-between text-lg font-medium"
                            >
                                <span className="mr-2 capitalize">
                                    {stat?.name.replaceAll("-", " ")}:
                                </span>
                                <span>{base_stat}</span>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
