import styled from "styled-components";
import Button from "./Button";

/* Elemento de item da lista personalizado com CSS */
const SLi = styled.li`
    margin-bottom: 10px;
    padding: 16px;
    border-radius: 8px;
    background: #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

/* Elemento de bloco informativo personalizado com CSS*/
const SDivInfo = styled.div`
    p {
        font-size: 16px;
        margin-bottom: 2px;
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }
`;

/* Elemento de bloco de unidades personalizado com CSS*/
const SDivUnits = styled.div`
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        padding: 5px 10px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        cursor: pointer;
    }
`;
/**
 * 
 * @param {object} product
 */

// Componente para listagem de produto no carrinho
function CartProduct({ product, onChange, isLoading }) {
    return (
        <SLi>
            <SDivInfo>
                <p>{product.name}</p>
                <span>R${product.price}</span>
            </SDivInfo>
            <SDivUnits>
                <button
                    disabled={isLoading}
                    onClick={() => onChange(product, -1)}
                >
                    -
                </button>
                <p>{product.units}</p>
                <button
                    disabled={isLoading}
                    onClick={() => onChange(product, +1)}
                >
                    +
                </button>
            </SDivUnits>
        </SLi>
    );
}
/* Elemento de seção personalizado com CSS */
const SSection = styled.section`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${styled.section}
`;
/* Elemento de lista personalizado com CSS */
const SUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
/**
 * Componente para listagem de produtos no carrinho
 *
 * @param {Object[]} products Produtos para listagem
 * @param {Function} onClick Função de finalização
 * @param {Boolean} isLoading Status de loading
 */
function Cart({ products, onChange, onClick, isLoading = false }) {
    return (
        <SSection>
            <SUL>
                {products.map((product) => (
                    <CartProduct
                        key={product.id}
                        product={product}
                        onChange={onChange}
                        isLoading={isLoading}
                    />
                ))}
            </SUL>

            <Button onClick={onClick} isLoading={isLoading}>
                Finalizar Compra
            </Button>
        </SSection>
    );
}

export default Cart;