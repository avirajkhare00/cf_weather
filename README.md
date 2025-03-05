# Weather Web App

A simple weather web application that uses Cloudflare Workers to fetch weather data based on the user's location. The app leverages Cloudflare's capabilities to detect the user's city and provides current weather information with a clean, responsive interface.

## Features

- Automatically detects user's city using Cloudflare's IncomingRequestCfProperties
- Fetches real-time weather data from OpenWeatherMap API
- Displays current weather information including temperature, description, and location
- Responsive design for mobile and desktop devices
- Secure API key handling using Cloudflare Worker Secrets

## Project Structure

- **Frontend**:
  - `index.html`: Main HTML structure
  - `style.css`: Styling for the application
  - `script.js`: Frontend JavaScript that fetches data from the Cloudflare Worker

- **Backend**:
  - `workers/index.js`: Cloudflare Worker that detects location and fetches weather data
  - `workers/wrangler.toml`: Configuration for the Cloudflare Worker

- **CI/CD**:
  - `.github/workflows/deploy-pages.yml`: GitHub Actions workflow for deploying frontend to Cloudflare Pages
  - `.github/workflows/deploy-worker.yml`: GitHub Actions workflow for deploying the Cloudflare Worker

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cf-weather.git
   cd cf-weather
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your OpenWeatherMap API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) to get an API key
   - For local development, set the API key as a secret in your Cloudflare Worker:
     ```bash
     cd workers
     wrangler secret put OPENWEATHER_API_KEY
     # Enter your API key when prompted
     ```

4. Run the application locally:
   ```bash
   npm start
   ```

5. For local worker development:
   ```bash
   cd workers
   wrangler dev
   ```

## Deployment

The application is automatically deployed using GitHub Actions:

1. **Frontend** is deployed to Cloudflare Pages:
   - Accessible at: `https://weather-app-vux.pages.dev/`
   - Deployment triggered on pushes to the main branch

2. **Cloudflare Worker** is deployed to `https://weather-app.avirajkhare00.workers.dev`:
   - Handles location detection and weather data fetching
   - Securely stores the OpenWeatherMap API key as a Worker Secret

### Setting Up GitHub Secrets

For the CI/CD pipeline to work, you need to add the following secrets to your GitHub repository:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Workers and Pages permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

## Security

The OpenWeatherMap API key is securely stored as a Cloudflare Worker Secret and is never exposed in the source code or client-side JavaScript. The key is accessed securely within the Cloudflare Worker environment.

## License

MIT
