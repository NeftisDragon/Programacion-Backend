const server = io.connect();

server.on('products', (products) => {
    if (!products.length) {
        document.getElementById('products').innerHTML = `<h2>No products found.</h2>`;
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
    let table = `<div class="table-header">`;
    table +=
        `
        <ul>
            <li class="table-header">
                <div class="col col1">NAME</div>
                <div class="col col2">PRICE</div>
                <div class="col col3">OVERVIEW</div>
            </li>
        </ul>
        `;

    table += `<ul>`;
    products.forEach(product => {
        table +=
            `
            <li class="table-row">
                <div class="col col1">${product.name}</div>
                <div class="col col2">${product.price}}</div>
                <div class="col col3">${product.overview}</div>
            </li>
            `;
    })
    table += `</ul></div>`

    /* `
    <div class="table">
        <ul>
            <li class="table-header">
                <div class="col col1">NAME</div>
                <div class="col col2">PRICE</div>
                <div class="col col3">OVERVIEW</div>
            </li>
        </ul>
        <ul id="render">
        </ul>
    </div>
    `;

    let prodRender = document.getElementById('render');

    for (const product of products) {
        let render = createElement('li');
        prodRender.appendChild(render);
        render.className = "table-row";
        render.innerHTML = 
        `
        <li class="table-row">
            <div class="col col1">${product.name}</div>
            <div class="col col2">${product.price}}</div>
            <div class="col col3">${product.overview}</div>
        </li>
        `;
    } */

    /* document.getElementById('render');
    products.forEach(product => {
        table += `
        <li class="table-row">
        <div class="col col1">${product.name}</div>
        <div class="col col2">${product.price}}</div>
        <div class="col col3">${product.overview}</div>
        </li>
        
        `
    }) */

    return document.getElementById('products').innerHTML = table;
}