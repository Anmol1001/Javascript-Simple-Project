let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let playingGif = document.getElementById("playingGif");
let songItem = Array.from(document.getElementsByClassName('song-item'));
let mainSong = document.getElementById('mainSong')

let songs = [
    {songName : "Always Somewhere", filepath: "songs/2.mp3", coverPath :"covers/1.jpg"},
    {songName : "Rhythm of love", filepath: "songs/2.mp3", coverPath :"covers/2.jpg"},
    {songName : "Send me an angel", filepath: "songs/3.mp3", coverPath :"covers/3.jpg"},
    {songName : "Still loving you", filepath: "songs/4.mp3", coverPath :"covers/4.jpg"},
    {songName : "Wing of change", filepath: "songs/5.mp3", coverPath :"covers/5.jpg"},
    {songName : "You Heard Me", filepath: "songs/1.mp3", coverPath :"covers/6.jpg"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Handle play and pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playingGif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playingGif.style.opacity= 0;
 
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove("fa-circle-pause");
       element.classList.add("fa-circle-play");
})
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        mainSong.innerText = songs[songIndex].songName;
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.add("fa-circle-pause");
        e.target.classList.remove("fa-circle-play");
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
    })
})

document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mainSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
})

document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mainSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
})