# Project1

Google maps and Zillow--combine data from google maps and zillow to predict future traffic congestion spots

linkedin and zillow--so you can match a future house to a future job in one step.



An app which tells you about events in your city which may affect traffic and automatically alerts you at the appropriate time beforehand. Will use Google Maps and EventBrite Api's. 


Input system for Weekly commute

Alert System
    needs to Alert the person in a non-trivial way
        Start with a weekly Outlook on sunday
    Smart alerts--
        if the event is in the morning, let the person know the day before
        If in the evening, let person know that morning
    Make a system where users can set their own alert preferences.


API calls to EventBrite
    We need 
        event 
        size
        Duration
            start time
            end time
        Type--is it something like a parade or just Concert?
        

API calls to Google Maps
    knows your daily commute
    traffic conditions
    Accident reports?
    Construction?
    Commute Start Time
    Commute End Time
    Commute Duration
    Parking Lots




Interface between EventBrite and GoogleMaps
    How do they need to talk to each other?

    Event should show on a real-time map

    The map should take the "intensity" of the event into consideration--color code green/yellow/red

    Events within 2 miles of End Destination
        If the event is gargantuan, expand the area to 5 miles.



Frontend


Severity Measure

1. Based on the day of the week, we give more weight to those events. Scale of 1 to 5. 
2. Attendance
3. Type--marathon would be worse than a concert
4. Time of day
5. 



UNSOLVED QUESTIONS
1. How do we determine the size of the event?
    if it doesn't have a way to check attendance beforehand, maybe there is a way to see search popularity for that event, or RSVP's or ticket sales.

2. How are we gonna make the alerts work?
    Start with email, move onto something more attention-getting if we have time.

3. Search Parameters

4. How do we test this thing

5. Is it going to suggest an alternate route? If so How? 
hello
