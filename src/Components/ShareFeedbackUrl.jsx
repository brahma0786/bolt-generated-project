import { Button, Modal, Select } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useState } from 'react';

export default function ShareFeedbackUrl({ BaseId, tableId,isOwner=false }) {
  const [open, setOpen] = useState(false)
  const [shareUrl, setshareUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [shareAsAdmin, setshareAsAdmin] = useState(false)
  function toggleOpen() {
    setOpen(!open)

    setshareUrl(
      window.location.origin +
      "/dashboard?ID=" +
      BaseId +
      "&Preset=" +
      tableId
    );
  }

  const handleCopy = async () => {
    try {
      let link = shareUrl
      if (shareUrl) {
        link = link + "&ad_ac=true"
      }
      await navigator.clipboard.writeText(link);

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
    <div>
      <Button onClick={toggleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
      </Button>

      <Modal footer={false} title="Share Feedback" open={open} onCancel={toggleOpen}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="share-link"
            className="block text-base font-medium text-gray-700 mb-2.5"
          >
            Share this link with your users:
          </label>
         {isOwner&&( <Select value={shareAsAdmin} className='w-40' onChange={setshareAsAdmin} options={[
            {
              value: false,
              label: 'Share as user'
            },
            {
              value: true,
              label: 'Share as admin'
            }
          ]} />)}
          <div>

            <div className="relative flex items-center border border-gray-200 rounded-lg overflow-hidden space-x-3 p-2">
              {/* <input
                id="share-link"
                type="text"
                readOnly
                value={shareUrl + (shareAsAdmin ? '&ad_ac=true' : '')}
                className="block grow px-4 py-3.5 bg-white  text-gray-700 border-none outline-none "
              />
              <div className="">
                <CopyButton onClick={handleCopy} />
              </div> */}
              <Paragraph className='w-full' copyable>{shareUrl + (shareAsAdmin ? '&ad_ac=true' : '')}</Paragraph>
            </div>
          </div>

        </div>
      </Modal>
    </div>
  )
}
