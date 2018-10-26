fetch("/data.json")
  .then(response => response.json())
  .then(json => {
    let html = renderFlats(json);
    document.querySelector("#app").innerHTML = `
      <div class="FlatsList">
        ${html}
      </div>
    `;
  });

function renderFlats(data) {
  return data
    .sort((a, b) => (a.price > b.price ? 1 : a.price < b.price ? -1 : 0))
    .map(
      flat => `
          <div class="Flat">
            <div class="Flat__photo" style="background-image: url(${
              flat.images[0]
            })"></div>
            <div class="Flat__info">
              <div class="Flat__price">${(flat.price * 1e6).toLocaleString(
                "RU-ru"
              )} ₽</div>
              <div class="Flat__params">${flat.rooms}-к, ${flat.area} м²</div>
              <div class="Flat__address">${flat.address}</div>
            </div>
          </div>
      `
    )
    .join("");
}
