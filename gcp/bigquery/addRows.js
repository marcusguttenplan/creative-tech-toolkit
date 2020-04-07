const {
    BigQuery
} = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
    keyFilename: './creds.json',
    projectId: 'dplex-n20-crosstown-traffic'
});


async function insertRowsAsStream(rows, id) {
    const datasetId = 'vehicle_events';
    const tableId = id;
    // const rows = [{name: 'Tom', age: 30}, {name: 'Jane', age: 32}];

    // Insert data into a table
    await bigquery
        .dataset(datasetId)
        .table(tableId)
        .insert(rows)
        .catch(err => {
            console.log(err)
        });
    console.log(`Inserted ${rows.length} rows`);
}
