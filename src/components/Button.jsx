import React from "react"; 
import "./css/Button.css"; 

// Componente Button, que recebe as propriedades label, onClick e className
const Button = ({ label, onClick, className }) => {
  return (
    // Cria um botão com a classe 'button' e a classe adicional passada como prop 'className'
    // A função 'onClick' é chamada quando o botão é clicado, passando o 'label' como argumento
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label} {/* Exibe o texto do botão (label) */}
    </button>
  );
};

export default Button; 
