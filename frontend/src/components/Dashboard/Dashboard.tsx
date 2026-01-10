import { ResidentialDashboard } from "./ResidentialDashboard";
import { SchoolDashboard } from "./SchoolDashboard";

interface DashboardProps {
    type: "RESIDENTIAL" | "SCHOOL";
}

export function Dashboard(props: DashboardProps) {
    switch (props.type) {
        case "RESIDENTIAL":
            return <ResidentialDashboard />;
        case "SCHOOL":
            return <SchoolDashboard />;
        default:
            return <ResidentialDashboard />;
    }
}
