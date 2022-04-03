import csv
import os
import psycopg2

# returns data in form: [PartType, PartNumber, Brand, Model, Rank, Benchmark]
def cleanData(filename):
    # open and read from csv file
    csvFile = open(filename, newline='')
    csvReader = csv.reader(csvFile, delimiter=',')

    # clean data from csv
    data = []
    for row in csvReader:
        row.pop()
        row.pop()
        data.append(row)
    data.pop(0)
    return data

# connect to database
hostname = 'ec2-18-215-96-22.compute-1.amazonaws.com'
database = 'd5c9oa1b7747vs'
username = 'hmzgcfxxfupocw'
pwd = 'db0051069cbafc30ce2a903328d4611dc7d8da5f385da1113043067f297ba1b5'
portID = 5432
conn = None
cur = None

try:
    conn = psycopg2.connect(
                host = hostname,
                dbname = database,
                user = username,
                password = pwd,
                port = portID)
    
    cur = conn.cursor()

    cpus = cleanData('data/CPU_UserBenchmarks.csv')
    for item in cpus in range (0,10):
        insert_cpu = '''INSERT INTO comp_parts (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        cur.execute(insert_cpu, item)

    conn.commit()
except Exception as error:
    print(error)
finally:
    if cur != None:
        cur.close()
    if conn != None:
        conn.close()
