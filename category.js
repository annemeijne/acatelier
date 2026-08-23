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

  const categoryUrl =
    product.categoryUrl.endsWith("/")
      ? product.categoryUrl
      : `${product.categoryUrl}/`;

  card.href =
    `${categoryUrl}${slug}/`;


  const image =
    document.createElement("img");

  image.src =
    product.mainImage.src;

  image.alt =
    product.mainImage.alt;

  image.loading =
    "lazy";


  const info =
    document.createElement("div");

  info.className =
    "product-info";


  const title =
    document.createElement("h3");

  title.textContent =
    product.name;


  const price =
    document.createElement("p");

  price.textContent =
    product.price || "Niet te koop";


  const stock =
    document.createElement("span");

  stock.className =
    "stock";

  stock.textContent =
    product.availability;


  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(stock);

  card.appendChild(image);
  card.appendChild(info);

  return card;
}


function getNumericPrice(product) {
  if (
    typeof product.priceValue === "number" &&
    Number.isFinite(product.priceValue)
  ) {
    return product.priceValue;
  }

  return null;
}


function getProductDate(product) {
  if (!product.publishedDate) {
    return 0;
  }

  const timestamp =
    new Date(product.publishedDate).getTime();

  return Number.isNaN(timestamp)
    ? 0
    : timestamp;
}


function sortProducts(
  productsList,
  sortValue,
  category
) {
  const sorted =
    [...productsList];


  switch (sortValue) {

    case "newest":
      return sorted.sort(
        ([, a], [, b]) =>
          getProductDate(b) -
          getProductDate(a)
      );


    case "oldest":
      return sorted.sort(
        ([, a], [, b]) =>
          getProductDate(a) -
          getProductDate(b)
      );


    case "price-high":
      return sorted.sort(
        ([, a], [, b]) => {
          const priceA =
            getNumericPrice(a);

          const priceB =
            getNumericPrice(b);

          if (
            priceA === null &&
            priceB === null
          ) {
            return 0;
          }

          if (priceA === null) {
            return 1;
          }

          if (priceB === null) {
            return -1;
          }

          return priceB - priceA;
        }
      );


    case "price-low":
      return sorted.sort(
        ([, a], [, b]) => {
          const priceA =
            getNumericPrice(a);

          const priceB =
            getNumericPrice(b);

          if (
            priceA === null &&
            priceB === null
          ) {
            return 0;
          }

          if (priceA === null) {
            return 1;
          }

          if (priceB === null) {
            return -1;
          }

          return priceA - priceB;
        }
      );


    case "recommended":
    default: {
      const order =
        recommendedOrder?.[category] || [];

      const orderMap =
        new Map(
          order.map(
            (slug, index) => [
              slug,
              index
            ]
          )
        );

      return sorted.sort(
        ([slugA], [slugB]) => {
          const indexA =
            orderMap.has(slugA)
              ? orderMap.get(slugA)
              : Number.MAX_SAFE_INTEGER;

          const indexB =
            orderMap.has(slugB)
              ? orderMap.get(slugB)
              : Number.MAX_SAFE_INTEGER;

          return indexA - indexB;
        }
      );
    }
  }
}


function renderProducts() {
  const grid =
    document.getElementById(
      "product-grid"
    );

  const sortSelect =
    document.getElementById(
      "product-sort"
    );


  if (!grid) {
    return;
  }


  const category =
    getCategoryFromPage();


  if (!category) {
    return;
  }


  let categoryProducts =
    Object.entries(products).filter(
      ([, product]) =>
        product.category === category
    );


  const sortValue =
    sortSelect
      ? sortSelect.value
      : "recommended";


  categoryProducts =
    sortProducts(
      categoryProducts,
      sortValue,
      category
    );


  grid.innerHTML =
    "";


  if (!categoryProducts.length) {
    const message =
      document.createElement("p");

    message.textContent =
      "Er zijn nog geen creaties in deze categorie.";

    grid.appendChild(message);

    return;
  }


  categoryProducts.forEach(
    ([slug, product]) => {
      grid.appendChild(
        createProductCard(
          slug,
          product
        )
      );
    }
  );
}


document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderProducts();

    const sortSelect =
      document.getElementById(
        "product-sort"
      );

    if (sortSelect) {
      sortSelect.addEventListener(
        "change",
        renderProducts
      );
    }
  }
);
