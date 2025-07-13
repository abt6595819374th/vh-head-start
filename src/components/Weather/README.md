# Weather Component

**Interactive React component that displays current weather information.**

## Features

- Real-time weather data display
- Loading and error states
- Temperature, condition, humidity, and wind speed
- Responsive design with styled-jsx

## Usage

```astro
---
import { Weather } from '@components/Weather';
---

<Weather client:load />
```

## Notes

- Currently uses mock data for demonstration
- Built with React hooks for state management
- Styled with scoped CSS using styled-jsx
- Includes accessibility considerations with semantic HTML