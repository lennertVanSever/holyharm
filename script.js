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
    const lightGray = 'rgb(220, 220, 220)';
    if (victims === null) return lightGray;
    for (const range of colorRanges) {
        if (victims > range.min) {
            return range.color;
        }
    }
    return lightGray;
};

const customCoordinates = {
    'United States of America': [37.0902, -95.7129],
    'France': [46.603354, 1.888334],
    'New Zealand': [-40.9006, 174.8860],
    'Chile': [-35.6751, -71.5430],
    'South Africa': [-30.5595, 22.9375],
    'Ecuador': [-1.8312, -78.1834],
    'Netherlands': [52.3676, 4.9041],
    'Spain': [40.4637, -3.7492],
    'Portugal': [39.3999, -8.2245],
    'Australia': [-25.2744, 133.7751],
    'Costa Rica': [9.7489, -83.7534],
    'Canada': [56.1304, -106.3468],
    'Austria': [47.5162, 14.5501],
    'Italy': [41.8719, 12.5674],
    'Croatia': [45.1, 15.2],
    'United Kingdom': [55.3781, -3.4360],
    'Argentina': [-38.4161, -63.6167]
};

const map = L.map('map').setView([0, 0], 2);

const isOverlapping = (element1, element2) => {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
};

// Function to remove overlapping tooltips with fewer victims
const removeOverlappingTooltips = (tooltips) => {
    for (let i = 0; i < tooltips.length; i++) {
        for (let j = i + 1; j < tooltips.length; j++) {
            const tooltip1 = tooltips[i];
            const tooltip2 = tooltips[j];
            if (isOverlapping(tooltip1.element, tooltip2.element)) {
                if (tooltip1.victims < tooltip2.victims) {
                    tooltip1.tooltip.remove();
                    tooltips.splice(i, 1);
                    i--;
                    break;
                } else {
                    tooltip2.tooltip.remove();
                    tooltips.splice(j, 1);
                    j--;
                }
            }
        }
    }
};

// Array to store tooltip elements and their victim counts
let tooltipData = [];
let initialTooltipData = [];


const isURL = (str) => {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
};

const uniqueReferences = (references) => {
    let urlMap = new Map();
    let textRefs = [];

    references.forEach(reference => {
        if (isURL(reference)) {
            const urlObj = new URL(reference);
            urlMap.set(urlObj.hostname.replace('www.', ''), reference);
        } else {
            textRefs.push(reference.split(' ').slice(0, 3).join(' '));
        }
    });

    if (textRefs.length > 0) {
        textRefs = textRefs.join(', ');
        if (textRefs.length > 40) {
            textRefs = textRefs.slice(0, 40) + '...';
        }
    } else {
        textRefs = '';
    }

    const urlLinks = [...urlMap.entries()].map(([hostname, url]) => `<a href="${url}">${hostname}</a>`).join(', ');

    return [urlLinks, textRefs].filter(Boolean).join(', ');
};

fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
            .then(response => response.json())
            .then((geojson) => {
                L.geoJSON(geojson, {
                    style: (feature) => {
                        const countryData = data.find(item => item.country === feature.properties.ADMIN);
                        return {
                            fillColor: getColor(countryData ? countryData.victims : null),
                            weight: 0.5,
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

                            let referencesHtml = '';
                            if (countryData.references) {
                                referencesHtml = 'Reference: ' + uniqueReferences(countryData.references);
                            }

                            layer.bindPopup(`<b>${countryData.country}</b><br>Victims: ${formattedVictims}<br>${referencesHtml}`, {
                                offset: L.point(0, -10),
                            });

                            layer.on('mousemove', function (e) {
                                const latlng = e.latlng;
                                const popup = this.getPopup();
                                popup.options.offset = L.point(0, 10);
                                // this.setLatLng(latlng).openPopup();
                            });
                            const tooltip = L.tooltip({
                                permanent: true,
                                className: 'country-label',
                                offset: [0, 0],
                                direction: 'center'
                            })
                                .setLatLng(latlng)
                                .setContent(formattedVictims)
                                .addTo(map);
                            const tooltipElement = tooltip.getElement();
                            const tooltipInfo = { tooltip, victims: countryData.victims, element: tooltipElement };
                            initialTooltipData.push(tooltipInfo); // Store initial tooltips
                            tooltipData.push(tooltipInfo); // Store tooltips currently displayed

                        }
                    }
                }).addTo(map);


                // // Step 1: Calculate the total victims per continent
                // let continentTotals = {};
                // data.forEach(item => {
                //     if (item.continent && item.victims !== null) {
                //         if (!continentTotals[item.continent]) {
                //             continentTotals[item.continent] = 0;
                //         }
                //         continentTotals[item.continent] += item.victims;
                //     }
                // });

                // // Sort continents by the number of victims
                // const sortedContinents = Object.entries(continentTotals).sort((a, b) => b[1] - a[1]);

                // // Mapping of continents to emojis
                // const continentEmojis = {
                //     'Africa': '🌍',
                //     'Asia': '🌏',
                //     'Europe': '🌍',
                //     'North America': '🌎',
                //     'Latin America': '🌎',
                //     'Oceania': '🌏'
                // };

                // // Update the HTML to display total victims per continent
                // const continentTotalsDiv = document.getElementById('continent-totals');
                // let htmlContent = '<ul>';
                // sortedContinents.forEach(([continent, total]) => {
                //     const emoji = continentEmojis[continent] || '';
                //     htmlContent += `<li>${emoji} ${continent}: ${total.toLocaleString()} victims</li>`;
                // });
                // htmlContent += '</ul>';
                // continentTotalsDiv.innerHTML = htmlContent;


            }).then(() => {
                removeOverlappingTooltips(tooltipData);
            });


    });

// Function to re-add all tooltips based on current zoom level
const reAddTooltips = (tooltips) => {
    tooltips.forEach(t => {
        if (!map.hasLayer(t.tooltip)) {
            t.tooltip.addTo(map);
        }
    });
};

const adjustTooltipSize = () => {
    const zoomLevel = map.getZoom();
    const tooltipElements = document.querySelectorAll('.country-label');
    let fontSize;
    console.log('zoomLevel', zoomLevel)
    if (zoomLevel <= 3) {
        fontSize = '10px';
    } else if (zoomLevel <= 5) {
        fontSize = '15px';
    } else {
        fontSize = '20px';
    }

    tooltipElements.forEach(el => {
        el.style.fontSize = fontSize;
    });
};

// Event handler for zoom end
map.on('zoomend', function () {
    tooltipData = [...initialTooltipData]; // Reset to initial state
    reAddTooltips(tooltipData); // Re-add all tooltips
    removeOverlappingTooltips(tooltipData); // Remove overlapping ones
    adjustTooltipSize(); // Adjust tooltip size based on zoom level
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

