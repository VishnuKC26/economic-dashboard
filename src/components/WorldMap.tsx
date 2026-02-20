import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import type { EconomicData, Metric, Country } from '../data/economics';
import { getCountryColor } from '../data/economics';

// Simplified GeoJSON URL for world map
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
    data: EconomicData[];
    selectedMetric: Metric;
}

export const WorldMap: React.FC<WorldMapProps> = ({ data, selectedMetric }) => {
    // Filter for 2025 data
    const yearData = useMemo(() => data.filter(d => d.year === 2025), [data]);

    // Mapping of Country Name to EconomicData (roughly)
    // Note: internal map names might differ, simplified for prototype
    const countryMap: Record<string, string> = {
        'United States of America': 'USA',
        'China': 'China',
        'India': 'India',
        'Japan': 'Japan',
        'Germany': 'Germany'
    };

    const colorScale = useMemo(() => {
        const values = yearData.map(d => {
            switch (selectedMetric) {
                case 'GDP': return d.gdp;
                case 'Inflation': return d.inflation;
                case 'Fiscal Deficit': return d.fiscalDeficit;
                case 'Unemployment': return d.unemployment;
                case 'Growth Rate': return d.growthRate;
                default: return 0;
            }
        });

        const numericValues = values.filter((v): v is number => typeof v === 'number');
        const min = numericValues.length > 0 ? Math.min(...numericValues) : 0;
        const max = numericValues.length > 0 ? Math.max(...numericValues) : 100;

        // Dynamic color scale based on metric
        let range: [string, string] = ["#ffedea", "#ff5233"];
        if (selectedMetric === 'GDP' || selectedMetric === 'Growth Rate') range = ["#e0e7ff", "#3730a3"]; // Indigo
        if (selectedMetric === 'Inflation') range = ["#fff7ed", "#c2410c"]; // Orange

        return scaleLinear().domain([min, max]).range(range as any) as any;
    }, [yearData, selectedMetric]);

    return (
        <div className="w-full h-[400px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
            <ComposableMap projectionConfig={{ scale: 147 }} width={800} height={400}>
                <ZoomableGroup center={[0, 20]}>
                    <Geographies geography={GEO_URL}>
                        {({ geographies }: { geographies: any[] }) =>
                            geographies.map((geo: any) => {
                                const countryName = geo.properties.name as string;
                                const mappedName = countryMap[countryName];
                                const countryData = mappedName ? yearData.find(d => d.country === mappedName) : undefined;

                                let value = 0;
                                if (countryData) {
                                    switch (selectedMetric) {
                                        case 'GDP': value = countryData.gdp; break;
                                        case 'Inflation': value = countryData.inflation; break;
                                        case 'Fiscal Deficit': value = countryData.fiscalDeficit; break;
                                        case 'Unemployment': value = countryData.unemployment; break;
                                        case 'Growth Rate': value = countryData.growthRate; break;
                                    }
                                }

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={countryData ? colorScale(value) : "#F5F4F6"}
                                        stroke="#D6D6DA"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: countryData ? getCountryColor(mappedName as Country) : "#F5F4F6", outline: "none", cursor: countryData ? "pointer" : "default" },
                                            pressed: { outline: "none" },
                                        }}
                                        data-tooltip-id="map-tooltip"
                                        data-tooltip-content={countryData ? `${mappedName}: ${value} (${selectedMetric})` : ""}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <Tooltip id="map-tooltip" />
        </div>
    );
};
