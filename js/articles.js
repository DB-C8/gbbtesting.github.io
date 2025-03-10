// Function to load articles on the main page
async function loadArticles() {
    try {
        console.log('Starting to load articles...');
        const articlesGrid = document.getElementById('articlesGrid');
        
        if (!articlesGrid) {
            console.error('Articles grid element not found!');
            return;
        }

        // Update the path to match your file structure
        const response = await fetch('/data/articles.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Articles data loaded:', data);

        if (!data.articles || !Array.isArray(data.articles)) {
            throw new Error('Invalid articles data format');
        }

        // Clear existing content
        articlesGrid.innerHTML = '';

        // Add articles
        data.articles.forEach((article, index) => {
            console.log(`Rendering article ${index + 1}:`, article);
            const articleCard = `
                <a href="article.html?id=${article.id}" style="text-decoration: none; color: inherit;">
                    <article class="article-card">
                        <div class="article-image">
                            <img src="${article.image}" alt="${article.title}">
                        </div>
                        <div class="article-content">
                            <span class="article-date">${article.date}</span>
                            <h3>${article.title}</h3>
                            <p>${article.excerpt}</p>
                            <span class="read-more">Read More</span>
                        </div>
                    </article>
                </a>
            `;
            articlesGrid.innerHTML += articleCard;
        });

        console.log('Articles loaded successfully!');
    } catch (error) {
        console.error('Error loading articles:', error);
        const articlesGrid = document.getElementById('articlesGrid');
        if (articlesGrid) {
            articlesGrid.innerHTML = '<p>Error loading articles. Please try again later.</p>';
        }
    }
}

// Function to load single article on the article page
async function loadArticle() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (!articleId) {
            console.error('No article ID provided');
            return;
        }

        console.log('Loading article with ID:', articleId);

        const response = await fetch('/data/articles.json');
        const data = await response.json();
        const article = data.articles.find(a => a.id === articleId);

        if (article) {
            console.log('Article found:', article);

            // Set hero image
            const heroImage = document.getElementById('heroImage');
            if (heroImage) {
                heroImage.src = article.image;
                heroImage.alt = article.title;
                console.log('Hero image set:', article.image);
            }

            // Set article category
            const categoryElement = document.querySelector('.article-category');
            if (categoryElement && article.tags && article.tags.length > 0) {
                categoryElement.textContent = article.tags[0].charAt(0).toUpperCase() + article.tags[0].slice(1);
            }

            // Set title
            const articleTitle = document.getElementById('articleTitle');
            if (articleTitle) {
                articleTitle.textContent = article.title;
            }

            // Set date
            const articleDate = document.getElementById('articleDate');
            if (articleDate) {
                articleDate.textContent = article.date;
            }

            // Set content
            const articleContent = document.getElementById('articleContent');
            if (articleContent) {
                articleContent.innerHTML = article.content;
            }

            // Update page title
            document.title = `${article.title} - Gramercy Best Barbers`;
        } else {
            console.error('Article not found');
        }
    } catch (error) {
        console.error('Error loading article:', error);
    }
}

// Call loadArticles when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing articles...');
    loadArticles();
});

// Additional check for immediate loading if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded, initializing articles...');
    loadArticles();
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('articlesGrid')) {
        loadArticles();
    } else if (document.getElementById('articleContent')) {
        loadArticle();
    }
}); 