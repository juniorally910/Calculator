import React, {useState} from 'react'

const Calculator = () => {

    const [input, setInput] = useState("0");
    const [evaluated, setEvaluated] = useState(false);

    const handleClear =()=>{
        setInput("0");
        setEvaluated(false)
    };

    const handleNumber =(value)=>{
        if(evaluated){
            setInput(value)
            setEvaluated(false)
        } else{
            setInput((prev)=>{
                if(prev === "0") return value;
                return prev + value
            });
        }
    }

    const handleDecimal = ()=>{
        if(evaluated){
            setInput("0.")
            setEvaluated(false)
        } else{
            const parts = input.split(/[+\-*/]/);
            const lastNumber = parts[parts.length-1];
            if(!lastNumber.includes(".")){
                setInput((prev)=> prev+".")
            }
        }
    };

    const handleOperator = (op) => {
    if (evaluated) {
      setInput((prev) => prev + op);
      setEvaluated(false);
    } else {
      setInput((prev) => {
        if (/[+*/]$/.test(prev) && op !== "-") {
          return prev.slice(0, -1) + op;
        } else if (/[+*/-]{2,}$/.test(prev)) {
          return prev.replace(/[+*/-]+$/, op);
        } else {
          return prev + op;
        }
      });
    }
  };

  const handleEqual = ()=>{
    try{
        let result = eval(input);
        result = Math.round(result*10000)/10000;
        setInput(result.toString());
        setEvaluated(true);
    } catch{
        setInput("Error")
        setEvaluated(true)
    }
  }


  return (
    <div className='calculator'>
        <div id='display'>
            {input}
        </div>
        <div className='buttons'>
            <button id='clear' onClick={handleClear} >AC</button>
            <button id='divide' onClick={()=> handleOperator("/")} >/</button>
            <button id='multiply' onClick={()=> handleOperator("*")} >*</button>
            <button id="seven" onClick={()=> handleNumber("7")} >7</button>
            <button id="eight" onClick={()=> handleNumber("8")}>8</button>
            <button id="nine" onClick={()=> handleNumber("9")}>9</button>
            <button id='subtract' onClick={()=> handleOperator("-")}>-</button>
            <button id="four" onClick={()=> handleNumber("4")}>4</button>
            <button id="five" onClick={()=> handleNumber("5")}>5</button>
            <button id="six" onClick={()=> handleNumber("6")}>6</button>
            <button id='add' onClick={()=> handleOperator("+")}>+</button>
            <button id="one" onClick={()=> handleNumber("1")}>1</button>
            <button id="two" onClick={()=> handleNumber("2")}>2</button>
            <button id="three" onClick={()=> handleNumber("3")}>3</button>
            <button id='equals' onClick={()=> handleEqual("=")}>=</button>
            <button id="zero" onClick={()=> handleNumber("0")}>0</button>
            <button id="decimal" onClick={()=> handleDecimal(".")}>.</button>
        </div>
      
    </div>
  )
}

export default Calculator
