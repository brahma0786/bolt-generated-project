import React, {useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import FeedbackForm from '../Components/FeedbackForm/FeedbackForm'
import StatusDropdown from '../Components/StatusDropdown/StatusDropdown'
import MergeScreenshotsCard from '../Components/MergeScreenshotsCard/MergeScreenshotsCard'

const ReportForm = () => {

    const [count, setCount] = useState(0)

  return (
    <div className="w-full bg-[#E5E5E5] font-gist min-h-screen">
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <Navbar />
      <div className='flex mt-5 gap-5 mx-auto w-full'>
        <div className='w-[30%] ml-10'>
          <FeedbackForm />
        </div>
        <div className="relative w-[70%] bg-white rounded-lg mr-10 overflow-y-auto max-h-[86vh]">
          <StatusDropdown />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
          <MergeScreenshotsCard />
        </div>
      </div>
      {/* <StatusDropdown />
      <FeedbackForm />
      <MergeScreenshotsCard/> */}

    </div>
  )
}

export default ReportForm
