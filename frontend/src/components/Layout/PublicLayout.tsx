import { Outlet, Link } from "react-router-dom";

export function PublicLayout() {
    return (
        <div>
            <header>
                <h1>Energy Dashboard</h1>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/school">School</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
