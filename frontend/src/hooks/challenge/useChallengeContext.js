import { ChallengeContext } from '../../context/ChallengeContext';
import { useContext } from 'react';

export const useChallengeContext = () => {
    const context = useContext(ChallengeContext);

    if (!context) {
        throw Error('useChallengeContext must be used inside an ChallengeContextProvider');
    }

    return context;
}