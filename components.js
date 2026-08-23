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


async function loadSiteComponents() {
  const [, footerLoaded] = await Promise.all([
    loadComponent(
      "#site-header",
      "/components/header.html"
    ),

    loadComponent(
      "#site-footer",
      "/components/footer.html"
    )
  ]);

  if (footerLoaded) {
    setFooterYear();
  }
}


loadSiteComponents();
