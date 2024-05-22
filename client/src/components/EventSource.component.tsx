"use client";

import React, { useCallback, useEffect, useState } from "react";

const EventSourceComponent = () => {
  const [text, setText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const showClock = useCallback(() => {
    setIsClicked(true);

    const eventSource = new EventSource("http://localhost:3001/sse");

    eventSource.onmessage = (e) => {
      if (!e) return;

      if (e?.data === "close") {
        eventSource.close();
        setIsClicked(false);
        return;
      }
      setText(e.data);
    };

    // eventSource.onerror = (e) => {
    //   console.log(e);
    // };
  }, [isClicked]);

  return (
    <div className="h-96 flex flex-col items-center justify-between">
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={showClock}
        disabled={isClicked}
      >
        Open Clock
      </button>
      <h1 className="text-9xl">
        <span className="text-red-300">{text}</span>
      </h1>
    </div>
  );
};

export default EventSourceComponent;
