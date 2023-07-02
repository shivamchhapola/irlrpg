import Avatar, { genConfig } from 'react-nice-avatar';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Modal from 'react-modal';
import {
  PiSwordFill,
  PiPlusBold,
  PiHeartFill,
  PiShield,
  PiPersonSimpleRun,
  PiMagicWand,
  PiStar,
  PiMinus,
} from 'react-icons/pi';
import Head from 'next/head';
import { MdAdd, MdCheck, MdClose, MdOutlineSettings } from 'react-icons/md';
import { LuCigarette } from 'react-icons/lu';
import { redirect } from 'next/navigation';
import { text } from 'stream/consumers';

Modal.setAppElement('#root');

export default function App() {
  let userToken: String | null;
  const [level, setLevel] = useState(0);
  const [xpNeeded, setXpNeeded] = useState(100);
  const [xp, setXp] = useState(0);
  const [points, setPoints] = useState(0);
  const [str, setStr] = useState(0);
  const [hel, setHel] = useState(0);
  const [agi, setAgi] = useState(0);
  const [def, setDef] = useState(0);
  const [mag, setMag] = useState(0);
  const [name, setName] = useState('Loading...');
  const [tasks, setTasks] = useState<
    Array<{
      text: string;
      val: Number;
      type: Number;
    }>
  >([]);

  const [add, setAdd] = useState(false);

  const getUser = async () => {
    let res = await fetch('/api/user', {
      method: 'GET',
      headers: {
        Authentication: 'Bearer ' + userToken,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setLevel(data.stats.lvl);
      setXp(data.stats.xp);
      setXpNeeded(data.stats.lvl * 100);
      setPoints(data.stats.points);
      setHel(data.stats.hel);
      setStr(data.stats.str);
      setDef(data.stats.def);
      setAgi(data.stats.agi);
      setMag(data.stats.mag);
      setTasks(data.tasks);
      return setName(data.name);
    } else {
      console.log(await res.text());
    }
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#E7F6F2',
      border: 'none',
    },
  };

  useEffect(() => {
    userToken = localStorage.getItem('userToken');
    if (!userToken) return redirect('/');
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>irlRPG</title>
        <meta name="description" content="App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        id="root"
        className="flex w-[100vw] h-[100vh] bg-gradient-to-b from-[#2e026d] to-[#15162c] justify-start items-center select-none p-4 gap-4">
        <div className="min-w-[15rem] w-[30%] bg-black h-full bg-opacity-20 shadow-lg rounded-md flex flex-col p-4 gap-4">
          <div className="w-full flex p-2 gap-4 items-center">
            <div className="w-[4rem] h-[4rem]">
              <Avatar className="w-full h-full" {...genConfig(name)} />
            </div>
            <div className="flex-1 h-full flex flex-col text-white">
              <div className="w-full font-bold text-lg">{name}</div>
              <div className="text-sm mt-1">
                Level
                <span className="font-bold"> {level}</span>
              </div>
              <div className="mt-1 flex flex-col w-full gap-1">
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
          <div className="h-[0.2rem] w-full bg-white opacity-10 rounded-full"></div>
          <div className="w-full flex-1">
            {points > 0 && (
              <div className="w-full flex items-center justify-center text-xs text-white gap-2 relative">
                <PiStar size="0.9rem" />
                <div>
                  Unused Points <span className="font-bold">{points}</span>
                </div>
              </div>
            )}

            <div className="w-full flex items-center text-white gap-2 relative mt-4">
              <PiHeartFill size="0.9rem" />
              <div>
                Health <span className="font-bold">{hel}</span>
              </div>
              <button className="absolute right-2 hover:bg-white hover:text-black hover:rotate-180 transition-all rounded-full p-[0.1rem]">
                <PiPlusBold size="0.75rem" />
              </button>
            </div>

            <div className="w-full flex items-center text-white gap-2 relative">
              <PiSwordFill size="0.9rem" />
              <div>
                Strength <span className="font-bold">{str}</span>
              </div>
              <button className="absolute right-2 hover:bg-white hover:text-black hover:rotate-180 transition-all rounded-full p-[0.1rem]">
                <PiPlusBold size="0.75rem" />
              </button>
            </div>

            <div className="w-full flex items-center text-white gap-2 relative">
              <PiShield size="0.9rem" />
              <div>
                Defence <span className="font-bold">{def}</span>
              </div>
              <button className="absolute right-2 hover:bg-white hover:text-black hover:rotate-180 transition-all rounded-full p-[0.1rem]">
                <PiPlusBold size="0.75rem" />
              </button>
            </div>

            <div className="w-full flex items-center text-white gap-2 relative">
              <PiPersonSimpleRun size="0.9rem" />
              <div>
                Agility <span className="font-bold">{agi}</span>
              </div>
              <button className="absolute right-2 hover:bg-white hover:text-black hover:rotate-180 transition-all rounded-full p-[0.1rem]">
                <PiPlusBold size="0.75rem" />
              </button>
            </div>

            <div className="w-full flex items-center text-white gap-2 relative">
              <PiMagicWand size="0.9rem" />
              <div>
                Magic <span className="font-bold">{mag}</span>
              </div>
              <button className="absolute right-2 hover:bg-white hover:text-black hover:rotate-180 transition-all rounded-full p-[0.1rem]">
                <PiPlusBold size="0.75rem" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-black h-full bg-opacity-20 shadow-lg rounded-md flex flex-col p-4 gap-4">
          <div className="w-full text-center text-xl font-bold text-white">
            Tasks
          </div>
          <div className="h-[0.2rem] w-full bg-white opacity-10 rounded-full"></div>
          <div className="w-full flex flex-col gap-2 p-4 transition-all duration-500 items-center overflow-y-auto">
            <div className="w-fit pl-2 pr-4 py-1 flex text-white bg-green-400 items-center justify-between bg-opacity-70 rounded-md mb-4 hover:scale-105 transition-all duration-300">
              <button
                onClick={() => setAdd(true)}
                className="flex gap-2 items-center">
                <MdAdd /> <div>Add Task/Habit</div>
              </button>
            </div>

            {tasks.map((task, i) => {
              if (task.type === 0)
                return (
                  <Task
                    i={i}
                    text={task.text}
                    xp={task.val}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                );
              else if (task.type === 1)
                return (
                  <Habit
                    i={i}
                    text={task.text}
                    dmg={task.val}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                );
            })}
          </div>
        </div>
      </main>
      <Modal
        isOpen={add}
        onRequestClose={() => setAdd(false)}
        style={customModalStyles}>
        <AddTask setTasks={setTasks} setAdd={setAdd} />
      </Modal>
    </>
  );
}

function Task({ i, text, xp, tasks, setTasks }: any) {
  const completeTask = async () => {
    let tempTasks = tasks;
    tempTasks.splice(i, 1);
    const res = await fetch('/api/completetask', {
      method: 'POST',
      body: JSON.stringify({ val: xp, tasks: tempTasks }),
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'Bearer ' + localStorage.getItem('userToken') ?? '',
      },
    });

    if (res.ok) {
      const resJ = await res.json();
      return setTasks(resJ);
    }

    console.log(await res.text());
  };

  return (
    <div
      key={i}
      className="w-full px-2 py-1 flex text-white items-center justify-between bg-white bg-opacity-20 rounded-md">
      <div className="flex gap-2 items-center">
        <MdOutlineSettings />
        <div>
          {text}
          <span className="text-[0.6rem] text-yellow-400"> xp +{xp}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={completeTask}
          className="hover:scale-105 transition-all bg-green-400 rounded-full p-1">
          <MdCheck size="1.25rem" />
        </button>
        <button className="hover:scale-105 transition-all bg-red-400 rounded-full p-1">
          <MdClose size="1.25rem" />
        </button>
      </div>
    </div>
  );
}

function Habit({ i, text, dmg }: any) {
  return (
    <div
      key={i}
      className="w-full px-2 py-1 flex text-white items-center justify-between bg-white bg-opacity-20 rounded-md">
      <div className="flex gap-2 items-center">
        <LuCigarette />
        <div>
          {text}
          <span className="text-[0.6rem] text-yellow-400"> dmg -{dmg}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button className="hover:scale-105 transition-all bg-green-400 rounded-full p-1">
          <MdCheck size="1.25rem" />
        </button>
        <button className="hover:scale-105 transition-all bg-red-400 rounded-full p-1">
          <PiMinus size="1.25rem" />
        </button>
      </div>
    </div>
  );
}

function AddTask({ setTasks, setAdd }: any) {
  const [habit, setHabit] = useState(false);
  const text = useRef<HTMLInputElement>(null);
  const val = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const data = {
      text: text.current?.value ?? '',
      val: val.current?.value ?? '',
      type: habit ? 1 : 0,
    };

    const res = await fetch('/api/addtasks', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'Bearer ' + localStorage.getItem('userToken') ?? '',
      },
    });

    if (res.ok) {
      const resJ = await res.json();
      return setTasks(resJ);
    }

    console.log(await res.text());
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div
        onClick={() => setHabit(!habit)}
        className={`w-[5.5rem] flex justify-between items-center px-2 py-1 rounded-md transition-all cursor-pointer ${
          habit ? 'bg-red-400 opacity-80' : 'bg-blue-400 opacity-80 text-white'
        }`}>
        <input className="w-4 h-4" type="checkbox" checked={habit} />
        <span className="font-bold text-lg">Habit</span>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex justify-between gap-4 flex-col">
          <span className="font-bold">{habit ? 'Habit' : 'Task'}</span>
          <span className="font-bold">{habit ? 'Damage' : 'XP'}</span>
        </div>

        <div className="flex gap-4 flex-col">
          <input
            ref={text}
            type="text"
            className="outline outline-2 px-1 w-[20rem] rounded-sm"
          />
          <input
            ref={val}
            type="number"
            min={1}
            max={10}
            className="outline outline-2 px-1 rounded-sm w-12"
          />
        </div>
      </div>

      <div
        onClick={() => {
          onSubmit();
          setAdd(false);
        }}
        className={`flex justify-between items-center px-2 py-1 rounded-md transition-all cursor-pointer ${
          habit ? 'bg-red-400 opacity-80' : 'bg-blue-400 opacity-80 text-white'
        }`}>
        <span className="font-bold text-lg">
          Add {habit ? 'Habit' : 'Task'}
        </span>
      </div>
    </div>
  );
}
