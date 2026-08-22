function getProductSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("product");
}

function createDetail(label, value, link = null) {
  const wrapper = document.createElement("div");

  const labelEl = document.createElement("span");
  labelEl.className = "meta-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("strong");

  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = value;
    valueEl.appendChild(anchor);
  } else {
    valueEl.textContent = value;
  }

  wrapper.appendChild(labelEl);
  wrapper.appendChild(valueEl);

  return wrapper;
}

function setupLightbox() {
  const galleryImages = Array.from(
    document.querySelectorAll(
      ".product-gallery img, .product-hero-image img"
    )
  );

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.getElementById("lightbox-close");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");

  if (
    !lightbox ||
    !lightboxImage ||
    !closeButton ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  let currentImage = 0;

  function showImage(index) {
    currentImage =
      (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => openLightbox(index));
  });

  closeButton.addEventListener("click", closeLightbox);

  prevButton.addEventListener("click", () => {
    showImage(currentImage - 1);
  });

  nextButton.addEventListener("click", () => {
    showImage(currentImage + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentImage - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentImage + 1);
    }
  });
}

function loadProduct() {
  const slug = getProductSlug();
  const product = products[slug];

  if (!product) {
    document.querySelector(".product-page").innerHTML = `
      <section class="page-intro">
        <p class="eyebrow">Niet gevonden</p>
        <h1 class="page-title">Deze creatie bestaat niet.</h1>
        <p>
          Misschien is de link niet meer geldig of is deze creatie verplaatst.
        </p>
        <a class="button secondary" href="/creaties/">
          Terug naar creaties
        </a>
      </section>
    `;
    return;
  }

  document.title = `${product.name} — ACA`;

  const description = document.getElementById("page-description");
  if (description) {
    description.content =
      `${product.name} van ACA — unieke handgemaakte creatie.`;
  }

  document.getElementById("breadcrumb-product").textContent =
    product.name;

  const categoryLink =
    document.getElementById("breadcrumb-category");

  categoryLink.textContent = product.category;
  categoryLink.href = product.categoryUrl;

  document.getElementById("product-name").textContent =
    product.name;

  document.getElementById("product-lead").textContent =
    product.lead;

  document.getElementById("product-price").textContent =
    product.price;

  document.getElementById("product-availability").textContent =
    product.availability;

  document.getElementById("product-story-title").textContent =
    product.storyTitle;

  const story = document.getElementById("product-story");
  story.textContent = product.story;

  if (product.inspirationUrl && product.inspirationText) {
    story.appendChild(document.createElement("br"));
    story.appendChild(document.createElement("br"));

    const inspirationLink = document.createElement("a");
    inspirationLink.href = product.inspirationUrl;
    inspirationLink.target = "_blank";
    inspirationLink.rel = "noopener noreferrer";
    inspirationLink.textContent = product.inspirationText;

    story.appendChild(inspirationLink);
  }

  const mainImage =
    document.getElementById("product-main-image");

  mainImage.src = product.mainImage;
  mainImage.alt = `${product.name} gedragen`;

  const detailsContainer =
    document.getElementById("product-details");

  detailsContainer.innerHTML = "";

  product.details.forEach(([label, value]) => {
    let link = null;

    if (
      label === "Gebaseerd op" &&
      product.inspirationUrl
    ) {
      link = product.inspirationUrl;
    }

    detailsContainer.appendChild(
      createDetail(label, value, link)
    );
  });

  const gallery =
    document.getElementById("product-gallery");

  gallery.innerHTML = "";

  product.images.forEach((image, index) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    img.src = image;
    img.alt = `${product.name} — foto ${index + 1}`;

    figure.appendChild(img);
    gallery.appendChild(figure);
  });

  const backButton =
    document.getElementById("product-back");

  backButton.href = product.categoryUrl;
  backButton.textContent =
    `← Terug naar ${product.category.toLowerCase()}`;

  setupLightbox();
}

document.addEventListener("DOMContentLoaded", loadProduct);
