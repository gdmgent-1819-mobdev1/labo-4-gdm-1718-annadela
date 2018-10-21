//CLASS MET GEGEVENS PERSONEN
class Profile {
    constructor(chose, foto, naam, voornaam, leeftijd, woonplaats) {
        this.chose = chose;
        this.foto = foto;
        this.naam = naam;
        this.voornaam = voornaam;
        this.leeftijd = leeftijd;
        this.woonplaats = woonplaats;

    }
};

//VARIABELES
let person;
let resultaat;
let newPerson;
let clickCounter = 0;
let profileCounter = 0;
let list;
let gettingProfile;
let changeProfile;

// HET PLAATSEN IN DE LOCAL STORAGE VAN MENSEN
function getProfiles(count) {
    fetch('https://randomuser.me/api/?results=' + count)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            resultaat = myJson.results;


            for (let i = 0; i < resultaat.length; i++) {
                // console.log(i);
                // console.log(JSON.stringify(myJson.results[i]));
                person = new Profile('none', resultaat[i].picture.large, resultaat[i].name.first, resultaat[i].name.last, resultaat[i].dob.age, resultaat[i].location.city);
                localStorage.setItem(i + profileCounter, (JSON.stringify(person)));
            };
            loadprofile(profileCounter);
        })

};


//ALLEEN MAAR ALS ER NIETS STAAT IN DE LOCALSTORAGE MAG ER GESCHREVEN WORDEN
if (!(localStorage.getItem(0))) {
    getProfiles(10);
} else {
    loadprofile(profileCounter);
    console.log('geen overschrijving');
};

//HET INLADEN VAN EEN PROFIEL OP SCHERM
function loadprofile(key) {
    // console.log(profileCounter);
    // console.log(JSON.parse(localStorage.getItem(key)));
    newPerson = JSON.parse(localStorage.getItem(key));
    document.getElementById("picture").src = newPerson.foto;
    let gegevens = document.getElementById("gegevens");
    gegevens.innerHTML = `<h2>${newPerson.naam + ' ' + newPerson.voornaam}</h2><br><p>${newPerson.leeftijd} jaar</p><br><p>woont in ${newPerson.woonplaats}</p>`;

};
// console.log(getProfiles);

// COUNTER CHECK CLICKS
function checkClicks() {
    clickCounter++;

    if (clickCounter > 8) {
        clickCounter = 0;
        getProfiles(10);

    } else {
        loadprofile(profileCounter);
    };
};

function choose(like) {
    let person = JSON.parse(localStorage.getItem(profileCounter));
    // console.log(person.chose);
    if (like == 'liked') {
        person.chose = "liked";
    } else {
        person.chose = "disliked"
    };
    localStorage.setItem(profileCounter, (JSON.stringify(person)));
    profileCounter++
    checkClicks();
};

// BIJ KLIK VOLGENDE PERSOON + bestig in localstorage
document.getElementById('like').addEventListener('click', function () {
    choose('liked');
});
document.getElementById('dislike').addEventListener('click', function () {
    choose('dislike');
});

//clik on list button
document.getElementById('list').addEventListener('click', opinions);

//create list
function opinions(){
    let listPersonLikes = document.getElementById("personLikes");
    let listPersonDislikes = document.getElementById("personDislikes");
    listPersonLikes.innerHTML = 'Likes';
    listPersonDislikes.innerHTML = 'Dislikes';
    console.log('cliked');
    for(let i = 0; i < localStorage.length; i++){
        let gettingProfile = JSON.parse(localStorage.getItem(i));
        if(gettingProfile.chose === 'liked'){
            listPersonLikes.innerHTML += `<li class="personList"> <img src="${gettingProfile.foto}" class='littlePicture' alt="profile picture"><div class="littleBox"><h3>${gettingProfile.voornaam + ' ' + gettingProfile.naam}</h3></br><p class="leeftijd">${gettingProfile.leeftijd}</p> </br> <p>${gettingProfile.woonplaats}</br><button class="likeList" id="key ${i}"><i id="dislikeIcon" class="far fa-frown-open"></i></button></div> </li>`
        }else if(gettingProfile.chose === 'disliked'){
            listPersonDislikes.innerHTML += `<li class="personList"> <img src="${gettingProfile.foto}" class='littlePicture' alt="profile picture"><div class="littleBox"><h3>${gettingProfile.voornaam + ' ' + gettingProfile.naam}</h3></br><p class="leeftijd">${gettingProfile.leeftijd}</p> </br> <p>${gettingProfile.woonplaats}</br><button class="likeList" id="key ${i}"><i id="likeIcon" class="far fa-grin-alt"></i></button> </li>`;
        }
    }
};

document.getElementById("personLikes").addEventListener("click", function(e) {
    //er wordt gekeken of er geklikt is op een i-element
    if(e.target && e.target.nodeName == "BUTTON"){
        let newKey = e.target.id;
        console.log(newKey);
        let number = parseInt(newKey.substr(3));
        console.log(number);
        let gettingProfile = JSON.parse(localStorage[number]);
        let choseChange = gettingProfile.chose
        //switch van like naar dislike of dislike naar like
        if(choseChange == "liked"){
            choseChange = "disliked";
        }else if(choseChange == "disliked"){
            choseChange = "liked";
        }
        //plaatst nieuwe keuze in de localStorage
        gettingProfile.chose = choseChange;
        console.log(gettingProfile);
        let dataPerson = JSON.stringify(gettingProfile);
        localStorage[number] = dataPerson;

        console.log(gettingProfile);
        //refresht de personen
        opinions();
    }
})

document.getElementById("personDislikes").addEventListener("click", function(e) {
    //er wordt gekeken of er geklikt is op een i-element
    if(e.target && e.target.nodeName == "BUTTON"){
        let key = e.target.id;
        let res = parseInt(key.substr(3));
        let gettingProfile = JSON.parse(localStorage[res]);
        let choseChange = gettingProfile.chose
        //switch van like naar dislike of dislike naar like
        if(choseChange == "liked"){
            choseChange = "disliked";
        }else if(choseChange == "disliked"){
            choseChange = "liked";
        }
        //plaatst nieuwe keuze in de localStorage
        gettingProfile.chose = choseChange;
        console.log(gettingProfile);
        let dataPerson = JSON.stringify(gettingProfile);
        localStorage[res] = dataPerson;

        console.log(gettingProfile);
        //refresht de personen
        opinions();
    }
})

//knoppen reageren
function opinion(littleBtnsId){
    document.getElementById(littleBtnsId).addEventListener('click',function(){
        // console.log(littleBtnsId);
        // console.log(littleChoseId);
        if(littleBtnsId % 2){
            gettingProfile.chose = 'disliked';
            //zetten in localstorage
            console.log(gettingProfile);
            localStorage.setItem(littleChoseId, JSON.stringify(gettingProfile));
            //verwijder uit lijst likes en ga naar dislikes
            opinions();
            
        }else{
            console.log('dislike')
            gettingProfile.chose = 'liked';
            //zetten in localstorage
            localStorage.setItem(littleChoseId, JSON.stringify(gettingProfile));
            //verwijder uit lijst likes en ga naar dislikes
            opinions();
        }
    });
    
}

function classToggle() {
    if ( this.id == 'likeIcon') {
        if (document.getElementById("likeIcon").className == "far fa-grin-alt") {
            document.getElementById("likeIcon").className = "far fa-laugh-beam";
        } else {
            document.getElementById("likeIcon").className = "far fa-grin-alt";
        }

    }else if (this.id == 'dislikeIcon') {
        if (document.getElementById("dislikeIcon").className == "far fa-frown-open") {
            document.getElementById("dislikeIcon").className = "far fa-tired";
        } else {
            document.getElementById("dislikeIcon").className = "far fa-frown-open";
        }
    }

}

likeIcon.addEventListener('mouseover', classToggle);
likeIcon.addEventListener('mouseout', classToggle);
dislikeIcon.addEventListener('mouseover', classToggle);
dislikeIcon.addEventListener('mouseout', classToggle);


//drag image like or dislike
(function(){
    document.addEventListener('dragstart', dragStart, false);
    document.addEventListener('dragend', dragEnd, false);
    // document.addEventListener('dragover', dragOver, false);
    // document.addEventListener('drop', dragDrop, false);
}) ();

function dragStart(e){
    e.dataTransfer.setData("text",e.target.id);
    e.dataTransfer.dropEffect = "move";
}

function dragEnd(e){
    e.target.style.opacity = "";
    if(e.x >700){
        console.log('disliked');
        choose(dislike);
    }else{
        console.log('liked')
        choose('liked');
    }
}