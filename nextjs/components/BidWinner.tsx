import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
const BidJson = require('../../truffle/build/contracts/Bid.json');
const BidAddress = process.env.NEXT_PUBLIC_ADDRESS_CONTRACT;
import Web3 from "web3";



export default function BidWinner() {
    const [bidWinner, setBidWinner] = useState<string>("");
    const [bidAmount, setBidAmount] = useState<string>("");

    let web3 = new Web3(Web3.givenProvider);

    const { data } = useReadContract({
        abi: BidJson.abi,
        address: BidAddress as `0x${string}`,
        functionName: 'bb',
        args: [],
    });

    useEffect(() => {
        if (data) {
            const [addr, amount] = data as [string, bigint];
            setBidWinner(addr);
            setBidAmount(amount.toString());
        }
    }, [data]);


    return (
        <div>

            <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-4">
                    <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    </span>

                    <div>
                        <p className="text-sm text-gray-500">Winner at the moment</p>

                        <p className="text-2xl font-medium text-gray-900">{bidWinner}</p>
                    </div>
                </div>
            </article>

            <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-4">
                    <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </span>

                    <div>
                        <p className="text-sm text-gray-500">Price bid at the moment</p>

                        <p className="text-2xl font-medium text-gray-900">{web3.utils.fromWei(bidAmount.toString(), 'ether')} ETH</p>
                    </div>
                </div>
            </article>
        </div>
    )
}