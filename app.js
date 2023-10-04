const url = "https://northwind.vercel.app/api/products";

async function fetchProducts() {
  const products = await axios.get(url);
  return products.data;
}

async function deleteProduct(id) {
  try {
    console.log("siliniyorr");
    await axios.delete(`https://northwind.vercel.app/api/products/${id}`);
  } catch (e) {
    console.log("HATAA", e);
  }
}

async function createTable() {
  const data = await fetchProducts();
  const table = document.createElement("table");

  table.classList.add("table", "table-primary");
  const container = document.querySelector(".products-table");
  console.log(data);

  const rowHeader = document.createElement("tr");

  table.innerHTML = `
    <th scope='col' class="head">Id</th>
    <th scope='col' class="head">Name</th>
    <th scope='col' class="head">Unit Price</th>
    <th scope='col' class="head"></th>`;

  for (let product of data) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class='table-primary'>${product.id}</td>
      <td class='table-primary'>${product.name}</td>
      <td class='table-primary' data-price='${product.unitPrice}'>${product.unitPrice}</td>
      <td class='table-primary'><button class='btn'  data-id="${product.id}">   <img src="/delete.svg" alt=""></button></td>
      
    `;
    table.appendChild(row);
  }

  //Silme İşlemi
  table.addEventListener("click", async (event) => {
    const buttonElement = event.target.closest("button");
    if (buttonElement && buttonElement.classList.contains("btn")) {
      const productId = buttonElement.dataset.id;
      await deleteProduct(productId);
      const productRow = buttonElement.closest("tr");
      productRow.remove();
    }
  });
  container.appendChild(table);

  const sortBtn = document.querySelector("#sortBtn");
}

createTable();
