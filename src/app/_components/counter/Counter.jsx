"use client";

import { Button, Input, Image } from "@nextui-org/react";
import { useState } from "react";

const Counter = () => {
  const [counters, setCounters] = useState([]);

  const increaseNumber = (counterId) => {
    // Copy the array from counters
    const copiedArray = [...counters];
    // Find value in the array that has id = counterId
    // Then replace the value, that means, value = value+1

    const finalArr = copiedArray.map((counter) => {
      if (counter.id === counterId) {
        counter.value = counter.value + 1;
      }
      return counter;
    });

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

  const deleteOneCounter = (counterId) => {
    //Käytettään deleteOneCounter funktiota, joka ottaa "counterId" parametrin
    //käytetään JS filter metodia, mikä luo uuden taulukon, mikä täyttää annetun id
    //setCounters päivittää sitten eli kun ei ollut sama id nii se painettu "delete player" counter katoaa

    setCounters((prevCounters) =>
      prevCounters.filter((counter) => counter.id !== counterId)
    );

    // In the counter that you want to delete, a counter has {id, value}

    // loop through all the counters from counters

    // counters.map((prevCounters)=> {})

    // in the loop, check counter.id === counterId
    // if it matches, then we delete the counter from the counters Array
    // delete that one from that counters array
    // setCounters to new counters array
  };

  return (
    <div className="">
      <Image src="https://i.imgur.com/sLGHOOh.jpg " />
      <div className="flex flex-col items-center justify-center p-10 ">
        <h1 className="p-10 text-4xl font-bold ">All Players:</h1>
        {counters.map((counter, index) => (
          <div key={index} className="flex flex-col mb-5">
            <h2 className="font-bold">Player {counter.id}</h2>
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
              <div>
                <Button
                  color="warning"
                  onClick={() => {
                    deleteOneCounter(counter.id);
                  }}
                >
                  Delete Player
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button onClick={addMoreCounters}>Add more Player</Button>
      </div>
    </div>
  );
};

export default Counter;
