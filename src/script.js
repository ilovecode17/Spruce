let parsedData = [];
let isLoading = false;

async function loadCSVDatabase() {
    try {
        const response = await fetch('music_database.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        parsedData = parseCSV(csvText);
        
        if (parsedData.length === 0) {
            throw new Error('No data parsed from CSV');
        }
        
        return true;
    } catch (error) {
        console.error('Error loading CSV database:', error);
        showError('Failed to load music database. Please ensure music_database.csv is in the same directory.');
        return false;
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        console.error('CSV file is empty or invalid');
        return [];
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = [];
        let currentValue = '';
        let insideQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());
        
        if (values.length > 0) {
            const song = {};
            for (let j = 0; j < headers.length; j++) {
                song[headers[j]] = values[j] || '';
            }
            result.push(song);
        }
    }
    
    return result;
}

function parseYear(yearString) {
    if (!yearString || typeof yearString !== 'string') return null;
    
    const cleaned = yearString.trim();
    
    if (cleaned.includes('BC')) {
        const num = parseInt(cleaned.replace('BC', '').trim());
        return isNaN(num) ? null : -num;
    } else if (cleaned.includes('AD')) {
        const num = parseInt(cleaned.replace('AD', '').trim());
        return isNaN(num) ? null : num;
    }
    
    const num = parseInt(cleaned);
    return isNaN(num) ? null : num;
}

function findClosestSong(targetYear) {
    if (!parsedData || parsedData.length === 0) {
        console.error('No data available to search');
        return null;
    }
    
    let closest = null;
    let minDiff = Infinity;
    
    for (const song of parsedData) {
        const songYear = parseYear(song.Year);
        if (songYear === null) continue;
        
        const diff = Math.abs(songYear - targetYear);
        
        if (diff < minDiff) {
            minDiff = diff;
            closest = song;
        }
    }
    
    return closest;
}

function createLinkButtons(song) {
    const linksPanel = document.getElementById('linksPanel');
    linksPanel.innerHTML = '';
    
    const linkConfigs = [
        {
            key: 'YouTube',
            label: 'Watch on YouTube',
            className: 'youtube',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
        },
        {
            key: 'Wikipedia',
            label: 'Read on Wikipedia',
            className: 'wikipedia',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l.136.046 2.411-4.81-.482-.93s-2.346-4.846-2.665-5.521c-.374-.751-.494-.91-.928-1.125-.232-.12-.684-.211-1.206-.241C6.016 4.041 5.961 3.988 5.961 3.902v-.455l.051-.045c.869 0 3.903.002 3.903.002l.051.045v.434c0 .119-.075.176-.225.176l-.39.016c-.33.014-.496.137-.496.391 0 .135.053.33.166.601l1.956 4.153 1.838-3.755c.098-.184.137-.332.137-.436 0-.271-.232-.406-.69-.421l-.307-.015c-.149 0-.225-.059-.225-.176v-.434l.051-.045s2.102-.002 2.717-.002l.051.045v.455c0 .119-.075.176-.225.176l-.564.031c-.419.029-.666.135-.824.391-.221.375-2.269 4.781-3.021 6.3l3.044 6.15.136.046 3.844-7.942c.098-.195.166-.391.166-.586 0-.391-.374-.586-1.123-.601l-.211-.015c-.149 0-.225-.059-.225-.176v-.434l.051-.045c.869 0 3.248.002 3.248.002l.051.045v.455c0 .086-.061.137-.195.152-.869.075-1.35.195-1.814.601-.316.271-.705.766-1.168 1.486l-5.012 9.832c-.271.527-.556.991-.856 1.395-.3.405-.599.705-.896.901-.3.195-.599.301-.896.301-.3 0-.599-.105-.896-.301z"/></svg>'
        },
        {
            key: 'Spotify',
            label: 'Listen on Spotify',
            className: 'spotify',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'
        },
        {
            key: 'Lyrics',
            label: 'Read Lyrics',
            className: 'lyrics',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4v16h2V4zm4 0v16h2V4zM5 8v8h2V8zm12 0v8h2V8z"/></svg>'
        }
    ];
    
    let hasAnyLink = false;
    
    for (const config of linkConfigs) {
        const url = song[config.key];
        if (url && url.trim() !== '' && isValidUrl(url)) {
            hasAnyLink = true;
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = `link-btn ${config.className}`;
            link.innerHTML = `${config.icon}<span>${config.label}</span>`;
            linksPanel.appendChild(link);
        }
    }
    
    linksPanel.style.display = hasAnyLink ? 'flex' : 'none';
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function displaySong(song) {
    if (!song) {
        showError('Song not found');
        return;
    }
    
    const eraBadge = document.getElementById('eraBadge');
    const songTitle = document.getElementById('songTitle');
    const songYear = document.getElementById('songYear');
    const songRegion = document.getElementById('songRegion');
    const detailEra = document.getElementById('detailEra');
    const detailComposer = document.getElementById('detailComposer');
    const detailYear = document.getElementById('detailYear');
    
    eraBadge.textContent = song.Era || 'Unknown Era';
    songTitle.textContent = song.Title || 'Untitled';
    songYear.textContent = song.Year || 'Unknown Year';
    songRegion.textContent = song.Region || 'Unknown';
    
    const composer = song['Composer/Artist'] && song['Composer/Artist'].trim() !== '' 
        ? song['Composer/Artist'] 
        : 'Unknown';
    
    detailEra.textContent = song.Era || 'Unknown Era';
    detailComposer.textContent = composer;
    detailYear.textContent = song.Year || 'Unknown Year';
    
    createLinkButtons(song);
    
    document.getElementById('resultSection').classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    
    const detailsPanel = document.getElementById('detailsPanel');
    detailsPanel.classList.add('hidden');
    document.getElementById('toggleDetails').classList.remove('active');
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
}

function validateYearInput(value) {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num <= 9999;
}

async function handleSearch() {
    if (isLoading) return;
    
    const yearInput = document.getElementById('yearInput');
    const eraSelect = document.getElementById('eraSelect');
    const yearValue = yearInput.value.trim();
    
    if (!yearValue) {
        showError('Please enter a year');
        yearInput.focus();
        return;
    }
    
    if (!validateYearInput(yearValue)) {
        showError('Please enter a valid year between 1 and 9999');
        yearInput.focus();
        return;
    }
    
    const yearNumber = parseInt(yearValue);
    const targetYear = eraSelect.value === 'BC' ? -yearNumber : yearNumber;
    
    if (parsedData.length === 0) {
        showError('Database not loaded. Please refresh the page.');
        return;
    }
    
    isLoading = true;
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    
    setTimeout(() => {
        const song = findClosestSong(targetYear);
        
        document.getElementById('loadingSpinner').classList.add('hidden');
        isLoading = false;
        
        if (song) {
            displaySong(song);
        } else {
            showError('No songs found in the database for the specified year');
        }
    }, 800);
}

function initializeEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const yearInput = document.getElementById('yearInput');
    const toggleDetailsBtn = document.getElementById('toggleDetails');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (yearInput) {
        yearInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
        
        yearInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    
    if (toggleDetailsBtn) {
        toggleDetailsBtn.addEventListener('click', () => {
            const detailsPanel = document.getElementById('detailsPanel');
            const isHidden = detailsPanel.classList.contains('hidden');
            
            detailsPanel.classList.toggle('hidden');
            toggleDetailsBtn.classList.toggle('active');
            
            const buttonText = toggleDetailsBtn.querySelector('span');
            if (buttonText) {
                buttonText.textContent = isHidden ? 'Hide Details' : 'Show Details';
            }
        });
    }
}

async function initializeApp() {
    const loadingSuccess = await loadCSVDatabase();
    
    if (loadingSuccess) {
        console.log(`Successfully loaded ${parsedData.length} songs from database`);
        initializeEventListeners();
    } else {
        console.error('Failed to initialize app: Could not load CSV database');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
