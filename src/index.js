fetch("data/data-1.json")
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
            <div class="Flat__images">
            ${flat.images
              .map(
                img => `
                <div class="Flat__photo" style="background-image: url(${img})"></div>
              `
              )
              .join("")}
            </div>
            <div class="Flat__info">
              <div class="Flat__infoCols">
                <div class="Flat__priceInfo">
                  <div class="Flat__price">${(flat.price * 1e6).toLocaleString(
                    "RU-ru"
                  )} ₽</div>
                  <div class="Flat__pricePerMeter">${Math.round(
                    (flat.price * 1e6) / flat.area
                  ).toLocaleString("RU-ru")} ₽ за м²</div>
                </div>
                <div class="Flat__about">
                  <div class="Flat__params">${
                    isNaN(flat.rooms * 1) ? flat.rooms : flat.rooms + "-к"
                  }, ${flat.area} м²</div>
                  <div class="Flat__address">${flat.address}</div>
                </div>
              </div>
              <div class="Flat__descr">${flat.description}</div>
            </div>
          </div>
      `
    )
    .join("");
}
