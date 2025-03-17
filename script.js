document.addEventListener('DOMContentLoaded', () => {
    const ratingForm = document.getElementById('rating-form');
    const ratingsList = document.getElementById('ratings-list');
    const averageRatingsList = document.getElementById('average-ratings-list');
    const lastRamenDisplay = document.getElementById('last-ramen-display');
    const lastRamenImage = document.getElementById('last-ramen-image');
    const lastRamenName = document.getElementById('last-ramen-name');
    const lastComment = document.getElementById('last-comment');

    let ratings = [];
    let averageRatings = {};

    ratingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userName = document.getElementById('user-name').value;
        const restaurantName = document.getElementById('restaurant-name').value;
        const ramenName = document.getElementById('ramen-name').value;
        const ramenRating = parseFloat(document.getElementById('ramen-rating').value);
        const comments = document.getElementById('comments').value;

        const rating = {
            userName,
            restaurantName,
            ramenName,
            ramenRating,
            comments,
            timestamp: new Date().toISOString()
        };

        ratings.push(rating);
        updateRatingsDisplay();
        updateAverageRatings();
        updateLastRamenDisplay(rating);

        ratingForm.reset();
    });

    function updateRatingsDisplay() {
        ratingsList.innerHTML = '';
        ratings.forEach((rating, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${rating.userName}</strong> rated <strong>${rating.ramenName}</strong> at <strong>${rating.restaurantName}</strong> with a score of <strong>${rating.ramenRating}</strong>.
                ${rating.comments ? `<br><em>${rating.comments}</em>` : ''}
            `;
            ratingsList.appendChild(listItem);
        });
    }

    function updateAverageRatings() {
        averageRatings = {};
        averageRatingsList.innerHTML = '';

        ratings.forEach(rating => {
            if (!averageRatings[rating.ramenName]) {
                averageRatings[rating.ramenName] = { total: 0, count: 0 };
            }
            averageRatings[rating.ramenName].total += rating.ramenRating;
            averageRatings[rating.ramenName].count += 1;
        });

        for (const ramenName in averageRatings) {
            const average = averageRatings[ramenName].total / averageRatings[ramenName].count;
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${ramenName}</strong> has an average rating of <strong>${average.toFixed(2)}</strong>.`;
            averageRatingsList.appendChild(listItem);
        }
    }

    function updateLastRamenDisplay(rating) {
        lastRamenImage.style.display = 'block';
        lastRamenImage.src = `images/${rating.ramenName.toLowerCase()}.jpg`;
        lastRamenImage.alt = `${rating.ramenName} Ramen`;
        lastRamenName.textContent = rating.ramenName;
        lastComment.textContent = rating.comments || 'No comments provided.';
    }
});