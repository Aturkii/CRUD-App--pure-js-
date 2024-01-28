var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var indexx = "";
var productList = [];

if (localStorage.getItem("Products") != null) {
  productList = JSON.parse(localStorage.getItem("Products"));

  displayData(productList);
}

function addProduct() {
  if (validateName() == true){
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  productList.push(product);
  localStorage.setItem("Products", JSON.stringify(productList));

  displayData(productList);

  resetInputs();
}else {
  alert("Invalid Product Name")
}
}

function resetInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayData(productList) {
  var cartona = "";

  for (var i = 0; i < productList.length; i++) {
    cartona += `<tr>
    <td  class="bg-dark-subtle">${[i + 1]}</td>
    <td class="fw-semibold">${productList[i].name}</td>
    <td class="bg-body-secondary">${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].desc}</td>
    <td class="bg-warning-subtle">
      <button onclick="setDataToUpdate(${i})"  id="updateBtn" class="btn btn-info btn-sm">Update</button>
      <button onclick="deleteProduct(${i})" id="deleteBtn" class="btn btn-danger btn-sm">Delete</button>
    </td>
  </tr>`;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function deleteProduct(index) {
  indexx = index;
  productList.splice(index, 1);
  localStorage.setItem("Products", JSON.stringify(productList));

  displayData(productList);
}

function searchByName(term) {
  var foundedItems = [];
  for (var i = 0; i < productList.length; i++)
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(term.toLowerCase(), `<span class="text-info">${term}</span>`);
      foundedItems.push(productList[i]);
    }
  displayData(foundedItems);
}

function setDataToUpdate(itemNumber) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");

  productNameInput.value = productList[itemNumber].name;
  productPriceInput.value = productList[itemNumber].price;
  productCategoryInput.value = productList[itemNumber].category;
  productDescriptionInput.value = productList[itemNumber].desc;
}

function updateProduct() {
  addProductBtn.classList.remove("d-none");
  updateProductBtn.classList.replace("d-block", "d-none");
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
  productList.splice(indexx, 1, product);
  localStorage.setItem("Products", JSON.stringify(productList));

  displayData(productList);

  resetInputs();
}

function validateName() {
  var regex = /^[A-Z]{1,3}[a-z]{1,8}$/;

  if (regex.test(productNameInput.value) == true) {
    return true;
  }else {
    return false;
  }
}
