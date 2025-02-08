import React from 'react';
import RecordRenderer from './RecordRenderer';

const PostsComponent = ({ BaseID, TableID, Records }) => {
    // Sort records by createdTime in descending order (newest first)
    const sortedRecords = [...Records].sort((a, b) => 
        new Date(b.createdTime) - new Date(a.createdTime)
    );

    return (
        <div id="posts-container">
            <div className="bg-white rounded-xl border board-posts" id="board-posts">
                {/* Dropdown Filters */}
                <div className="px-4 py-4 border-b rounded-t-lg border-neutral-200">
                    <div className="flex items-stretch sm:items-center justify-between flex-col sm:flex-row text-sm">
                        <div className="flex items-center gap-2 sm:ml-auto">
                            <div className="relative mb-2 sm:mb-0 sm:mr-2 filter-dropdown-board w-full">
                                <div className="cursor-pointer select-none focus:outline-none hover:text-project-500">
                                    <div className="border bg-white border-neutral-300 rounded-lg shadow-sm px-3 py-1 text-dblue-500 flex items-center">
                                        <div className="mr-1 text-dblue-400">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                            </svg>
                                        </div>
                                        <span className="text-neutral-800">All</span>
                                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 ml-1 -mr-1">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Posts List */}
                <div id="all-posts" className="flex flex-col fade-up-in">
                    {sortedRecords.map((item, idx) => (
                        <RecordRenderer 
                            id={item.id} 
                            item={item.fields}
                            createdTime={item.createdTime}
                            key={idx} 
                            BaseID={BaseID} 
                            TableID={TableID} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostsComponent;
