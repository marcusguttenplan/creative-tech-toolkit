import csv
import itertools
import urllib
import json

with open('data.csv') as ingest_file:
    with open('out.json', 'w') as output_file:
        writer = csv.writer(output_file)
        # writer.writerow(('url', 'labels'))

        # print(ingest_file)
        for row in ingest_file:
            # line = row.rstrip('\n')
            # writer.writerow(output)
            # json.dump(line, output_file)
            # output_file.write('\n')

            # print(row)

            stringy = row.split('\t')

            print(stringy)
