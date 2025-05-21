document.querySelector(".spotify").addEventListener("click", () => {

})

function logBack() {
    document.querySelector(".log-in").style.backgroundColor = "#ccc";
    document.querySelector(".log-in").style.color = "gray";
};

document.addEventListener('DOMContentLoaded', (event) => {
    const hoverElement = document.querySelector("main").querySelector("aside");
    const hoverimage = document.querySelector("aside").querySelector("img");

    hoverElement.addEventListener("mouseover", (event) => {
        hoverimage.style.display = "inline";
    });
    hoverElement.addEventListener("mouseout", (event) => {
        hoverimage.style.display = "none";
    });

});

searchCont2 = document.querySelector(".search-cont-2");

if (window.innerWidth < 1000) {
    document.querySelector(".search-icon").addEventListener("click", () => {
        if (searchCont2.style.display === "none") {
            searchCont2.style.display = "block";
            document.querySelector("aside").style.height = "calc(100vh - 18px - 80px - 55px)"
            document.querySelector(".song-list").querySelector("ol").style.height = "calc(100vmin - 80px - 18px - 131.6px - 80px - (30px) - 55px)"
            document.querySelector(".section-cont").style.height = "calc(100vh - 48px - 70px - 55px)"
            // document.getElementsByTagName("main").style.paddingtop = "70px";
        }
        else {
            searchCont2.style.display = "none";
        }

    });
}
else {
    searchCont2.style.display = "none";
}
window.addEventListener("resize", () => {
    if (window.innerWidth < 1000) {
        document.querySelector(".search-icon").addEventListener("click", () => {
            if (searchCont2.style.display === "none") {
                searchCont2.style.display = "block";
                document.querySelector("aside").style.height = "calc(100vh - 18px - 80px - 55px)"
                document.querySelector(".song-list").querySelector("ol").style.height = "calc(100vmin - 80px - 18px - 131.6px - 80px - (30px) - 55px)"
                document.querySelector(".section-cont").style.height = "calc(100vh - 48px - 70px - 55px)"
                // document.getElementsByTagName("main").style.paddingtop = "70px";
            }
            else {
                searchCont2.style.display = "none";
            }

        });
    }
    else {
        searchCont2.style.display = "none";
    }
})

function displaySongList() {
    document.querySelector(".song-list").style.display = "block";
    document.querySelector(".boxes").style.display = "none";
    document.querySelector(".cross").style.display = "inline"
};

if (window.innerWidth < 1000) {
    // document.querySelector(".menu").classList.add("pointer").add("flex-center")
    document.querySelector(".menu").addEventListener("click", (e) => {
        document.querySelector(".menu").style.display = "none"
        document.querySelector(".heading").querySelector("button").querySelector("img").style.display = "none";
        displaySongList();
        document.querySelector("aside").classList.add("open");
        document.querySelector("aside").style.left = "0%"

    });

    document.querySelector(".cross").addEventListener("click", (e) => {
        document.querySelector(".heading").querySelector("button").querySelector("img").style.display = "inline-block";
        document.querySelector("aside").style.left = "-100%";
        if(window.innerWidth < 1000) {
            document.querySelector(".menu").style.display = "inline";
        }
    });
}

else {
    document.querySelector(".song-list-img-button").addEventListener("click", () => {
        displaySongList()
    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".song-list").style.display = "none";
        document.querySelector(".boxes").style.display = "block";
        document.querySelector(".cross").style.display = "none"
    })
}


let currentSong = new Audio();
let songs;
let currentFolder;

function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    return `${formattedMins}:${formattedSecs}`;
}


function playMusic(music, pause = true) {

    currentSong.src = `${currentFolder}/` + music;

    console.log(music)

    if (pause) {
        currentSong.play();
         play.src = "svgs/play.svg";
    }

    // play.src = "svgs/pause.svg";

    document.querySelector(".song-info").innerHTML = decodeURI(music);
    document.querySelector(".song-time").getElementsByTagName("span")[0].innerHTML = "00:00 / 00:00";
}

async function getSongs(folder) {
    currentFolder = folder;
    try {
        let songList = await fetch(`http://127.0.0.1:5500/${currentFolder}/`);
        // if (!songs.ok) {
        //     throw new Error(`HTTP error! status: ${songs.status}`);
        // }
        let response = await songList.text(); // Or .json() if it's API data
        console.log(response);

        let div = document.createElement("div");
        div.innerHTML = response;

        let as = div.getElementsByTagName("a");
        console.log(as);

        // make a song list to store songs
        songs = [];
        for (let i = 0; i < as.length; i++) {                                //////////////////////////////
            const element = as[i];                                          //////////////////////////////
            if (element.href.endsWith(".mp3")) {                           //////////////////////////////                IMPORTANT
                songs.push(element.href.split(`/${currentFolder}/`)[1]); ///////////////////////////////
            }                                                           ///////////////////////////////
        };
        console.log(songs);
        // return songList;

    } catch (error) {
        console.error("Fetch error:", error);
    }

    // show all the songs in the playlist
    const songOL = document.querySelector(".song-list").getElementsByTagName("ol")[0];
    songOL.innerHTML = ""
    for (const song of songs) {
        songName = song.split("-")[0];
        singerName = song.split("-")[1];
        songFullName = `${songName}-${singerName}`

        console.log(songName, singerName, songFullName)

        songOL.innerHTML = songOL.innerHTML +
            `<li>
                <i class="fa-solid fa-music"></i>
                <div class="song-info-cont m-l-1">
                    <p>${songName.replaceAll("%20", " ")}</p>
                    <p>- ${singerName.replaceAll("%20", " ").replaceAll("%2C", " ").replaceAll("%26", " ").replace(".mp3", "")}</p>
                </div>
                <div class="play-cont">
                    <span> Play Now</span>
                    <i class="fa-solid fa-circle-play"></i>
                </div>
            </li>`;//<div> - ${singerName.replaceAll("%20", " ").replace(".mp3", "")}</div>
        //                             <img src="svgs/play.svg" class="pointer" id="play"></img>
    };

    // attach an event listiner to each song 
    Array.from(document.querySelector("aside").querySelector(".aside-cont").querySelector(".song-list").querySelector("ol").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", (evt) => {
            console.log(e.querySelector(".song-info-cont").querySelectorAll("p")[0].innerHTML);
            console.log(`${e.querySelector(".song-info-cont").querySelectorAll("p")[0].innerHTML.trim()} ${e.querySelector(".song-info-cont").querySelectorAll("p")[1].innerHTML.trim()}` + ".mp3"); //remove whitespace fromm start and end  
            playMusic(`${e.querySelector(".song-info-cont").querySelectorAll("p")[0].innerHTML.trim()} ${e.querySelector(".song-info-cont").querySelectorAll("p")[1].innerHTML.trim()}` + ".mp3"); //remove whitespace fromm start and end  
        });
    });

    return songs
};




async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(div)

    let anchors = div.getElementsByTagName("a");

    let cordContainer = document.querySelector(".card-cont")
    for (let e of anchors) {
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0];
            console.log(folder)

            try {
                let metaResponse = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
                let metadata = await metaResponse.json();
                console.log(metadata);

                cordContainer.innerHTML = cordContainer.innerHTML +
                    `<div data-folder="${folder}" class="card pointer m-1 p-1">
                    <div class="img">
                        <img src="songs/${folder}/cover.jpeg" alt=""  style="width: 100%; height: 100%;">
                        <span class="play pointer">
                            <i class="fa-solid fa-play"></i>
                        </span>
                    </div>
                    <div class="discription">
                        <span>${metadata.title}</span>
                        <a href="">${metadata.discription}</a>
                    </div>
                </div>`
                document.querySelector(".card").querySelector(".img").querySelector("span").classList.add("play")

            } catch (err) {
                console.error(`Error fetching metadata for folder ${folder}:`, err);
            }
        }
    }
    // load the library whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async (item) => {
            console.log(item, item.currentTarget.dataset)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0])
        })
    })
}


// make a function because getsongs will return a plromise 
async function main() {

    await displayAlbums()
    // get the list of all the songs
    await getSongs("songs/english");
    console.log(songs[0], false); //now print in async function

    playMusic(songs[0])

    // // play the first song
    // var audio = new Audio(songs[0]);
    // audio.play();

    // attach n event listiner to play next and previous
    play = document.getElementById("play");
    play.addEventListener("click", (evt) => {
        if (currentSong.paused) {
            currentSong.play();
        }
        else {
            currentSong.pause();
            play.src = "svgs/pause.svg";
        }
    });
    // listen for time update function /

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let clickPerc = e.offsetX * 100 / e.target.getBoundingClientRect().width;
        console.log(e.target, e.offsetX, e.target.getBoundingClientRect().width)//return target, click width and fullwidth
        document.querySelector(".circle").style.left = clickPerc + "%";
        currentSong.currentTime = currentSong.duration * clickPerc / 100;
    })





    // add an event listenor on privious and next 

    document.querySelector("#prev").addEventListener("click", (e) => {
        console.log("previous song")
        console.log(songs)
        // console.log(currentSong)
        // console.log(currentSong.src)
        console.log(currentSong.src.split(`${currentFolder}/`)[1])
        
        let currentSongIndex = songs.indexOf(`${currentSong.src.split("songs/")[1].replace(currentFolder, "").replace("/", "")}`)
        console.log(currentSongIndex) // fine index in song array
        
        if (currentSongIndex - 1 < 0) {
            // Wrap around to last song
            playMusic(songs[songs.length - 1])
        }
        else {
            playMusic(songs[currentSongIndex - 1])
        }
    })
    
    document.querySelector("#next").addEventListener("click", (e) => {
        console.log("next song")
        console.log(songs)
        console.log(currentSong.src.split(`${currentFolder}/`)[1])
        
        let currentSongIndex = songs.indexOf(currentSong.src.split(`${currentFolder}/`)[1])
        if (currentSongIndex + 1 >= songs.length) {
            // Wrap around to first song
            playMusic(songs[0])
        }
        else {
            playMusic(songs[currentSongIndex + 1])
        }
    })

    currentSong.addEventListener("timeupdate", (evt) => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".song-time").getElementsByTagName("span")[0].innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`;

        // ren the seekbar

        document.querySelector(".fill").style.width = currentSong.currentTime * 100 / currentSong.duration + "%";
        document.querySelector(".circle").style.left = currentSong.currentTime * 100 / currentSong.duration + "%";

    })

    currentSong.addEventListener("ended", () => {
        let currentSongIndex = songs.indexOf(currentSong.src.split("songs/")[1])
        if (currentSongIndex < songs.length) {
            playMusic(songs[currentSongIndex + 1])
        } else {
            console.log('Playlist finished');
        }
    })

    document.querySelector(".volume-cont").querySelector("input").addEventListener("change", (e) => {
        console.log(e, e.target, e.target.value);
        currentSong.volume = e.target.value / 100;

        let volImg = document.querySelector(".volume-cont").querySelector("img")
        if (e.target.value === 0) {
            volImg.src = "svgs/muted_volume.svg"
        }
        else if (e.target.value <= 25 && e.target.value > 0) {
            volImg.src = "svgs/low_volume.svg"
        }
        else if (e.target.value <= 75 && e.target.value > 25) {
            volImg.src = "svgs/medium_volume.svg"
        }
        else {
            volImg.src = "svgs/high_volume.svg"
        }
    });
    document.querySelector(".volume-cont").querySelector("img").addEventListener("click", (e) => {
        let volImg = document.querySelector(".volume-cont").querySelector("img")
        if (e.target.src == "svgs/muted_volume.svg") {
            volImg.src = "svgs/low_volume.svg"
            currentSong.volume = 0.1;
            document.querySelector(".volume-cont").getElementsByTagName("input")[0].value = 10
        }
        else {
            volImg.src = "svgs/muted_volume.svg"
            currentSong.volume = 0;
            document.querySelector(".volume-cont").getElementsByTagName("input")[0].value = 0

        }
    })

}
// console.log(songs)

main()














