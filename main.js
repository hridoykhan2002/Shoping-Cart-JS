
// let keyword
let productS = [
    {
        title: "Dark Trouser",
        price: 20,
        inHert:0,
        tag: "darktrouser"
    },
    {
        title: "Dark TShirt",
        price: 30,
        inHert:0,
        tag: "darktshirt"
    },
    {
        title: "Red TShirt",
        price: 30,
        inHert:0,
        tag: "redtshirt"
    },
    {
        title: "Levie Jeans",
        price: 100,
        inHert:0,
        tag: "lseviejeans"
    },
];
// loop
try{
    for(let x = 0; x < 4; x++){
        const cartS = document.querySelectorAll('.img-box a')
        cartS[x].addEventListener('click',()=>{
            getCart(productS[x]);
            totallCost(productS[x]);
        })
    }
}catch(e){
    
}
// functions
function CartOnLoad (){
    let getFromLocal = localStorage.getItem('getValue');
    if(getFromLocal){
        document.querySelector('.cart a span').textContent = getFromLocal;
    }
}
function getCart (product){
    let getFromLocal = localStorage.getItem('getValue');
    getFromLocal = parseInt(getFromLocal);
    if(getFromLocal){
        localStorage.setItem('getValue', getFromLocal + 1);
        document.querySelector('.cart a span').textContent = getFromLocal + 1;
    }else{
        localStorage.setItem('getValue', 1);
        document.querySelector('.cart a span').textContent = 1;
    }
    setItems(product);
};
function setItems (product) {
    let cartItems = localStorage.getItem('cartProduct');
    cartItems = JSON.parse(cartItems)
    if(cartItems != null){
        if(cartItems[product.tag] === undefined){
        cartItems = {
                ...cartItems,
                [product.tag]:product
        }
        }
        cartItems[product.tag].inHert += 1;
    }else{
        product.inHert = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    localStorage.setItem('cartProduct', JSON.stringify(cartItems))
}

function totallCost (product) {
    // console.log("here is product price",product.price);
    let getCost = localStorage.getItem('totalCost');
    console.log("my total cost is", getCost);
    if(getCost != null){
        getCost = parseInt(getCost)
        localStorage.setItem('totalCost', getCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }
};

function displayCart(){
    let cartData = localStorage.getItem('cartProduct');
    cartData = JSON.parse(cartData);
    const cartInner = document.querySelector('.cart-inner')
    if(cartData && cartInner){
        cartInner.innerHTML = "";
        Object.values(cartData).map(cart =>{
            cartInner.innerHTML +=`
            <div class="parent">
                <div class="product">
                    <i class="fa-regular fa-circle-xmark closeBtn" class=""></i>
                    <img src="./img/${cart.tag}.png"/>
                    <span>${cart.title}</span>
                </div>
                <div class="price">
                    ${cart.price}
                </div>
                <div class="quantity">
                    <i class="fa-solid fa-arrow-left incresBtn"></i>
                    <span>${cart.inHert}</span>
                    <i class="fa-solid fa-arrow-right decressBTn"></i>
                </div>
                <div class="total">${cart.inHert * cart.price}</div>
            </div>
            `
            const closeBtns = cartInner.querySelectorAll('.closeBtn')
            closeBtns.forEach((closeBtn) =>{
                closeBtn.addEventListener('click',(e) =>{
                    removeElement(e);
                })
            });
            const incresBtn = cartInner.querySelectorAll('.incresBtn')
            incresBtn.forEach((closeBtn) =>{
                closeBtn.addEventListener('click',(e) =>{
                    incressValue(e);
                })
            });
            const decressBtn = cartInner.querySelectorAll('.decressBTn')
            decressBtn.forEach((closeBtn) =>{
                closeBtn.addEventListener('click',(e) =>{
                    decressValue(e);
                })
            });
        });
    } 
}
// call function
CartOnLoad();
displayCart();

const removeElement = (e) =>{
    const cartInner = document.querySelector('.cart-inner')
    const tarEle = e.target.parentElement.parentElement;
    console.log(tarEle);
    cartInner.removeChild(tarEle);
    
};
const incressValue = (e) =>{
    let tarEle = e.target.nextElementSibling;
    tarEle.innerHTML = parseInt(tarEle.textContent) -1;
    let totalPrice = e.target.parentElement.nextElementSibling;
    const singlePrice = e.target.parentElement.previousElementSibling;
    totalPrice.textContent = parseInt(totalPrice.textContent) - parseInt(singlePrice.textContent);
    if(tarEle.textContent <= 0){
        tarEle.textContent = 0;
        totalPrice.textContent = 0;
    }
};

const decressValue = (e) =>{
    let tarEle = e.target.previousElementSibling;
    tarEle.innerHTML = parseInt(tarEle.textContent) + 1;
    let totalPrice = e.target.parentElement.nextElementSibling;
    const singlePrice = e.target.parentElement.previousElementSibling;
    totalPrice.textContent = parseInt(totalPrice.textContent) + parseInt(singlePrice.textContent);
};