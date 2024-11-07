import weatherModel from "../models/weatherModel.js";
import dotenv from "dotenv";

dotenv.config();

class WeatherController {
  async renderHomePage(req, res) {
    try {
      res.render("index", {
        apiKey: process.env.apiKey,
      });
    } catch (error) {
      console.error("Error rendering home page:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWeather(req, res) {
    try {
      const { city } = req.params;

      if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
      }

      console.log("Searching for city:", city); //DEBUGGING
      const weatherData = await weatherModel.getWeatherData(city);
      res.json(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(404).json({
        error: error.message || "Unable to fetch weather data",
      });
    }
  }
}

export default new WeatherController();
