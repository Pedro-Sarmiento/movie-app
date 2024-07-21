# Movie App

This is a React application for viewing featured movies. It uses The Movie Database (TMDb) API to load and display a list of movies and allows users to get more information about a specific movie by clicking on it. The app also implements infinite scrolling to load more movies as the user scrolls down.

## Features

- **Movie List**: Displays a grid of featured movies retrieved from the TMDb API.
- **Movie Details**: Clicking on a movie shows a popup with detailed information, including the title, description, release date, and rating.
- **Infinite Scrolling**: More movies are automatically loaded when the user scrolls to the bottom of the page.

## Installation

To set up and run the application locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. Then, install the project dependencies with:

```bash
npm install
```

### 3. Set Up Environment Variables

In the root of the project, create a .env file and add your TMDb API key:

```bash
REACT_APP_TMDB_API_KEY=your_api_key
```
Be sure to replace your_api_key with your actual API key.


### 4. Run the Application


```bash
npm start
```

Thank you for using the Movie App!

