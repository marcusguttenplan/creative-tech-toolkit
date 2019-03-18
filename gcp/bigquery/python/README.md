# BigQuery Samples
### python

```
pip install -r requirements.txt
```

will install:
```
google-cloud-bigquery==0.31.0
google-auth-oauthlib==0.2.0
pytz==2018.3
```

Feel free to run inside of a `virtualenv` wrapper

### Usage

After install requirements via `pip`, execute `python sample_query.py <dataset> <no.-of-rows-to-return>`.

This returns 1 row from `bigquery-public-data.san_francisco.street_trees`, which looks like:
```
Row((44922, u'Permitted Site', u'Tree(s) ::', u'', 195, u'Sidewalk: Curb side : Cutout', u'Tree', u'Private', u'', datetime.datetime(2001, 4, 25, 0, 0, tzinfo=<UTC>), u'', u'', u'Permit Number 43922', None, None, None, None, u''), {u'tree_id': 0, u'legal_status': 1, u'species': 2, u'address': 3, u'site_order': 4, u'site_info': 5, u'plant_type': 6, u'care_taker': 7, u'care_assistant': 8, u'plant_date': 9, u'dbh': 10, u'plot_size': 11, u'permit_notes': 12, u'x_coordinate': 13, u'y_coordinate': 14, u'latitude': 15, u'longitude': 16, u'location': 17})
```
