# Project1

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



UNSOLVED QUESTIONS
1. How do we determine the size of the event?
    if it doesn't have a way to check attendance beforehand, maybe there is a way to see search popularity for that event, or RSVP's or ticket sales.

2. How are we gonna make the alerts work?
    Start with text, move onto something more attention-getting if we have time.

3. Search Parameters

4. How do we test this thing

5. Is it going to suggest an alternate route? If so How? 

6. What is going to be included in the alert?

7. How will the login work?
    google might interface with google maps
8. What if the event has no end time?
    Automatically add a severity point.

9. are we going to store just the start and end destination and plug the two into a function or are we going to store the whole route as one item?

10. are we gonna need a server running all the time which checks eventbrite periodically?

Kevin Conway
    Git and backend stuff--firebase if need be
    API's Logic
Yobany Perez
    logo and front end
Michael Lee
    documentation
Chris Wood
    back end, API's and logic





Baby Steps:

Frontend

    UX










Backend











Before you plug anything in, the first time a user hits the page, a random number is generated and stored as a cookie/localStorage on their browser. Not using more complicated logins at this time.

plug in start address
plug in end address
plug in departure time
plug in arrival time

the addresses need to go to google maps so we can get a route. 
    How do we get the route from Google Maps?
    Do we need to look at a different map API?

once we have the route, compare the route with eventbrite api for the next 7 days to display the first 7 days for the user.

for the events that are severe enough or close enough, a function looks at the time of the commute to determine whether it shows up on the user's map

once it knows the things to alert you about, it generates a map with a color-coded circle that is bigger or smaller depending on severity

data is displayed for the user on their weekly outlook page.





saved for later.














id's

#first-name

#last-name

#start-address

#end-address

#leave-time

#arrive-time
