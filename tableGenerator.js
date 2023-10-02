const beautify = require('js-beautify').html;
const fs = require('fs');
const url = require('url');
const { flag } = require('country-emoji');

let data = require('./data/data.json');

data = data.filter(item => item.victims !== null);

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


const continentOrder = [
  "Europe",
  "North America",
  "Latin America",
  "Asia",
  "Oceania",
  "Africa"
];

const generateTableRows = (data) => {
  data.sort((a, b) => {
    const continentA = continentOrder.indexOf(a.continent);
    const continentB = continentOrder.indexOf(b.continent);

    if (continentA !== continentB) {
      return continentA - continentB;
    }

    // If countries are from the same continent, sort by number of victims
    return (b.victims || 0) - (a.victims || 0);
  });

  return data.map(row => `
    <tr>
      <td>${flag(row.country) || ''} ${row.country}</td>
      <td>${row.victims === null ? 'N/A' : row.victims.toLocaleString()}</td>
      <td>${row.victims && row.population ? ((row.victims / row.population) * 100000).toFixed(2) : 'N/A'}</td>
      <td>${uniqueReferences(row.references)}</td>
    </tr>
  `).join('');
};

const generateTableHTML = (tableRows) => `
  <table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Victims</th>
        <th>Victims per 100,000</th>
        <th>References</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
`;


const tableRows = generateTableRows(data);
const tableHTML = generateTableHTML(tableRows);
const generateStatsHTML = (continentTotals, totalVictims) => {
  // Define a mapping between continents and their corresponding emojis and colors
  const continentData = {
    "Europe": { emoji: "🌍", color: "#800026" },
    "North America": { emoji: "🌎", color: "#FEB24C" },
    "Latin America": { emoji: "🌎", color: "#FEB24C" },
    "Asia": { emoji: "🌏", color: "#FEB24C" },
    "Oceania": { emoji: "🌏", color: "#FEB24C" },
    "Africa": { emoji: "🌍", color: "#FEB24C" }
  };

  // Sort the continents by the number of victims, in descending order
  const sortedContinents = Object.keys(continentTotals).sort((a, b) => continentTotals[b] - continentTotals[a]);

  // Generate the HTML
  let html = '';
  for (const continent of sortedContinents) {
    const victims = continentTotals[continent];
    const percentage = ((victims / totalVictims) * 100).toFixed(2);
    const colorBox = continentData[continent].color;
    const emoji = continentData[continent].emoji;

    html += `
      <li>
        <span class="color-box" style="background-color: ${colorBox};"></span>
        ${emoji} ${continent}: ${victims.toLocaleString()} victims (${percentage}%)
      </li>
    `;
  }

  // Add total victims
  html += `
    <li>
      <span class="color-box" style="background-color: transparent;"></span>
      🌐 World: ${totalVictims.toLocaleString()} victims (100%)
    </li>
  `;

  return html;
};

// Initialize counters
const continentTotals = {
  "Europe": 0,
  "North America": 0,
  "Latin America": 0,
  "Asia": 0,
  "Oceania": 0,
  "Africa": 0
};

let totalVictims = 0;

// Calculate the totals
data.forEach(item => {
  if (item.continent && item.victims !== null) {
    // console.log(item)
    const { victims } = item;
    continentTotals[item.continent] += victims;
    totalVictims += victims;
  }
});
fs.readFile('index.html', 'utf8', (err, content) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Locate the container where you want to update the statistics
  const startTag = '<ul>';
  const endTag = '</ul>';
  const start = content.indexOf(startTag);
  const end = content.indexOf(endTag) + endTag.length;

  if (start === -1 || end === -1) {
    console.error('Container tags not found in index.html');
    return;
  }

  const newStatsHTML = generateStatsHTML(continentTotals, totalVictims);

  // Replace the existing statistics with the new ones
  const newContent = content.slice(0, start) + startTag + newStatsHTML + content.slice(end - endTag.length);

  // Write the updated HTML back to index.html
  fs.writeFileSync('index.html', beautify(newContent, { indent_size: 2 }));
});