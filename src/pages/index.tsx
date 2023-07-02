import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

export default function Home() {
  const [loginModal, setLoginModal] = useState(false);
  const loginUser = useRef<HTMLInputElement>(null);
  const loginPass = useRef<HTMLInputElement>(null);

  const [signupModal, setSignupModal] = useState(false);
  const signupUser = useRef<HTMLInputElement>(null);
  const signupPass = useRef<HTMLInputElement>(null);
  const signupEmail = useRef<HTMLInputElement>(null);
  const signupName = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  Modal.setAppElement('#root');

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
    if (localStorage.getItem('userToken')) {
    }
  }, []);

  return (
    <>
      <Head>
        <title>irlRPG</title>
        <meta name="description" content="Enter the matrix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        id="root"
        className="flex w-[100vw] h-[100vh] bg-gradient-to-b from-[#2e026d] to-[#15162c] justify-center items-center flex-col select-none">
        {error && (
          <div className="bg-[#E94560] text-yellow-50 absolute top-[1rem] px-4 py-1 font-semibold rounded-md flex justify-center items-center gap-4">
            {error}
            <button
              onClick={() => setError('')}
              className="rounded-full bg-white text-black p-1">
              <MdClose size="1.25rem" />
            </button>
          </div>
        )}

        <div className="text-yellow-50 text-[4rem] font-bold">
          irl <span className="text-[#fe8dc6]">RPG</span>
        </div>

        <div className="text-sm opacity-50 italic text-white">
          Turn your real life into a RPG.
        </div>

        <div className="flex mt-7 gap-[2rem] flex-wrap justify-center">
          <button
            onClick={() => setLoginModal(true)}
            className="text-[1.5rem] font-semibold text-white py-[0.5rem] px-[2rem] bg-white bg-opacity-[0.1] flex items-center justify-center rounded-full hover:scale-[1.1] transition-all">
            <span>Login</span>
          </button>

          <button
            onClick={() => setSignupModal(true)}
            className="text-[1.5rem] font-semibold text-white py-[0.5rem] px-[2rem] bg-white bg-opacity-[0.1] flex items-center justify-center rounded-full hover:scale-[1.1] transition-all">
            Signup
          </button>
        </div>
      </main>

      <Modal
        isOpen={loginModal}
        onRequestClose={() => setLoginModal(false)}
        style={customModalStyles}>
        <Login
          loginUser={loginUser}
          loginPass={loginPass}
          showPass={showPass}
          setShowPass={setShowPass}
          setError={setError}
          setLoginModal={setLoginModal}
        />
      </Modal>

      <Modal
        isOpen={signupModal}
        onRequestClose={() => setSignupModal(false)}
        style={customModalStyles}>
        <Signup
          signupUser={signupUser}
          signupPass={signupPass}
          signupName={signupName}
          signupEmail={signupEmail}
          showPass={showPass}
          setShowPass={setShowPass}
          setError={setError}
          setSignupModal={setSignupModal}
        />
      </Modal>
    </>
  );
}

function Login({
  loginUser,
  loginPass,
  showPass,
  setShowPass,
  setError,
  setLoginModal,
}: any) {
  const login = async () => {
    const data = {
      username: loginUser.current.value,
      password: loginPass.current.value,
    };

    const res = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setLoginModal(false);
    if (!res.ok) return setError(await res.text());
    localStorage.setItem('userToken', await res.text());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col w-full">
        <span className="text-[1.5rem] font-bold w-full text-center">
          Login
        </span>

        <hr className="bg-black" />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-[1.15rem]">Username: </span>
          <span className="font-semibold text-[1.15rem]">Password: </span>
        </div>

        <div className="flex flex-col gap-[1.05rem]">
          <input
            required
            ref={loginUser}
            className="outline outline-2 px-1 w-[10rem] rounded-sm"
          />

          <div className="flex justify-center items-center">
            <input
              required
              ref={loginPass}
              className="outline outline-2 pl-1 w-[10rem] pr-8 rounded-sm"
              type={showPass ? 'text' : 'password'}
            />

            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-6">
              {showPass ? (
                <IoMdEye size="1.25rem" />
              ) : (
                <IoMdEyeOff size="1.25rem" />
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={login}
        className="px-[1.5rem] py-[0.5rem] font-semibold text-[1.25rem] bg-black bg-opacity-20 rounded-md hover:scale-[1.1] transition-all">
        Login
      </button>
    </div>
  );
}

function Signup({
  signupUser,
  signupPass,
  signupEmail,
  signupName,
  showPass,
  setShowPass,
  setError,
  setSignupModal,
}: any) {
  const signup = async () => {
    const data = {
      username: signupUser.current.value,
      name: signupName.current.value,
      email: signupEmail.current.value,
      password: signupPass.current.value,
    };

    const res = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSignupModal(false);
    if (!res.ok) return setError(await res.text());
    localStorage.setItem('userToken', await res.text());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col w-full">
        <span className="text-[1.5rem] font-bold w-full text-center">
          Signup
        </span>
        <hr className="bg-black" />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-[1.15rem]">Name: </span>
          <span className="font-semibold text-[1.15rem]">Email: </span>
          <span className="font-semibold text-[1.15rem]">Username: </span>
          <span className="font-semibold text-[1.15rem]">Password: </span>
        </div>
        <div className="flex flex-col gap-[1.05rem]">
          <input
            name="Name"
            required
            ref={signupName}
            className="outline outline-2 px-1 w-[10rem] rounded-sm"
          />
          <input
            name="Email"
            required
            ref={signupEmail}
            className="outline outline-2 px-1 w-[10rem] rounded-sm"
          />
          <input
            name="Username"
            required
            ref={signupUser}
            className="outline outline-2 px-1 w-[10rem] rounded-sm"
          />
          <div className="flex justify-center items-center">
            <input
              name="Password"
              required
              ref={signupPass}
              className="outline outline-2 pl-1 w-[10rem] pr-8 rounded-sm"
              type={showPass ? 'text' : 'password'}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-6">
              {showPass ? (
                <IoMdEye size="1.25rem" />
              ) : (
                <IoMdEyeOff size="1.25rem" />
              )}
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={signup}
        className="px-[1.5rem] py-[0.5rem] font-semibold text-[1.25rem] bg-black bg-opacity-20 rounded-md hover:scale-[1.1] transition-all">
        Signup
      </button>
    </div>
  );
}
