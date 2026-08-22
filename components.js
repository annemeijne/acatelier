async function loadComponent(selector, path) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Kon ${path} niet laden`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

loadComponent("#site-header", "/components/header.html");
loadComponent("#site-footer", "/components/footer.html");
