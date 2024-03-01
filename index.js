const url = "https://striveschool-api.herokuapp.com/api/product/";

let allProducts = [];
const productRow = document.getElementById("productRow");

window.onload = async () => {
  await getProductData();
};

const getProductData = async () => {
  try {
    let respons = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTVkYTRjNTllYzAwMTk5MGQ3MmEiLCJpYXQiOjE3MDkyODY4NzQsImV4cCI6MTcxMDQ5NjQ3NH0.s8HV69BTPWDrm_xjonYqfELLSSzBNkMxovOzXLsFIuk",
      },
    });
    productRow.innerHTML = "";
    allProducts = await respons.json();
    createCards(allProducts);
  } catch (error) {
    console.log(error);
  }
};

const createCards = (allProducts) => {
  let cardsHTML = "";
  allProducts.forEach((product) => {
    cardsHTML += `
          <div class="col mb-4 ">
              <div class="card h-100">
                  <img src="${product.imageUrl}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h2 class="card-title">${product.name}</h2>
                      <p>Brand: ${product.brand}</p>
                      <p class="card-text">Description: ${product.description}</p>
                      <span class="badge badge-success">${product.price}€</span>
                      <div class="btn-group" role="group" aria-label="Basic example">
                          <a href='backoffice.html?id=${product._id}' class='btn btn-secondary'> Edit </a>
                          <button type="button" class="btn btn-light" onclick='deleteProduct("${product._id}")'>Delete</button>
                          <button type="button" class="btn btn-primary" onclick='viewDetails("${product._id}")'>Scopri di più</button>
                      </div>
                  </div>
              </div>
          </div>`;
  });

  productRow.innerHTML = cardsHTML;
};

const deleteProduct = async (idToDelete) => {
  try {
    let respons = await fetch(url + "/" + idToDelete, {
      method: "DELETE",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTVkYTRjNTllYzAwMTk5MGQ3MmEiLCJpYXQiOjE3MDkyODY4NzQsImV4cCI6MTcxMDQ5NjQ3NH0.s8HV69BTPWDrm_xjonYqfELLSSzBNkMxovOzXLsFIuk",
        "Content-Type": "application/json",
      }),
    });

    console.log(respons);
    if (respons.ok) {
      await getProductData();
    }
  } catch (error) {
    console.log(error);
  }
};

const viewDetails = (productId) => {
  window.location.href = `details.html?id=${productId}`;
};
