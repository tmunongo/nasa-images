type Props = {
  image: any;
};

const ImagePreview = ({ image }: Props) => {
  return (
    <div className="block m-auto w-full">
      <div className="flex flex-col items-center justify-center border p-2 rounded-md shadow-md h-80">
        <div className="overflow-hidden">
          <img
            src={`https://images-assets.nasa.gov/image/${image.data[0].nasa_id}/${image.data[0].nasa_id}~orig.jpg`}
            alt={image.data[0].title}
            className="w-full rounded-md hover:scale-105 transition-all duration-500"
          />
        </div>
        <p>{image.data[0].title}</p>
        <a id={`link-${image}`} href={`/image/${image.data[0].nasa_id}`}>
          Details
        </a>
      </div>
    </div>
  );
};

export default ImagePreview;
