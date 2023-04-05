# leaflet-challenge
Module 15 Challenge

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. In this challenge, I have created a map to help visualize USGS data that will allow them to better educate the public and other government organizations on issues facing our planet, as well as help secure more funding in the process.

Since the USGS provides earthquake data in a number of different formats, I have decided to use their JSON data that incorporates all earthquakes of the past 7 days. This data is updated every 5 minutes, so the information provided on the map is always current. Here is the link that provides that data in a JSON format:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

Using this data in conjunction with Leaflet, I created a map that plots all these earthquakes based on latitude and longitude. The magnitude of each earthquake is reflected by its marker size, and its depth by marker color. When a marker is clicked, a popup with the earthquake's location, magnitude, and depth info will be shown.

MR

--

Help with the creation of a map legend was provided by nradovic1.