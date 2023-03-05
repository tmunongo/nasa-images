import { AiFillCamera } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { MdTitle } from "react-icons/md";

type Props = {
  image: any;
  idx: number;
};

const ImagePreview = ({ image, idx }: Props) => {
  return (
    <div className="block m-auto w-full">
      <div className="flex flex-col items-center justify-center border p-2 rounded-md shadow-md h-96">
        <div className="overflow-hidden m-auto">
          <img
            src={image.links[0].href}
            alt={image.data[0].title}
            className="w-full rounded-md hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="text-start my-1 w-full">
          <p className="flex items-center my-1 ">
            <MdTitle size={20} /> : {image.data[0].title.substring(0, 30)}
            {""}
            {image.data[0].title.length > 30 && "..."}
          </p>
          <p className="flex items-center my-1">
            <IoLocation size={20} /> :{" "}
            {image.data[0].location ? image.data[0].location : "N/A"}
          </p>
          <p className="flex items-center my-1">
            <AiFillCamera size={20} /> :{" "}
            {image.data[0].photographer ? image.data[0].photographer : "N/A"}
          </p>
        </div>
        <a
          className="p-2 bg-[#002E2C] rounded-md mt-1"
          id={`link-${idx}`}
          href={`/image/${image.data[0].nasa_id}`}
        >
          Details
        </a>
      </div>
    </div>
  );
};

export default ImagePreview;
