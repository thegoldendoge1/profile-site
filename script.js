// ===== LIGHT PARALLAX =====

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  document.querySelector(".nebula").style.transform =
    `translate(${x}px,${y}px)`;
});

// ===== BREATHING NEBULA =====
setInterval(() => {
  const n = document.querySelector(".nebula");
  n.style.filter = `blur(${100 + Math.sin(Date.now()/1000)*10}px)`;
}, 50);

// Настройки Last.fm
const LASTFM_USER = 'TheGoldenDoge'; 
const LASTFM_API_KEY = '3564f0f79bee7b49abd8c20daaade073'; 

const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

async function updateLastFM() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        
        const track = data.recenttracks.track[0];
        const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
        
        const trackName = track.name;
        const artistName = track.artist['#text'];
        
        const image = track.image.find(img => img.size === 'large') || track.image[track.image.length - 1];
        const coverUrl = image['#text'] || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

        document.getElementById('lastfm-cover').src = coverUrl;
        document.getElementById('lastfm-track').textContent = trackName;
        document.getElementById('lastfm-artist').textContent = artistName;

        const statusEl = document.getElementById('lastfm-status');

        if (isPlaying) {
            statusEl.textContent = 'NOW PLAYING';
            statusEl.className = 'lastfm-status';
        } else {
            const uts = track.date.uts; 
            const timeAgo = getTimeAgo(uts);
            statusEl.textContent = timeAgo;
            statusEl.className = 'lastfm-status offline';
        }
    } catch (error) {
        console.error('Last.fm fetch error:', error);
        document.getElementById('lastfm-status').textContent = 'OFFLINE';
        document.getElementById('lastfm-track').textContent = 'Nothing found';
        document.getElementById('lastfm-artist').textContent = '';
    }
}

// Функция для перевода времени на английский с правильными окончаниями
function getTimeAgo(uts) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - uts;

    if (diff < 60) return 'JUST NOW';
    
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return minutes === 1 ? '1 MIN AGO' : `${minutes} MINS AGO`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours === 1 ? '1 HR AGO' : `${hours} HRS AGO`;
    
    const days = Math.floor(hours / 24);
    return days === 1 ? '1 DAY AGO' : `${days} DAYS AGO`;
}

// Запускаем
updateLastFM();
setInterval(updateLastFM, 30000);