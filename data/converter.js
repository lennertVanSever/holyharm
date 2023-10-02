const fs = require('fs');
const json2csv = require('json2csv').parse;
const excel4node = require('excel4node');

// Read JSON Data
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const jsonData = JSON.parse(data);

    // Convert to CSV
    const csvData = json2csv(jsonData);
    fs.writeFileSync('data.csv', csvData);

    // Convert to Excel
    const wb = new excel4node.Workbook();
    const ws = wb.addWorksheet('Data');

    // Assuming jsonData is array of objects (and not nested)
    const keys = Object.keys(jsonData[0]);
    keys.forEach((key, index) => {
        ws.cell(1, index + 1).string(key);
    });

    jsonData.forEach((record, i) => {
        keys.forEach((key, j) => {
            ws.cell(i + 2, j + 1).string(String(record[key] || ''));
        });
    });

    wb.write('data.xlsx');
});
