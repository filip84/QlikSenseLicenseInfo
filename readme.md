### Requirement
#1 nodeJS installed
#2 config.json file in correct format
#3 local Qlik Sense installation


### Troubleshooting
#1. Running but nothing happend
- Close node through the Task in Task manager. It is called Node.js: Server-side JavaScript, and not JavaScript Runtime!
- Open cmd (admin) run extractor.exe
- Done, should now work
- Done test


#2. Access denied on log files
- Delete all logfiles (qrs, app, engine)
- Done, restart the app (see #1)