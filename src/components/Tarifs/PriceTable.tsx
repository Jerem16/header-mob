// src/components/PriceTable.tsx
import React from "react";
import { PriceData } from "@src/home/service/Component/servicesTypes";

type Props = { prices: PriceData[] };

const PriceTable: React.FC<Props> = ({ prices }) => (
    <table className="price-tbl">
        <thead>
            <tr>
                <th>Nb de Séances</th>
                <th>Prix Total (€)</th>
                <th>Prix Séance (€)</th>
            </tr>
        </thead>
        <tbody>
            {prices.map((p, idx) => (
                <tr key={idx + "price-tbl"}>
                    <td className="nb-sessions">{p.sessions}</td>
                    <td className="text-center">{p.total.toFixed(2)}€</td>
                    <td className="text-center">{p.perSession.toFixed(2)}€</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default PriceTable;
