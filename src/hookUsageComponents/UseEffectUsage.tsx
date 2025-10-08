/**
 *
 * What is useEffect?
 * - A React Hook for running side effects after React has updated the DOM (after commit).
 * - Typical side effects: subscriptions, timers, logging, data fetching, DOM APIs, syncing state with external systems.
 *
 *
 * Cleanup:
 * - If effect returns a function, React calls it before the effect re-runs (and on unmount).
 *
 * Important behavior notes:
 * - Effects run asynchronously after paint, not during render. Do not block rendering inside effects.
 * - State updates inside effects schedule a re-render. If your effect runs on every render and sets state
 *   unconditionally, it can create an infinite re-render loop. Guard with dependencies or conditions.
 * - React 18 StrictMode (development only) intentionally mounts, unmounts, and re-mounts components,
 *   re-running effects on initial mount to surface non-idempotent side effects. Production builds run once.
 *
 */

import { useState, useEffect } from 'react';

/**
 * Demonstrates different dependency patterns for useEffect:
 *
 * - "Every render" effect (no deps): logs on each commit. Safe because it doesn't set state.
 * - "Once on mount" effect ([] deps): initializes randomNumber1 once.
 * - "Every render (undefined deps)" effect: updates randomNumber2 on every render, which (since it sets state)
 *   creates a re-render loop; this is generally an anti-pattern and is documented below.
 * - "Specific dependency" effect ([refreshButton2]): updates randomNumber3 only when refreshButton2 changes.
 *
 * UI:
 * - Two buttons toggle boolean flags; those flags are used to trigger effects or demonstrate re-renders.
 * - Three read-only inputs display the random values produced by different effect patterns.
 */
export default function UseEffectUsage() {
  // Local triggers and derived values
  const [refreshButton, setRefreshButton] = useState<boolean>(true);
  const [refreshButton2, setRefreshButton2] = useState<boolean>(true);
  const [randomNumber1, setRandomNumber1] = useState<number>(0);
  const [randomNumber2, setRandomNumber2] = useState<number>(0);
  const [randomNumber3, setRandomNumber3] = useState<number>(0);

  /**
   * Effect A: Empty dependency array [].
   * - Runs only once after the initial mount (and cleanup on unmount).
   * - Good for one-time initialization (e.g., fetching initial data, reading from localStorage).
   *
   * React 18 StrictMode note (development only):
   * - This effect runs twice on mount to help detect unintended side effects; production runs once.
   */
  useEffect(() => {
    setRandomNumber1(Math.floor(Math.random() * 10));
  }, []);

  /**
   * Effect B: deps explicitly passed as undefined.
   * - Equivalent to "no dependency array": runs after every render.
   * - Because it calls setRandomNumber2 on every run, this will continuously schedule re-renders,
   *   effectively creating a render loop and constantly changing randomNumber2.
   *
   * This pattern is generally discouraged for state updates. It causes a Render Loop
   */
  useEffect(() => {
    setRandomNumber2(Math.floor(Math.random() * 10));
    /** undefined deps: same as omitted; runs after every render */
  }, );

  /**
   * Effect C: Specific dependency [refreshButton2].
   * - Runs after initial mount and any time refreshButton2 changes.
   * - This is the recommended pattern to react to a specific change.
   */
  useEffect(() => {
    setRandomNumber3(Math.floor(Math.random() * 10));
  }, [refreshButton2]);

  return (
    <div>
      <h2>useEffect Hook</h2>

      {/*
        Button 1: Toggles refreshButton.
        - Since Effect A runs on every render, clicking this will cause a re-render and thus log again.
        - It does not directly trigger randomNumber3, because Effect C depends on refreshButton2, not refreshButton.
      */}
      <button
        onClick={() => {
          setRefreshButton(!refreshButton);
        }}
      >
        Randomize.
      </button>

      {/*
        Button 2: Toggles refreshButton2.
        - Triggers Effect C, updating randomNumber3.
      */}
      <button
        onClick={() => {
          setRefreshButton2(!refreshButton2);
        }}
      >
        Randomize 2.
      </button>

      <h4>Example - 1</h4>
      {/*
        Produced by Effect A ([] deps): initialized once on mount.
        In StrictMode (dev), it may initialize twice during development, but production runs once.
      */}
      <input
        readOnly={true}
        value={'Random 1: '.concat(randomNumber1.toString())}
      ></input>

      <h4>Example - 2</h4>
      {/*
        Produced by Effect B (undefined deps): updates every render due to state updates in the effect,
        which in turn triggers another render. This demonstrates why "every render" effects
        should generally avoid unguarded setState calls.
      */}
      <input
        readOnly={true}
        value={'Random 2: '.concat(randomNumber2.toString())}
      ></input>

      <h4>Example - 3</h4>
      {/*
        Produced by Effect C ([refreshButton2] deps): updates when the "Randomize 2." button is clicked,
        and on the initial mount.
      */}
      <input
        readOnly={true}
        value={'Random 3: '.concat(randomNumber3.toString())}
      ></input>
    </div>
  );
}
