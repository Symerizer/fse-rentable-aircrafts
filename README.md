
fse-rentable-aircrafts
===
Filters out and shows you only rentable aircrafts directly in your group's assignments page for the airport of your choice.

Demo
---
[![Image from Gyazo](https://i.gyazo.com/90b85e2d987d16e4a686cf13a59adeba.gif)](https://gyazo.com/90b85e2d987d16e4a686cf13a59adeba)

How to use
---
1. Install the extension on the Chrome Extension store (link to come once it's all setup).

2. Go to the extensions options and add your access key. You can retrieve your key by following this [link](https://server.fseconomy.net/datafeeds.jsp).

3. Go to any group's assignments page and click on "Show me the planes" for any assignment you've targeted.

Why?
---
Because doing 4 clicks to see if a plane is rentable is tedious and I'm lazy.

Limits
---
- You are limited to 10 clicks per minute, otherwise you will get an error message concerning the fact that you've spammed a bit too much.
- The API endpoint I call doesn't return the bearing of the home airport, I would have to use an external service for that and I don't wanna have to deal with a backend for the little extension that this is. It still shows you the ICAO of the home airport of the plane.

Future
---
- Firefox soon enough. This is my first extension, but I'm pretty sure porting that won't be complicated.
- Adding revelant links to some things in the table, maybe expand on the full plane info when clicking on the registration? You tell me.

Poke me on Discord @Symerizer if you have any trouble with it or for suggestions. It's also open source, so have fun if you want to add stuff. 

