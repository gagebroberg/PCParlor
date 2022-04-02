import csv
import os

def cleanData(filename):
    # open and read from csv file
    csvFile = open(filename, newline='')
    csvReader = csv.reader(csvFile, delimiter=' ')

    #data = []
    for row in csvReader:
        print(row)

#cleanData("CPU_UserBenchmark.csv")
print(os.listdir())