# Weather Web App

A simple weather web application that uses Cloudflare Workers to fetch weather data based on the user's location.

## Features

- Automatically detects user's city using Cloudflare's IncomingRequestCfProperties
- Displays current weather information
- Responsive design for mobile and desktop

## Structure

- `index.html`, `style.css`, `script.js`: Frontend files
- `workers/`: Contains Cloudflare Worker code
- `.github/workflows/`: CI/CD pipeline for deployment

## Development

1. Clone the repository
2. Make changes to the frontend or worker code
3. Push changes to trigger the CI/CD pipeline

## Deployment

The application is automatically deployed using GitHub Actions:
- Frontend is deployed to GitHub Pages
- Cloudflare Worker is deployed to Cloudflare
