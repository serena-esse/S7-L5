const fetchData = async () => {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTVkYTRjNTllYzAwMTk5MGQ3MmEiLCJpYXQiOjE3MDkyODY4NzQsImV4cCI6MTcxMDQ5NjQ3NH0.s8HV69BTPWDrm_xjonYqfELLSSzBNkMxovOzXLsFIuk",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Errore durante la richiesta:", error);
  }
};

const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`);
    const product = await response.json();

    const productDetailsElement = document.getElementById("productDetails");
    productDetailsElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>Brand: ${product.brand}</p>
        <p>Description: ${product.description}</p>
        <p>Price: ${product.price}€</p>
        <img src="${product.imageUrl}" alt="${product.name}">
      `;
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli del prodotto:", error);
  }
};

window.onload = async () => {
  fetchData(); // Chiamata iniziale

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    getProductDetails(productId); // Chiamata per ottenere i dettagli del prodotto
  }
};
