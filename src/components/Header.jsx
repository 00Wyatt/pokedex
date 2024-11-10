import ThemeToggle from "./ThemeToggle";

export default function Header({ handleToggleMenu, showSideMenu }) {
    return (
        <header>
            <div className="mx-auto flex max-w-screen-2xl justify-between p-5 sm:py-7 md:px-10 xl:px-24">
                <div className="flex flex-auto items-center sm:hidden">
                    <button className="flex" onClick={handleToggleMenu}>
                        {showSideMenu ? (
                            <span class="material-symbols-outlined">
                                arrow_back
                            </span>
                        ) : (
                            <span class="material-symbols-outlined">menu</span>
                        )}
                    </button>
                </div>
                <div className="flex flex-auto justify-center sm:justify-start">
                    <h1 className="text-3xl font-medium sm:text-5xl">
                        Pokédex
                    </h1>
                </div>
                <div className="flex flex-auto items-center justify-end">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
