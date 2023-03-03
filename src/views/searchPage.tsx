import axios from "axios";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type Props = {};

const SearchPage = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nasa_id } = useParams();
  const [image, setImage] = useState();
  const [metadata, setMetaData] = useState<any>();

  const fetchMetaData = async (location: string) => {
    const result = await axios.get(`${location}`);
    setMetaData(result.data);
  };

  const handleGoBack = () => {
    navigate({
      pathname: "/",
      search: location.search,
    });
  };

  useEffect(() => {
    axios
      .get(`https://images-api.nasa.gov/asset/${nasa_id}`)
      .then((response) => {
        // fetch metadata from the remote location
        fetchMetaData(
          // metadata link is always last in the items array
          response.data.collection.items[
            response.data.collection.items.length - 1
          ].href
        );
        setImage(response.data.collection.items[0].href);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-[#EFEBE7] p-2">
      {/* Use dot bracket notation */}
      {metadata ? (
        <div>
          <button
            className="flex items-center justify-around bg-[#D2BF55]"
            onClick={() => handleGoBack()}
          >
            <BsArrowLeft size={22} />
            <span className="m-1">Back</span>
          </button>
          <h1 className="font-bold text-gray-800 text-center">
            {metadata!["AVAIL:Title"]}
          </h1>
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt={metadata!["AVAIL:Title"]}
              className="rounded-md"
            />
          </div>
          <div className="max-w-6xl px-4 sm:p-6 lg:p-8 border border-black m-2 md:m-4">
            <h2>Details</h2>
            <p className="text-gray-600">
              <span className="font-bold">Location:</span>{" "}
              {metadata!["AVAIL:Location"]}
            </p>
            <p className="text-gray-600">
              Photographer: {metadata!["XMP:Credit"]}
            </p>
            <p className="text-gray-600">
              Description: {metadata!["AVAIL:Description"]}
            </p>
            <p className="text-gray-600">
              Keywords:{" "}
              {metadata!["IPTC:Keywords"] &&
                metadata!["IPTC:Keywords"].join(", ")}
            </p>
            <p className="text-gray-600">
              Date: {metadata!["EXIF:CreateDate"]}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
