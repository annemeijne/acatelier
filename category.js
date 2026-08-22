function getCategoryFromPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("/creaties/kleding/")) {
    return "Kleding";
  }

  if (path.includes("/creaties/tierlantijnen/")) {
    return "Tierlantijnen";
  }

  if (path.includes("/creaties/geschreven/")) {
    return "Geschreven";
  }

  return null;
}

function createProductCard(slug, product) {
  const card = document.createElement("a");
  card.className = "product-card";
  card.href = `/product.html?product=${slug}`;

  const image = document.createElement("img");
  image.src = product.mainImage;
  image.alt = product.name;

  const info = document.createElement("div");
  info.className = "product-info";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = product.price;

  const stock = document.createElement("span");
  stock.className = "stock";
  stock.textContent = product.availability;

  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(stock);

  card.appendChild(image);
  card.appendChild(info);

  return card;
}

function loadCategoryProducts() {
  const grid = document.getElementById("product-grid");

  if (!grid) {
    return;
  }

  const category = getCategoryFromPage();

  if (!category) {
    return;
  }

  grid.innerHTML = "";

  Object.entries(products)
    .filter(([, product]) => product.category === category)
    .forEach(([slug, product]) => {
      grid.appendChild(
        createProductCard(slug, product)
      );
    });
}

document.addEventListener(
  "DOMContentLoaded",
  loadCategoryProducts
);
