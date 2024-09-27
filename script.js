const searchBtn = document.getElementById('search-btn');
const itemList = document.getElementById('item');
const itemDetailsContent = document.getElementById('product-details-content');
const compareCloseBtn = document.getElementById('compare-close-btn');
const detCont=document.getElementById('product-details');

// event listeners
searchBtn.addEventListener('click', getItemList);
itemList.addEventListener('click',getProduct );
compareCloseBtn.addEventListener('click', () => {
    itemDetailsContent.parentElement.classList.remove('showItem');
});


// get item list
function getItemList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://price-api.datayuge.com/api/v1/compare/search?api_key=0vHCE4U0e7KBGDf4XUuYB78qSApUjs5k5o&product=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.data){
            data.data.forEach(item => {
                html += `
                     <div class="product-item" data-id="${item.product_id}">
                        <div class="product-img">
                            <img src="${item.product_image}" alt="product image">
                            <h2>price:₹${item.product_lowest_price}</h2>
                        </div>
                        <div class="item-name">
                            <h3>${item.product_title}</h3>
                            <a href="#" class="compare-btn">Compare</a>
                        </div>
                    </div>
                    
                `;
            });
        }

        itemList.innerHTML = html;
    });
}

// get product
function getProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('compare-btn')){
        let productItem = e.target.parentElement.parentElement;
        console.log(productItem.dataset.id);
        fetch(`https://price-api.datayuge.com/api/v1/compare/detail?api_key=ysSse3b7wv8C8TFEETaUNOcJQotvviIGpFq&id=${productItem.dataset.id}`)
        .then(response => response.json())
        .then(data => itemModal(data.data));
        // console.log(data.data)
    }
}

// create a modal
function itemModal(item){
    console.log(item);
    // item = item[0];
     let html = `
        <div class="image-container">
            <img src="${item.product_images[0]}" alt="">
            <img src="${item.product_images[1]}" alt="">
            <img src="${item.product_images[2]}" alt="">
            <img src="${item.product_images[3]}" alt="">
        </div>
        <div class="flipkart card">
            <h2>flipkart</h2>
            <div class='details_showing'>
                <h6>Product Name : ${item.stores[1].flipkart.product_store}</h6>
                <h3>store link</h3>
                <a href="${item.stores[1].flipkart.product_store_url}">go</a>
                <h3>price: ${item.stores[1].flipkart.product_price}</h3>
                <h3>color : ${item.stores[1].flipkart.product_color}</h3>
                <img src="${item.stores[1].flipkart.product_store_logo}" alt="">
            </div>         
          </div>
          <div class="amazon card">
            <h2>Amazon</h2>
            <div class='details_showing'>
                <h6>Product Name : ${item.stores[0].amazon.product_store}</h6>
                <h3>store link</h3>
                <a href="${item.stores[0].amazon.product_store_url}">go</a>
                <h3>price: ${item.stores[0].amazon.product_price}</h3>
                <h3>color : ${item.stores[0].amazon.product_color}</h3>
                <img src="${item.stores[0].amazon.product_store_logo}" alt="">
            </div> 
          </div>
          <div class="croma card">
            <h2>croma</h2>
            <div class='details_showing'>
                <h6>Product Name : ${item.stores[5].croma.product_store}</h6>
                <h3>store link</h3>
                <a href="${item.stores[5].croma.product_store_url}">go</a>
                <h3>price: ${item.stores[5].croma.product_price}</h3>
                <h3>color : ${item.stores[5].croma.product_color}</h3>
                <img src="${item.stores[5].croma.product_store_logo}" alt="">
            </div> 
          </div>  
        </div>
        `;
    itemDetailsContent.innerHTML= html;
    console.log(itemDetailsContent.innerHTML);
    detCont.classList.add('showItem');
}
