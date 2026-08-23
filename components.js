async function loadComponent(selector, path) {
  const element = document.querySelector(selector);

  if (!element) {
    return false;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Kon component niet laden: ${path} (${response.status})`
      );
    }

    const html = await response.text();

    element.innerHTML = html;

    return true;

  } catch (error) {
    console.error(
      `Fout bij het laden van ${path}:`,
      error
    );

    return false;
  }
}


function setFooterYear() {
  const yearElement =
    document.getElementById("footer-year");

  if (!yearElement) {
    return;
  }

  yearElement.textContent =
    new Date().getFullYear();
}


function setupMobileMenu() {
  const menuButton =
    document.getElementById("mobile-menu-button");

  const mobileMenu =
    document.getElementById("mobile-menu");

  if (!menuButton || !mobileMenu) {
    return;
  }


  function openMenu() {
    mobileMenu.hidden = false;

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Menu sluiten"
    );

    menuButton.classList.add("open");

    document.body.classList.add(
      "mobile-menu-open"
    );
  }


  function closeMenu() {
    mobileMenu.hidden = true;

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Menu openen"
    );

    menuButton.classList.remove("open");

    document.body.classList.remove(
      "mobile-menu-open"
    );
  }


  function toggleMenu() {
    const isOpen =
      menuButton.getAttribute(
        "aria-expanded"
      ) === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }


  menuButton.addEventListener(
    "click",
    toggleMenu
  );


  mobileMenu.addEventListener(
    "click",
    (event) => {
      const link =
        event.target.closest("a");

      if (link) {
        closeMenu();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute(
          "aria-expanded"
        ) === "true"
      ) {
        closeMenu();
        menuButton.focus();
      }
    }
  );


  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 1000 &&
        menuButton.getAttribute(
          "aria-expanded"
        ) === "true"
      ) {
        closeMenu();
      }
    }
  );
}


async function loadSiteComponents() {
  const [
    headerLoaded,
    footerLoaded
  ] = await Promise.all([
    loadComponent(
      "#site-header",
      "/components/header.html"
    ),

    loadComponent(
      "#site-footer",
      "/components/footer.html"
    )
  ]);


  if (headerLoaded) {
    setupMobileMenu();
  }


  if (footerLoaded) {
    setFooterYear();
  }
}


loadSiteComponents();
