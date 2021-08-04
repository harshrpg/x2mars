import { ethers } from "ethers";
import Fortmatic from "fortmatic";
import { useState, useEffect, useCallback, useRef } from 'react';

const fm = new Fortmatic('pk_test_9F6718E5778063B7', 'rinkeby');

const provider = new ethers.providers.Web3Provider(fm.getProvider());
const signer = provider.getSigner();

const useEthBalance = () => {
    const [balance, setBalance] = useState(0);

    // useRef are state variables that can maintain values across component re-renders
    const prevBalanceRef = useRef(0);

    // useCallback memoizes the process of fetching the balance and the empty deps ([])
    // makes sure only one object is ever returned
    const fetchBalace = useCallback(
        async () => {
            const address = await signer.getAddress();
            console.log("Fortmatic: ", address);

            const rawBalance = await provider.getBalance(address);
            const value = parseFloat(ethers.utils.formatEther(rawBalance));
            // Since we have subscribed to block changes, only set state when balance has changed for the wallet of interes
            if (value !== prevBalanceRef.current) {
                prevBalanceRef.current = value;
                setBalance(value);
                console.log("Fortmatic: ", balance);
            }
        },
        [],
    );

    // Making request to external resource is a side effect
    useEffect(() => {
        fetchBalace();
    }, [fetchBalace]);

    // Side effect on updates to the wallet
    useEffect(() => {
        provider.on('block', fetchBalace);

        // CLEANUP
        // when component unmounts, unsubscribe (to prevent memory leaks)
        return () => {
            provider.off('block', fetchBalace);
        }
    }, [fetchBalace])

    return balance;
}

export default useEthBalance;
// Fortmatic

// Metamask

// Coinbase