const url = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(location.search);
const id = params.get("id");

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productBrand = document.getElementById("productBrand");
const productImageUrl = document.getElementById("productImageUrl");
const productPrice = document.getElementById("productPrice");

window.onload = async () => {
  try {
    if (id !== null) {
      document.getElementById("CreateAndEdit").innerText = "Edit Product";
      let respons = await fetch(url + id, {
        headers: new Headers({
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTVkYTRjNTllYzAwMTk5MGQ3MmEiLCJpYXQiOjE3MDkyODY4NzQsImV4cCI6MTcxMDQ5NjQ3NH0.s8HV69BTPWDrm_xjonYqfELLSSzBNkMxovOzXLsFIuk",
          "Content-Type": "application/json",
        }),
      });
      if (respons.ok) {
        let { name, description, price, brand, imageUrl } = await respons.json();
        productName.value = name;
        productDescription.value = description;
        productBrand.value = brand;
        productImageUrl.value = imageUrl;
        productPrice.value = price;
      } else {
        console.log(res);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

let createProduct = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const product = {
      name: productName.value,
      description: productDescription.value,
      brand: productBrand.value,
      imageUrl: productImageUrl.value,
      price: parseInt(productPrice.value),
    };
    console.log(product);
    const options = {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTVkYTRjNTllYzAwMTk5MGQ3MmEiLCJpYXQiOjE3MDkyODY4NzQsImV4cCI6MTcxMDQ5NjQ3NH0.s8HV69BTPWDrm_xjonYqfELLSSzBNkMxovOzXLsFIuk",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(product),
    };
    if (id !== null) {
      options.method = "PUT";
      let respons = await fetch(url + id, options);
    } else {
      let respons = await fetch(url, options);
    }
  } catch (error) {
    console.log(error);
  }
};

const form = document.getElementById("form");

// Crea il pulsante reset
const resetButton = document.createElement("button");
resetButton.setAttribute("type", "reset");
resetButton.classList.add("btn", "btn-secondary");
resetButton.innerText = "Reset";

form.appendChild(resetButton);

// Alert conferma
resetButton.addEventListener("click", function () {
  const result = confirm("Sei sicuro di voler resettare il form?");
  if (result) {
    document.getElementById("myForm").reset();
  } else {
    console.log("Operazione annullata");
  }
});
