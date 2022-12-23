const btnPlusReduce = Array.from(document.getElementsByClassName('product__quantity-control')); //Получаем кнопки + и -
const btnAddCart = Array.from(document.getElementsByClassName('product__add'));  //Кнопка Добавить в корзину
const cart = document.getElementById('cart__products'); // Содержимое корзины
arrDataIdCart = []; //Вспомогательный массив, содержит id добавленых в корзину


btnPlusReduce.forEach(elem => {                   //Делаем функционал кнопок + и - 
    elem.addEventListener('click', () => {
        if(elem.classList.contains('product__quantity-control_dec')) {
            elem.nextElementSibling.textContent > 0 ? --elem.nextElementSibling.textContent: elem.nextElementSibling.textContent === 0; 
        }
        else {
            ++elem.previousElementSibling.textContent; 
        }
    });
});


btnAddCart.forEach(elem => {              //Выясняем есть ли id добавляемого товара в массиве arrDataIdCart
    elem.addEventListener('click', () => {
        let temp = elem.closest('.product').getAttribute('data-id');
        arrDataIdCart.some(elem => elem === temp) ? plusQuantity(elem) : itemInBasket(elem);
    });
});

function itemInBasket(elem) {                          //Добавление нового товара в корзину

    let srcImg = elem.closest('.product__controls').previousElementSibling.getAttribute('src'); // Ссылка на картинку
    let quantity = elem.previousElementSibling.children[1].textContent.trim(); // Количество товара в корзине
    let dataId = elem.closest('.product').getAttribute('data-id');

    if(quantity > 0) {

    let product = document.createElement('div');
    product.className = 'cart__product';
    product.setAttribute('data-id', dataId);
    arrDataIdCart.push(dataId);

    let img = document.createElement('img');
    img.className = 'cart__product-image';
    img.setAttribute('src', srcImg);

    let productCount = document.createElement('div');
    productCount.className = 'cart__product-count';
    productCount.textContent = quantity;

    product.appendChild(img);
    product.appendChild(productCount);

    cart.appendChild(product);

    }
    
}

function plusQuantity (elem) {                  //Изменение количества товара в корзине

    let tempArrCart = Array.from(document.getElementsByClassName('cart__product')); //Получаем объекты из корзины
    let tempIdProduct = elem.closest('.product').getAttribute('data-id'); // Получаем id текущего товара к которому относится нажатая кнопка
    let tempQuantityProduct = elem.previousElementSibling.children[1].textContent.trim(); // Количество выбранного товара

    tempArrCart.forEach(elem => {
        let tempIDCart = elem.getAttribute('data-id');
        if(tempIDCart === tempIdProduct) {
            let i = Number(elem.children[1].textContent);
            elem.children[1].textContent = i + Number(tempQuantityProduct) ;  
        }
    });
    

}

