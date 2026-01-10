import { Dashboard } from "../components/Dashboard/Dashboard";

export function Home() {
    return (
        <div>
            <h1>Home - Residential Dashboard</h1>
            <Dashboard type="RESIDENTIAL" />
        </div>
    );
}
