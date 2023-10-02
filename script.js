// Color ranges for victims
const colorRanges = [
    { min: 10000, color: '#800026' },
    { min: 5000, color: '#BD0026' },
    { min: 2000, color: '#E31A1C' },
    { min: 1000, color: '#FC4E2A' },
    { min: 500, color: '#FD8D3C' },
    { min: 200, color: '#FEB24C' },
    { min: 100, color: '#FED976' },
    { min: 0, color: '#FFEDA0' }
];

// Custom coordinates for countries
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

// Initialize map
const map = L.map('map').setView([0, 0], 2);

// Initialize tooltip data arrays
let tooltipData = [];
let initialTooltipData = [];

// Helper Functions
const getColor = victims => colorRanges.find(range => victims > range.min)?.color || 'rgb(220, 220, 220)';
const isOverlapping = (el1, el2) => !(el1.getBoundingClientRect().right < el2.getBoundingClientRect().left ||
    el1.getBoundingClientRect().left > el2.getBoundingClientRect().right ||
    el1.getBoundingClientRect().bottom < el2.getBoundingClientRect().top ||
    el1.getBoundingClientRect().top > el2.getBoundingClientRect().bottom);
const removeOverlappingTooltips = tooltips => {
    // Sort tooltips by number of victims in descending order
    tooltips.sort((a, b) => b.victims - a.victims);

    let i = 0;
    while (i < tooltips.length) {
        let t1 = tooltips[i];
        let j = i + 1;

        while (j < tooltips.length) {
            let t2 = tooltips[j];

            if (isOverlapping(t1.element, t2.element)) {
                t2.tooltip.remove();
                tooltips.splice(j, 1);  // Remove t2 from array
            } else {
                j++;  // Only increment if no overlap was found
            }
        }

        i++;
    }
};


const isURL = str => {
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

const createPopupContent = (countryData) => {
    const formattedVictims = countryData.victims.toLocaleString();
    const referencesHtml = countryData.references ? `Reference: ${uniqueReferences(countryData.references)}` : '';
    return `<b>${countryData.country}</b><br>Victims: ${formattedVictims}<br>${referencesHtml}`;
};

const createAndStoreTooltip = (latlng, victims) => {
    const formattedVictims = victims.toLocaleString();
    const tooltip = L.tooltip({
        permanent: true,
        className: 'country-label',
        offset: [0, 0],
        direction: 'center'
    }).setLatLng(latlng).setContent(formattedVictims).addTo(map);

    const tooltipElement = tooltip.getElement();
    const tooltipInfo = { tooltip, victims, formattedVictims, element: tooltipElement };

    initialTooltipData.push(tooltipInfo);
    tooltipData.push(tooltipInfo);
};

// Fetch and Render Data
const fetchDataAndRender = async () => {
    const data = await fetch('./data/data.json').then(res => res.json());
    const geojson = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson').then(res => res.json());
    document.getElementById('loader').style.display = 'none';
    L.geoJSON(geojson, {
        style: feature => ({
            fillColor: getColor(data.find(item => item.country === feature.properties.ADMIN)?.victims),
            weight: 0.5,
            opacity: 1,
            color: 'white',
            fillOpacity: 1
        }),
        onEachFeature: (feature, layer) => {
            const countryData = data.find(item => item.country === feature.properties.ADMIN);
            if (countryData?.victims) {
                const latlng = customCoordinates[countryData.country] || layer.getBounds().getCenter();
                const popupContent = createPopupContent(countryData);

                layer.bindPopup(popupContent, {
                    offset: L.point(0, -10)
                });
                createAndStoreTooltip(latlng, countryData?.victims);
            }
        }
    }).addTo(map);
};


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
    labels.push(`<li style="background-color:${getColor(null)}">No Data</li>`);
    div.innerHTML = labels.join('');
    return div;
};

legend.addTo(map);

const updateURL = () => {
    const { lat, lng } = map.getCenter();
    const zoom = map.getZoom();
    window.location.hash = `${zoom}/${lat.toFixed(6)}/${lng.toFixed(6)}`;
};

// Function to set map view from the URL hash
const setMapViewFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash !== '') {
        const [zoom, lat, lng] = hash.split('/');
        if (zoom && lat && lng) {
            map.setView([parseFloat(lat), parseFloat(lng)], parseInt(zoom));
        }
    }
};

// Update the URL hash whenever the map view changes
map.on('moveend', updateURL);

// Set the map view from the URL hash when the page loads
window.addEventListener('load', setMapViewFromHash);

fetchDataAndRender().then(() => {
    removeOverlappingTooltips(tooltipData);
});
