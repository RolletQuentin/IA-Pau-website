import React, { createContext, useReducer } from "react";

export const ChallengeContext = createContext([]);

export const challengeReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                challenge: action.payload
            }
        case 'MERGE':
            return {
                ...state,
                challenge: [...state.challenge, ...action.payload]
            }
        case 'DELETE':
            return {
                ...state,
                challenge: state.challenge.filter((c) => c.id !== action.payload.id)
            }
        case 'REPLACE':
            const newChallenge = state.challenge
            for (let i = 0; i < newChallenge.length; i++) {
                if (newChallenge[i].id === action.payload.lastChallenge.id) {
                    newChallenge[i] = action.payload.newChallenge
                }
            }
            return {
                ...state,
                challenge: newChallenge
            }
        default:
            return state
    }
}

export const ChallengeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(challengeReducer, {
        challenge: [],
    })
    
    return (
        <ChallengeContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </ChallengeContext.Provider>
    )
}