import React, { useState } from "react"; 
import Display from "./Display"; // Importando componente Display (onde exibe o valor)
import Button from "./Button"; // Importando componente Button (representa os botões)
import "./css/Calculator.css"; 

const Calculator = () => {
  // Estado que armazena o valor atual do input da calculadora
  const [input, setInput] = useState("0");

  // Estado que armazena o valor anterior (usado para realizar cálculos)
  const [previousInput, setPreviousInput] = useState(null);

  // Estado que armazena o operador (+, -, ×, ÷) selecionado
  const [operator, setOperator] = useState(null);

  // Função chamada ao clicar em um botão
  const handleButtonClick = (value) => {
    // Se pressionar "AC", reseta o estado da calculadora
    if (value === "AC") {
      setInput("0");
      setPreviousInput(null);
      setOperator(null);
    }
    // Se pressionar "+/-", inverte o sinal do número atual
    else if (value === "+/-") {
      setInput((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
    }
    // Se pressionar "%", transforma o valor atual em sua porcentagem
    else if (value === "%") {
      setInput((prev) => {
        const num = parseFloat(prev);
        return (num / 100).toString(); // Converte o número para porcentagem
      });
    }
    // Se pressionar "=", realiza o cálculo com o operador e os números
    else if (value === "=") {
      if (operator && previousInput !== null) {
        try {
          const result = calculate(previousInput, operator, input);
          setInput(result.toString()); // Exibe o resultado
          setPreviousInput(null);
          setOperator(null);
        } catch {
          setInput("Erro"); // Se houver erro no cálculo, exibe "Erro"
        }
      }
    }
    // Se pressionar um operador (+, -, ×, ÷), armazena o operador e o número anterior
    else if (["+", "-", "×", "÷"].includes(value)) {
      setOperator(value);
      setPreviousInput(input); // Armazena o número antes do operador
      setInput("0"); // Reseta o valor de input para o próximo número
    }
    // Se pressionar um número ou ponto, concatena ao valor atual
    else {
      setInput((prev) => (prev === "0" ? value : prev + value));
    }
  };

  // Função que realiza os cálculos com base no operador
  const calculate = (prev, operator, current) => {
    const prevNum = parseFloat(prev); // Converte o valor anterior para número
    const currentNum = parseFloat(current); // Converte o valor atual para número

    // Executa a operação de acordo com o operador
    switch (operator) {
      case "+":
        return prevNum + currentNum;
      case "-":
        return prevNum - currentNum;
      case "×":
        return prevNum * currentNum;
      case "÷":
        if (currentNum === 0) {
          throw new Error("Divisão por zero"); // Trata erro de divisão por zero
        }
        return prevNum / currentNum;
      default:
        return 0;
    }
  };

  return (
    <div className="calculator"> {/* Componente principal da calculadora */}
      <Display value={input} /> {/* Exibe o valor no display */}
      <div className="buttons"> {/* Contém os botões */}
        {/* Botões de controle e operação */}
        <Button label="AC" onClick={handleButtonClick} className="secondary" />
        <Button label="+/-" onClick={handleButtonClick} className="secondary" />
        <Button label="%" onClick={handleButtonClick} className="secondary" />
        <Button label="÷" onClick={handleButtonClick} className="operator" />

        {/* Botões numéricos */}
        <Button label="7" onClick={handleButtonClick} />
        <Button label="8" onClick={handleButtonClick} />
        <Button label="9" onClick={handleButtonClick} />
        <Button label="×" onClick={handleButtonClick} className="operator" />

        <Button label="4" onClick={handleButtonClick} />
        <Button label="5" onClick={handleButtonClick} />
        <Button label="6" onClick={handleButtonClick} />
        <Button label="-" onClick={handleButtonClick} className="operator" />

        <Button label="1" onClick={handleButtonClick} />
        <Button label="2" onClick={handleButtonClick} />
        <Button label="3" onClick={handleButtonClick} />
        <Button label="+" onClick={handleButtonClick} className="operator" />

        {/* Botões adicionais */}
        <Button label="0" onClick={handleButtonClick} className="zero" />
        <Button label="." onClick={handleButtonClick} />
        <Button label="=" onClick={handleButtonClick} className="operator" />
      </div>
    </div>
  );
};

export default Calculator; 
