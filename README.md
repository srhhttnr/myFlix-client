This project is the client-side to the back-end application called "myFlix", which has a pre-existing server-side component -- REST API and database. It is a React web application that allows users to sign up, log in, view movies, curate a list of favorite movies, and update their profiles.

1. Installation
   npm init
   npm install -g parcel
   npm install --save react react-dom

2. Run Parcel
   parcel src/index.html

3. Create components
   MainView -- home page that displays cards of all movies
   MovieView -- opens a specific movie and its details
   MovieCard -- display of each movie as a card on MainView
   LoginView -- allows user to login
   SignupView -- allows user to signup with a username, password, email, and birthday
   ProfileView -- display of profile details, allows user to update profile details and view list of favorite movies
   NavigationBar -- navigation bar at the top of the application, providing links to the MainView, ProfileView, and a log out button

Dependencies:
React
React Router
React Bootstrap

File Structure:
src/
│
├── components/
│ ├── login-view/
│ │ └── login-view.jsx
│ ├── main-view/
│ │ └── main-view.jsx
│ ├── movie-card/
│ │ └── movie-card.jsx
│ ├── movie-view/
│ │ └── movie-view.jsx
│ ├── navigation-bar/
│ │ └── navigation-bar.jsx
│ ├── profile-view/
│ │ └── profile-view.jsx
│ └── signup-view/
│ └── signup-view.jsx
│
├── package-lock.json
├── package.json
├── netlify.toml
├── index.jsx
├── index.html
├── index.scss
└── README.md

Hosting:
This project is hosted on Netflify: https://myflixmovies-project.netlify.app
