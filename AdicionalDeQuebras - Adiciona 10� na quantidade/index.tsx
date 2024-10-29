import React from "react";
//@ts-ignore
import { useProduct } from "vtex.product-context";
//@ts-ignore
import { useProductDispatch } from "vtex.product-context/ProductDispatchContext";
//@ts-ignore
import "./style.css";

const AdicionalDeQuebras = () => {
  const productContextValue = useProduct();
  const productQuantity = useProductDispatch(); 

  const handleCheckboxChange = (event) => {
    const currentQuantity = productContextValue?.selectedQuantity || 0;
    const additionalQuantity = Math.ceil(currentQuantity / 1.1 * 0.1); // Corrigido para calcular o valor que deve ser removido.

    if (event.target.checked) {
      productQuantity({ 
        type: "SET_QUANTITY", 
        args: { quantity: currentQuantity + additionalQuantity } 
      });
    } else {
      productQuantity({ 
        type: "SET_QUANTITY", 
        args: { quantity: Math.max(currentQuantity - additionalQuantity, 0) } 
      });
    }
  };

  return ( 
    <div className="box-adicionar-quebra">
      <input
        type="checkbox"
        id="adicionar-adicional-de-quebra"
        onChange={handleCheckboxChange}
      />
      <span>Adicionar 10% de quebra em instalações</span>
    </div> 
  );
};

export default AdicionalDeQuebras;
