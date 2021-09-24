let body = document.querySelector("body");

let video = document.querySelector("video");
let vidBtn = document.querySelector("button#record");
let capBtn = document.querySelector("button#capture");
let gallerybtn = document.querySelector("#gallery");

let constraints = { video: true, audio: true };
let chunks = [];
let mediaRecorder;
let isRecording = false;

let filters = document.querySelectorAll(".filters");
let zoomIn = document.querySelector(".zoom-in");
let zoomOut = document.querySelector(".zoom-out");

let filter = "";
let maxZoom = 3;
let minZoom = 1;
let currZoom = 1;

gallerybtn.addEventListener("click", function () {
    location.assign("gallery.html");
})


for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", function (e) {
        filter = e.currentTarget.style.backgroundColor;
        removeFilter();
        applyFilter(filter);
    })
}

zoomIn.addEventListener("click", function (e) {
    console.log(video.style.transform)
    let vidCurrScale = video.style.transform.split("(")[1].split(")")[0];
    if (vidCurrScale > maxZoom) {
        return;
    } else {
        currZoom = Number(vidCurrScale) + 0.1;
        video.style.transform = `scale(${currZoom})`;
    }
})
zoomOut.addEventListener("click", function (e) {
    if (currZoom > minZoom) {
        currZoom -= 0.1;
        video.style.transform = `scale(${currZoom})`;
    }
})

vidBtn.addEventListener("click", function (e) {
    let innerDiv = vidBtn.querySelector("div");
    console.log(innerDiv)
    if (isRecording) {
        // stops media recorder 
        mediaRecorder.stop();
        isRecording = false;
        innerDiv.classList.remove("record-animation");
    } else {
        mediaRecorder.start();
        // we need to remove filter so that filter is not applied on video
        filter = "";
        removeFilter();
        currZoom = 1;
        video.style.transform = `scale(1)`;
        isRecording = true;
        innerDiv.classList.add("record-animation");
    }
})
// whenever capture button is clicked call capture function that downloads image
capBtn.addEventListener("click", function () {
    let innerDiv = capBtn.querySelector("div");
    innerDiv.classList.add("capture-animation");
    //here class is removed before 0.5 second so that we are on safe side and after triggering animation the class gets removed
    // also if we do not use setTimeout the class will be removed instantly and we will not be alble to see the changes
    setTimeout(function () {
        innerDiv.classList.remove("capture-animation");
    }, 400)
    capture();
})
navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
        //mediaStream stores whatever camera is viewing and its source is set to the thing that is viewed by camera
        video.srcObject = mediaStream;
        // video will take both the things
        // audio will take only audio part and ignores the video from mediaStream
        mediaRecorder = new MediaRecorder(mediaStream);
        // when data comes from mediastream to mediarecorder it runs .. It did not run instantly but when ddata comes
        mediaRecorder.addEventListener("dataavailable", function (e) {
            chunks.push(e.data);
        })
        mediaRecorder.addEventListener("stop", function (e) {
            //combines all chunks into 1 large raw data
            let blob = new Blob(chunks, { type: "video/mp4" });
            addMedia("video", blob);
            //empty chunks
            chunks = [];

            // for downloading video   see here we do not append anchor tag to the body but still it works
            // let url = URL.createObjectURL(blob);
            // let a = document.createElement("a");
            // a.href = url;
            // a.download = "video.mp4";
            // a.click();
            // a.remove();
        })
    });

function capture() {
    let c = document.createElement("canvas");
    //canvas height is set to "playing" video's height not video tag 
    c.height = video.videoHeight;
    c.width = video.videoWidth;
    let ctx = c.getContext("2d");

    // the below 3 lines are so that we are able to zoom the image on canvas and save that zoomed image
    // we need to zoom at center so translate need to be done
    ctx.translate(c.width / 2, c.height / 2);
    ctx.scale(currZoom, currZoom);
    // we need to translate back so tat image is drawn from (0,0)
    ctx.translate(-c.width / 2, -c.height / 2);

    // drawImage can also take video tag instead of image, difference is that it captures the instant of video when drawImage is called
    ctx.drawImage(video, 0, 0);
    if (filter != "") {
        ctx.fillStyle = filter;
        ctx.fillRect(0, 0, c.width, c.height);
    }
    // for downloading image
    // let a = document.createElement("a");
    // // toDataURL() - it converts everything drawn on canvas and gives that to us in one shot
    // a.href = c.toDataURL();
    addMedia("img", c.toDataURL());
    // a.download = "image.jpg";
    // a.click();
    // a.remove();
}
function removeFilter() {
    // select the appended filterDiv
    let filterDiv = document.querySelector(".filter-div");
    if (filterDiv) {
        filterDiv.remove();
    }
}
function applyFilter(filterColor) {
    let filterDiv = document.createElement("div");
    filterDiv.classList.add("filter-div");
    filterDiv.style.backgroundColor = filterColor;
    body.append(filterDiv);
}