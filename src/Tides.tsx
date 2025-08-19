import { Detail, List } from "@raycast/api"; 
import { useEffect, useState } from "react";

type TidePoint = [string, number];

type TidePointsList = TidePoint[];

type NOAAPredictionsResponse = {
  predictions: Array<{
    t: string;
    v: string;
  }>;
};

function findHighLowTides(tides: TidePointsList) {
  if (tides.length === 0) return null;

  let high = tides[0];
  let low = tides[0];

  for (const tide of tides) {
    const [, value] = tide;
    if (value > high[1]) high = tide;
    if (value < low[1]) low = tide;
  }

  return { high, low };
}

export default function Command() {
  const [tides, setTides] = useState<TidePointsList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8413320&product=predictions&datum=STND&time_zone=lst_ldt&units=english&application=raycast_tides&format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: unknown) => {
        const noaaData = data as NOAAPredictionsResponse;
        
        const tidePointsList: TidePointsList = noaaData.predictions.map((point) => {
          return [point.t, parseFloat(point.v)];
        });
 
        setTides(tidePointsList);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <Detail markdown={`# Error\n${error}`} />;
  }

  if (!tides) {
    return <Detail markdown="Loading tides..." />;
  }

  const highLow = findHighLowTides(tides);

  if (!highLow) {
    return <Detail markdown="No tide data available." />;
  }

  const { high, low } = highLow;

  const tideListMarkdown = tides
    .map(([time, value]) => `- ${time}: ${value} ft`)
    .join("\n");

  const highLowMarkdown = `
  **High tide:** ${high[0]}\n
  **Low tide:** ${low[0]}
  `;

  return (
    <Detail
      markdown={`${highLowMarkdown}`}
    />
  );
}
