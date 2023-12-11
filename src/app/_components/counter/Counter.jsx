"use client";

import { usePlayers } from "@/app/providers";
import { Button, Input, Image } from "@nextui-org/react";
import { useState } from "react";

const Counter = () => {
  const [counters, setCounters] = useState([]);
  const { playerState, dispatch } = usePlayers();

  const increaseNumber = (playerIndex) => {
    dispatch({
      type: "ADD_POINT",
      payload: { index: playerIndex },
    });
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
    dispatch({
      type: "ADD_MORE_PLAYER",
      payload: { value: 0 },
    });
  };

  const deleteOneCounter = (index) => {
    //Käytettään deleteOneCounter funktiota, joka ottaa "counterId" parametrin
    //käytetään JS filter metodia, mikä luo uuden taulukon, mikä täyttää annetun id
    //setCounters päivittää sitten eli kun ei ollut sama id nii se painettu "delete player" counter katoaa

    dispatch({
      type: "REMOVE_PLAYER",
      payload: { index },
    });
  };

  const resetAllCounters = () => {
    //loop every counter and return new array
    // give all counter value 0
    const newCounters = counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    setCounters(newCounters);
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://i.imgur.com/sLGHOOh.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10 ">
          <h1 className="p-10 text-4xl font-bold ">All Players:</h1>
          {playerState.players.map((counter, index) => (
            <div key={index} className="flex flex-col mb-5">
              <h2 className="font-bold">Player {index + 1}</h2>
              <div className="flex flex-row">
                <div className="mr-5">
                  <Input value={counter.value} disabled />
                </div>
                <div className="mr-5">
                  <Button
                    color="primary"
                    onClick={() => {
                      increaseNumber(index);
                    }}
                  >
                    +
                  </Button>
                </div>
                <div className="mr-5">
                  <Button
                    color="primary"
                    onClick={() => {
                      decreaseNumber(index);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div>
                  <Button
                    color="warning"
                    onClick={() => {
                      deleteOneCounter(index);
                    }}
                  >
                    Delete Player
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="space-x-4">
            <Button onClick={addMoreCounters}>Add More Player</Button>
            <Button onClick={resetAllCounters}>Reset All Players Points</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
