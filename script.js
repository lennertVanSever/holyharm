const colorRanges = [
    { min: 10000, max: Infinity, color: '#800026' },
    { min: 5000, max: 10000, color: '#BD0026' },
    { min: 2000, max: 5000, color: '#E31A1C' },
    { min: 1000, max: 2000, color: '#FC4E2A' },
    { min: 500, max: 1000, color: '#FD8D3C' },
    { min: 200, max: 500, color: '#FEB24C' },
    { min: 100, max: 200, color: '#FED976' },
    { min: 0, max: 100, color: '#FFEDA0' }
];

const getColor = (victims) => {
    const ligthGray = 'rgb(200, 200, 200)';
    if (victims === null) return ligthGray;
    for (const range of colorRanges) {
        if (victims > range.min) {
            return range.color;
        }
    }
    return ligthGray;
};


const map = L.map('map').setView([0, 0], 2);

const customCoordinates = {
    'United States of America': [37.0902, -95.7129],
    'France': [46.603354, 1.888334],
    'New Zealand': [-40.9006, 174.8860],
    'Chile': [-35.6751, -71.5430],
    'South Africa': [-30.5595, 22.9375],
    'Ecuador': [-1.8312, -78.1834],
    'Netherlands': [52.3676, 4.9041],
    'Spain': [40.4637, -3.7492],
    'Portugal': [39.3999, -8.2245]
};

fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
    .then(response => response.json())
    .then((geojson) => {
        L.geoJSON(geojson, {
            style: (feature) => {
                const countryData = data.find(item => item.country === feature.properties.ADMIN);
                return {
                    fillColor: getColor(countryData ? countryData.victims : null),
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 1
                };
            },
            onEachFeature: (feature, layer) => {
                const countryData = data.find(item => item.country === feature.properties.ADMIN);
                if (countryData && countryData.victims !== null) {
                    const formattedVictims = countryData.victims.toLocaleString();  // Format the number
                    let latlng;
                    if (customCoordinates[countryData.country]) {
                        latlng = customCoordinates[countryData.country];
                    } else {
                        const bounds = layer.getBounds();
                        latlng = bounds.getCenter();
                    }
                    layer.bindPopup(`<b>${countryData.country}</b><br>Victims: ${formattedVictims}`, {
                        offset: L.point(0, -10)
                    });
                    layer.on('mousemove', function (e) {
                        const latlng = e.latlng;

                        // Shift the popup upwards by 10 pixels
                        const popup = this.getPopup();
                        popup.options.offset = L.point(0, 10);

                        this.setLatLng(latlng).openPopup();
                    });
                    layer.on('mouseout', function () {
                        this.closePopup();
                    });
                    L.tooltip({
                        permanent: true,
                        className: 'country-label',
                        offset: [0, 0],
                        direction: 'center'
                    })
                        .setLatLng(latlng)
                        .setContent(formattedVictims)
                        .addTo(map);
                }
            }
        }).addTo(map);
    });

const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('ul', 'info legend');
    div.setAttribute('class', 'legend-list');
    let labels = [];
    for (const range of colorRanges) {
        labels.push(
            `<li style="background-color:${range.color};" >> ${range.min.toLocaleString()}</li>`
        );
    }
    labels.push('<li style="background-color:white">No Data</li>');
    div.innerHTML = labels.join('');
    return div;
};

legend.addTo(map);

// projection
// border size
// hide labels that overlap
// add australia, costa rica, canada to customCoordinates