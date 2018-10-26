function getInnerText(el, selector) {
  if (el && el.querySelector) {
    let item = el.querySelector(selector);
    return item ? item.innerText : undefined;
  } else {
    return undefined;
  }
}

[...document.querySelectorAll(".OffersSerpItem_format_full")].map(item => {
  let flat;
  let title = item.querySelector(".OffersSerpItem__title");

  if (title) {
    flat = {};
    flat.address = getInnerText(item, ".OffersSerpItem__address");
    flat.price =
      item
        .querySelector(".price")
        .innerText.match(/(\d+,?\d*)/)[1]
        .replace(",", ".") * 1;
    flat.images = [...item.querySelectorAll("img")].map(img => img.src);
    let chunks = title.innerText.match(/(\d+).*(\d+|студия)\-?/);
    flat.area = chunks[1] * 1;
    flat.rooms = chunks[2];
    flat.building = getInnerText(item, ".OffersSerpItem__building");
    flat.location = getInnerText(item, ".OffersSerpItem__location");
    flat.description = getInnerText(item, ".OffersSerpItem__description");
    flat.morgage = getInnerText(item, ".OffersSerpItem__paymentsInfo");
  }

  return flat;
});
