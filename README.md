# Spruce - Musical Time Travel

Spruce is a web application that allows users to explore the history of music by searching for compositions from any year in recorded history, from 2100 BC to 2020 AD. The application provides detailed information about historical musical works, including links to YouTube performances, Wikipedia articles, Spotify streams, and lyrics where available.

## Live Application

Access the application at: [https://spruce-h2yn.onrender.com](https://spruce-h2yn.onrender.com)

This is the full production application, not a demo.

## Overview

Spruce bridges thousands of years of musical heritage, offering users an intuitive interface to discover compositions from Ancient Sumerian hymns to modern popular music. The application features a curated database of over 100 significant musical works spanning different eras and regions.

## Features

### Core Functionality

- **Year-based Search**: Enter any year between 2100 BC and 2020 AD to find the closest musical composition from that time period
- **Era Selection**: Toggle between AD (Anno Domini) and BC (Before Christ) for accurate historical searching
- **Intelligent Matching**: The application finds the nearest composition if an exact match doesn't exist
- **Comprehensive Details**: View era classification, title, region, composer/artist, and year for each work

### External Resources

The application provides direct links to external resources when available:

- **YouTube**: Watch performances and recordings
- **Wikipedia**: Read detailed historical context and information
- **Spotify**: Listen to available recordings on Spotify
- **Lyrics**: Access lyrics for vocal compositions

Resource buttons only appear when the corresponding link is available for a particular composition.

### User Interface

- **Modern Design**: Contemporary glassmorphism aesthetic with gradient backgrounds
- **Smooth Animations**: Fluid transitions and loading states
- **Responsive Layout**: Fully functional on desktop, tablet, and mobile devices
- **Accessibility**: Clear typography, proper contrast ratios, and semantic HTML structure

## Technical Architecture

### Frontend Technologies

- **HTML5**: Semantic markup for proper document structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, custom properties, and animations
- **Vanilla JavaScript**: No framework dependencies for optimal performance

### Data Management

- **CSV Database**: All musical works stored in a structured CSV file
- **Asynchronous Loading**: Database loaded via Fetch API on application initialization
- **Client-side Processing**: All data parsing and searching performed in the browser

### File Structure

```
spruce/
└── src/
    ├── index.html              # Main HTML structure
    ├── styles.css              # Complete styling and animations
    ├── script.js               # Application logic and data handling
    └── music_database.csv      # Musical works database
```

## Database Schema

The CSV database contains the following fields for each musical work:

| Field | Description | Example |
|-------|-------------|---------|
| Era | Historical period classification | Ancient, Medieval, Renaissance, Baroque, Classical, Romantic, Popular |
| Title | Name of the musical work | The Four Seasons |
| Region | Geographic origin | Italy |
| Composer/Artist | Creator of the work | By Antonio Vivaldi |
| Year | Year of composition | 1723 AD |
| YouTube | Link to YouTube performance | https://youtu.be/... |
| Wikipedia | Link to Wikipedia article | https://en.wikipedia.org/... |
| Spotify | Link to Spotify recording | https://open.spotify.com/... |
| Lyrics | Link to lyrics page | https://genius.com/... |

## Usage Guide

### Basic Search

1. Navigate to [https://spruce-h2yn.onrender.com](https://spruce-h2yn.onrender.com)
2. Enter a year in the numeric input field (e.g., 1500)
3. Select AD or BC from the dropdown menu
4. Click "Find Song" or press Enter
5. View the closest matching composition

### Viewing Details

- The main display shows the era badge, title, year, and region
- Click "Show Details" to expand additional information including the full composer/artist name
- Click "Hide Details" to collapse the expanded section

### Accessing External Resources

- If external links are available, colored buttons will appear below the song information
- Click any button to open the corresponding resource in a new tab
- Red button: YouTube
- White button: Wikipedia
- Green button: Spotify
- Purple button: Lyrics

## Era Classifications

The database categorizes musical works into seven distinct historical periods:

### Ancient (2100 BC - 400 AD)
Earliest recorded musical traditions including Sumerian hymns, Greek compositions, and early Christian chants.

### Medieval (500 AD - 1380 AD)
Gregorian chants, Byzantine music, and early polyphonic compositions from the Middle Ages.

### Renaissance (1440 AD - 1600 AD)
Choral works, madrigals, and early instrumental music from the Renaissance period.

### Baroque (1600 AD - 1749 AD)
Complex polyphonic compositions by Bach, Handel, Vivaldi, and contemporaries.

### Classical (1757 AD - 1820 AD)
Symphonies, concertos, and sonatas from the Classical period, particularly Mozart, Haydn, and early Beethoven.

### Romantic (1820 AD - 1900 AD)
Expressive compositions from the Romantic era by Chopin, Liszt, Wagner, Tchaikovsky, and others.

### Popular (1900 AD - 2020 AD)
Modern popular music from the 20th and 21st centuries, including jazz, rock, pop, and contemporary genres.

## Browser Compatibility

Spruce is compatible with all modern web browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

The application uses standard web technologies and does not require any plugins or extensions.

## Performance Characteristics

- **Initial Load**: CSV database is fetched asynchronously on page load
- **Search Speed**: Client-side search completes in under 100ms for typical queries
- **Network Usage**: Minimal - only initial HTML, CSS, JS, and CSV files
- **Storage**: No local storage or cookies used
- **Memory**: Lightweight footprint, suitable for low-resource devices

## Error Handling

The application includes comprehensive error handling:

- **Invalid Input**: User-friendly messages for incorrect year formats
- **Database Loading Failures**: Graceful fallback with error notification
- **Missing Data**: Default values displayed when information is unavailable
- **Network Issues**: Clear error messages if CSV fails to load

## Development

### Local Development Setup

To run Spruce locally:

1. Clone or download all four files to a directory
2. Ensure all files are in the same directory
3. Open `index.html` in a web browser, or
4. Use a local server (recommended):
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

### Modifying the Database

To add or modify musical works:

1. Open `music_database.csv` in a text editor or spreadsheet application
2. Add or edit rows following the existing format
3. Ensure proper CSV formatting (commas as delimiters, quotes for values containing commas)
4. Save the file and refresh the application

### Code Structure

**HTML (index.html)**
- Semantic structure with header, main content area, and footer
- Form elements for user input
- Display areas for song information and details
- Loading and error message containers

**CSS (styles.css)**
- CSS custom properties for theming
- Flexbox and Grid layouts for responsive design
- Keyframe animations for smooth transitions
- Media queries for mobile optimization

**JavaScript (script.js)**
- Asynchronous CSV loading with Fetch API
- CSV parsing with quote and escape handling
- Year conversion (BC/AD to numeric values)
- Closest match algorithm for song searching
- Dynamic DOM manipulation for displaying results
- Event handling for user interactions

## Privacy and Data

- No user data is collected or stored
- No cookies or local storage used
- No analytics or tracking scripts
- All processing occurs client-side
- External links open in new tabs with proper security attributes (`rel="noopener noreferrer"`)

## Limitations

- Database is curated and not exhaustive of all musical history
- Some historical works lack external resource links
- Search finds nearest match rather than exact year matches in many cases
- Requires active internet connection for external resource links

## Credits

### Design
Modern gradient-based design with glassmorphism effects, inspired by contemporary web design trends.

### Data Sources
Musical works curated from historical records, with links to:
- YouTube for performances
- Wikipedia for historical context
- Spotify for streaming audio
- Various lyrics databases

### Icons
SVG icons for YouTube, Wikipedia, Spotify, and other services are used inline for performance.

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions regarding Spruce, please note that this is a static application with no backend support infrastructure. The application is served as-is from the hosting platform.

---

**Spruce** - Discover music from every era of human history
