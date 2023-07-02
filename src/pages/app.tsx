import Avatar, { genConfig } from 'react-nice-avatar';
import { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

export default function app() {
  const [xpNeeded, setXpNeeded] = useState(100);
  const [xp, setXp] = useState(30);

  return (
    <div className="flex w-[100vw] h-[100vh] bg-gradient-to-b from-[#2e026d] to-[#15162c] justify-start items-center select-none p-4 gap-4">
      <div className="min-w-[15rem] w-[30%] bg-black h-full bg-opacity-20 shadow-lg rounded-md flex flex-col p-4 gap-4">
        <div className="w-full flex p-2 gap-2 items-center">
          <div className="w-[3rem] h-[3rem]">
            <Avatar className="w-full h-full" {...genConfig('Shivam')} />
          </div>
          <div className="flex-1 h-full flex flex-col text-white">
            <div className="w-full font-bold text-lg">Shivam</div>
            <div className="text-sm mt-1">
              Level
              <span className="font-bold"> 1000</span>
            </div>
            <div className="mt-1 flex flex-col w-full">
              <div className="flex justify-between w-full text-xs">
                <span>
                  {xp}/{xpNeeded}
                </span>
                <span>{Math.round((xp * 100) / xpNeeded)}%</span>
              </div>
              <ProgressBar
                animateOnRender
                isLabelVisible={false}
                height="0.5rem"
                baseBgColor="rgba(0,0,0,0.3)"
                completed={Math.round((xp * 100) / xpNeeded)}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex-1"></div>
      </div>
      <div className="flex-1 bg-black h-full bg-opacity-20 shadow-lg rounded-md"></div>
    </div>
  );
}
