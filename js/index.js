
let url;
var page = document.getElementById("myScript").getAttribute('data-name');
if(page === 'index'){
    url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d3e44f05b36e4cc2892bc96984c735e0';
}
else if(page === 'politics'){
    url ='https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d3e44f05b36e4cc2892bc96984c735e0';
}
else if(page === 'sports'){
    url = 'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=d3e44f05b36e4cc2892bc96984c735e0';
}
else if(page === 'entertainment'){
    url = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=d3e44f05b36e4cc2892bc96984c735e0';
}

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        return updatePage(myJson);
    })

let list = document.getElementById('list');

function updatePage(data) {
    for (let i = 0; i < 15; i++) {
        if (i < 3) {
            let header5 = document.createElement('h5');
            header5.innerHTML = data.articles[i].title;
            if(data.articles[i].title.length > 80){
                header5.innerHTML = data.articles[i].title.substring(0, 80) + '...';
            }
            let href = document.getElementById('news' + (i + 1));
            let img = document.getElementById('image' + (i + 1));
            href.href = data.articles[i].url;
            href.target = '_blank';
            if (data.articles[i].urlToImage == null){
                img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvecHQ5jGs_3_pHarDv6MgTe8jFRrm_j__uAq8876Lwjl5gcBJoQ';
            }
            else{ 
                img.src = data.articles[i].urlToImage;
            }
            href.appendChild(header5);
        }
        else {
            let div = document.createElement("div");
            div.classList.add('row');
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('col-3');
            imgDiv.classList.add('col-sm-2');
            imgDiv.classList.add('col-lg-1');
            let txtDiv = document.createElement('div');
            txtDiv.classList.add('col-9');
            txtDiv.classList.add('col-sm-10');
            txtDiv.classList.add('col-lg-11');
            let img = document.createElement('img');
            if (data.articles[i].urlToImage == null){
                img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvecHQ5jGs_3_pHarDv6MgTe8jFRrm_j__uAq8876Lwjl5gcBJoQ';
            }
            else{ 
                img.src = data.articles[i].urlToImage;
            }
            img.href = data.articles[i].url;
            let header5 = document.createElement('h5');
            header5.innerHTML = data.articles[i].title;
            let link = document.createElement('a');
            link.href = data.articles[i].url;
            link.target = '_blank';

            link.appendChild(header5);
            imgDiv.appendChild(img);
            txtDiv.appendChild(link);
            div.appendChild(imgDiv);
            div.appendChild(txtDiv);
            list.appendChild(div);
        }
    }
}