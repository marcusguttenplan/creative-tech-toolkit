import csv

output = []

for i in recipe_map:
    obj = {}
    obj['recipe_id'] = i
    obj['recipe_name'] = recipe_map[i]
    output.append(obj)

print("writing recipe csv")
with open('<filename.csv>', 'w') as output_file:
    fieldnames = ['recipe_id', 'recipe_name']
    writer = csv.DictWriter(output_file, fieldnames = fieldnames)
    writer.writeheader()
    writer.writerows(output)
