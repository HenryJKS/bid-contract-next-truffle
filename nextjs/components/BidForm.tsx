import { useState } from "react";
import { BaseError } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Web3 from "web3";
const BidJson = require('../../truffle/build/contracts/Bid.json');
const BidAddress = process.env.NEXT_PUBLIC_ADDRESS_CONTRACT;

export default function BidForm() {

    // fornecer uma instância do Web3, com o provider injetado pelo Metamask
    const web3 = new Web3(Web3.givenProvider);

    const { data: hash, error, isPending, writeContract } = useWriteContract()
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = async () => {
        writeContract({
            abi: BidJson.abi,
            address: BidAddress as `0x${string}`,
            functionName: 'bid',
            args: [],
            value: BigInt(web3.utils.toWei(amount.toString(), 'ether')),
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })


    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Participate</h1>

                        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                            Win of the NFTs by placing a bid. The highest bidder will be the winner.
                        </p>
                        <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

                            <div>
                                <label htmlFor="value" className="sr-only">Bid</label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Make the highest bid"
                                        onChange={(e) => setAmount(parseInt(e.target.value))}

                                    />
                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 417"
                                            width="24"
                                            height="24"
                                        >
                                            <g fill="none" fillRule="evenodd">
                                                <polygon fill="#343434" points="127.9 0 124.5 11.6 124.5 274.3 127.9 277.6 255.8 208.1" />
                                                <polygon fill="#8C8C8C" points="127.9 0 0 208.1 127.9 277.6 127.9 147.9" />
                                                <polygon fill="#3C3C3B" points="127.9 302.9 125.7 305.8 125.7 414.5 127.9 417 255.9 234.7" />
                                                <polygon fill="#8C8C8C" points="127.9 417 127.9 302.9 0 234.7" />
                                                <polygon fill="#141414" points="127.9 277.6 255.8 208.1 127.9 147.9" />
                                                <polygon fill="#393939" points="0 208.1 127.9 277.6 127.9 147.9" />
                                            </g>
                                        </svg>
                                    </span>

                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={isPending}
                                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                onClick={handleSubmit}
                            >
                                {isPending ? (
                                    <div className="flex justify-center items-center space-x-2">
                                        <span>Pending</span>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    'Bid'
                                )}
                            </button>

                            {isConfirming && (
                                <p className="text-center text-gray-500 flex justify-center items-center">
                                    Confirming transaction 
                                    <span className="dot-1 animate-[blink_1.4s_ease-in-out_infinite]">.</span>
                                    <span className="dot-2 animate-[blink_1.4s_ease-in-out_infinite_0.2s]">.</span>
                                    <span className="dot-3 animate-[blink_1.4s_ease-in-out_infinite_0.4s]">.</span>
                                </p>
                            )}

                            {isConfirmed && (
                                <div className="rounded border-s-4 border-green-500 bg-green-50 p-2">
                                    <p className="text-sm text-green-700">
                                        Transaction Confirmed!
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                                    <div className="flex items-center gap-2 text-red-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <strong className="block font-medium"> Something went wrong </strong>
                                    </div>

                                    <p className="mt-2 text-sm text-red-700">
                                        Error: {(error as BaseError).shortMessage || error.message}
                                    </p>

                                    {hash && <p className="text-center text-gray-500 text-sm">Transaction Hash: {hash}</p>}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}