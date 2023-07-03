let row = document.getElementById('movie-row');
let fetchAndDisplay = data => {
  for (let i = 0; i < data.results.length; i++) {
    let col = document.createElement('div');
    let card = document.createElement('div');
    let image = document.createElement('img');
    let title = document.createElement('h5');
    let cardBody = document.createElement('div');
    let playBtn = document.createElement('i');
    let playLink = document.createElement('a');
    let Ul = document.createElement('ul');
    let rating = document.createElement('li');
    let language = document.createElement('li');
    let releeaseDate = document.createElement('li');
    let id = document.createElement('li');

    col.classList.add('col-md-6', 'col-lg-3', 'col-sm-6', 'mb-6');
    card.classList.add(
      'card',
      'bg-dark',
      'text-white',
      'me-auto',
      'ms-auto',
      'pb-5',
      'px-4'
    );
    card.setAttribute('id', 'cards');
    playBtn.classList.add('playBtn', 'fa-solid', 'fa-play');
    playLink.classList.add('playLink');
    playLink.setAttribute('target', '_blank');
    image.classList.add('card-img-top');
    title.classList.add('card-title');
    cardBody.classList.add('card-body', 'bg-dark');
    Ul.classList.add('list-group', 'list-group-light', 'list-group-small');
    rating.classList.add('list-group-item', 'px-4', 'bg-dark', 'text-white');
    language.classList.add('list-group-item', 'px-4', 'bg-dark', 'text-white');
    id.classList.add(
      'list-group-item',
      'px-4',
      'bg-dark',
      'text-white',
      'card-id',
      'visually-hidden'
    );
    releeaseDate.classList.add(
      'list-group-item',
      'px-4',
      'bg-dark',
      'text-white'
    );
    releeaseDate.style.fontSize = '14px';

    card.style.width = '18rem';
    card.style.height = '40rem';

    title.innerHTML = data.results[i].title;
    image.src =
      'https://image.tmdb.org/t/p/w500/' + data.results[i].poster_path;
    rating.innerHTML =
      'Rating: &nbsp; &nbsp;&nbsp;' + data.results[i].vote_average + '⭐';
    language.innerHTML =
      'Language :  &nbsp; &nbsp;&nbsp;' + data.results[i].original_language;
    releeaseDate.innerHTML = 'Released : ' + data.results[i].release_date;
    id.innerHTML = data.results[i].id;
    fetch(
      `https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=8f37545c884c451558817e9c14a10825&append_to_response=videos`
    )
      .then(response => response.json())
      .then(ID => {
        for (i = 0; i < ID.videos.results.length; i++) {
          if (ID.videos.results[i].type === 'Trailer') {
            playLink.href = `https://www.youtube.com/watch?v=${ID.videos.results[i].key}`;
            break;
          }
        }
      });

    // playLink.innerHTML = '';

    Ul.appendChild(rating);
    Ul.appendChild(language);
    Ul.appendChild(releeaseDate);
    Ul.appendChild(id);
    cardBody.appendChild(title);
    cardBody.appendChild(Ul);
    playLink.appendChild(playBtn);
    cardBody.appendChild(playLink);

    card.appendChild(image);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  }
};

document.getElementById('Explore-Movies').addEventListener('click', () => {
  document.getElementById('search-results-text').innerHTML = 'Top Movies<br>';
  row.innerHTML = '';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjM3NTQ1Yzg4NGM0NTE1NTg4MTdlOWMxNGExMDgyNSIsInN1YiI6IjY0OWRjNjAxYzA3MmEyMDBhZjg0OTZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEDL0fcw6dngz1maWfP-Ujkstg9viFY0BjKm7Qeb2FU',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    options
  )
    .then(response => response.json())
    .then(data => {
      setTimeout(function () {
        var targetSection = document.getElementById('section-movies');
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
     
      fetchAndDisplay(data);

      
    })
    .catch(err => console.error(err));
});
document.getElementById('search-button').addEventListener('click', function () {
  row.innerHTML = '';
  document.getElementById('search-results-text').innerHTML =
    'Search Results<br>';
  let url =
    'https://api.themoviedb.org/3/search/movie?api_key=8f37545c884c451558817e9c14a10825&query=' +
    document.getElementById('input-search').value;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setTimeout(function () {
        var targetSection = document.getElementById('section-movies');
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      fetchAndDisplay(data);
    });
});

document
  .getElementById('input-search')
  .addEventListener('keypress', function (e) {
    if (
      e.key === 'Enter' &&
      document.getElementById('input-search').value !== ''
    ) {
      document.getElementById('search-button').click();
    }
  });
