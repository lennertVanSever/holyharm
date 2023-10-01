const beautify = require('js-beautify').html;
const fs = require('fs');
const url = require('url');

const data = require('./data.json');

const isURL = (str) => {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
};

const uniqueReferences = (references) => {
    let urlRefs = new Set();
    let textRefs = [];

    references.forEach(reference => {
        if (isURL(reference)) {
            const urlObj = new URL(reference);
            urlRefs.add(urlObj.hostname.replace('www.', ''));
        } else {
            textRefs.push(reference.split(' ').slice(0, 3).join(' '));
        }
    });

    // Join textual references and truncate if necessary
    if (textRefs.length > 0) {
        textRefs = textRefs.join(', ');
        if (textRefs.length > 20) {
            textRefs = textRefs.slice(0, 20) + '...';
        }
    } else {
        textRefs = '';
    }

    return [...urlRefs, textRefs].filter(Boolean).join(', ');
};


const generateTableRows = (data) => {
    return data.map(row => `
      <tr>
        <td>${row.country}</td>
        <td>${row.victims === null ? 'N/A' : row.victims}</td>
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
