# People Finder

---

## For developers

### FE preparation
Move into the `frontend` package and run `npm install`

### BE preparation
For accessing the insight api, you need to store your insight credentials in the following properties file: `%USERPROFILE/hackathon/people-finder.properties`.
The content of the file must be as follows:
```
username=firstname.lastname@zuehlke.com
password=your-insight-password
```

NOTE: Never hardcode your credentials or commit the properties file!

### APIs Generation
Run `./gradlew prepareApis` exactly in the same path you are reading this file. This will install the BE api locally.
As far as the frontend is concerned, Angular 12 is not yet supported. Therefore, the frontend API files are copied into
the `frontend` module and compiled with the rest of the application.