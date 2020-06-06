document.querySelectorAll('.drop-zone__input').forEach(inputElement =>{
    const dropZoneElement = inputElement.closest(".drop-zone");
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
    })
});