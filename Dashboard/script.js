// Firebase import (Using Firebase v10)
import { auth, db } from "../Website/firebase.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Load user data on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUsers();  
    loadRecipes();
});

// Function to fetch users from Firestore and display them in the user details table
async function loadUsers() {
    const tableBody = document.querySelector("#user-table tbody"); 
    tableBody.innerHTML = ""; 
    try {
        // Fetching users from Firestore collection
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("Fetched users:", querySnapshot.size);

        querySnapshot.forEach((doc) => {
            const userData = doc.data();  
            console.log("User data:", userData); 

            const row = document.createElement("tr"); // Create new table row

            // Add delete button in each row for each user
            row.innerHTML = `
                <td>${userData.name || "N/A"}</td>
                <td>${userData.email || "N/A"}</td>
                <td>${userData.phone || "N/A"}</td>
                <td><button class="delete-btn" data-id="${doc.id}">Delete</button></td> <!-- Delete Button -->
            `;

            tableBody.appendChild(row); // Append row to the table

            // Add delete functionality for the user
            const deleteButton = row.querySelector(".delete-btn");
            deleteButton.addEventListener("click", async function () {
                const userId = this.getAttribute("data-id");
                console.log("Attempting to delete user with ID:", userId); // Log the user ID being deleted
                await deleteUser(userId, row); // Call the deleteUser function
            });
        });
    } catch (error) {
        console.error("Error fetching users:", error); // Handle any Firestore fetch errors
    }
}

// Function to delete user from Firestore and remove the row from the table
async function deleteUser(userId, row) {
    try {
        await deleteDoc(doc(db, "users", userId));  // Remove user document from Firestore
        row.remove();  // Remove the corresponding row from the table
        console.log("User deleted successfully:", userId);  // Log successful deletion
    } catch (error) {
        console.error("Error deleting user:", error); // Handle Firestore delete errors
        alert("Failed to delete user. Check Firestore rules and permissions.");
    }
}

// Load recipes from localStorage and display them
function loadRecipes() {
    const tableBody = document.querySelector("#orders tbody"); 
    const recipes = JSON.parse(localStorage.getItem("recipes")) || []; 

    tableBody.innerHTML = ""; 
    recipes.forEach((recipe, index) => {
        const row = document.createElement("tr"); 

        row.innerHTML = `
            <td>#00${index + 1}</td>
            <td>${recipe.title}</td>
            <td>${recipe.description}</td>
            <td><img src="${recipe.image}" alt="Recipe Image" width="50" height="50"></td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td> <!-- Delete Button -->
        `;

        tableBody.appendChild(row); // Append the row to the table

        // Add delete functionality for recipe
        row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteRecipe(index, row); 
        });
    });
}

// Function to delete recipe from localStorage and remove the row from the table
function deleteRecipe(index, row) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || []; // Get all recipes
    recipes.splice(index, 1); 
    localStorage.setItem("recipes", JSON.stringify(recipes)); 
    row.remove(); 
   alert("Recipe deleted successfully");
}









// Toggle Sidebar
function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("expanded");
}

// Show Sections
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");

    // Update active link
    document.querySelectorAll(".sidebar nav ul li a").forEach((link) => {
        link.classList.remove("active");
    });
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add("active");
}

