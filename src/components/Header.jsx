import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="flex p-5">
            <div className="w-1/6 flex-auto"></div>
            <div className="flex w-2/3 flex-auto justify-center">
                <h1 className="text-4xl font-bold">Pokédex</h1>
            </div>
            <div className="flex w-1/6 flex-auto items-center justify-end">
                <ThemeToggle />
            </div>
        </header>
    );
}
