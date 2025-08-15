// import { Detail } from "@raycast/api";

// export default function Command() {
//   return <Detail markdown="# Hello World" />;
// }

import { Detail, List } from "@raycast/api"; 
import { useEffect, useState } from "react";

type WeatherData = { // Here as example for now
  temperature: string;
  wind: string;
  description: string;
};

type TidePoint = [string, number];

type TidePointsList = TidePoint[];

export default function Command() {
  const [weather, setTidePointsList] = useState<TidePointsList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8413320&product=predictions&datum=STND&time_zone=lst_ldt&units=english&application=raycast_tides&format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const weatherData = data as { temperature: string; wind: string; description: string };
        setWeather({
          temperature: weatherData.temperature,
          wind: weatherData.wind,
          description: weatherData.description,
        });
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <Detail markdown={`# Error\n${error}`} />;
  }

  if (!weather) {
    return <Detail markdown="Loading weather..." />;
  }

  return (
    <Detail
      markdown={`# Berlin Weather\n\n**${weather.description}**\n\n- Temperature: ${weather.temperature}\n- Wind: ${weather.wind}`}
    />
  );
}