function printResult(rows) {
  console.log('Query Results:');
  rows.forEach(function(row) {
    console.log(row);
  });
}

function runQuery(projectId) {
  // Imports the Google Cloud client library
  const BigQuery = require('@google-cloud/bigquery');

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = "";

  // Creates a client
  const bigquery = new BigQuery({
    projectId: projectId,
  });

  // The SQL query to run
  const sqlQuery = "SELECT * FROM \`bigquery-public-data.san_francisco.street_trees\` LIMIT 1;";

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use standard SQL syntax for queries.
  };

  // Runs the query
  bigquery
    .query(options)
    .then(results => {
      const rows = results[0];
      printResult(rows);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

runQuery();
