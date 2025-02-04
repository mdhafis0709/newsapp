import React from "react";

function Card(props) {
  console.log("Image URL:", props.imgUrl);
  console.log("Left Image URL:", props.imageUrlLeft);

  const defaultImage = "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const imageUrl = isValidUrl(props.imgUrl) ? props.imgUrl : defaultImage;
  const leftImageUrl = isValidUrl(props.imageUrlLeft) ? props.imageUrlLeft : defaultImage;

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img
            className="everything-card-img"
            src={imageUrl}
            alt="Main content"
            onError={(e) => (e.target.src = defaultImage)}
          />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words"
            >
              {props.source?.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span> {props.author || "Unknown"}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span> {props.publishedAt || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${leftImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          title={props.imageLeftTitle}
        ></div>
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={isValidUrl(props.authorImage) ? props.authorImage : defaultImage}
                alt="Author Avatar"
                onError={(e) => (e.target.src = defaultImage)}
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName || "Unknown Author"}</p>
              <p className="text-gray-600">{props.publishedDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
