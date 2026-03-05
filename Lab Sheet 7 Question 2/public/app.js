const out = document.getElementById("out");
const pageNo = document.getElementById("pageNo");
let page = 1;

function render(list) {
  if (!list || list.length === 0) {
    out.innerHTML = "<p>No results.</p>";
    return;
  }

  out.innerHTML = list.map(b => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <b>${b.title}</b> by ${b.author}<br/>
      Category: ${b.category}<br/>
      Price: ${b.price} | Rating: ${b.rating} | Year: ${b.year}
    </div>
  `).join("");
}

async function searchByTitle() {
  const title = document.getElementById("searchTitle").value.trim();
  const res = await fetch(`/books/search?title=${encodeURIComponent(title)}`);
  render(await res.json());
}

async function filterByCategory() {
  const c = document.getElementById("cat").value.trim();
  const res = await fetch(`/books/category/${encodeURIComponent(c)}`);
  render(await res.json());
}

async function sortBooks(field) {
  const res = await fetch(`/books/sort/${field}`);
  render(await res.json());
}

async function topRated() {
  const res = await fetch(`/books/top`);
  render(await res.json());
}

async function loadMore() {
  page += 1;
  pageNo.textContent = String(page);
  const res = await fetch(`/books?page=${page}`);
  const data = await res.json();
  render(data.items);
}

(async function init() {
  const res = await fetch(`/books?page=1`);
  const data = await res.json();
  render(data.items);
})();
