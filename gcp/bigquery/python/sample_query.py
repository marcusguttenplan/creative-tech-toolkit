#!/usr/bin/env python

# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import sys
from google.cloud import bigquery

# USAGE: python sample_query.py <dataset> <no. of rows to return>
dataArg=sys.argv[1]
lengthArg=sys.argv[2]


query = """
    SELECT
      *
    FROM `@dataset`
    LIMIT @length
"""

query_params = [
    bigquery.ScalarQueryParameter('dataset', 'STRING', str(dataArg)),
    bigquery.ScalarQueryParameter('length', 'INT64', int(lengthArg))
]

config_obj = bigquery.QueryJobConfig()
config_obj.query_parameters = query_params

def run_query():
    # init BQ client
    client = bigquery.Client()

    ## construct query
    query_job = client.query(
        query,
        location='US',
        config_obj=config_obj
    )
    # query_job = client.query("""
    #     SELECT
    #       *
    #     FROM `bigquery-public-data.san_francisco.street_trees`
    #     LIMIT 1""")

    results = query_job.result()  # Waits for job to complete.

    # Iterate over results and return each row
    for row in results:
        print(row)


if __name__ == '__main__':
    run_query()
