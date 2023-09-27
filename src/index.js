console.log('%c HI', 'color: firebrick')

//globals
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dogImageContainer = document.querySelector('#dog-image-container');
const dogBreedsUl = document.querySelector('#dog-breeds');
const breedDropdown = document.querySelector('#breed-dropdown');

document.addEventListener("DOMContentLoaded", function() {
    loadImages();
    loadBreeds();

    breedDropdown.addEventListener('change', function() {
        const letterSelect = breedDropdown.value;
        filterAndDisplayBreeds(letterSelect);
    })
});


function loadImages () {
    fetch(imgUrl)                       //Kim - this is raw ingredients sent to the server
    .then(response => response.json())  //this is the kitchen that translates the ingredients to edible food
    .then(dogImgs => {                  //This is edible food
        // console.log(dogImgs)
            dogImgs.message.forEach(dog => {
                displayDogImages(dog)
            })
    })
}

function displayDogImages(dog) {
    const img = document.createElement('img')
    img.src = dog
    img.alt = "A cute Dog"
    img.style.width = "25%";
    dogImageContainer.appendChild(img)
}


function loadBreeds () {
    fetch(breedUrl)                       
    .then(response => response.json())  
    .then(dogBreeds => {                  
        Object.keys(dogBreeds.message).forEach(breed => {
            displayDogBreeds(breed)
        })
        })
    }
function displayDogBreeds(dogBreed) {
    const li = document.createElement('li')
    li.textContent = dogBreed
    li.addEventListener('click', changeColor)
    dogBreedsUl.appendChild(li)
}
const changeColor = (e) => {
    e.target.style.color = "blue"
}
function filterAndDisplayBreeds(letterSelect) {
    fetch(breedUrl)
    .then(response => response.json())
    .then(dogBreeds => {
        dogBreedsUl.innerHTML = ''
        let allBreeds = Object.keys(dogBreeds.message);
        let filteredBreeds;
        if (letterSelect === "all") {
            filteredBreeds = allBreeds;
        } else {
            filteredBreeds = allBreeds.filter(breed => breed.startsWith(letterSelect))
        }
        filteredBreeds.forEach(breed=> {
            displayDogBreeds(breed)
    })
    })
}





