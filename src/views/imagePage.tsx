import axios from "axios";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type Props = {};

const ImagePage = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nasa_id } = useParams();
  const [image, setImage] = useState();
  const [metadata, setMetaData] = useState<any>();

  const fetchMetaData = async (location: string) => {
    const secure_location = "https://" + location.substring(7, location.length);
    const result = await axios.get(`${secure_location}`);
    setMetaData(result.data);
  };

  const handleGoBack = () => {
    navigate({
      pathname: "/",
      search: location.search,
    });
  };

  const { isLoading, error, data } = useQuery("imageData", async () => {
    const result = await axios
      .get(`https://images-api.nasa.gov/asset/${nasa_id}`)
      .then((res) => {
        return res;
      });
    // fetch metadata from the remote location
    fetchMetaData(
      // metadata link is always last in the items array
      result.data.collection.items[result.data.collection.items.length - 1].href
    );
    setImage(result.data.collection.items[1].href);
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-[#EFEBE7] p-2 text-black">
      {/* Use dot bracket notation */}
      <div className="w-full flex items-center justify-start">
        <button
          className="flex items-center justify-around bg-[#E7E0DA]"
          onClick={() => handleGoBack()}
        >
          <BsArrowLeft size={22} />
          <span className="m-1">Back</span>
        </button>
      </div>
      {metadata ? (
        <div className="border border-black rounded-lg p-2 m-2">
          <h1 className="bg-[#E7E0DA] text-2xl md:text-3xl font-bold text-gray-800 text-center shadow-inner rounded-md p-2 m-2">
            {metadata!["AVAIL:Title"]}
          </h1>
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt={metadata!["AVAIL:Title"]}
              className="rounded-md p-2 md:p-4"
            />
          </div>
          <div className="max-w-6xl px-4 sm:p-6 lg:p-8 border border-black rounded-md shadow-lg m-2 md:m-auto italic ">
            <h2 className="underline">Details</h2>
            <p className="text-gray-600">
              <span className="font-bold">Location:</span>{" "}
              {metadata!["AVAIL:Location"]
                ? metadata!["AVAIL:Location"]
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Photographer:</span>{" "}
              {metadata!["AVAIL:Photographer"]
                ? metadata!["AVAIL:Photographer"]
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Description:</span>{" "}
              {metadata!["AVAIL:Description"]}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Keywords:</span>{" "}
              {metadata!["IPTC:Keywords"] &&
                metadata!["IPTC:Keywords"].join(", ")}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Date:</span>{" "}
              {metadata!["EXIF:CreateDate"]
                ? metadata!["EXIF:CreateDate"]
                : "N/A"}
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

export default ImagePage;
