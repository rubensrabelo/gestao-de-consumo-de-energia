import React, { type JSX } from "react";

import { ResidentialDashboard } from "../components/Dashboard/ResidentialDashboard";
import { SchoolDashboard } from "../components/Dashboard/SchoolDashboard";

export interface DashboardStrategy {
    render(): JSX.Element;
}

export function ResidentialDashboardStrategy(): DashboardStrategy {
    return {
        render: function() {
            return React.createElement(ResidentialDashboard);
        }
    };
}

export function SchoolDashboardStrategy(): DashboardStrategy {
    return {
        render: function() {
            return React.createElement(SchoolDashboard);
        }
    };
}
