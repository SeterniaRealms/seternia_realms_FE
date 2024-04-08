import Image from 'next/image';

export function TrainingCamp() {

    return (
        <form className="mt-4 flex flex-row space-x-8 pt-6 pb-6 pr-16 pl-16 justify-start items-start">
            <div className="bg-[#DEC58D] p-8 rounded-lg">
                <h2 className="text-2xl text-center text-main font-semibold">TRAINING CAMP</h2>
                <div className="mt-6 flex flex-col">
                    <button className="button bg-main p-2 pr-6 pl-6 rounded-lg w-28">
                        Prize
                    </button>
                    <div className="mt-4 mb-4" >
                        {/* <Image src="" alt={'gold'} width={75} /> */}
                        <span className="text-main font-semibold text-sm">10 GOLD per hour</span>
                    </div>
                    <button className="button bg-main p-2 pr-6 pl-6 rounded-lg w-28">
                        Duration
                    </button>
                    <div className="mt-4 mb-4" >
                        {/* <Image src="" alt={'gold'} width={75} /> */}
                        <span className="text-main font-semibold text-sm">1 hour lock period</span>
                    </div>
                </div>
            </div>
            <div className="bg-[#DEC58D] rounded-lg p-8 min-h-[310px] min-w-[410px]">
                <h2 className="text-2xl text-start text-main font-semibold">Select your Hero</h2>
                <div className="text-center justify-between">
                    <div className="items-end justify-start text-left">
                        <button className="button bg-main pr-2 pl-2 rounded-lg w-auto text-4xl">
                            +
                        </button>
                    </div>
                    <button className="button bg-main p-2 pr-6 pl-6 rounded-lg w-auto mt-16">
                        Start training
                    </button>
                </div>
            </div>
        </form>
    );
}
