"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const Counter = () => {
  const [counters, setCounters] = useState([]);

  const increaseNumber = (counterId) => {
    // Copy the array from counters
    const copiedArray = [...counters];
    // Find value in the array that has id = counterId
    // Then replace the value, that means, value = value+1
    console.log("counters", counters);
    const finalArr = copiedArray.map((counter) => {
      console.log("counterId", counterId);
      if (counter.id === counterId) {
        counter.value = counter.value + 1;
      }
      return counter;
    });

    console.log("finalArr", finalArr);
    // set setCounters with the new array that you just modified
    setCounters(finalArr);
  };

  const decreaseNumber = (counterId) => {
    setCounters((prevCounters) => {
      const updatedCounters = prevCounters.map((counter) => {
        if (counter.id === counterId) {
          return { ...counter, value: counter.value - 1 };
        }
        return counter;
      });

      return updatedCounters;
    });
  };

  const addMoreCounters = () => {
    // Kopsataan nykyiset counterit + lisää uudet counterin, jonka value on 0 aluksi
    setCounters([...counters, { id: counters.length + 1, value: 0 }]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 ">
      {counters.map((counter, index) => (
        <div key={index} className="flex flex-col mb-5">
          <h2>Player {counter.id}</h2>
          <div className="flex flex-row">
            <div className="mr-5">
              <Input value={counter.value} disabled />
            </div>
            <div className="mr-5">
              <Button
                color="primary"
                onClick={() => {
                  increaseNumber(counter.id);
                }}
              >
                +
              </Button>
            </div>
            <div className="mr-5">
              <Button
                color="primary"
                onClick={() => {
                  decreaseNumber(counter.id);
                }}
              >
                -
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addMoreCounters}>Add more Player</Button>
    </div>
  );
};

export default Counter;
