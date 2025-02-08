import { Modal } from 'antd';
import React, { useState } from 'react';

export default function UserLoginModal({ open, close }) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");


    const AddUserData = () => {
        localStorage.setItem("name", userName);
        localStorage.setItem("email", userEmail);
        close();
    }
    return (
        <div>
            <Modal
                title="Add Credentials"
                open={open}
                closable={false}
                footer={null}
            >
                <div className="mt-5 flex flex-col gap-y-4">
                    <div className="">
                        <label className="font-semibold text-sm text-gray-700  block">Name *</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-lg outline-none border"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label className="font-semibold text-sm text-gray-700  block">Email *</label>
                        <input
                            type="email"
                            className="mt-1 p-2 w-full rounded-lg outline-none border"
                            required
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 px-4"
                            onClick={AddUserData}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
