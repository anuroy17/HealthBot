import json
with open("symptoms.json", "r") as file:
            file_data = json.load(file)
disease = []
for index in range(41):
            disease.append(file_data["data"][index]["name"])
dict = " ".join(disease) 
print(dict)