
const btnUpload = document.getElementById('btnUpload');
const inpFile = document.getElementById("inpFile");
const comment = document.getElementById("comment");
btnUpload.addEventListener('click',e =>{
    const endpoint = "http://154.70.22.151:9020/upload";
    const formData = new FormData();

    for(const file of inpFile.files){
        formData.append("myFiles",file);
    }

    fetch(endpoint , {
        method:"POST",
        body: formData
    })
    .then((response) =>{
        console.log(response)
        if(response){
            comment.textContent ='👍Succesful Upload😊';
        }
    })
    .catch((err)=>{console.log(err)})
});


























const filenamesarea = document.querySelector('.filenames');

document.querySelectorAll('.drop-zone__input').forEach(inputElement =>{

    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click" ,e =>{
        inputElement.click();
    });
    //Handles Click events to ensure click to upload
    inputElement.addEventListener("change" , e =>{
        if(inputElement.files.length){
            updateThumbnail(dropZoneElement,inputElement.files)
        }
    })

    dropZoneElement.addEventListener('dragover',e =>{
         //1.Prevents the file from being shown as an image viewer
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });
    ['dragleave','dragend'].forEach(
        tye =>{
            dropZoneElement.addEventListener(tye ,e=>{
                dropZoneElement.classList.remove('drop-zone--over')
            })
        }
    );

    dropZoneElement.addEventListener('drop' ,e =>{
        //2.Prevents the file from being shown as an image viewer
        e.preventDefault();
        //This is the hoy grail of the file drag and drop functionality
        console.log(e.dataTransfer.files);
        if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement,e.dataTransfer.files)
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement,files){
    let thumbElement = dropZoneElement.querySelector('.drop-zone__thumb');

    if(dropZoneElement.querySelector(".drop-zone__prompt")){
        dropZoneElement.querySelector('.drop-zone__prompt').remove();
    }
    for(let i=0;i<files.length;i++){
        filenamesarea.append(`${i+1}.${files[i]['name']}`);
        filenamesarea.appendChild(document.createElement('br'))
    }
    //Create a thumnail element so as to manage the upload
    if(!thumbElement){
        thumbElement = document.createElement("div");
        thumbElement.classList.add('drop-zone__thumb');
        dropZoneElement.appendChild(thumbElement);
    }
    thumbElement.dataset.label = files[0].name


    //Show Thumbnail for the image if existant
    if(files[0].type.startsWith("image/")){
        const reader =  new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = () =>{
            thumbElement.style.backgroundImage = `url('${reader.result}')`;
        }
    }else{
        thumbElement.style.backgroundImage = null;
    }


}