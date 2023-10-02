const fs = require('fs');

// Read data.json
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading the file:", err);
        return;
    }
    const originalData = JSON.parse(data);

    // Read catholics.json
    fs.readFile('catholics.json', 'utf8', (err, catholicsData) => {
        if (err) {
            console.log("Error reading the file:", err);
            return;
        }
        const highestCatholicPopulation_catholics = JSON.parse(catholicsData);

        // Update originalData with catholicPopulation
        originalData.forEach(countryData => {
            highestCatholicPopulation_catholics.forEach(catholicData => {
                if (countryData.country === catholicData.country) {
                    countryData.catholicPopulation = catholicData.highestCatholicPopulation_catholics;
                }
            });
        });

        // Write the updated data back to data.json
        fs.writeFile('data.json', JSON.stringify(originalData, null, 2), 'utf8', (err) => {
            if (err) {
                console.log("Error writing the file:", err);
            } else {
                console.log("Successfully updated data.json");
            }
        });
    });
});
