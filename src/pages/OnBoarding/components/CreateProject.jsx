import React, {useState} from 'react'

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

const CreateProject = ({goToNextStep}) => {

    const [projectName, setProjectName] = useState('legalapp');
    const [subdomain, setSubdomain] = useState('legalapp');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        goToNextStep()
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  

  return (
    <>
        <div className="text-center mb-12">
          <h1 className="text-[28px] font-bold text-[#1A202C] mb-3">
            Create your project
          </h1>
          <p className="text-[#4A5568] text-lg leading-relaxed">
            Create a dedicated space where your users can share their feedback 
            and ideas for your product.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Select project/create new"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />

          <FormInput
            label="Subdomain"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="Enter subdomain"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF4B55] text-white py-4 px-6 rounded-lg
                     flex items-center justify-center space-x-2 font-semibold
                     hover:bg-[#E43F48] active:transform active:scale-[0.98]
                     transition duration-200 disabled:opacity-70 mt-6"
          >
            <span>Continue</span>
           
          </button>
        </form>
    </>
  )
}

export default CreateProject
