'use strict';

const products = JSON.parse(window.localStorage.getItem("products")) || [];

products.forEach(function(product) {
    render(product);
})

function addProduct() {
    const isShow = document.querySelector('input[name="show"]:checked').value === 'true';
    const prod = {name: product.value, price: price.value, quantity: quantity.value, id: new Date(), show: isShow};
    products.push(prod);
    render(prod);
    window.localStorage.setItem('products', JSON.stringify(products));
}

function searchProduct() {
    const searchProduct = products.filter(function(product) {
    const productName = product.name.substring(0, search.value.length);
    return productName === search.value;
    });

    list.innerHTML = '';

    searchProduct.forEach(function(product) {
        render(product);
    })
};

function sortProducts() {
    const field = sort.value;
    products.sort(function(prev, next) {
        if (prev[field] < next[field]) {
            return -1;
        } 
        if (prev[field] > next[field]) {
            return 1;
        } 
        return 0;
    });

    list.innerHTML = '';

    products.forEach(function(product) {
        render(product);
    })
}

function sortProductsPrice() {
    const field = sort.value;
    const fieldBigLow = sortBigLow.value;

    /*
    if(fieldBigLow == 'bigger') {
        
        products.sort(function(prev, next) {
            if (prev[field] < next[field]) {
                return -1;
            } 
            if (prev[field] > next[field]) {
                return 1;
            } 
            return 0;
            
            
        });
    } if(fieldBigLow == 'lower') {
        products.sort(function(prev, next) {
            if (prev[field] > next[field]) {
                return -1;
            } 
            if (prev[field] < next[field]) {
                return 1;
            } 
            return 0;
        });
    };
    
    if(fieldBigLow == 'bigger') {
        products.sort((a, b) => a[field].localeCompare(b[field]))
    } if(fieldBigLow == 'lower') {
        products.sort((a, b) => b[field].localeCompare(a[field]))
    }
   */ 
    if(fieldBigLow == 'bigger') {
        products.sort((a, b) => a[field] - b[field])
    } if(fieldBigLow == 'lower') {
        products.sort((a, b) => b[field] - a[field])
    }

    list.innerHTML = '';

    products.forEach(function(product) {
        render(product);
    })
}

function render(product) {
    if(!product.show) {
        return;
    }
    list.innerHTML = list.innerHTML + '<li>' + product.name + ' - ' + product.price + ' ' + product.quantity + ' шт' + '</li>';
};

