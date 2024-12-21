import React from "react";

const SignupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-green-700">
          PIVOTAL
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Sign up for free today
        </p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Second Name
            </label>
            <input
              type="text"
              placeholder="Second Name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-700 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Signup
          </button>
        </form>
        <div className="my-4 text-center text-sm text-gray-500">
          or sign up with
        </div>
        <div className="flex justify-center space-x-4">
          <button className="p-2 bg-gray-200 rounded-full">
            <img src="/apple-logo.png" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full">
            <img src="/github-logo.png" alt="GitHub" className="w-6 h-6" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full">
            <img src="/google-logo.png" alt="Google" className="w-6 h-6" />
          </button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
