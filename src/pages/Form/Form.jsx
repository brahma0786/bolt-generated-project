import { Button, Modal, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTableRecords, deleteTableRecord, GetCommentTable, getRecordByID, getTableRecords, updateTableRecord } from '../../apiList';
import CommentCard from './component/CommentCard';


const Avatar = ({ letter, className = "" }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-purple-600 ${className}`}>
    {letter}
  </div>
);

const Form = () => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Not Set');
  const [Record, setRecord] = useState(null)
  const [CommentList, setCommentList] = useState([])
  const [commenttData, setcommenttData] = useState(null)
  const searchParams = new URLSearchParams(window.location.search)
  const [UserData, setUserData] = useState(null)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const navigate = useNavigate()

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    getRecord()

    if (localStorage.getItem('name')) {

      setUserData({
        UserName: localStorage.getItem('name'),
        UserEmail: localStorage.getItem('email'),
      })
    }
  }, []);
  async function getRecord() {
    const data = await getRecordByID(searchParams.get('baseId'), searchParams.get('tableId'), searchParams.get('id'))
    setRecord(data || null)
    const CommentData = await GetCommentTable()
    setcommenttData(CommentData)

  }
  useEffect(() => {
    getRecordCommentList()
  }, [commenttData])

  async function getRecordCommentList() {
    if (commenttData) {
      const list = await getTableRecords(commenttData.BaseId, commenttData.TableId, "RecordID='" + searchParams.get('id') + "'")
      setCommentList(list.records.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)))
    }
  }

  async function SubmitComment() {
    if (comment) {
      const Fields = {
        records: [
          {
            fields: {
              "Text": comment,
              "RecordID": searchParams.get('id'),
              UserName: UserData.UserName,
              UserEmail: UserData.UserEmail,
            }
          }
        ]
      }
      await createTableRecords(commenttData.BaseId, commenttData.TableId, Fields)
      setComment('')
      getRecordCommentList()
    }

  }

  function setUser(e) {
    e.preventDefault()
    let user = {
      UserName: e.target[0]?.value,
      UserEmail: e.target[1]?.value,
    }
    localStorage.setItem('name', user.UserName)
    localStorage.setItem('email', user.UserEmail)

    setUserData(user)
  }

  async function UpdateStatus(value) {

    setStatusUpdating(true)
    const data = {
      Status:value,
    }
    
    await updateTableRecord(searchParams.get('baseId'), searchParams.get('tableId'), searchParams.get('id'), data)
    getRecord()
    setStatusUpdating(false)
  }
  return (
    <div className="min-h-screen bg-gray-50">



      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Post Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex gap-4 items-start ">
                <div className="flex flex-col items-center border rounded-md px-4">
                  <button className="text-gray-400 hover:text-blue-500">▲</button>
                  <span className="text-blue-500 font-medium">1</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-gray-900">{Record?.fields?.Title}</h1>
                  <p className="mt-2 text-gray-600">{Record?.fields?.Description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Avatar letter={Record?.fields?.UserName[0]} />
                    <span className="text-sm text-gray-500">posted less than a minute ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="my-8">
              <h2 className="text-xs font-semibold text-gray-500 mb-4">INTERNAL NOTES</h2>
              <input
                type="text"
                placeholder="Add a note for your team..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div> */}

            {/* Discussion */}
            {UserData && (<div className="mt-8">
              <h2 className="text-xs font-semibold text-gray-500 mb-4">DISCUSSION</h2>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex gap-3 bg-gray-50 px-3 py-2 rounded-lg">
                  <Avatar letter={Record?.fields?.UserName[0]} />
                  <input
                    type="text"
                    placeholder="What do you think?"
                    className="flex-1 border-0 focus:ring-0 text-gray-900 outline-none bg-transparent"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <button className="flex items-center text-gray-700 font-medium text-sm">
                    {/* <img src="/icons/attach-icon.svg" alt="" />
                    <span>Attach images</span> */}
                  </button>
                  <div className="flex items-center gap-3">
                    {/* <button className="text-gray-500 text-sm flex items-center space-x-2 font-medium px-4 border rounded-[10px] bg-white py-2">
                      <img src="/icons/ai-icon.svg" alt="" />
                      <span>Reply using AI</span>
                    </button> */}
                    <button className="bg-blue-500 rounded-[10px] text-white px-4 py-2 text-sm font-medium hover:bg-blue-600" onClick={SubmitComment}>
                      Comment
                    </button>
                  </div>
                </div>
              </div>

            </div>)}

            {!UserData && (<form onSubmit={setUser} className='border  p-3 flex flex-col gap-3'>
              <div className="mt-3 px-2 py-2 bg-gray-50 rounded-t-md">
                <h2 className='mb-2'>Please provide your details to comment</h2>
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
              <Button htmlType='submit' className='ml-auto'>
                Confirm
              </Button>
            </form>)}


            <div className=" pt-12 ">

              {CommentList.length === 0 && (<p className="text-gray-500 mx-auto">No comments yet</p>)}
              {CommentList.map((item, idx) => (
                <CommentCard key={idx} item={item} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <div className=" rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {/* Status Section */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Status</label>
                  <div className="flex gap-2 w-full">
                   {((Record?.fields?.UserEmail === localStorage.getItem('email')||searchParams.get('ad_ac')==='true')&&localStorage.getItem('email')) && ( <Spin spinning={statusUpdating}>
                      <select
                        value={Record?.fields?.Status}
                        onChange={(e) => UpdateStatus(e.target.value)}
                        className="flex-1 w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none text-gray-700focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={'active'}>Active</option>
                        <option value={'complete'}>Complete</option>
                        <option value={'pending'}>Pending</option>
                      </select>
                    </Spin>)}
                    {/* <button className="bg-blue-500 text-white px-4 hover:bg-blue-600 rounded-lg">
                      Save
                    </button> */}
                  </div>
                  {/* <button className="mt-2 text-gray-500 text-sm hover:text-gray-700 flex items-center">
                    Edit Statuses
                  </button> */}
                  {/* <div className="mt-2 w-full bg-gray-200 rounded-lg px-4 py-1.5 flex items-center space-x-2">
                    <img src="/icons/edit-status-icon.svg" alt="" />
                    <span className='text-sm text-gray-700 '>Edit Statuses</span>
                  </div> */}
                </div>

                {/* Actions Section */}
                <div>
                  <h3 className="block text-base font-medium text-gray-700 mb-2">Actions</h3>
                  {Record?.fields?.UserEmail === localStorage.getItem('email') && (
                    <EditRecord BaseID={searchParams.get('baseId')}
                      TableID={searchParams.get('tableId')}
                      RecordID={searchParams.get('id')}
                      callBack={getRecord}
                      Title={Record?.fields?.Title}
                      Description={Record?.fields?.Description}
                    />)}
                  {Record?.fields?.UserEmail === localStorage.getItem('email') && (<DeleteButton BaseID={searchParams.get('baseId')}
                    TableID={searchParams.get('tableId')}
                    RecordID={searchParams.get('id')}
                    callBack={() => {
                      navigate(-1)
                    }}
                  />)}
                </div>

                {/* Tags Section */}
                {/* <div>
                  <h3 className="block text-base font-medium text-gray-700 mb-2">Tags</h3>
                  <div className="bg-amber-200 p-3 rounded-md text-sm text-gray-700 flex space-x-2 items-center">
                    <img src="/icons/info-icon.svg" alt="" />
                    <p>
                      Tags are visible only to project admins.{' '}
                      <a href="#" className="text-blue-500 hover:text-blue-600">
                        Learn more
                      </a>
                    </p>
                  </div>
                  <button className="mt-2 text-sm font-medium text-gray-500 hover:text-gray-700">+ Add tag</button>
                </div> */}

                {/* Voters Section */}
                {/* <div>
                  <h3 className="block text-base font-medium text-gray-700 mb-2">Voters</h3>
                  <div className="flex items-center space-x-1.5 mb-3">
                    <Avatar letter="H" />
                    <span className="text-sm font-medium text-gray-500">Hrishikesh Mestry</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name required"
                    className="w-full px-3 py-1 outline-none text-sm border border-gray-300 rounded-md mb-2"
                  />
                  <button className="w-full text-sm bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600">
                    Add Vote
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Form;


function DeleteButton({ BaseID, TableID, RecordID, callBack }) {
  const [loading, setLoading] = useState(false)

  async function DeleteRecord() {
    setLoading(true)
    await deleteTableRecord(BaseID, TableID, RecordID)
    setLoading(false)
    callBack()
  }
  return (
    <Spin spinning={loading}>
      <div className="mt-20 w-full bg-red-100 hover:bg-red-200 rounded-lg px-4 py-1.5 flex items-center space-x-2 cursor-pointer" onClick={DeleteRecord}>
        <img src="/icons/delete-icon.svg" alt="" />
        <span className='text-sm text-red-500 '>Delete</span>
      </div>
    </Spin>
  )
}



function EditRecord({ BaseID, TableID, RecordID, callBack, Title, Description }) {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  async function SubmitData(e) {
    e.preventDefault();
    setLoading(true)
    const data = {
      Title: e.target[0]?.value,
      Description: e.target[1]?.value,
    }
    await updateTableRecord(BaseID, TableID, RecordID, data)
    callBack()
    setLoading(false)
    setOpenModal(false)
  }
  return (
    <>
      <div className="mt-2 w-full bg-gray-200 rounded-lg px-4 py-1.5 flex items-center space-x-2" onClick={() => {
        setOpenModal(true)
        setTitle(Title)
        setDescription(Description)
      }}>
        <img src="/icons/edit-icon.svg" alt="" />
        <span className='text-sm text-gray-700 '>Edit</span>
      </div>

      <Modal open={openModal} onCancel={() => setOpenModal(false)} title='Edit Issue' footer={false}>
        <form className="mt-4" onSubmit={SubmitData}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your suggestion"
              className="mt-1 block w-full p-2 border rounded-lg outline-none"
            />
          </div>
          <div className="mt-4">
            <Spin spinning={loading}> <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Update
            </button></Spin>
          </div>
        </form>
      </Modal>
    </>
  )
}
