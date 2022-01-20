document.addEventListener('DOMContentLoaded', function(){
    fetchImages();
    fetchBreeds();
})

// Retrieves images 
const fetchImages = () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
    .then(res => res.json())
    .then (results => {
    results.message.forEach(image => appendImageToDom(image))
    })     
}


// Adds fetched images to the DOM
const appendImageToDom = (image) => {
    const container = document.querySelector('#dog-image-container')
    let newImage = document.createElement('img')
    let newDiv = document.createElement('div');

    newDiv.setAttribute("class", "imageGrid")

    container.appendChild(newDiv);
    newDiv.appendChild(newImage);
    newImage.src = image;
       
}

// retrieves breed types 
const fetchBreeds = () => {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(res => res.json())
    .then(results => { 
        let breeds = Object.keys(results.message)
        updateBreedList(breeds)

        let breedDropdown = document.querySelector('#breed-dropdown')
        breedDropdown.addEventListener('change', function(e) {
            let filterValue = e.target.value;

            let filteredBreeds = breeds.filter(breed => breed[0] === filterValue);
            updateBreedList(filteredBreeds);
        })
    })
}
// updates breed list 
    const updateBreedList = (breeds) => {
        let ul = document.querySelector('#dog-breeds')
        ul.innerHTML = '';

        breeds.forEach(breed => appendBreedToDom(breed))
}

 // Adds breeds to the DOM
const appendBreedToDom = (breed) => {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')

    li.innerHTML = breed;
    ul.appendChild(li);
    li.addEventListener('click', updateBreedColor)
}

// Updates color upon click
const updateBreedColor = (event) => {
    event.target.style.color = 'purple'
}