import { pokemonTypeColors } from "../utils";

export default function TypeCard({ type }) {
    return (
        <div
            className="rounded px-2 py-1"
            style={{
                color: pokemonTypeColors?.[type].color,
                background: pokemonTypeColors?.[type].background,
            }}
        >
            <p className="font-bold capitalize">{type}</p>
        </div>
    );
}
