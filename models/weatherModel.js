import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

class WeatherModel {
  async getWeatherData(city) {
    try {
      const encodedCity = encodeURIComponent(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.message || "City not found");
      }

      if (!data || !data.main) {
        console.error("Invalid data structure:", data);
        throw new Error("Invalid weather data received");
      }

      return {
        name: data.name,
        country: data.sys.country,
        flagUrl: `https://flagcdn.com/w160/${data.sys.country.toLowerCase()}.png`,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error("Error in getWeatherData:", error);
      throw new Error(error.message || "Failed to fetch weather data");
    }
  }
}

export default new WeatherModel();
