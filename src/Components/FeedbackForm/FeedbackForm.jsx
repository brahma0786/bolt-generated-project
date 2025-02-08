import React, { useState } from 'react';
import axios from 'axios';

const AirtableForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        name: '',
        email: '',
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agree) {
            alert('You must agree to the Privacy Policy and Terms and Conditions');
            return;
        }

        try {
            const response = await axios.post(
                'https://api.airtable.com/v0/appHxIergA4p94qQE/Projects',
                {
                    fields: {
                        Title: formData.title,
                        Description: formData.description,
                        Name: formData.name,
                        Email: formData.email,
                        Agree: formData.agree,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer patJJw7VRMym1JIeu.9ad3eaddcae376f87f1bf18747ad0624c2796dfef292a0913f6ae8db97bafa93`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Data submitted to Airtable:', response.data);
            alert('Your post has been added successfully!');
            setFormData({
                title: '',
                description: '',
                name: '',
                email: '',
                agree: false,
            });
        } catch (error) {
            console.error('Error submitting data to Airtable:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md fixed w-[28%]">
            <h2 className="text-xl font-semibold mb-2">Suggest Feature Or Report Bug</h2>
            <p className="mb-3 text-gray-500">
                We value your feedback. You can vote for existing posts, discuss them or add your own.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Something short"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write about your post in more detail here"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="agree" className="text-sm text-gray-500 py-2">
                        I agree with <span className="underline text-gray-800">Privacy Policy</span> and <span className="underline text-gray-800">Terms and Conditions</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#3936FF] text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AirtableForm;



// // FeedbackForm.js
// import React from 'react';

// const FeedbackForm = () => {
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md fixed w-[28%]">
//             <h2 className="text-xl font-semibold mb-2">Suggest Feature Or Report Bug</h2>
//             <p className="mb-3 text-gray-500">
//                 We value your feedback. You can vote for existing posts, discuss them or add your own.
//             </p>
//             <form>
//                 <div className="mb-3">
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         placeholder="Something short"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         placeholder="Write about your post in more detail here"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         rows="3"
//                     ></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         placeholder="Your Name"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Your email address"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-3 flex items-center">
//                     <input
//                         type="checkbox"
//                         id="agree"
//                         name="agree"
//                         className="mr-2"
//                     />
//                     <label htmlFor="agree" className="text-sm text-gray-500 py-2">
//                         I agree with <span className='underline text-gray-800'>Privacy Policy</span> and <span className='underline text-gray-800'>Terms and Conditions</span>
//                     </label>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-[#3936FF] text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:"
//                 >
//                     Add Post
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default FeedbackForm;
