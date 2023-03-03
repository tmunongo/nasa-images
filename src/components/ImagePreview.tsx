type Props = {
  image: any;
};

const ImagePreview = ({ image }: Props) => {
  return (
    <div className="block m-auto w-full">
      <div className="flex flex-col items-center justify-center border p-2 rounded-md shadow-md h-80">
        <div className="overflow-hidden">
          <img
            src={image.links[0].href}
            alt={image.data[0].title}
            className="w-full rounded-md hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="text-start">
          <p>Title: {image.data[0].title}</p>
          <p>
            Location: {image.data[0].location ? image.data[0].location : "N/A"}
          </p>
          <p>
            Photographer:{" "}
            {image.data[0].photographer ? image.data[0].photographer : "N/A"}
          </p>
        </div>
        <a id={`link-${image}`} href={`/image/${image.data[0].nasa_id}`}>
          Details
        </a>
      </div>
    </div>
  );
};

export default ImagePreview;
