# Spinning Wheel Number Generator

A React-based spinning wheel application for generating random numbers with customizable settings.

## Features

- Interactive spinning wheel with smooth animations
- Generate random numbers or random digits
- Customizable number of digits (2-6)
- Individual digit range controls
- Display of last 3 generated numbers
- Responsive design for mobile and desktop

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start:prod
```

## Deployment to Render.com

1. Push your code to a GitHub repository

2. Connect your GitHub account to Render.com

3. Create a new Web Service on Render:
   - Choose "New Web Service"
   - Connect your GitHub repository
   - Use the following settings:
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start:prod`

4. The app will be automatically deployed and available at your Render URL

## Environment Variables

No environment variables are required for basic operation. The app will use port 3000 by default or the PORT environment variable if provided.

## Technologies Used

- React 19
- Express (for production server)
- Lucide React (for icons)
- CSS3 animations

## License

MIT
