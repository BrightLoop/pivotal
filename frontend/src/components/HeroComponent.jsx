function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto mt-24">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-green-800 dark:text-green-500">
          Boost Your Productivity
        </span>
        <br />
        <span className="text-green-950 dark:text-white">with Pivotal</span>
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8">
        Transform task management with Pivotal. Combine powerful to-do lists,
        productivity tracking, and seamless integrations to stay focused and
        achieve more.
      </p>

      <button
        className="bg-green-950 text-white px-8 py-3 rounded-lg 
                       hover:bg-green-900 transition-colors
                       dark:bg-green-700 dark:hover:bg-green-600"
      >
        Get Started
      </button>
    </div>
  );
}

export default Hero;
