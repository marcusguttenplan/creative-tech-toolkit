const {
    BigQuery
} = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
    keyFilename: './creds.json',
    projectId: 'dplex-n20-crosstown-traffic'
});

query = "SELECT * FROM `dplex-n20-crosstown-traffic.vehicle_events.events` LIMIT 1000"

async function bqQuery(filter, coords, id) {
    // Check for Query to Run
    switch (filter) {
        case 'vehicle':
            console.log("vehicle")
            query = 'SELECT * FROM `dplex-n20-crosstown-traffic.staging.tripEvents` LIMIT 1';
            break;
        case 'fleet':
            console.log("fleet")
            query = 'SELECT avg(driverSafetyRating) as safety, avg(predictedBrakeFailureEstimate) as health FROM `dplex-n20-crosstown-traffic.staging.tripPredictions`'
            break;
        case 'predictions':
            console.log("predictions")
            query = 'SELECT avg(driverSafetyRating) as safety, avg(predictedBrakeFailureEstimate) as health FROM `dplex-n20-crosstown-traffic.staging.tripPredictions`'
            break;
        case 'size':
            console.log("size");
            query = 'SELECT sum(row_count) as row_count, sum(size_bytes) as size_bytes FROM `dplex-n20-crosstown-traffic.staging.__TABLES__`';
            break;
        case 'stats':
            console.log("stats");
            query = 'SELECT row_count FROM `dplex-n20-crosstown-traffic.vehicle_events.__TABLES__` WHERE table_id="stats"';
            break;
        default:
            break;
    }

    const options = {
        query: query,
        location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options).catch(err => {
        console.log(err);
    });
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults().catch(err => {
        console.log(err);
    });


    console.log(rows)
    return rows;
}
