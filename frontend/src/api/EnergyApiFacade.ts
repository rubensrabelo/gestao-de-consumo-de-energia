import axios from "axios";

export function EnergyApiFacade() {
    function createMeter(type: string) {
        return axios.post("http://localhost:3333/meter", { type }).then(function(res) {
            return res.data;
        });
    }

    function registerReading(meterId: string, value: number) {
        return axios.post("http://localhost:3333/reading", { meterId, value }).then(function(res) {
            return res.data;
        });
    }

    function getDashboard(meterId: string) {
        return axios.get("http://localhost:3333/dashboard/meters/" + meterId).then(function(res) {
            return res.data;
        });
    }

    return {
        createMeter,
        registerReading,
        getDashboard
    };
}

export var apiFacade = EnergyApiFacade();
