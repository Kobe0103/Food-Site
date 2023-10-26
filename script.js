function findRecipes() {
    const ingredientsInput = document.getElementById('ingredients');
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials
    const appId = 'dd86b202';
    const appKey = '79104152a92f2120e37bd810038af449';
    const apiUrl = `https://api.edamam.com/search?q=${ingredientsInput.value}&app_id=${appId}&app_key=${appKey}`;

    // Fetch recipes from Edamam API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if there are any hits (recipes) in the response
            if (data.hits && data.hits.length > 0) {
                // Display each recipe
                data.hits.forEach(hit => {
                    const recipe = hit.recipe;
                    resultsDiv.innerHTML += `<div>
                        <h3>${recipe.label}</h3>
                        <img src="${recipe.image}" alt="${recipe.label}">
                        <p>${recipe.ingredients.map(ingredient => ingredient.text).join(', ')}</p>
                        <a href="${recipe.url}" target="_blank">View Recipe</a>
                    </div>`;
                });
            } else {
                resultsDiv.innerHTML = '<p>No recipes found. Try different ingredients!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            resultsDiv.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
        });
}
