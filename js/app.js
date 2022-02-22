


const loader=document.querySelector(".loader")
const main=document.querySelector("#main")


window.addEventListener("load",function () {
  
  loader.style.display="none"


})
// variables
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navList = document.querySelector(".nav-item");
const cartContainer = document.querySelector(".cart-body");
const cartFooter = document.querySelector(".cart-footer");
const cartValue = document.getElementById("totalCartItems");

const showSearchBar = () => {
  document.querySelector(".input-section").classList.toggle("active");
};

const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000,
  },
});

function menProduct() {
  const data = database.filter((item) => item.categories === "woman");

  const productContainer = document.querySelector(".product-container");

  data.map((pd) => {
    productContainer.innerHTML += `
      
      <div class="product-card">
          <img src="${pd.img}" 
          loading="lazy" decoding="async" 
          alt="product-name"  />
          <div class="product-info">
            <p class="product-name">${pd.name}</p>
            <span class="price">$${pd.price}</span>
            <div class="rating">
              <i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i>
            </div>
          </div>

          <div class="view-cart">
            <a href="#" class="view-cart-btn" data-set=${pd.id}>Quick View</a>
          </div>

          <div class="product-addToCart">
          <i class="fas fa-cart-plus" id="cart" onclick="addToCart(${pd.id})"></i>
            <i class="fas fa-exchange-alt"></i>
            <i class="far fa-heart"></i>
          </div>
        </div>
      
      
      `;
  });
}

menProduct();

// popular product

function popularProductDisplay() {
  const popularDatabase = database.slice(6, 32);
  const popularProductContainer = document.querySelector(
    ".popular-product-container"
  );

  popularDatabase &&
    popularDatabase.map((item) => {
      popularProductContainer.innerHTML += `
      
      <div class="product-card">
          <img src="${item.img}" alt="product-name" />
          <div class="product-info">
            <p class="product-name">${item.name}</p>
            <span class="price">$${item.price}</span>
            <div class="rating">
              <i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i><i class="fas fa-star"></i
              ><i class="fas fa-star"></i>
            </div>
          </div>

          <div class="view-cart">
            <a href="#" class="view-cart-btn" data-set=${item.id}>Quick View</a>
          </div>

          <div class="product-addToCart">
            <i class="fas fa-cart-plus" onclick="addToCart(${item.id})"></i>
            <i class="fas fa-exchange-alt"></i>
            <i class="far fa-heart"></i>
          </div>
        </div>
      
      
      `;
    });
}

popularProductDisplay();

const menuBtn = () => {
  openMenu.classList.toggle("hide");
  closeMenu.classList.toggle("hide");
  navList.classList.toggle("active");
};

const openCart = () => {
  document.querySelector(".small-container").classList.toggle("active");
};

// shop btn display

let cart = JSON.parse(localStorage.getItem("CART"))||[]
updateCart()
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnit("plus", id);
  } else {
    const itemId = database.find((product) => product.id === id);
    cart.push({
      ...itemId,
      numberOfUnit: 1,
    });
    console.log(cart);
  }
  updateCart();
}

// update cart

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to loacl Storage

  localStorage.setItem("CART",JSON.stringify(cart))
}

function renderCartItems() {
  cartContainer.innerHTML = "";

  cart.map((cartItem) => {
    return (cartContainer.innerHTML += `
    <!-- cart info  -->
    <div class="cart-info">
      <div class="cart-col">
        <img src="../${cartItem.img} "alt="" />
      </div>
      <div class="cart-col">
        <p>${cartItem.name}</p>
        <form action="" class="cart-value">
          <i class="fas fa-plus" onclick="changeNumberOfUnit('plus',${cartItem.id})"></i>
        
          <span id="value">${cartItem.numberOfUnit}</span>
          <i class="fas fa-minus" onclick="changeNumberOfUnit('minus',${cartItem.id})"></i>
        </form>
      </div>

      <div class="cart-col">
        <a href="#remove" onclick="removeItem(${cartItem.id}) ">Remove</a>
        <h5>$${cartItem.price}.00</h5>
      </div>
    </div>
    <!-- cart info  -->
    <!-- cart footer  -->
  
    <!-- cart footer  -->
  </div>
    
    
    `);
  });
}

function changeNumberOfUnit(action, id) {
  console.log(action, id);
  cart = cart.map((item) => {
    let oldNumberOfUnit = item.numberOfUnit;
    if (item.id === id) {
      if (action === "minus" && oldNumberOfUnit > 1) {
        oldNumberOfUnit = oldNumberOfUnit - 1;
      } else if (action === "plus") {
        oldNumberOfUnit++;
      }
    }
    return {
      ...item,
      numberOfUnit: oldNumberOfUnit,
    };
  });
  updateCart();
}

// calculate & render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItem = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnit;
    totalItem += item.numberOfUnit;
    // console.log(totalPrice);
  });
  cartFooter.innerHTML = "";
  cartFooter.innerHTML += `
    <div>
    <p>Subtotal:</p>
    <span>$${totalPrice}.00 </span>
  </div>
  `;
  cartValue.innerText = cart?cart.length:0;
}

// remove item from cart

function removeItem(id) {
  cart = cart.filter((item) => item.id!==id);
  updateCart()
}

// if ('loading' in HTMLImageElement.prototype) {
//   console.log("yayy");
//   const images=document.querySelectorAll("img[loading='lazy']")
//   images.forEach(img=>{
//     img.src=img.dataset.src
//   })
// }
// else{
//   console.log("ooops");
//   const script=document.createElement('script')
//   script.src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.6.0/dist/lazyload.min.js"
//   document.body.appendChild(script)
// }