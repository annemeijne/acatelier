function getProductSlug() {
  const pathParts = window.location.pathname
    .split("/")
    .filter(Boolean);

  return pathParts[pathParts.length - 1] || null;
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

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightbox-image");

  const closeButton =
    document.getElementById("lightbox-close");

  const prevButton =
    document.getElementById("lightbox-prev");

  const nextButton =
    document.getElementById("lightbox-next");

  if (
    !galleryImages.length ||
    !lightbox ||
    !lightboxImage ||
    !closeButton ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  let currentImage = 0;
  let previouslyFocusedElement = null;


  function showImage(index) {
    currentImage =
      (index + galleryImages.length)
      % galleryImages.length;

    lightboxImage.src =
      galleryImages[currentImage].src;

    lightboxImage.alt =
      galleryImages[currentImage].alt;
  }


  function openLightbox(index) {
    previouslyFocusedElement =
      document.activeElement;

    showImage(index);

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "lightbox-open"
    );

    closeButton.focus();
  }


  function closeLightbox() {
    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "lightbox-open"
    );

    lightboxImage.src = "";
    lightboxImage.alt = "";

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }


  galleryImages.forEach((image, index) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");

    image.setAttribute(
      "aria-label",
      `${image.alt} — vergroot foto`
    );

    image.addEventListener(
      "click",
      () => openLightbox(index)
    );

    image.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          openLightbox(index);
        }
      }
    );
  });


  closeButton.addEventListener(
    "click",
    closeLightbox
  );


  prevButton.addEventListener(
    "click",
    () => {
      showImage(currentImage - 1);
    }
  );


  nextButton.addEventListener(
    "click",
    () => {
      showImage(currentImage + 1);
    }
  );


  lightbox.addEventListener(
    "click",
    (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        !lightbox.classList.contains("open")
      ) {
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
    }
  );
}


function loadProduct() {
  const slug = getProductSlug();
  const product = products[slug];

  const productPage =
    document.querySelector(".product-page");

  if (!productPage) {
    return;
  }


  if (!product) {
    productPage.innerHTML = `
      <section class="page-intro">
        <p class="eyebrow">
          Niet gevonden
        </p>

        <h1 class="page-title">
          Deze creatie bestaat niet.
        </h1>

        <p>
          Misschien is de link niet meer geldig
          of is deze creatie verplaatst.
        </p>

        <a
          class="button secondary"
          href="/creaties/"
        >
          Terug naar creaties
        </a>
      </section>
    `;

    return;
  }


  document.title =
    `${product.name} | ACA — Annemeijne's Creatieve Atelier`;


  const description =
    document.getElementById("page-description");

  if (description) {
    description.content =
      product.lead;
  }


  const canonical =
    document.getElementById("canonical-url");

  if (canonical) {
    canonical.href =
      window.location.origin +
      window.location.pathname;
  }


  const ogTitle =
    document.getElementById("og-title");

  if (ogTitle) {
    ogTitle.content =
      `${product.name} | ACA`;
  }


  const ogDescription =
    document.getElementById("og-description");

  if (ogDescription) {
    ogDescription.content =
      product.lead;
  }


  const ogUrl =
    document.getElementById("og-url");

  if (ogUrl) {
    ogUrl.content =
      window.location.href;
  }


  const ogImage =
    document.getElementById("og-image");

  if (ogImage) {
    ogImage.content =
      window.location.origin +
      product.mainImage.src;
  }


  document
    .getElementById("breadcrumb-product")
    .textContent =
      product.name;


  const categoryLink =
    document.getElementById(
      "breadcrumb-category"
    );

  categoryLink.textContent =
    product.category;

  categoryLink.href =
    product.categoryUrl;


  document
    .getElementById("product-name")
    .textContent =
      product.name;


  document
    .getElementById("product-lead")
    .textContent =
      product.lead;


  const price =
    document.getElementById(
      "product-price"
    );

  price.textContent =
    product.price || "Niet te koop";


  document
    .getElementById(
      "product-availability"
    )
    .textContent =
      product.availability;


  document
    .getElementById(
      "product-story-title"
    )
    .textContent =
      product.storyTitle;


  const story =
    document.getElementById(
      "product-story"
    );

  story.textContent =
    product.story;


  if (
    product.inspirationUrl &&
    product.inspirationText
  ) {
    story.appendChild(
      document.createElement("br")
    );

    story.appendChild(
      document.createElement("br")
    );

    const inspirationLink =
      document.createElement("a");

    inspirationLink.href =
      product.inspirationUrl;

    inspirationLink.target =
      "_blank";

    inspirationLink.rel =
      "noopener noreferrer";

    inspirationLink.textContent =
      product.inspirationText;

    story.appendChild(
      inspirationLink
    );
  }


  const mainImage =
    document.getElementById(
      "product-main-image"
    );

  mainImage.src =
    product.mainImage.src;

  mainImage.alt =
    product.mainImage.alt;

  mainImage.fetchPriority =
    "high";


  const detailsContainer =
    document.getElementById(
      "product-details"
    );

  detailsContainer.innerHTML =
    "";


  product.details.forEach(
    ([label, value]) => {
      let link = null;

      if (
        label === "Gebaseerd op" &&
        product.inspirationUrl
      ) {
        link =
          product.inspirationUrl;
      }

      detailsContainer.appendChild(
        createDetail(
          label,
          value,
          link
        )
      );
    }
  );


  const gallery =
    document.getElementById(
      "product-gallery"
    );

  gallery.innerHTML =
    "";


  product.images.forEach(
    (image) => {
      const figure =
        document.createElement("figure");

      const img =
        document.createElement("img");

      img.src =
        image.src;

      img.alt =
        image.alt;

      img.loading =
        "lazy";

      figure.appendChild(img);

      gallery.appendChild(
        figure
      );
    }
  );


  const backButton =
    document.getElementById(
      "product-back"
    );

  backButton.href =
    product.categoryUrl;

  backButton.textContent =
    `← Terug naar ${product.category.toLowerCase()}`;


  setupLightbox();
}


document.addEventListener(
  "DOMContentLoaded",
  loadProduct
);
