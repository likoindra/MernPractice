import React, { useState } from "react";

export default function CounterFunction(props) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      Counter Function Component
      <div>0</div>
      <div>
        <button>Increment</button>
        <button>Decrement</button>
      </div>
    </div>
  );
}
