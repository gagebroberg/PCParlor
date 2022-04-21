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

    # get CPUs
    cpus = cleanData('data/CPU_UserBenchmarks.csv')
    for item in cpus:
        insert_cpu = '''INSERT INTO comp_parts (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_cpu, item)
        except:
            conn.rollback()
        else:
            conn.commit()
    
    # get GPUs
    gpus = cleanData('data/GPU_UserBenchmarks.csv')
    for item in gpus:
        insert_gpu = '''INSERT INTO gpu (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_gpu, item)
        except:
            conn.rollback()
        else:
            conn.commit()
    
    # get HDDs
    hdds = cleanData('data/HDD_UserBenchmarks.csv')
    for item in hdds:
        insert_hdd = '''INSERT INTO hdd (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_hdd, item)
        except:
            conn.rollback()
        else:
            conn.commit()
    
    # get RAMs
    rams = cleanData('data/RAM_UserBenchmarks.csv')
    for item in rams:
        insert_ram = '''INSERT INTO ram (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_ram, item)
        except:
            conn.rollback()
        else:
            conn.commit()
    
    # get SSDs
    ssds = cleanData('data/SSD_UserBenchmarks.csv')
    for item in ssds:
        insert_ssd = '''INSERT INTO ssd (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_ssd, item)
        except:
            conn.rollback()
        else:
            conn.commit()
    
    # get USBs
    usbs = cleanData('data/USB_UserBenchmarks.csv')
    for item in usbs:
        insert_usb = '''INSERT INTO usb (type, number, brand, model, rank, benchmark) 
                            VALUES (%s, %s, %s, %s, %s, %s)'''
        try:
            cur.execute(insert_usb, item)
        except:
            conn.rollback()
        else:
            conn.commit()

except Exception as error:
    print(error)
finally:
    if cur != None:
        cur.close()
    if conn != None:
        conn.close()
