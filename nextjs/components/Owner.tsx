import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
const BidJson = require('../../truffle/build/contracts/Bid.json');
const BidAddress = process.env.NEXT_PUBLIC_ADDRESS_CONTRACT;

export default function Owner() {
    const [owner, setOwner] = useState("");

    const { data } = useReadContract({
        abi: BidJson.abi,
        address: BidAddress as `0x${string}`,
        functionName: 'owner',
        args: [],
    });

    useEffect(() => {
        if (data) {
            setOwner(data as string);
        }
    }, [data]);


    return (
        <div>
            <p className="ml-2 text-gray-500 dark:text-gray-500">
                <em className="font-italic">The owner of the contract is: <strong>{owner}</strong></em>
            </p>
        </div>
    );
}
