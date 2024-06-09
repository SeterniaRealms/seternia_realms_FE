import Image from 'next/image';
import { useEffect, useState } from 'react';
import bonkImg from '@/../public/components/bonk-token.svg'

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function BonkRunesIntern() {


    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date("2024-04-16") - +new Date();
        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };


    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <form className="mt-4 flex flex-row space-x-8 w-full justify-start items-start px-16">
            <div className="bg-main p-8 rounded-lg">
                <h2 className="text-2xl text-center text-white font-bold">BONK RUINS</h2>

                <div className="flex text-center flex-col text-white">
                    <h3 className="text-2xl font-bold my-2">4.597.545 BONK</h3>
                    <p>prize in this expedition</p>
                    <h3 className="text-2xl font-bold my-2">7 Days</h3>
                    <p>prize in this expedition</p>
                    <h3 className="text-2xl font-bold my-2">12</h3>
                    <p className='font-semibold'>players participating</p>


                    <div className='flex items-start mt-4'>
                        <p>Ends in:</p>
                        <table>
                            <tbody>
                                <tr className='grid font-semibold text-center grid-cols-4 justify-center items-center align-middle'>
                                    <td>{timeLeft.days}</td>
                                    <td>{timeLeft.hours}</td>
                                    <td>{timeLeft.minutes}</td>
                                    <td>{timeLeft.seconds}</td>
                                </tr>
                                <tr className='grid text-center grid-cols-4'>
                                    <td>d</td>
                                    <td>hr</td>
                                    <td>min</td>
                                    <td>sec</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="bg-main text-white rounded-lg py-4 px-10 min-w-[410px]">
                <h2 className="text-2xl text-start font-semibold">Select your Hero</h2>
                <button className="button text-white bg-main pr-2 pl-2 rounded-lg w-auto text-4xl mt-2">
                    +
                </button>

                <h4 className='font-semibold mt-4'>
                    Amout to deposit
                </h4>

                <div className='border  font-bold flex items-center justify-between mt-2 bg-[#5A5A5A] rounded-lg p-4 bg-opacity-50 border-main'>
                    <p className='flex gap-2 items-center'>
                        <Image src={bonkImg} alt='bonk' />
                        BONK
                    </p>
                    <span>
                        0.00
                    </span>
                </div>
                <table className='mt-4 font-semibold'>
                    <tr >
                        <td className='text-left pr-6'>Minimum Deposit</td>
                        <td className='text-right'>500.000 BONK</td>
                    </tr>
                    <tr>
                        <td className='text-left'>Withdraw Fee</td>
                        <td className='text-right'>0.10%</td>
                    </tr>
                </table>

                <div className='flex justify-center'>
                    <button className='bg-main text-white w-full mt-8 mx-auto max-w-60 p-4 border border-silver rounded-lg' type="button">Deposit</button>
                </div>


            </div>
        </form>
    );
}
