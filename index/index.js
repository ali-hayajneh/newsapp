var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=d3e44f05b36e4cc2892bc96984c735e0';

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        return updatePage(myJson);
    })

function updatePage(data) {
    var news1 = document.getElementById('news1');
    var image1 = document.getElementById('image1');
    image1.src = data.articles[0].urlToImage;
    news1.innerHTML = data.articles[0].title;
    var news2 = document.getElementById('news2');
    var image2 = document.getElementById('image2');
    image2.src = data.articles[1].urlToImage;
    news2.innerHTML = data.articles[1].title;
    var news3 = document.getElementById('news3');
    var image3 = document.getElementById('image3');
    image3.src = data.articles[2].urlToImage;
    news3.innerHTML = data.articles[2].title;

    var news4 = document.getElementById('news4');
    var image4 = document.getElementById('image4');
    image4.src = data.articles[3].urlToImage;
    news4.innerHTML = data.articles[3].title;
    var news4 = document.getElementById('news5');
    var image4 = document.getElementById('image5');
    image5.src = data.articles[4].urlToImage;
    news5.innerHTML = data.articles[4].title;
    var news6 = document.getElementById('news6');
    var image6 = document.getElementById('image6');
    image6.src = data.articles[5].urlToImage;
    news6.innerHTML = data.articles[5].title;
}