let shopContainer=document.querySelector(".shop-product-container")

function popularProductDisplay() {

    

    database.map(item=>{

        shopContainer.innerHTML+=`
      
      <div class="product-card" data-item="${item.categories}">
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
            <a href="#" class="view-cart-btn" data-set=${item.id} onclick=>Quick View</a>
          </div>

          <div class="product-addToCart">
            <i class="fas fa-cart-plus"></i>
            <i class="fas fa-exchange-alt"></i>
            <i class="far fa-heart"></i>
          </div>
        </div>
      
      
      `
    })

    
  }

  popularProductDisplay()

  

  let productBtn=document.querySelectorAll(".product-btn")
  let card=document.querySelectorAll(".product-card")


  for (let i=0; i<productBtn.length;i++ ){
      productBtn[i].addEventListener("click",function(){
          for(let j=0; j<productBtn.length;j++){
              productBtn[i].classList.toggle("active")
          }

      })
  }


const singleID=()=>{
  console.log();
}