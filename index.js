// Get the Select/Upload button for file selection/upload
const selectOrUploadBtn = document.querySelector('.select-img-btn');

// Get the file input element for selecting an image
const inputFile = document.querySelector('#file');

// Get the area where the image preview will be shown before uploading
const imgArea = document.querySelector('.img-area');

// Get the container where the gallery of images will be displayed
const imgGalleryContainer = document.querySelector('.image-container');

// Get all images already present in the gallery (if any)
let galleryImages = document.querySelectorAll('.image-imgContainer img');

// Initialize an array to store the image data (URL, title, description)
const imageArr = [
    {
        "URL": "images/img-1.jpg",
        "title": "Yellow",
        "description": "Fluffy, yellow, and cute"
    },
    {
        "URL": "images/img-2.svg",
        "title": "Yum",
        "description": "It's the most wonderful time of the year"
    },
    {
        "URL": "images/img-3.png",
        "title": "Corn",
        "description": "Grown worldwide"
    },
    {
        "URL": "images/img-4.jpg",
        "title": "Marine Mammal",
        "description": "Intelligent, playful, friendly"
    },
    {
        "URL": "images/img-5.jpg",
        "title": "Bushy tails",
        "description": "With a hint of nut-hoarding habits"
    },
    {
        "URL": "images/img-6.png",
        "title": "Noodles",
        "description": "Wanna some?"
    },
    {
        "URL": "images/img-7.svg",
        "title": "Penguin Love",
        "description": "Mate for life"
    },
    {
        "URL": "images/img-8.jpg",
        "title": "Bold",
        "description": "Built for any storm"
    },
    {
        "URL": "images/img-9.png",
        "title": "BFF",
        "description": "A timeless chase"
    },
    {
        "URL": "images/img-10.svg",
        "title": "Baby Shark",
        "description": "To-do, to-do, do-do"
    },
    {
        "URL": "images/img-11.jpg",
        "title": "Orange",
        "description": "Philosophy"
    },
    {
        "URL": "images/img-12.svg",
        "title": "Vacation",
        "description": "Paradise"
    },
    {
        "URL": "images/img-13.png",
        "title": "Grilled",
        "description": "Eggs-tremely flavorful"
    },
    {
        "URL": "images/img-14.jpg",
        "title": "Coffee",
        "description": "The world can wait"
    },
    {
        "URL": "images/img-15.png",
        "title": "Hamburger",
        "description": "How is it connected to Hamburg?"
    },
    {
        "URL": "images/img-16.svg",
        "title": "Party",
        "description": "Ready to pop some fun?"
    },
    {
        "URL": "images/img-17.jpg",
        "title": "Topped with syrup",
        "description": "Warm stacks of happiness"
    },
    {
        "URL": "images/img-18.svg",
        "title": "Nature’s smile",
        "description": "Bright and colorful beauty"
    },
    {
        "URL": "images/img-19.png",
        "title": "Pink",
        "description": "Touch of sweetness"
    },
    {
        "URL": "images/img-20.jpg",
        "title": "Timeless",
        "description": "Speak what words cannot"
    }
];

// Add click listener on reset button to reload the page and reset everything
document.querySelector('.reset-btn .btn').onclick = () => {
    window.location.reload();
};

// Function to render the image gallery dynamically from an array
function renderGallery(images) {
    // Clear the gallery container before re-rendering
    imgGalleryContainer.innerHTML = '';

    // Update the image count display
    document.getElementById('galleryCounter').textContent = `Images: ${images.length}`;

    // Loop through each image object and create a card
    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'image-card';

        // Create card HTML structure with image, title, description, and buttons
        card.innerHTML = `
            <img src="${img.URL}" alt="${img.title}" />
            <h3 class="galleryCardHeading">${img.title}</h3>
            <p class="imgDescription">${img.description}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
            <button class="update-btn" data-index="${index}">Update Image</button>
        `;

        // Handle remove button click to remove image from array and re-render gallery
        card.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            images.splice(index, 1); // Remove the image from array
            renderGallery(images); // Re-render the gallery
        });

        // Handle update button click to prompt for new title/description
        card.querySelector('.update-btn').addEventListener('click', (e) => {
            e.stopPropagation();

            // Prompt user to enter new title
            let newTitle = prompt("Enter new title:", img.title)?.trim();
            // Keep asking if title is empty
            while (!newTitle) {
                // Check if user pressed Cancel
                if(newTitle === null || newTitle === undefined) {return;}
                newTitle = prompt("Enter new title (required):")?.trim();
            }

            // Prompt user to enter new description
            let newDesc = prompt("Enter new description:", img.description)?.trim() || '';
            // If description required: keep asking if description is empty
            // while (!newDesc) {
            //     // Check if user pressed Cancel
            //     if(newDesc === null || newDesc === undefined) {return;}
            //     newDesc = prompt("Enter new description (required):")?.trim();
            // }

            // Update the image details in the array
            images[index].title = newTitle;
            images[index].description = newDesc;

            // Re-render the updated gallery
            renderGallery(images);
        });

        // Add the card to the gallery container
        imgGalleryContainer.appendChild(card);
    });

    // Bind click-to-expand image popup functionality after rendering gallery
    setupImagePop();
}
// Store image data for upload
let selectedImageDataURL = '';
// Add event listener to Select/Upload button for triggering file selection dialog
selectOrUploadBtn.addEventListener('click', () => {
    // Trigger file selection dialog if the button is in "select" mode
    if (selectOrUploadBtn.classList.contains('select-img-btn')) {
        inputFile.click();
    } else if (selectOrUploadBtn.classList.contains('upload-img-btn')) {
    const titleInput = document.getElementById('imageTitle');
    const descInput = document.getElementById('imageDesc');
    const title = titleInput.value.trim();
    const description = descInput.value.trim() || '';

    if (!title) {
        alert("Please enter an image title.");
        titleInput.focus();
        return;
    }
    // if not optional
    // if (!description) {
    //     alert("Please enter an image description.");
    //     descInput.focus();
    //     return;
    // }

    imageArr.unshift({
        URL: selectedImageDataURL,
        title: title,
        description: description
    });

    renderGallery(imageArr);
    setupImagePop();

    imgArea.innerHTML = `
            <i class='bx bxs-cloud-upload icon'></i>
            <p>Image size must be less than <span>2MB</span></p>
        `;
    imgArea.classList.remove('active');

    titleInput.value = '';
    descInput.value = '';
    inputFile.value = '';

    selectOrUploadBtn.textContent = "Select Image";
    selectOrUploadBtn.classList.remove('upload-img-btn');
    selectOrUploadBtn.classList.add('select-img-btn');
}
});

// Handle file selection
inputFile.addEventListener('change', function () {
    const image = this.files[0];
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            selectedImageDataURL = reader.result;
            imgArea.innerHTML = `<img src="${selectedImageDataURL}">`;
            selectOrUploadBtn.textContent = "Upload Image";
            selectOrUploadBtn.classList.remove('select-img-btn');
            selectOrUploadBtn.classList.add('upload-img-btn');
        };
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
});

// Function to handle image popup display when clicked in the gallery
function setupImagePop() {
    const imagePop = document.querySelector('.image-popup');
    const galleryImages = document.querySelectorAll('.image-container .image-card img');

    // Loop through all gallery images to add click functionality
    galleryImages.forEach(img => {
        img.onclick = () => {
            // Clone the clicked image card to show in popup
            const card = img.closest('.image-card');
            const clonedCard = card.cloneNode(true);
            imagePop.innerHTML = '';
            imagePop.appendChild(clonedCard);
            imagePop.style.display = 'flex';

            // Get the index of the clicked image in the gallery
            const index = [...imgGalleryContainer.children].indexOf(card);

            // Remove the image from array when remove button in popup is clicked
            clonedCard.querySelector('.remove-btn').onclick = () => {
                imageArr.splice(index, 1);
                renderGallery(imageArr);
                imagePop.style.display = 'none';
            };

            // Update the image details when update button in popup is clicked
            clonedCard.querySelector('.update-btn').onclick = () => {
                const newTitleInput = prompt("New Title:");
                const newDescInput = prompt("New Description:");
                // Show alert for empty input
                // const newTitle = newTitleInput.length > 0 ? newTitleInput : alert('Image Title is required!');
                // const newDesc = newDescInput.length > 0 ? newDescInput : alert('Image Description is required!');
                let newTitle = newTitleInput.trim();
                let newDesc = newDescInput.trim();
                while (!newTitle) {
                    // Check if user pressed Cancel
                    if(newTitle === null || newTitle === undefined) {return;}
                    newTitle = prompt("Enter new title (required):")?.trim();
                    newDesc = prompt("Enter new description (optional):")?.trim() || '';
                }
                //update the image array data
                imageArr[index].title = newTitle;
                imageArr[index].description = newDesc;

                renderGallery(imageArr);
                imagePop.style.display = 'none';
            };
        };
    });

    // Close the popup when clicked outside the popup
    imagePop.onclick = (e) => {
        if (e.target === imagePop) {
            imagePop.style.display = 'none';
        }
    };
}

// Initialize gallery rendering
renderGallery(imageArr);