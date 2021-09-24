// Database create / open
// Database ObjectSore => gallery
// Format:
// data={
//     mId: 454541654564,
//     type: "img"/"vid",
//     media: actual content (image=>c.toDataUrl, video => blob)
// }
let dbAccess;
let container = document.querySelector(".container");
let request = indexedDB.open("Camera",1);
request.addEventListener("success",function(){
    dbAccess = request.result;
})
request.addEventListener("upgradeneeded",function(){
    let db = request.result;
    db.createObjectStore("gallery",{keyPath:"mId"});
});
request.addEventListener("error",function(){
    alert("Some error occured");
});

function addMedia(type,media){
    let tx = dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    let data = {
        mId: Date.now(),
        type,
        media
    };
    galleryObjectStore.add(data);
}
function viewMedia(){
    console.log("hello");
    let tx = dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    let req = galleryObjectStore.openCursor();
    req.addEventListener("success",function(){
        let cursor = req.result;
        if(cursor){
            let div = document.createElement("div");
            div.classList.add("media-card");
            div.innerHTML = `<div class="media-card">
                                <div class="media-container"></div>
                                <div class="action-container">
                                    <button class="media-download">Download</button>
                                    <button class="media-delete" data-id="${cursor.value.mId}">Delete</button>
                                </div>
                            </div>`;
            let downloadBtn = div.querySelector(".media-download");
            let deleteBtn = div.querySelector(".media-delete");
            deleteBtn.addEventListener("click",function(e){
                let mId = e.currentTarget.getAttribute("data-id");
                e.currentTarget.parentElement.parentElement.parentElement.remove();
                deleteMediaFromDB(mId);
            })
            if(cursor.value.type=="img"){
                let img = document.createElement("img");
                img.classList.add("media-gallery");
                img.src = cursor.value.media;
                let mediaContainer = div.querySelector(".media-container");
                mediaContainer.appendChild(img);
                downloadBtn.addEventListener("click",function(e){
                    let a = document.createElement("a");
                    // a.href = img.src;// this will also work but (cursor.value.media) don't work as cursor may be not at that place
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.download = "image.jpg";
                    a.click();
                    a.remove();
                })
            }else{
                let video = document.createElement("video");
                video.classList.add("media-gallery");
                video.src = window.URL.createObjectURL(cursor.value.media);
                video.addEventListener("mouseenter",function(){
                    video.currentTime = 0;// sets video to 0;
                    video.play();//play the video when  mouse enters
                })
                video.addEventListener("mouseleave",function(){
                    video.pause();//pauses the video when  mouse leaves
                })
                video.controls = true;
                video.loop = true;
                let mediaContainer = div.querySelector(".media-container");
                mediaContainer.appendChild(video);
                downloadBtn.addEventListener("click",function(e){
                    let a = document.createElement("a");
                    // a.href = img.src;// this will also work but (cursor.value.media) don't work as cursor may be not at that place
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.download = "video.mp4";
                    a.click();
                    a.remove();
                })
            }
            
            container.appendChild(div);
            cursor.continue();
        }
    })
}
function deleteMediaFromDB(mId){
    let tx = dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    galleryObjectStore.delete(Number(mId));// as the mId is string but in DB it is Number
}
