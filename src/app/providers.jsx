"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useContext, useEffect, useReducer } from "react";

export function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

const playerReducer = (state, action) => {
  console.log("Action dispatched:", action.type);
  if (action.type === "ADD_MORE_PLAYER") {
    return {
      ...state,
      players: [...state.players, action.payload],
    };
  }

  if (action.type === "REMOVE_PLAYER") {
    const newPlayers = state.players.filter(
      (counter, index) => action.payload.index !== index
    );
    return {
      ...state,
      players: newPlayers,
    };
  }

  if (action.type === "ADD_POINT") {
    const finalArr = state.players.map((counter, index) => {
      if (index === action.payload.index) {
        counter.value = counter.value + 1;
      }
      return counter;
    });
    return {
      ...state,
      players: finalArr,
    };
  }

  throw Error("Unknown action.");
};

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  // Check if localStorage is available (client side)
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const savedDataString = isLocalStorageAvailable
    ? localStorage.getItem("players") || "[]"
    : "[]";
  const savedDataArray = JSON.parse(savedDataString); // this can be null
  const storedPlayers = savedDataArray || []; // is array always
  // beginning data
  const [playerState, dispatch] = useReducer(playerReducer, {
    players: storedPlayers,
  });

  useEffect(() => {
    // change array to string
    const myCartString = JSON.stringify(playerState.players) || [];
    // save to localStorage
    localStorage.setItem("players", myCartString);
    // only when cartState.cart is changed
  }, [playerState.players]);

  return (
    <PlayerContext.Provider value={{ playerState, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayers = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("useplayer MUST be used within a playerprovider");
  }
  return context;
};
