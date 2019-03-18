import csv
import itertools
import urllib

with open('data.csv') as ingest_file:
    with open('out.csv', 'w') as output_file:
        writer = csv.writer(output_file)
        # writer.writerow(('url', 'labels'))

        # print(ingest_file)
        for row in ingest_file:
            line = row.rstrip('\n')
            # url = str(url)
            # print(url)
            # print(url.split('/')[-2])
            output = [line, str(row.split('/')[-2])]
            print(output)
            # writer.writerow(output)

    #stripped = (line.strip() for line in ingest_file)
    #lines = (line for line in stripped if line)
    #igrouped = itertools.izip(*[lines] * 3)

    # urls = ingest_file.readlines()

    # for url in urls:
    #     line = urllib.request.urlopen(url).read()
    #     print str(line)
    #     print(line.split('/'))
