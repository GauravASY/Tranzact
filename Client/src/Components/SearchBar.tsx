function SearchBar() {
  return (
    <form className="w-1/3 mx-auto sticky mt-4 mb-3 left-1/3">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-700"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-50 focus:border-none rounded-full bg-gray-700"
          placeholder="Search and Filter list"
          required
        />
        <button
          type="submit"
          className="text-gray-900 absolute end-2.5 bottom-2.5 bg-gray-50 hover:bg-emerald-500 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-medium rounded-full text-sm px-4 py-2 dark:bg-gray-50 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
