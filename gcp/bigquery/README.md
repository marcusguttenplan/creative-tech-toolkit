# BigQuery Samples

Requirements:
* `python` or `nodejs`, or `c#`, `go`, `php`, or `ruby`
* google account registered on the cloud platform with billing enabled

### Working with SQL
BigQuery is a very large `sql` database. Making queries is very similar to other implementations of `sql`, using the same [syntax](https://github.com/Hornbill201/SQL-cheatsheet). Many of the code samples are only built to wrap `sql` functions.

### Setup

Create an account with Google Cloud using an existing gmail account [here](https://console.cloud.google.com/freetrial), enter a credit card when asked. New accounts are given $300 in credits, with more allocated to the project. Once added as an owner of the project, specify `data-for-good` from the project dropdown at the upper right of the page. This will open a modal with a default project initiated, and `data-for-good` may be hidden behind the "Recent" tab. From the dashboard, additional services (like ML APIs) may be enabled from the sidebar, but BigQuery is enabled by default.

Queries will require a private key. Download a private key by navigating to `APIs & Services > Credentials` in the sidebar, and creating a Service Account key in `json` format. Download the key.

To set the key file as an environmental variable that will be loaded automatically, or can be specified each time the command is run, add this to `.bashrc` or `.bash_profile` at the root directory of your user account (i.e. on Mac: `/Users/<username>/.bash_profile` or just execute from the command line:

```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH-TO-DOWNLOADED-KEY]"
```

The key can also be passed to many sample scripts via a `--flag`.


### Example Queries

To see all tables:

```
SELECT * FROM <dataset> LIMIT 1;
```

i.e.:
```
SELECT * FROM bigquery-public-data.world_bank_intl_debt.international_debt LIMIT 1;
```


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

### Specifying Dataset

Some relevant datasets are:

* `bigquery-public-data.world_bank_intl_debt.international_debt`
* `bigquery-public-data.openaq.global_air_quality`
* `bigquery-public-data.san_francisco.bikeshare_trips`
* `bigquery-public-data.san_francisco.street_trees`
* `bigquery-public-data.nhtsa_traffic_fatalities`
* `bigquery-public-data.noaa_gsod.gsod*`
* `bigquery-public-data.noaa_icoads.icoads_core_*`
* `bigquery-public-data.bls.<tablename>` (Burea of Labor Stats, beware `<tablenames>`)
* `bigquery-public-data.medicare.<tablename>` (Beware `<tablenames>`)

In `sql` syntax, these are passed to the `FROM` function.


### Samples

Samples are available in any of the required languages:

* [python](https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/bigquery/cloud-client)
* [node](https://github.com/googleapis/nodejs-bigquery)
* [c#](https://github.com/GoogleCloudPlatform/dotnet-docs-samples/tree/master/bigquery/api)

#### TODO

* Add list of tables for each dataset to `data_samples.md` for reference docs
