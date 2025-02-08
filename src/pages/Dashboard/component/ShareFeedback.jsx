import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { createTableRecords } from "../../../apiList";
import UserLoginModal from "../../../Components/UserLoginModal";
export const ShareFeedback = ({ BaseID, TableID, getRecordList }) => {
  const [Loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState(null);
  const [addUserDataModal, setAddUserDataModal] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("name")) {
      setUserData({
        UserName: localStorage.getItem("name"),
        UserEmail: localStorage.getItem("email"),
      });
    } else {
      setAddUserDataModal(true)
    }
  }, [addUserDataModal]);


  function ClearUserData() {
    setUserData(null);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }
  async function SubmitData(e) {
    e.preventDefault();
    setLoading(true);
    let user = {
      UserName: localStorage.getItem("name"),
      UserEmail: localStorage.getItem("email"),
    };

    if (!UserData) {
      user = {
        UserName: e.target[2]?.value,
        UserEmail: e.target[3]?.value,
      };
    }

    const Fields = {
      records: [
        {
          fields: {
            Title: e.target[0]?.value,
            Description: e.target[1]?.value,
            Status: 'active',
            ...user,
          },
        },
      ],
    };
    localStorage.setItem("name", user.UserName);
    localStorage.setItem("email", user.UserEmail);

    await createTableRecords(BaseID, TableID, Fields);

    getRecordList();
    setLoading(false);
    e.target.reset();
  }
  return (
    <div className="bg-white rounded-xl border px-5 py-4 max-w-md mx-auto">
      <UserLoginModal open={addUserDataModal} close={() => setAddUserDataModal(false)} />
      <h4 className="text-lg font-bold text-neutral-800">Share Feedback</h4>
      <p className="whitespace-pre-line text-sm mt-1 font-medium text-gray-500">
        Help us improve
      </p>
      <form className="mt-4" onSubmit={SubmitData}>
        {/* Author Name */}
        {UserData && (
          <div className="mt-3">
            <label className="font-semibold text-sm text-gray-700">
              Author Name
            </label>
            <div className="flex gap-2 items-center mt-1 p-2 border rounded-lg">
              <div className="flex items-center border border-neutral-500 rounded-md px-1.5 pt-0.5 pb-1 ">
                <Avatar size={20} className="text-xs">{UserData.UserName[0]}</Avatar>
                <span className="font-medium text-sm text-gray-700 ml-1">
                  {UserData.UserName}
                </span>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={ClearUserData}
                  className="ml-3 cursor-pointer text-gray-400 hover:text-red-500"
                />
              </div>
            </div>
          </div>
        )}
        {/* Title */}
        <div className="mt-3">
          <label
            htmlFor="post_title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="post_title"
            type="text"
            name="post[title]"
            placeholder="What's your feedback?"
            required
            className="mt-1 block w-full p-2 border rounded-lg outline-none"
          />
        </div>
        {/* Description */}
        <div className="mt-3">
          <label
            htmlFor="post_content"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="post_content"
            name="post[content]"
            rows="4"
            placeholder="Tell us more about your suggestion"
            className="mt-1 block w-full p-2 border rounded-lg outline-none"
          />
        </div>
        {/* Attach Images */}
        {/* <div className="mt-3">
          <a href="#" className="inline-flex items-center text-sm text-gray-700 hover:text-blue-500">
            <FontAwesomeIcon icon={faPaperclip} className="w-4 h-4 mr-1" />
            Attach images
          </a>
        </div> */}
        {/* Submit Button */}
        {!UserData && (
          <>
            <div className="mt-3 px-2 py-2 bg-gray-50 rounded-t-md">
              <label htmlFor="name" className="block text-gray-700">
                Name *
              </label>
              <input
                id="name"
                placeholder="Your name"
                type="text"
                name="post[name]"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* Email */}
            <div className="pt-3 px-2 py-2 bg-gray-50">
              <label htmlFor="email" className="block text-gray-700">
                Email *
              </label>
              <input
                id="email"
                placeholder="Your email address"
                type="email"
                name="post[email]"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* Agree Checkbox */}
            <div className="pt-3 flex items-center text-xs px-2 py-2 bg-gray-50 rounded-b-md">
              <input
                type="checkbox"
                name="user[agree_checkbox]"
                id="user_agree_checkbox"
                className="mr-2"
                required
              />
              <div>
                <span>I agree with</span>{" "}
                <a
                  href="https://www.feedbear.com/privacy-policy"
                  target="_blank"
                  className="text-blue-600 underline hover:no-underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://www.feedbear.com/terms"
                  target="_blank"
                  className="text-blue-600 underline hover:no-underline"
                >
                  Terms and Conditions
                </a>{" "}
                *
              </div>
            </div>
          </>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Add idea
          </button>
        </div>
      </form>
    </div>
  );
};
