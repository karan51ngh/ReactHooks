/**
 *
 * What is useState?
 * - A React Hook that lets a function component hold state between renders.
 * - Signature: const [state, setState] = useState(initialState)
 *   - state: the current value for this render
 *   - setState(nextState | updaterFn): schedules a state update and re-render
 *
 * Key facts:
 * - Initial state is used only on the first render. On subsequent renders, React ignores it.
 * - setState is asynchronous and may be batched; do not expect state to change immediately after calling it.
 * - When the next state depends on the previous state, prefer the functional updater form:
 *     setState(prev => computeFrom(prev))
 * - React re-renders the component when the state value changes (by reference or primitive value).
 * - Rules of Hooks apply: call useState at the top level of a React function component or custom hook,
 *   not inside loops, conditions, or nested functions.
 *
 * Below, this component demonstrates:
 * - Example 1: A boolean toggle flag.
 * - Example 2: A string state derived from a <select>, displayed in a read-only <input>.
 */

import { useState } from 'react';

/**
 * Renders two examples showing how useState works.
 *
 * Example 1:
 * - toggleText holds a boolean.
 * - Clicking the button flips the boolean.
 * - Note: In scenarios where you schedule multiple updates or rely on the previous value,
 *   prefer the functional updater form: setToggleTest(prev => !prev)
 *
 * Example 2:
 * - inputText holds a string selected from a dropdown.
 * - The read-only input displays a derived, formatted string; it's "controlled" by React state.
 * - The select's onChange updates the state with the selected value.
 */
export default function UseStateUsage() {
  // Example 1: boolean toggle state.
  const [toggleText, setToggleTest] = useState<boolean>(true);

  // Example 2: string state for select/input.
  const [inputText, setinputText] = useState<string>('Hello Friend.');

  return (
    <div>
      <h2>useState Hook</h2>

      <h4>Example - 1</h4>

      {/*
        Clicking this button toggles the boolean.
        This handler reads the current render's value of toggleText and inverts it.
      */}
      <button
        onClick={() => {
          // Alternative form:
          // setToggleTest(prev => !prev);
          setToggleTest(!toggleText);
        }}
      >
        Toggle.
      </button>

      {/* Conditionally render based on state. */}
      {toggleText && <p>Hello Friend!</p>}

      <h4>Example - 2</h4>

      {/*
        Read-only controlled input that shows a label derived from inputText.
        it's purely a visual reflection of the select-controlled state below.
      */}
      <input readOnly={true} value={'Select Value: '.concat(inputText)} />

      {/*
        <select> updates the string state. Each <option> uses its text as the value by default.
        You could also be explicit: <option value="JavaScript">JavaScript</option>.

        onChange receives an event whose target.value is the selected option's value.
        We pass that into the state setter, which schedules a re-render with the new string.
      */}
      <select
        name="List"
        onChange={(event) => {
          setinputText(event.target.value);
        }}
      >
        <option>JavaScript</option>
        <option>TypeScript</option>
      </select>
    </div>
  );
}
