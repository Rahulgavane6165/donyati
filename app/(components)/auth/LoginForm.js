
"use client";

import React, { useEffect, useState } from 'react';

import ForgotPasswordForm from './ResetPassword'
import GithubButton from './signinbtns/GithubSignin';
import GoogleButton from './signinbtns/GoggleSignin';
import Link from 'next/link';
import Loader from '../loader/loader';
import Microsoft from './signinbtns/MicrosoftSignin';
import ReactCardFlip from 'react-card-flip';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/")
    }
    else {
      router.push("/dashboard")
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, email,password,remember: rememberMe ? '1' : undefined,});

      if (!result.error) {
        router.push('/dashboard');
        toast.success('Login success');
      } else {
        setError('*Invalid Credentials');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function flipcard() {
    setIsFlipped(!isFlipped);
  }
  return (
    <>
      <ReactCardFlip
        flipDirection="vertical"
        isFlipped={isFlipped}
        className="flex align-middle items-center justify-center"
      >
        <div className="md:w-80 sm:w-56 bg-white p-8 pt-2 rounded shadow-md flex flex-col">
          {loading && <Loader />}{" "}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className=" text-red-500 px-6 py-1 rounded-md">{error}</div>
            )}

            <h5 className="text-xl  mb-3">Sign in into your account</h5>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border-lime-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-lime-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div>
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 border-lime-400 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              <div className="mr-2">
                <Link
                  href="#"
                  className="text-blue-500 hover:underline"
                  onClick={flipcard}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline self-end"
              type="submit"
            >
              Login
            </button>
            <span className="flex items-center pt-3 pb-3">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6">or</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
          </form>
          <GoogleButton />
          <GithubButton />
          <Microsoft />
          <p className="mt-3">
            Don{"'"}t have an account?{" "}
            <strong>
              <Link
                className="text-blue-700 hover:text-blue-800 hover:underline"
                href="/Register"
              >
                Sign up{" "}
              </Link>
            </strong>{" "}
          </p>
        </div>

        <div>
          <ForgotPasswordForm />
        </div>
      </ReactCardFlip>
    </>
  );
};

export default LoginForm;
