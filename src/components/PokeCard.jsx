import { useEffect, useState } from "react";
import TypeCard from "./TypeCard";
import { fetchData, getFullPokedexNumber, getPokedexNumber } from "../utils";

export default function PokeCard({ selectedPokemon }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { name, weight, height, abilities, stats, types, moves, sprites } =
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
            <div className="py-4">
                <p className="text-2xl font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-h flex flex-col gap-10 overflow-auto pr-6 lg:flex-row lg:pr-0">
            <div className="flex flex-col gap-6 lg:w-2/3">
                <div className="flex justify-center pb-4">
                    <img
                        className="max-w-80"
                        src={
                            sprites?.other?.["official-artwork"]?.front_default
                        }
                        alt={`${name} artwork`}
                    />
                </div>
                <div className="flex items-end justify-center gap-2">
                    <span className="text-2xl">
                        #{getFullPokedexNumber(selectedPokemon)}
                    </span>
                    <h2 className="mr-2 text-3xl font-medium capitalize">
                        {name}
                    </h2>
                    <div className="flex gap-1">
                        {types.map((typeObj, typeIndex) => {
                            return (
                                <TypeCard
                                    key={typeIndex}
                                    type={typeObj?.type?.name}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mb-2 flex flex-col items-center justify-center gap-x-8 gap-y-4 text-lg xl:flex-row">
                    <div className="flex gap-4">
                        <p>
                            <span className="font-medium">Weight: </span>
                            <span className="text-nowrap">
                                {(weight * 0.1).toFixed(1)} kgs
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">Height: </span>
                            <span className="text-nowrap">
                                {(height * 0.1).toFixed(1)} m
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium">Abilities:</p>
                        <div className="flex gap-2">
                            {abilities.map((item, itemIndex) => {
                                return (
                                    <span
                                        className="rounded bg-slate-100 px-2 capitalize dark:bg-slate-700"
                                        key={itemIndex}
                                    >
                                        {item.ability.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="mb-2 text-center text-2xl font-bold">
                        Stats
                    </h3>
                    <div className="grid grid-cols-2 justify-center gap-2">
                        {stats.map((statObj, statIndex) => {
                            const { stat, base_stat } = statObj;
                            return (
                                <p
                                    key={statIndex}
                                    className="rounded-md bg-slate-100 p-2 text-center text-lg dark:bg-slate-700"
                                >
                                    <span className="mr-1 font-medium capitalize">
                                        {stat?.name.replaceAll("-", " ")}:
                                    </span>
                                    <span>{base_stat}</span>
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:w-1/3">
                <h3 className="mb-3 text-2xl font-bold">Moves</h3>
                <div className="flex flex-wrap gap-2 overflow-auto pr-2">
                    {moves.map((moveObj, moveIndex) => {
                        return (
                            <button
                                className="rounded bg-slate-100 px-2 py-1 capitalize dark:bg-slate-700"
                                key={moveIndex}
                            >
                                {moveObj?.move?.name.replaceAll("-", " ")}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
