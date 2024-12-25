# app details

wins are 5 points
byes are 4 points
draws are 1 point
losses are 0 points

MMR is the average of all opponent winrate, **not** including byes or draws, and **not** minimum 33.3% per opponent

a round can be deleted if all the tables are undecided or the bye table

to break ties, the first name, the last name, the player id and the ammount of rounds played are hashed using Md5, and then compared. This ensures that the random ordering is the same after rerendering, yet varies between rounds/tournaments

when playing with byes, each player gets 1 one bye before anyone gets a second bye. after everyone has had 1 bye, byes are random


