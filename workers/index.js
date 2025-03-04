/**
 * Cloudflare Worker for Weather App
 * 
 * This worker:
 * 1. Extracts the user's city from Cloudflare's IncomingRequestCfProperties
 * 2. Fetches weather data from OpenWeatherMap API for that city
 * 3. Returns the weather data to the client
 */

// OpenWeatherMap API configuration
// API key is accessed from environment variables
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Handle OPTIONS requests for CORS preflight
 */
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * Handle errors with a proper JSON response
 */
function handleError(error) {
  return new Response(
    JSON.stringify({
      error: error.message || 'Unknown error occurred',
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
}

/**
 * Fetch weather data from OpenWeatherMap API
 */
async function fetchWeatherData(city) {
  const url = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `OpenWeatherMap API returned ${response.status}`);
  }
  
  return response.json();
}

/**
 * Main request handler for the worker
 */
async function handleRequest(request, env, ctx) {
  // Get API key from environment variables
  const OPENWEATHER_API_KEY = env.OPENWEATHER_API_KEY;
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleOptions();
  }
  
  try {
    // Get the user's city from Cloudflare's IncomingRequestCfProperties
    const cf = request.cf;
    let city = 'London'; // Default city if cf properties are not available
    
    if (cf && cf.city && cf.city !== 'XX') {
      city = cf.city;
    }
    
    // Fetch weather data for the detected city
    const weatherData = await fetchWeatherData(city);
    
    // Return the weather data as JSON
    return new Response(JSON.stringify(weatherData), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}

// Export the request handler for the Cloudflare Worker
export default {
  fetch: handleRequest,
};
