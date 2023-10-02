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
  <table border="1">
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

fs.writeFileSync('table.html', beautify(tableHTML, { indent_size: 2 }));
