console.log("Exercise2 JS Loaded");

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let debounceTimer;

// Debouncing
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const query = searchInput.value.trim();
    fetchProducts(query);
  }, 500); // 500ms delay
});

async function fetchProducts(query) {
  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  resultsDiv.innerHTML = "Loading...";

  try {
    const response = await fetch("Exercise2.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // Filter matching products
    const filtered = data.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filtered);

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = `<p class="error">Error loading products</p>`;
  }
}

function displayResults(products) {
  if (products.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  resultsDiv.innerHTML = products.map(product => `
    <div class="product">
      <strong>${product.name}</strong><br>
      Price: $${product.price}<br>
      Category: ${product.category}
    </div>
  `).join("");
}
