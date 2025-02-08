// MergeScreenshotsCard.js
import React from 'react';
// import { ChevronDownIcon, ChatIcon } from '@heroicons/react/outline';

const MergeScreenshotsCard = () => {
    return (
        <div className="w-full bg-white rounded-lg p-5 flex items-center gap-5 relative top-16 z-0">
            <div className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 15s-4.419-6-6-6s-6 6-6 6" color="currentColor" /></svg>
                <h1>10</h1>
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">Merge screenshots</h2>
                    <button className="text-indigo-500 hover:text-indigo-700 focus:outline-none">
                        {/* <ChevronDownIcon className="h-5 w-5" /> */}
                    </button>
                </div>
                <p className="text-sm text-[#3936FF] font-medium mb-1">Need your opinion</p>
                <p className="text-gray-700 mb-2">
                    Often I take a few screenshots that belong together, e.g. capturing the screens of a signup sequence.
                </p>
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    {/* <ChatIcon className="h-4 w-4" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 13.5h8m-8-5h4M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865" color="currentColor" /></svg>
                    <span>8 comments</span>
                </div>
            </div>
        </div>
    );
};

export default MergeScreenshotsCard;
