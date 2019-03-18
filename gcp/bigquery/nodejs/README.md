# BigQuery Samples
### node.js

* Requires nodejs (`brew install node`)
* Requires BigQuery modules (`npm install --save @google-cloud/bigquery`)

### Querying using the Sample `sample_query.js`

```
npm install
node sample_query.js
```

Will run a simple script to query `bigquery-public-data.san_francisco.street_trees`.

Sample output:
```
{ tree_id: 45962,
  legal_status: 'Permitted Site',
  species: 'Tree(s) ::',
  address: '',
  site_order: 220,
  site_info: 'Sidewalk: Curb side : Cutout',
  plant_type: 'Tree',
  care_taker: 'Private',
  care_assistant: '',
  plant_date: BigQueryTimestamp { value: '2001-12-06T00:00:00.000Z' },
  dbh: '',
  plot_size: '',
  permit_notes: 'Permit Number 44451',
  x_coordinate: null,
  y_coordinate: null,
  latitude: null,
  longitude: null,
  location: '' }
```

To change datasets, edit the line:
```
const sqlQuery = "SELECT * FROM \`bigquery-public-data.san_francisco.street_trees\` LIMIT 1;";
```

Unfortunately, the escaped backticks around the name of the dataset must be maintained.


**TODO**
* Update `sample_query.js` to accept position arguments for `dataset`
