const server = io.connect();

server.on('products', (products) => {
    if (!products.length) {
        document.getElementById('products').innerHTML = `<h2 class="error-message">No products found.</h2>`;
    } else {
        document.getElementById('products').innerHTML = renderTable(products);
    }
})

const Fetch = async (url, options) => {
    try {
        const resJson = await fetch(url, options);
        const product = await resJson.json();
        server.emit('newProduct', product);
    } catch (error) {
        return error;
    } finally {
        document.getElementById('prod-form').reset();
    }
}

const newProduct = () => {
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        overview: document.getElementById('overview').value,
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    Fetch('/api/products', options);
}

const renderTable = (products) => {
    let card = ' ';
    products.forEach(product => {
        card +=
            `
            <div class="card">
                <h2 class="prod-title">${product.name}</h2>
                <img src=${product.overview} alt=${product.name} class="prod-overview img-fluid">
                <hr>
                <div class="card-bottom">
                    <h3 class="prod-price">$${product.price}</h3>
                    <div class="btn-container">
                        <a class="card-button">Add to Cart</a>
                    </div>
                </div>
            </div>
            `;
        card += `</div>`;
    })

    /* let table = `<div class="table">`;
    table +=
        `
        <ul>
            <li class="table-header">
                <div class="col col-1">NAME</div>
                <div class="col col-2">PRICE</div>
                <div class="col col-3">OVERVIEW</div>
            </li>
        </ul>
        `;

    table += `<ul>`;
    products.forEach(product => {
        table +=
            `
            <li class="table-row">
                <div class="col col-1">${product.name}</div>
                <div class="col col-2">${product.price}</div>
                <div class="col col-3"><img src=${product.overview} alt=${product.name} class="product-overview"></div>
            </li>
            `;
    })
    table += `</ul></div>` */

    return document.getElementById('products').innerHTML = card;
}