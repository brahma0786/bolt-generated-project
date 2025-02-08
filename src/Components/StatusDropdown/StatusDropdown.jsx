import React, { useState } from 'react';

const StatusDropdown = ({ heading }) => { // Destructure the 'heading' prop
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Not done');
    const [selectedOrder, setSelectedOrder] = useState('Trending');

    const toggleStatusDropdown = () => {
        setIsStatusOpen(!isStatusOpen);
    };

    const toggleOrderDropdown = () => {
        setIsOrderOpen(!isOrderOpen);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
    };

    const handleOrderChange = (order) => {
        setSelectedOrder(order);
        setIsOrderOpen(false);
    };

    return (
        <div className="flex space-x-4 p-5  fixed z-10 bg-white w-[60vw]">
            {/* Customizable Heading */}
            {/* <h1 className="text-lg font-semibold">{heading}</h1> Use the passed 'heading' prop */}

            <div className="relative inline-block text-left">
                <div>
                    <button
                        onClick={toggleOrderDropdown}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="order-menu"
                        aria-haspopup="true"
                        aria-expanded={isOrderOpen ? "true" : "false"}
                    >
                        Order: {selectedOrder}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {isOrderOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="order-menu">
                            <button
                                onClick={() => handleOrderChange('Trending')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Trending
                            </button>
                            <button
                                onClick={() => handleOrderChange('Ascending')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Ascending
                            </button>
                            <button
                                onClick={() => handleOrderChange('Descending')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Descending
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Dropdown */}
            <div className="relative inline-block text-left">
                <div>
                    <button
                        onClick={toggleStatusDropdown}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="status-menu"
                        aria-haspopup="true"
                        aria-expanded={isStatusOpen ? "true" : "false"}
                    >
                        Status: {selectedStatus}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {isStatusOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="status-menu">
                            <button
                                onClick={() => handleStatusChange('Not done')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Not done
                            </button>
                            <button
                                onClick={() => handleStatusChange('In progress')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                In progress
                            </button>
                            <button
                                onClick={() => handleStatusChange('Done')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusDropdown;
