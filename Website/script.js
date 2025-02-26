import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Navbar Avatar 
const navbar = document.querySelector(".navbar");


const avatarContainer = document.createElement("div");
avatarContainer.id = "user-avatar";
avatarContainer.style.cursor = "pointer";
// avatarContainer.style.background = "#ff9800";
avatarContainer.style.background = "#ffe604fb";
avatarContainer.style.color = "rgb(28, 78, 8)";
avatarContainer.style.width = "40px";
avatarContainer.style.height = "40px";
avatarContainer.style.display = "flex";
avatarContainer.style.alignItems = "center";
avatarContainer.style.justifyContent = "center";
avatarContainer.style.borderRadius = "50%";


const navbarRight = document.createElement("div");
navbarRight.classList.add("navbar-right");

navbarRight.appendChild(document.querySelector(".hamburger"));
navbarRight.appendChild(avatarContainer);

navbar.appendChild(navbarRight);


//  Authentication 
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const email = user.email;
        const firstLetter = email.charAt(0).toUpperCase();
        avatarContainer.textContent = firstLetter;
        avatarContainer.addEventListener("click", () => {
           //  window.location.href = "/profile.html";
            console.log("Redirecting to profile page");
window.location.replace('Website/profile.html');

        });
    } else {
        avatarContainer.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Ensure modals are hidden on page load
    document.querySelector("#overlay").style.display = "none";
    document.querySelector("#login-overlay").style.display = "none";

    // Signup Modal
    const openSignup = document.querySelector("#open-card");
    const closeSignup = document.querySelector("#close-card");
    const signupOverlay = document.querySelector("#overlay");

    openSignup.addEventListener("click", () => signupOverlay.style.display = "flex");
    closeSignup.addEventListener("click", () => signupOverlay.style.display = "none");

    // Login Modal
    const openLogin = document.querySelector("#open-login");
    const closeLogin = document.querySelector("#close-login");
    const loginOverlay = document.querySelector("#login-overlay");

    openLogin.addEventListener("click", () => loginOverlay.style.display = "flex");
    closeLogin.addEventListener("click", () => loginOverlay.style.display = "none");
});



// Function  toast notification 
function showToast(message, type = "success") {

    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.style.position = "fixed";
        toastContainer.style.top = "20px";
        // toastContainer.style.right = "20px";
        toastContainer.style.left = "50%";  
        toastContainer.style.transform = "translateX(-50%)"; 
        toastContainer.style.zIndex = "10000";
        document.body.appendChild(toastContainer);
    }

    // Create the toast element
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545"; // Green for success, Red for error
    toast.style.color = "#fff";
    toast.style.padding = "15px 20px";
    toast.style.borderRadius = "8px";
    toast.style.marginBottom = "10px";
    toast.style.minWidth = "250px";
    toast.style.fontFamily = "'Chakra Petch', sans-serif";
    toast.style.fontSize = "14px";
    toast.style.display = "flex";
    toast.style.justifyContent = "space-between";
    toast.style.alignItems = "center";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.5s ease";

    
    toastContainer.appendChild(toast);

    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000); 
}

// Signup Form
document.querySelector("#signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const signupOverlay = document.querySelector("#overlay");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            phone: phone,
            email: email
        });

        showToast("Sign-Up Successful! Now log in.", "success");
        e.target.reset();
        if (signupOverlay) signupOverlay.style.display = "none";

        setTimeout(() => {
            const loginModal = document.querySelector("#login-overlay");
            if (loginModal) {
                loginModal.style.display = "flex";
                console.log("Login modal opened successfully!");
            } else {
                console.log("Login modal not found!");
            }
        }, 100);

    } catch (error) {
        showToast(error.message, "error");
    }
});

// Login Form
document.querySelector("#login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showToast("Login Successful!", "success");
        window.location.replace('Website/profile.html');
    } catch (error) {
        showToast(error.message, "error");
    }
});




















// navbar click

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
window.addEventListener("resize", function() {
  if (window.innerWidth <= 768) {
      document.querySelector(".logo-container").style.justifyContent = "flex-start";
  } else {
      document.querySelector(".logo-container").style.justifyContent = "center";
  }
});
// navbar end

///////seacrch

  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.getElementById('search');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            alert('Please enter a recipe name to search.');
        }
    });
});
///////seacrch end





// add recipes 
document.getElementById("recipe-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("recipe-title").value;
    const description = document.getElementById("recipe-description").value;
    const imageInput = document.getElementById("recipe-image");

    let imageURL = "";
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;
            saveRecipe(title, description, imageURL);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveRecipe(title, description, imageURL);
    }

    document.getElementById("recipe-form").reset();
});

// Function to save recipe to localStorage
function saveRecipe(title, description, image) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const newRecipe = { title, description, image };
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Show toast message
    const toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3000);
}



