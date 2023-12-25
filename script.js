const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = ['Eminem-Believe',
'Eminem-Lock It Up',
'Eminem-Lose Yourself',
'NF-The search',
'NF-When I grow up'
];

// Song tracking

let songIndex = 1;

loadSongs(songs[songIndex]);

// Load Songs Function

function loadSongs(song) {
    title.innerText= song;
    audio.src = `musics/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play Song Function

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('.fa-solid').classList.add('fa-pause');
    playBtn.innerHTML = `
    <i class="fa-solid fa-pause" style="color: #212529; font-size: 2.4rem"></i>
    `

    audio.play();
};

// Pause Song Function

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fa-solid').classList.remove('fa-pause');
    playBtn.querySelector('.fa-solid').classList.add('fa-play');

    audio.pause();
}

// Previous Song Function

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSongs(songs[songIndex]);

    playSong();
}

// Next Song Function

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSongs(songs[songIndex]);

    playSong();
}

// Update Progress Function

function updateProgress(e) {
    const {duration, currentTime} = e.target
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`
}

// Set Progress Function

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// --------------------Event listeners--------------------

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change Song

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song Update

audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar

progressContainer.addEventListener('click', setProgress);

// Song ends

audio.addEventListener('ended', nextSong);