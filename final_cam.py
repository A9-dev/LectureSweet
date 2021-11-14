import cv2
import csv
import datetime
import math

interval = 50

def movement(img, total, iteration):
    height = img.shape[0]
    width = img.shape[1]
    for i in range (0, height):
        for j in range (0, width):
            pixel = img[i][j]
            if (pixel != 0): 
                total += 1

    if(iteration == interval): 
        score = 4 * (total - 11100000)
        score = (score / 4260000) * 100
        if (score >= 100):
            score = 100     
        total = 0
        iteration = 0

    iteration += 1

    return total, iteration, score

  
name = input("Lecturer name: ")
date = input("Date (DD/MM/YYYY): ")
room = input("Location (buildng no./room no.): ")
startTime = datetime.datetime.now().strftime("%H:%M:%S")

with open("lecture.csv", 'w') as file:
    writer = csv.writer(file)
    writer.writerow([name, date, room, startTime])

#cv2.namedWindow("cam")
vc = cv2.VideoCapture(0) #opens default camera (could also select a file)

if vc.isOpened(): # try to get the first frame
    rval, firstFrame = vc.read()
else:
    rval = False
    print("Playback error!")

firstGray = cv2.cvtColor(firstFrame, cv2.COLOR_BGR2GRAY)
firstGray = cv2.GaussianBlur(firstGray, (5, 5), 0) #to get rid of gaussian noise

iteration = 0
total = 0  

while rval:
    rval, frame = vc.read() #reads frame

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0) #to get rid of gaussian noise

    change = cv2.absdiff(firstGray, gray)

    cv2.imshow("cam", change)
    key = cv2.waitKey(20)
    if key == 27: #exit stream on ESC
        break

    rval, frame = vc.read() #reads frame

    firstGray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    firstGray = cv2.GaussianBlur(firstGray, (5, 5), 0) 

    total, iteration, score = movement(change, total, iteration)
    #do something with score ^^

vc.release() #cleans up
cv2.destroyWindow("cam")