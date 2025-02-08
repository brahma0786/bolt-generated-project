import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CopyButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
    aria-label="Copy link"
  >
  
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#374151"
      transform="rotate(90)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#374151"
          d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
        ></path>
        <path
          fill="#374151"
          d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
        ></path>
      </g>
    </svg>
  </button>
);

const Launch = ({
  goToNextStep,
  BaseName,
  BaseID,
  TableID,
  GetBasesList,
  Preset,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setshareUrl] = useState("");
  // const shareUrl =window.location.origin+"/dashboard?ID="+BaseID
  useEffect(() => {
    if (BaseID) {
      setshareUrl(
        window.location.origin +
          "/dashboard?ID=" +
          BaseID +
          "&Preset=" +
          TableID
      );
    }
  }, [BaseID]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success("Link copied!", {
        duration: 2000,
        style: {
          background: "#4CAF50",
          color: "#fff",
          borderRadius: "8px",
        },
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link", {
        style: {
          background: "#F44336",
          color: "#fff",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2.5 font-inter">
          Ready to launch! 🎉
        </h1>
        <p className="text-gray-600 text-[16px] leading-relaxed font-medium  mx-auto">
          Your feedback portal is ready! Share the link with your users and
          start collecting valuable feedback.
        </p>
      </div>

      <div className="">
        <div>
          <label
            htmlFor="share-link"
            className="block text-base font-medium text-gray-700 mb-2.5"
          >
            Share this link with your users:
          </label>
          <div className="relative flex items-center border border-gray-200 rounded-lg overflow-hidden space-x-3">
            <input
              id="share-link"
              type="text"
              readOnly
              value={shareUrl}
              className="block grow px-4 py-3.5 bg-white  text-gray-700 border-none outline-none "
            />
            <div className="">
              <CopyButton onClick={handleCopy} />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Link
            className="mt-3"
            to={"/dashboard?ID=" + BaseID + "&Preset=" + TableID}
          >
            <button
              // onClick={() => window.location.href = '/project'}
              className="w-full bg-[#F44336] text-white py-3.5 px-6 rounded-xl hover:bg-[#E53935] transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-[16px] font-medium"
            >
              <span>Go to your project</span>
              <svg
                className="w-5 h-5 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Launch;
