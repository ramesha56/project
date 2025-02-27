// API URL
 let apiUrl = "https://dummyjson.com/recipes";

let mainContainer = document.getElementById("recipes");
let paginationContainer = document.getElementById("pagination");
let searchInput = document.getElementById("startSearch");
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let recipesData = [];

// Fetch API data
async function fetchApi() {
    try {
        if (recipesData.length > 0) return recipesData;
        let response = await fetch(apiUrl);
        let fetchData = await response.json();
        console.log(fetchData);
        
        recipesData = fetchData.recipes.slice(0, 30);
        return recipesData;
    } catch (error) {
        console.error("Error fetching API: ", error);
    }
}

// Display Recipes
let recipePerPage = 9;
let currentPage = 1;

function displayRecipes(data, page) {
    mainContainer.innerHTML = "";

    let start = (page - 1) * recipePerPage;
    let end = start + recipePerPage;
    let recipesToShow = data.slice(start, end);

    recipesToShow.forEach((recipe) => {
        let card = document.createElement("div");
        card.className = "card";

        let isInWishlist = wishlist.includes(recipe.id);
        let heartClass = isInWishlist ? "fa-solid fa-heart active" : "fa-regular fa-heart";

        card.innerHTML = `
            <img src="${recipe.image}" class="card-img" alt="${recipe.name}">
            <div class="card-body">
                <div class="title-id">
                    <h6 class="title" >${recipe.name}</h6>
                    <i class="${heartClass}" onclick="toggleWishlist(${recipe.id}, this)"></i> 
                </div>
                <div class="title-id">
                    <div id="id">${recipe.difficulty}</div>
                 <div id="difficulty">${recipe.mealType[0]}</div> 
                </div>
                <button onclick="viewDetails(${recipe.id})" class="btn btn-success view-recipe-btn">View Details <i class="fa-solid fa-eye"></i></button>
            </div>
        `;
        mainContainer.appendChild(card);
    });
}

// Pagination
function pageCounter(totalRecipes) {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(totalRecipes / recipePerPage);

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.disabled = i === currentPage;
        btn.className = "pagination-btn";
        btn.addEventListener("click", () => {
            currentPage = i;
            updatePage();
        });
        paginationContainer.appendChild(btn);
    }
}

// View Recipe Details Modal
async function viewDetails(recipeId) {
    let recipes = await fetchApi();
    let recipe = recipes.find((resId) => resId.id === recipeId);

    if (!recipe) return;

    document.getElementById("image").src = recipe.image;
    document.getElementById("title-name").innerText = recipe.name;

    let ingredientsList = recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("");
    document.getElementById("ingredients").innerHTML = ingredientsList;

    let instructionsList = recipe.instructions.map((ins) => `<li>${ins}</li>`).join("");
    document.getElementById("instruction").innerHTML = instructionsList;

    let modalElement = document.getElementById("recipeModal");
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Close Modal Function
function closeModal() {
    let modalElement = document.getElementById("recipeModal");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
}

// Update Page
async function updatePage() {
    let recipes = await fetchApi();
    let searchValue = searchInput.value.toLowerCase();

    let filteredRecipes = searchValue
        ? recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchValue))
        : recipes;

    displayRecipes(filteredRecipes, currentPage);
    pageCounter(filteredRecipes.length);
}

// Search Filter
searchInput.addEventListener("input", () => {
    currentPage = 1;
    updatePage();
});

// Toggle Wishlist Function
function toggleWishlist(recipeId, element) {
    let index = wishlist.indexOf(recipeId);

    if (index === -1) {
        wishlist.push(recipeId);
    } else {
        wishlist.splice(index, 1);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    element.classList.toggle("fa-solid");
    element.classList.toggle("fa-regular");
    element.classList.toggle("active");
}

// Display Wishlist Recipes
async function displayWishlist() {
    let recipes = await fetchApi();
    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    let filteredRecipes = recipes.filter((recipe) => wishlistData.includes(recipe.id));

    let wishlistContainer = document.getElementById("wishlist-recipes");
    wishlistContainer.innerHTML = "";

    if (filteredRecipes.length === 0) {
        wishlistContainer.innerHTML = "<p class='no-recipes'>No recipes in wishlist.</p>";
        return;
    }

    filteredRecipes.forEach((recipe) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${recipe.image}" class="card-img" alt="${recipe.name}">
            <div class="card-body">
                <h6 class="title" >${recipe.name}</h6>
                <p id="id">Difficulty: ${recipe.difficulty}</p>
                <button onclick="viewDetails(${recipe.id})" class="btn btn-success">View Details  <i class="fa-solid fa-eye"></i></button>
                <button onclick="removeFromWishlist(${recipe.id})" class="btn btn-danger"><i class="fa-solid fa-heart"></i></button>
            </div>
        `;
        wishlistContainer.appendChild(card);
    });
}

// Remove from Wishlist
function removeFromWishlist(recipeId) {
    wishlist = wishlist.filter(id => id !== recipeId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
}

// Fix Modal Backdrop & Scroll Issue
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("recipeModal");

    modal.addEventListener("hidden.bs.modal", function () {
        let modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "";
    });
});

// Load Initial Data
updatePage();

// Array of Chef's Tricks & Tips
const tipsTricks = [
    {
        title: "Perfectly Cooked Steak",
        text: "Let your steak rest after cooking to keep it juicy and flavorful.",
        img: "https://freedesignfile.com/upload/2018/07/Cartoon-cooking-chef-vector.jpg"
    },
    {
        title: "Fresh Herbs Trick",
        text: "Store herbs in a glass of water to keep them fresh longer.",
        img: "https://i.pinimg.com/736x/65/f2/f4/65f2f46b091b61362d8bc472bc82cccb.jpg"
    },
    {
        title: "Boost Flavor with Spices",
        text: "Toast your spices before using them for a richer taste.",
        img: "https://i.pinimg.com/736x/75/b5/6b/75b56b4612d3591ed1d865f4221cc7de.jpg"
    },
    {
        title: "Crispy French Fries",
        text: "Soak cut potatoes in cold water before frying to get crispy fries.",
        img: "https://i.pinimg.com/736x/d0/b2/51/d0b25196d4fdd14b4c36b764daf25c2c.jpg"
    },
    {
        title: "Keep Avocados Fresh",
        text: "Store cut avocados with onions to prevent browning.",
        img: "https://i.pinimg.com/736x/79/25/d0/7925d07f79d11e0ec080e7f3e4f932b8.jpg"
    },
    {
        title: "Perfectly Boiled Eggs",
        text: "Add a pinch of salt to the water to make peeling boiled eggs easier.",
        img: "https://i.pinimg.com/736x/5d/87/59/5d8759010fbf2519eca9d311fe0edc47.jpg"
    },
    {
        title: "Fluffy Pancakes",
        text: "Let the batter rest for 10 minutes before cooking for fluffier pancakes.",
        img: "https://i.pinimg.com/736x/09/ce/e7/09cee7451943d483372359922c46ef05.jpg"
    },
    {
        title: "Slice Meat Thinly",
        text: "Freeze meat for 15 minutes before slicing to get ultra-thin cuts.",
        img: "https://i.pinimg.com/736x/83/5b/4e/835b4ed9935871acf697fa40843fcd30.jpg"
    },
    {
        title: "Crispier Fried Food",
        text: "Coat food in cornstarch before frying for an extra crispy texture.",
        img: "https://i.pinimg.com/736x/15/e1/7d/15e17d87573a30b3eec5eadb58b87aa6.jpg"
    },
    {
        title: "Stop Onions from Making You Cry",
        text: "Chill onions in the fridge for 30 minutes before cutting to reduce tears.",
        img: "https://i.pinimg.com/736x/4b/50/b2/4b50b2742e707cd0450101e4ec5977bd.jpg"
    },
    {
        title: "Instant Buttermilk Substitute",
        text: "Mix milk with a spoon of vinegar or lemon juice to make buttermilk quickly.",
        img: "https://i.pinimg.com/736x/94/33/09/94330924cadb90ff98eb414c5ed80df1.jpg"
    },
    {
        title: "Soft Cookies for Days",
        text: "Store cookies with a slice of bread to keep them soft longer.",
        img: "https://i.pinimg.com/736x/62/03/50/62035078349bb7ce1f75301cf613c49f.jpg"
    },
    {
        title: "Juicier Burgers",
        text: "Press a thumbprint in the center of your burger patties to keep them flat when cooking.",
        img: "https://i.pinimg.com/736x/12/49/c5/1249c57e1a4a26374c0983854e962417.jpg"
    },
    {
        title: "Revive Stale Bread",
        text: "Sprinkle water on stale bread and bake at 350°F for 5 minutes to make it fresh again.",
        img: "https://i.pinimg.com/736x/2d/3c/d3/2d3cd31bb5b6995d1c7a41b058daeb67.jpg"
    },
    {
        title: "Speed Up Marinades",
        text: "Use a fork to poke holes in meat before marinating to absorb flavors faster.",
        img: "https://i.pinimg.com/736x/d0/ea/f5/d0eaf57a13ce78c057baa91a96210ffa.jpg"
    },
    {
        title: "Stop Pasta from Sticking",
        text: "Stir pasta in boiling water for the first two minutes to prevent sticking.",
        img: "https://i.pinimg.com/736x/5b/4d/b6/5b4db6b5d0b8424ee6756e1c3ca5219f.jpg"
    },
    {
        title: "Reheat Pizza the Right Way",
        text: "Place a glass of water in the microwave with your pizza slice to keep the crust crispy.",
        img: "https://i.pinimg.com/736x/43/81/41/43814118cfa2ae1edcd3d75f28dfcc6c.jpg"
    }
];

// Tips and trick
function displayRandomTips() {
    let container = document.getElementById("tips-Container");
    container.innerHTML = ""; 
    
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

let shuffledTips = shuffleArray(tipsTricks);

let selectedTips = shuffledTips.slice(0, 3);

// console.log(selectedTips); 
    
selectedTips.forEach(tip => {
        let tipCard = document.createElement("div");
        tipCard.className = 'tip-card'
        tipCard.innerHTML = `
            <img src="${tip.img}" alt="Chef Tip">
            <div class="tip-content">
                <h3>${tip.title}</h3>
                <p>${tip.text}</p>
            </div>
        `;
        container.appendChild(tipCard);
    });
}

displayRandomTips();




