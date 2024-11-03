import Header from "./components/Header";
import SideNav from "./components/SideNav";

export default function App() {
    return (
        <>
            <Header />
            <main>
                <SideNav />
                <div className="w-full"></div>
            </main>
        </>
    );
}
