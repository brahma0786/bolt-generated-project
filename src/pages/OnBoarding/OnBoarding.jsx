import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppName, getBases } from '../../apiList';
import UserLoginModal from '../../Components/UserLoginModal';
import AddExample from './components/AddExample';
import Launch from './components/Launch';
import SetupFeedback from './components/SetupFeedback';


// FeedBear Logo SVG Component
const FeedBearLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16C28 9.37 22.63 4 16 4ZM16 26C10.48 26 6 21.52 6 16C6 10.48 10.48 6 16 6C21.52 6 26 10.48 26 16C26 21.52 21.52 26 16 26Z" fill="#FF4B55" />
  </svg>
);

// Progress Steps Component
const ProgressSteps = ({ currentStep, totalSteps }) => (
  <div className="flex justify-center space-x-3 mb-8">
    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
      <div
        key={step}
        className={`h-1.5 w-20 rounded-full ${currentStep >= step ? 'bg-[#FF4B55]' : 'bg-[#E2E8F0]'
          }`}
      />
    ))}
  </div>
);

// Logo Header Component
const LogoHeader = () => (
  <div className="flex items-center justify-center mb-8 text-2xl text-red-500 font-bold">
    {/* <FeedBearLogo />
    <span className="ml-2.5 text-xl font-bold text-[#1A202C]">FeedBear</span> */}
   {AppName}
  </div>
);

// Form Input Component
const FormInput = ({ label, value, onChange, placeholder }) => (
  <div className="mb-6">
    <label className="block text-[#1A202C] font-semibold text-sm mb-2">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 bg-[#F7FAFC] border border-[#E2E8F0] rounded-lg
                text-[#1A202C] placeholder-[#A0AEC0]
                focus:outline-none focus:ring-2 focus:ring-[#FF4B55] focus:border-transparent
                transition duration-200"
    />
  </div>
);

const OnBoarding = () => {
  const searchParams = new URLSearchParams(window.location.search)
   const [addUserDataModal, setAddUserDataModal] = useState(false);
  let Project = searchParams.get('Project')+'_feedback'
  const [BaseID,setBaseID]=useState('')
  const [TableID,setTableID]=useState('')
  const [Preset,setPreset]=useState('Feature Requests')
  useEffect(() => {
    GetBasesList()
    if (!localStorage.getItem("name")) {
      setAddUserDataModal(true);
    }
  }, [])

  async function GetBasesList() {
    const list = await getBases()
    const base=list.find(x=>x.name===Project)
    if(base){
      setBaseID(base.id)
    }
  }

  const navigate = useNavigate()

  const totalSteps = 3

  const [currentStep, setCurrentStep] = useState(1)

  const goToNextStep = () => {
    if (currentStep < totalSteps)
      setCurrentStep(currentStep + 1)
    else {
      navigate("/form")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-white">
      <div className="w-full max-w-[480px]">
        <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
        <LogoHeader />
        {
          // currentStep===1 ?(
          //     <CreateProject goToNextStep={goToNextStep}/>
          // ): 
          currentStep === 1 ? (
            <SetupFeedback setTableID={setTableID} BaseID={BaseID} BaseName={Project} canCreate={searchParams.get('Project')?true:false} GetBasesList={GetBasesList} goToNextStep={goToNextStep} Preset={Preset} setPreset={setPreset} />
          ) : currentStep === 2 ? (
            <AddExample goToNextStep={goToNextStep} BaseID={BaseID} TableID={TableID} Preset={Preset} />
          ) : currentStep === 3 ? (
            <Launch goToNextStep={goToNextStep} BaseName={Project} GetBasesList={GetBasesList} BaseID={BaseID} TableID={TableID} Preset={Preset} />
          ) : null
        }
      </div>
      <UserLoginModal open={addUserDataModal} close={()=>setAddUserDataModal(false)} />
    </div>
  );
};

export default OnBoarding;
