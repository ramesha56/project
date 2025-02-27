$(document).ready(function() {
    $('#btn').click(function() {
        $('.wave').css('display', 'block'); // Corrected 'dispay' to 'display'
        $('.center').fadeToggle(200);
    });
});

// JavaScript to show/hide the icon
document.getElementById('userInput').addEventListener('focus', () => {
    document.querySelector('i.fa-solid').style.display = "block"; // Show icon on focus
});

document.getElementById('userInput').addEventListener('blur', () => {
    if (document.getElementById('userInput').value === "") {
        document.querySelector('i.fa-solid').style.display = "none"; // Hide icon on blur if input is empty
    }
});

// Clear input when icon is clicked
document.querySelector('i.fa-solid').addEventListener('click', () => {
    document.getElementById('userInput').value = ""; // Clear input
    document.querySelector('i.fa-solid').style.display = "none"; // Hide icon
});

// Fetch meal data on button click
document.getElementById('btn').addEventListener('click', () => {
    let user = document.getElementById('userInput').value;

    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${user}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let output = '';

            if (data.meals) { // Check if meals exist
                output += `<h1 class='text-center text-danger'>Food Category: ${data.meals[0].strCategory}</h1>`; // Add the category heading outside the loop
                data.meals.forEach((meal, index) => {
                    output += `
                    <h2 class='text-center text-secondary mt-5'>Food Area: ${meal.strArea}</h2>
                    <h2 class='text-center text-warning'>Food Name: ${meal.strMeal}</h2>
                    <div class="row my-3">
                        <div class="col-md-4">
                            <img src="${meal.strMealThumb}" alt="" class='w-100 img'>
                        </div>
                        <div class="col-md-4">
                            <h2>Ingredients:</h2>
                            <ul>
                                <li>${meal.strIngredient1}</li>
                                <li>${meal.strIngredient2}</li>
                                <li>${meal.strIngredient3}</li>
                                <li>${meal.strIngredient4}</li>
                                <li>${meal.strIngredient5}</li>
                                <li>${meal.strIngredient6}</li>
                                <li>${meal.strIngredient7}</li>
                                <li>${meal.strIngredient8}</li>
                                <li>${meal.strIngredient9}</li>
                                <li>${meal.strIngredient10}</li>
                                <li>${meal.strIngredient11}</li>
                                <li>${meal.strIngredient12}</li>
                                <li>${meal.strIngredient13}</li>
                                <li>${meal.strIngredient14}</li>
                                <li>${meal.strIngredient15}</li>
                                <li>${meal.strIngredient16}</li>
                                <li>${meal.strIngredient17}</li>
                                <li>${meal.strIngredient18}</li>
                                <li>${meal.strIngredient19}</li>
                                <li>${meal.strIngredient20}</li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h2>Measurements:</h2>
                            <ul>
                                <li>${meal.strMeasure1}</li>
                                <li>${meal.strMeasure2}</li>
                                <li>${meal.strMeasure3}</li>
                                <li>${meal.strMeasure4}</li>
                                <li>${meal.strMeasure5}</li>
                                <li>${meal.strMeasure6}</li>
                                <li>${meal.strMeasure7}</li>
                                <li>${meal.strMeasure8}</li>
                                <li>${meal.strMeasure9}</li>
                                <li>${meal.strMeasure10}</li>
                                <li>${meal.strMeasure11}</li>
                                <li>${meal.strMeasure12}</li>
                                <li>${meal.strMeasure13}</li>
                                <li>${meal.strMeasure14}</li>
                                <li>${meal.strMeasure15}</li>
                                <li>${meal.strMeasure16}</li>
                                <li>${meal.strMeasure17}</li>
                                <li>${meal.strMeasure18}</li>
                                <li>${meal.strMeasure19}</li>
                                <li>${meal.strMeasure20}</li>
                            </ul>
                        </div>
                        <div class="col-12">
                            <h2>Instructions</h2>
                            <p>${meal.strInstructions}</p>
                        </div>
                    </div>
                    <div class='col-6 offset-3'>
                        <h3 class='text-center'> Watch Full Video On <a class='text-danger yt' data-bs-toggle="modal" data-bs-target="#exampleModal${index}">
                        <u>Youtube</u></a></h3>
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${meal.strMeal}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" width="100%" height='300'></iframe>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                document.getElementById('appendData').innerHTML = output; // Display the data
            } else {
                document.querySelector('.notfound').innerHTML = "Meal Not Found 😢";
                document.querySelector('.try').innerHTML = "Try something else 😉";
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            document.querySelector('.notfound').innerHTML = "An error occurred while fetching data.";
        });
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
              window.location.href = "profile.html";
          });
      } else {
          avatarContainer.style.display = "none";
      }
  });
  
  
  