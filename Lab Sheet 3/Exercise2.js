/* ---------- PRODUCT DATA ---------- */
let products = [
    { name: "Laptop", price: 50000, category: "electronics" },
    { name: "Headphones", price: 2000, category: "electronics" },
    { name: "Book", price: 500, category: "education" }
];

let cart = [];
let couponDiscount = 0;

/* ---------- DISPLAY PRODUCTS ---------- */
const productDiv = document.getElementById("products");

products.forEach((p, index) => {
    productDiv.innerHTML += `
        <div class="product">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${index})">Add</button>
        </div>
    `;
});

/* ---------- ADD TO CART ---------- */
function addToCart(index) {
    let item = cart.find(p => p.name === products[index].name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...products[index], qty: 1 });
    }
    updateCart();
}

/* ---------- REMOVE ITEM ---------- */
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

/* ---------- CHANGE QUANTITY ---------- */
function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

/* ---------- UPDATE CART ---------- */
function updateCart() {
    const cartBody = document.getElementById("cartBody");
    cartBody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;

        /* BULK DISCOUNT */
        if (item.qty >= 3) {
            itemTotal *= 0.90;
        }

        /* CATEGORY DISCOUNTS */
        if (item.category === "education") {
            itemTotal *= 0.95;
        }

        if (item.category === "electronics" && itemTotal >= 10000) {
            itemTotal *= 0.92;
        }

        total += itemTotal;

        cartBody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
            </td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem('${item.name}')">❌</button></td>
        </tr>`;
    });

    /* CART VALUE DISCOUNT */
    if (total > 50000) {
        total *= 0.50;
    }

    /* TIME BASED DISCOUNT */
    let hour = new Date().getHours();
    if (hour >= 18 && hour <= 20) {
        total *= 0.95;
    }

    /* COUPON DISCOUNT */
    total -= couponDiscount;

    document.getElementById("total").innerText =
        "Total: ₹" + total.toFixed(2);
}

/* ---------- APPLY COUPON ---------- */
function applyCoupon() {
    let code = document.getElementById("coupon").value.trim().toUpperCase();
    let msg = document.getElementById("couponMsg");

    couponDiscount = 0;
    msg.style.color = "green";

    switch (code) {
        case "SAVE200":
            couponDiscount = 200;
            msg.innerText = "₹200 OFF Applied";
            break;

        case "MEGA500":
            couponDiscount = 500;
            msg.innerText = "₹500 OFF Applied";
            break;

        case "EDU10":
            cart.forEach(item => {
                if (item.category === "education") {
                    couponDiscount += item.price * item.qty * 0.10;
                }
            });
            msg.innerText = "10% OFF on Education Items";
            break;

        case "ELEC15":
            cart.forEach(item => {
                if (item.category === "electronics") {
                    couponDiscount += item.price * item.qty * 0.15;
                }
            });
            msg.innerText = "15% OFF on Electronics";
            break;

        default:
            msg.innerText = "Invalid Coupon";
            msg.style.color = "red";
    }

    updateCart();
}
