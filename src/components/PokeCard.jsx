import { useEffect, useState } from "react";
import TypeCard from "./TypeCard";
import Modal from "./Modal";
import { fetchData, getFullPokedexNumber, getPokedexNumber } from "../utils";

export default function PokeCard({ selectedPokemon }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const { name, weight, height, abilities, stats, types, moves, sprites } =
        data || {};

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) {
            return;
        }

        let cache = {};

        if (localStorage.getItem("pokemon-moves")) {
            cache = JSON.parse(localStorage.getItem("pokemon-moves"));
        }

        if (move in cache) {
            setSkill(cache[move]);
            console.log("Found move in cache");
            return;
        }

        setLoadingSkill(true);
        const moveData = await fetchData(moveUrl);
        console.log("Fetched move from API");

        const description = moveData?.flavor_text_entries.filter((val) => {
            return (
                val.language.name === "en" && val.version_group.name === "x-y"
            );
        })[0]?.flavor_text;

        const skillData = {
            name: move,
            description,
        };

        setSkill(skillData);
        cache[move] = skillData;
        localStorage.setItem("pokemon-moves", JSON.stringify(cache));

        setLoadingSkill(false);
    }

    useEffect(() => {
        if (loading || !localStorage) return;

        let cache = {};

        if (localStorage.getItem("pokedex")) {
            cache = JSON.parse(localStorage.getItem("pokedex"));
        }

        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon]);
            console.log("Found pokemon in cache");
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
        <div className="max-h mb-4 flex flex-col gap-10 overflow-auto sm:mb-0 sm:pr-6 lg:flex-row lg:pr-0">
            {skill && (
                <Modal
                    handleCloseModal={() => {
                        setSkill(null);
                    }}
                >
                    <div className="flex flex-col justify-center text-center text-lg">
                        <div className="text-end">
                            <button
                                onClick={() => {
                                    setSkill(null);
                                }}
                            >
                                <span className="material-symbols-outlined duration-200 hover:text-slate-400">
                                    close
                                </span>
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="mb-1">Name:</p>
                            <p className="font-medium capitalize sm:text-xl">
                                {skill.name.replaceAll("-", " ")}
                            </p>
                        </div>
                        <div className="">
                            <p className="mb-1">Description:</p>
                            <p className="font-medium sm:text-xl">
                                {skill.description}
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="flex flex-col gap-6 lg:w-2/3">
                <div className="flex justify-center sm:pb-4">
                    <img
                        className="max-w-64 sm:max-w-80"
                        src={
                            sprites?.other?.["official-artwork"]?.front_default
                        }
                        alt={`${name} artwork`}
                    />
                </div>
                <div className="flex flex-wrap items-end justify-center gap-x-2 gap-y-4 sm:gap-2">
                    <span className="text-2xl">
                        #{getFullPokedexNumber(selectedPokemon)}
                    </span>
                    <h2 className="text-3xl font-medium capitalize sm:mr-2">
                        {name}
                    </h2>
                    <div className="flex w-full justify-center gap-1 sm:w-fit">
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
                    <div className="grid justify-center gap-2 sm:grid-cols-2">
                        {stats.map((statObj, statIndex) => {
                            const { stat, base_stat } = statObj;
                            return (
                                <p
                                    key={statIndex}
                                    className="rounded-md bg-slate-100 px-10 py-2 text-center text-lg sm:p-2 dark:bg-slate-700"
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
                <h3 className="mb-3 text-center text-2xl font-bold sm:text-start">
                    Moves
                </h3>
                <div className="flex flex-wrap justify-center gap-2 overflow-auto sm:justify-start lg:pr-2">
                    {moves.map((moveObj, moveIndex) => {
                        return (
                            <button
                                className="rounded bg-slate-100 px-2 py-1 capitalize duration-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                                key={moveIndex}
                                onClick={() => {
                                    fetchMoveData(
                                        moveObj?.move?.name,
                                        moveObj?.move?.url,
                                    );
                                }}
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
