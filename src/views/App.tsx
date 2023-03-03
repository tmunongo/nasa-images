import axios from "axios";
import { ReactElement, useState } from "react";
import { SiNasa } from "react-icons/si";
import ImagePreview from "../components/ImagePreview";
import Line from "../components/Line";

type FormValues = {
  searchTerm: string;
  startDate?: string;
  endDate?: string;
  mediaType?: string;
};

function App() {
  const [search, setSearch] = useState<FormValues>({
    searchTerm: "",
    startDate: "",
    endDate: "",
    mediaType: "image",
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Array<any>>();
  const thisYear = 2023;

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch((prevSearchValues) => ({
      ...prevSearchValues,
      searchTerm: event.target.value,
    }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSearch((prevSearchValues) => ({
      ...prevSearchValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // start loading
    setLoading(true);
    // clear any previous search results and error messages
    setImages([]);
    setErrorMessage("");
    // check that start date is before end date
    if (parseInt(search.startDate!, 10) > parseInt(search.endDate!, 10)) {
      setErrorMessage("Start date must be before end date!");
    }
    // make axios request
    axios
      .get("https://images-api.nasa.gov/search", {
        // add params, some are optional
        params: {
          q: search.searchTerm,
          media_type: search.mediaType,
          // conditional spread parameter
          ...(search.startDate && { year_start: search.startDate }),
          ...(search.endDate && { year_end: search.endDate }),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setImages(response.data.collection.items);
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-full bg-[#EFEBE7]">
      <div className="flex flex-col items-center justify-around h-2/3 bg-white p-8 rounded-lg opacity-80">
        <div id="hero" className="flex flex-col items-center justify-center">
          <span>
            <SiNasa size={100} />
          </span>
          <h1>Welcome Space Lover</h1>
        </div>
        <div className="w-full">
          <p className="italic mt-2">
            Enter a search term below. Select your start and end dates and click
            'Search'
          </p>
          <form
            className="flex flex-col md:flex-row items-center justify-around p-4 border rounded-md shadow-lg w-full my-4"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex items-center justify-center">
              <input
                type="text"
                name="search"
                id="search"
                required
                placeholder="Try 'Moon landing'"
                value={search.searchTerm}
                onChange={(event) => handleText(event)}
                className="border border-gray-300 rounded-lg p-2 text-lg"
              />
            </div>
            <div>
              <select
                name="startDate"
                id="startDate"
                className="p-2 m-2 rounded-md text-2xl"
                onChange={(event) => handleSelect(event)}
              >
                <option value="">Start Year</option>
                {(function (rows: ReactElement[], i, len) {
                  while (++i <= len) {
                    rows.push(<option value={i}>{i}</option>);
                  }
                  return rows;
                })([], 1955, 2023)}
              </select>
            </div>
            <div>
              <select
                name="endDate"
                id="endDate"
                className="p-2 m-2 rounded-md text-2xl"
                onChange={(event) => handleSelect(event)}
              >
                <option value="">End Year</option>
                {/* build an Array with a list of years from 1955 to the present */}
                {(function (rows: ReactElement[], i, len) {
                  while (++i <= len) {
                    rows.push(<option value={i}>{i}</option>);
                  }
                  return rows;
                })([], 1955, 2023)}
              </select>
            </div>
            <input
              hidden
              type="text"
              name="media"
              defaultValue={search.mediaType}
              id="mediaType"
            />
            <div className="my-2 md:my-0 cursor-pointer">
              <span className="p-2 md:p-3 bg-[#78BC61] text-black  text-center text-lg rounded-md md:m-0">
                <input
                  type="submit"
                  value="Search"
                  className="cursor-pointer"
                />
              </span>
            </div>
          </form>
          {errorMessage && (
            <div className="my-2 bg-red-300 rounded-md">
              <p id="error-message" className="text-gray-800">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>
      <Line />
      {/* Search results section */}
      <div id="searchResults" className="p-2 text-black">
        <h2>Results</h2>
        {loading && <div>Loading...</div>}
        <div>
          {images && (
            <h3 className="underline underline-offset-2">
              Search '<span className="italic">{search.searchTerm}</span>' from{" "}
              <span className="italic">{search.startDate}</span> to{" "}
              <span className="italic">{search.endDate}</span>
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {images ? (
              images.map((item, index) => {
                return <ImagePreview key={index} image={item} />;
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
