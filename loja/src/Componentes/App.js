import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cart from "./ComponentesEspecificos/Cart";
import Products from "./ComponentesEspecificos/Products";
import "./ComponentesEspecificos/CSS/App.css";


/**
 * 
 * @param {string} url 
 * @param {string} method 
 *
 * @returns 
 */

// Função para chamar API
async function api(url, method, body = undefined) {
  return await fetch(`http://localhost:4000${url}`, {
    body: body !== undefined ? JSON.stringify(body) : body,
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

/**
 * 
 * @returns 
 */
// Busca todos os produtos da API
async function apiGetProducts() {
  const data = await api("/products", "GET");
  return data.products;
}

/**
 * 
 * @param {object[]} products 
 */
// Salva o carrinho de compras na API
async function apiSubmitCart(products) {
  await api("/purchases", "POST", { products });
}

function App() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  async function getProducts() {
    setProductsLoading(true);
    setProducts(await apiGetProducts());
    setProductsLoading(false);
  }

  async function submitCart() {
    setCartLoading(true);
    await apiSubmitCart(cart);
    setCart([]);
    setCartLoading(false);

    getProducts();
  }

  function setProduct(product, change) {
    const updatedCart = cart.filter(({ id }) => id !== product.id);

    product.units += change;
    if (product.units > 0) {
      setCart([...updatedCart, product]);
    } else {
      setCart(updatedCart);
      setProducts((lastProducts) => [...lastProducts, product]);
    }
  }

  function addProduct(product) {
    product.units = 1;
    setCart(() => [...cart,product]);

    setProducts(products.filter(({ id }) => id !== product.id));
  }

  useEffect(() => {
    getProducts(); // Busca os produtos ao carregar a página
  }, []);

  const SMain = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;
  `;

  return (
    <SMain>
      <Cart
        products={cart}
        onChange={setProduct}
        onClick={submitCart}
        isLoading={cartLoading}
      />

      <Products
        products={products}
        onClick={addProduct}
        isLoading={productsLoading}
      />
    </SMain>
  );
}

export default App;
