import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="flex py-7">
            <div className="flex flex-auto">
                <h1 className="text-5xl font-medium">Pokédex</h1>
            </div>
            <div className="flex flex-auto items-center justify-end">
                <ThemeToggle />
            </div>
        </header>
    );
}
