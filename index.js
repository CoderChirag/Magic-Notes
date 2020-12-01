showNotes();

let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById("note-area");
    let notes = localStorage.getItem("notes")
    if (addTxt.value.trim() == ""){
        alert("Please Fill Up the Notes First");
    }
    else{
        if (notes == null){
            notesObj = []
        }
        else{
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
    }
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `
                <div class="notes-div">
                <h1 class="notes-head">Note ${index + 1}</h1>
                <div class="notes-content">
                    <p>${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn">Delete Note</button>
                </div>
                </div>`
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("click", function(){
    console.log(search.value);
    search.value = " ";
});
search.addEventListener("input", function(){
    console.log("Event Trigerred");
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("notes-div");
    if (inputVal != ""){
        console.log("we are here");
        Array.from(noteCards).forEach(function(element){
            let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
            if (cardTxt.includes(inputVal)){
                element.style.display = "inline-block";
            }
            else{
                element.style.display = "none";
            }
        });
    }
    else{
        Array.from(noteCards).forEach(function(element){
            element.style.display = "inline-block";
        });
    }
});
