const baseURL = "https://miro-poster.herokuapp.com/";
const posters = [
  { src: 'img/posters/1.png', width: 267.02, height: 218.31 }
]

function getImageHTML(img) {
  return `
      <div class="poster">
        <img src="${img.src}" data-image-url="${baseURL}${img.src}">
      </div>
    `;
}

function addPosters(container) {
  container.innerHTML += posters.map((poster) => getImageHTML(poster)).join('')
}

function createPoster(url) {
  return miro.board.widgets.create({
    type: 'image',
    url: url,
    x: 0,
    y: 0,
  })
}

function bootstrap() {
  const container = document.getElementById('container');
  addPosters(container);

  $('.poster img').click(async function () {
    const widget = (await createPoster($(this).attr('data-image-url')))[0];
    miro.board.viewport.zoomToObject(widget);
  });
}

miro.onReady(bootstrap);
