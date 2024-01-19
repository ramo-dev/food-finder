function truncateParagraph(paragraph, wordsToShow) {
    // Split the paragraph into an array of words
    const words = paragraph.split(' ');
    // Check if the paragraph is already within the desired limit
    if (words.length <= wordsToShow) {
        return paragraph;
    }
    // Extract the first 'wordsToShow' words
    const truncatedWords = words.slice(0, wordsToShow);
    // Join the words back together with spaces
    const truncatedParagraph = truncatedWords.join(' ');
   // Add an ellipsis at the end
    return truncatedParagraph +  `...`;
}

function fetchrecipes(){
document.addEventListener('DOMContentLoaded', async function(){
    try{
        const recipeCard = document.querySelector('.recipe-gallery')
        const numberOfRecipes = 12;
        for (let i = 0; i < numberOfRecipes; i++) {
                const url = 'https://www.themealdb.com/api/json/v1/1/random.php' 
                const response = await fetch(url)
                    
                if (!response.ok) {
                    console.error('Failed to fetch data for recipe', i + 1);
                    continue; // Move to the next iteration if fetching fails
                }

                else{
                    console.log('fetching data please wait...')
                }

                const data = await response.json()
                const meal = data.meals[0];
                const instructions = truncateParagraph(meal.strInstructions, 30)
                const source = meal.strSource ? meal.strSource : 'No source available';
                console.log('successfully fetched: ', data)

                const recipeHTML = `  <div class="recipe-card">
                <div class="food-img">
                    <a href="${meal.strSource}" target="_blank" rel="noopener noreferrer"><img src="${meal.strMealThumb}"></a>
                </div>
                <div class="food-title">
                    <h2>${meal.strMeal}</h2>
                </div>
                <div class="food-detail">
                    <p>${instructions}<a href="${meal.strSource}" class="read-more" style="color:rgb(235, 152, 0);">readmore</a></p>
                </div>
                <div class="food-link">
                        <a href="${meal.strSource}" target="_blank" rel="noopener noreferrer" ><button>View Recipe</button></a>
                </div>
            </div>`;

            
            recipeCard.innerHTML += recipeHTML
        }
    }
    catch(error){
        console.log(error.message)
    }


})
//call the function when page loads

}

fetchrecipes()


function refresh(){
    document.querySelector('.fetch-more').addEventListener('click', function(){
        location.reload();
})};
