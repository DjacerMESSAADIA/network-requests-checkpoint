# Weather Forecast App

A real-time weather application built with Node.js, Express, and EJS that provides current weather information using the OpenWeather API.

## Features

- Real-time weather data display
- City-based weather search
- Displays temperature, humidity, wind speed, and weather conditions
- Previous searches history
- Responsive design
- Country flag display for searched locations

## Technologies Used

- Node.js
- Express.js
- EJS
- OpenWeather API
- Node-fetch
- Dotenv for environment variables

## Prerequisites

- Node.js
- OpenWeather API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:

```bash
OPENWEATHER_API_KEY=your_api_key_here //included with the repo
PORT=3000
```

4. Start the application:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
weather-app/
├── controllers/
│   └── weatherController.js
├── models/
│   └── weatherModel.js
├── public/
│   ├── css/
│   └── js/
├── routes/
│   └── weather.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── index.ejs
├── app.js
├── package.json
└── .env
```

## API Reference

The application uses the OpenWeather API to fetch weather data. The following endpoint is used:

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_key}
```

## Environment Variables

Required environment variables:

- `OPENWEATHER_API_KEY`: Your OpenWeather API key
- `PORT`: Application port (defaults to 3000)
