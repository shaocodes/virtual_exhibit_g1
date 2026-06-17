import { useMemo, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rotor = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const reflector = {
  A: "Y", Y: "A", B: "R", R: "B", C: "U", U: "C", D: "H", H: "D",
  E: "Q", Q: "E", F: "S", S: "F", G: "L", L: "G", I: "P", P: "I",
  J: "X", X: "J", K: "N", N: "K", M: "O", O: "M", T: "Z", Z: "T",
  V: "W", W: "V",
};

function encodeLetter(letter, state) {
  const inputIndex = alphabet.indexOf(letter);
  const shiftedIndex = (inputIndex + state) % alphabet.length;
  const rotorOut = rotor[shiftedIndex];
  const reflected = reflector[rotorOut];
  const reflectedIndex = rotor.indexOf(reflected);
  return alphabet[(reflectedIndex - state + alphabet.length) % alphabet.length];
}

export default function EnigmaSimulator() {
  const [initialState, setInitialState] = useState(0);
  const [rotorState, setRotorState] = useState(0);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");

  const keys = useMemo(() => alphabet.split(""), []);

  const pressKey = (letter) => {
    const encoded = encodeLetter(letter, rotorState);
    setMessage((current) => current + letter);
    setOutput((current) => current + encoded);
    setRotorState((current) => (current + 1) % alphabet.length);
  };

  const reset = () => {
    setRotorState(initialState);
    setMessage("");
    setOutput("");
  };

  const updateInitialState = (event) => {
    const nextState = Number(event.target.value);
    setInitialState(nextState);
    setRotorState(nextState);
    setMessage("");
    setOutput("");
  };

  return (
    <section style={styles.root} aria-label="Enigma simulator">
      <div style={styles.machine}>
        <div style={styles.rotorDisplay}>{String(rotorState).padStart(2, "0")}</div>
        <div style={styles.keyboard}>
          {keys.map((key) => (
            <button key={key} type="button" style={styles.key} onClick={() => pressKey(key)}>
              {key}
            </button>
          ))}
        </div>
        <div style={styles.messageBox}>{message || "TYPE A MESSAGE..."}</div>
      </div>

      <div style={styles.panel}>
        <label style={styles.control}>
          <span>Initial Rotor State</span>
          <input
            type="range"
            min="0"
            max="25"
            value={initialState}
            onChange={updateInitialState}
          />
          <strong style={styles.value}>{initialState}</strong>
        </label>

        <div style={styles.readout}>
          <span>Current Rotor</span>
          <strong>{rotorState}</strong>
        </div>
        <div style={styles.readout}>
          <span>Output</span>
          <strong>{output || "-"}</strong>
        </div>
        <div style={styles.readout}>
          <span>Message</span>
          <strong>{message || "-"}</strong>
        </div>

        <button type="button" style={styles.reset} onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
}

const styles = {
  root: {
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    overflow: "hidden",
    background: "#101010",
    color: "#f8f4e8",
    fontFamily: "monospace",
  },
  machine: {
    padding: "4rem 2rem 2rem",
    background: "#3c4356",
    display: "grid",
    gap: "1.5rem",
    justifyItems: "center",
  },
  rotorDisplay: {
    width: 140,
    height: 86,
    border: "4px solid #b9b9b9",
    borderRadius: 10,
    background: "#111",
    display: "grid",
    placeItems: "center",
    fontSize: 34,
    fontWeight: 700,
  },
  keyboard: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.8rem",
    maxWidth: 780,
  },
  key: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "3px solid #b9b9b9",
    background: "#26282d",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  messageBox: {
    width: "min(720px, 100%)",
    minHeight: 54,
    padding: "0.8rem 1rem",
    border: "4px solid #333",
    background: "#fbf4e4",
    color: "#181818",
    fontSize: 20,
    fontWeight: 700,
    boxSizing: "border-box",
  },
  panel: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
    alignItems: "center",
    padding: "1.5rem",
  },
  control: {
    display: "grid",
    gap: "0.5rem",
  },
  value: {
    padding: "0.6rem 1rem",
    borderRadius: 14,
    background: "#171717",
    textAlign: "center",
  },
  readout: {
    display: "grid",
    gap: "0.5rem",
    textAlign: "center",
  },
  reset: {
    border: "1px solid #444",
    borderRadius: 8,
    padding: "0.8rem 1rem",
    background: "#fbf4e4",
    color: "#111",
    fontWeight: 700,
    cursor: "pointer",
  },
};
