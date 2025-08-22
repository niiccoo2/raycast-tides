### Raycast Tides

This is a simple extension that lets you view when high and low tide is at your favorite NOAA stations.

> [!NOTE]
> Because this uses NOAA stations it only has data for US stations. Find a list of stations [here](https://tidesandcurrents.noaa.gov/stations.html).

### Example

Open raycast and run the "View Tides" command.

![View tides command](/metadata/view_tides_cmd.png)

Then type "Boston" or "Boston, MA" to see the tides for Boston.

![Boston tides](/metadata/boston_tides.png)

### Technical details

Right now it has a huge map of names of cities and the corasponding NOAA station ID's. When you type in a city name it will check the map, if it finds the city it will send an API request to NOAA. If it doesn't match or nothing is entered it will say `Error, no station found` or `Enter a NOAA station name` and NOT send an API request.

#### The API in question

`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8413320&product=predictions&datum=STND&time_zone=lst_ldt&units=english&application=raycast_tides&format=json`

> [!TIP]
> You can make your own API [here](https://www.tidesandcurrents.noaa.gov/api-helper/url-generator.html)!

In the code, we replace the station ID with the variable from the map we were talking about.

Then it will get a response like this:

```json
{ "predictions" : 
    [
        {"t":"2025-08-21 00:00", "v":"10.706"},
        {"t":"2025-08-21 00:06", "v":"10.425"},
        {"t":"2025-08-21 00:12", "v":"10.143"}
    ]
}
```

### Quick start

Install the require dependencies:

```bash
npm install
```

Run the extension in development mode

```bash
npm run dev
```

See the [Raycast Developer Documentation](https://developers.raycast.com) for more information!
