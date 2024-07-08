"use client";

import { ChartTable } from "./types";
import { BACKEND_URL } from "./util";

export async function getChartTable({
    pairIndex,
    from,
    to,
    range,
    token,
    countBack
}: {
    pairIndex: number;
    from: number;
    to: number;
    range: number;
    token: string;
    countBack: number
}): Promise<ChartTable> {
    try {
        console.log("GET bars", token, from,to, range)
        const res = await fetch(
            `${BACKEND_URL}/chart/${pairIndex}/${from}/${to}/${range}/${token}/${countBack}`,
        ).then((data) => data.json());

        if (!res) {
            throw new Error();
        }
// console.log("tradingchart === getch data", res)
        return res as ChartTable;
    } catch (err) {
        return Promise.reject(new Error("Failed at fetching charts"));
    }
}
