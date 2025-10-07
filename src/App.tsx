import './App.css'
import { useState } from 'react'


function App() {

  const [toggleText, setToggleTest] = useState<boolean>(true);

  const [inputText, setinputText] = useState<string>("Hello Friend.");

  return (
    <div>
      <h2>useState Hook</h2>

      <h4>Example - 1</h4>

      <button
        onClick={() => {
          setToggleTest(!toggleText)
        }}
      >
        Toggle.
      </button>
      {toggleText && (<p>Hello Friend!</p>)}

      <h4>Example - 2</h4>

      <input
        readOnly={true}
        value={"Select Value: ".concat(inputText)}></input>
      <select name="List"
        onChange={(event) => {
          setinputText(event.target.value);
        }}
      >
        <option>
          JavaScript
        </option>
        <option>
          TypeScript
        </option>
      </select>
    </div>
  )
}

export default App
