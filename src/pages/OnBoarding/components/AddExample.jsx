import React, { useState } from 'react';
import { createTableRecords } from '../../../apiList';

// Status Tag Component

const BoardFields = [
  {
    label: 'Feature Requests',
    fields: [
      {
        label: 'What have you completed recently?'
      },
      {
        label: "What's in progress right now?"
      }
    ]
  },
  {
    label: 'Bug Reports',
    fields: [
      {
        label: 'What issue are you experiencing?'
      },
      {
        label: 'Steps to reproduce the issue?'
      },
      {
        label:'What did you expect to happen, and what actually happened?'
      },
      {
        label:'What environment were you using? (e.g., browser, operating system, device, version)'
      }

    ]
  },
  {
    label: 'Integrations',
    fields: [
      {
        label: 'What integration are you requesting or reporting?'
      },
      {
        label: 'Why is this integration important for your workflow?'
      }
    ]
  },
  {
    label: 'General Feedback',
    fields: [
      {
        label: 'What feedback would you like to share?'
      },
      {
        label: 'What do you think works well in the product?'
      }
    ]
  }
];


const StatusTag = ({ status }) => {
  const styles = {
    Done: 'bg-[#E6F6F4] text-[#047857]',
    active: 'bg-[#FEF3C7] text-[#B45309]',
    Planned: 'bg-[#E0F2FE] text-[#0369A1]',
  };

  return (
    <span
      className={`px-3 py-1 rounded-[10px] text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// Input Field Component
const InputField = ({ label, placeholder, status, changeValue }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2.5">
        <label className="text-[#1A202C] font-medium text-base">{label}</label>
        <StatusTag status={status} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => changeValue(e.target.value)}
        className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg 
                   text-[#64748B] placeholder-[#94A3B8]
                   focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                   transition-all duration-200"
        aria-label={label}
      />
    </div>
  );
};

const AddExample = ({ goToNextStep, BaseID, TableID, Preset }) => {
  const [fields, setFields] = useState([])
  const [loading,setLoading]=useState(false)
  useState(() => {
    const fields = BoardFields.find(x => x.label === Preset)
    const list = []
    fields?.fields?.forEach(x => {
      list.push({
        label: x.label,
        value: ''
      })
    })
    setFields(list)

  }, [Preset])

  function ChangeValue(value, index) {
    let list = [...fields]
    list[index].value = value
    setFields([...list])
  }


  async function Continue() {
    setLoading(true)
    let user = {
      UserName: localStorage.getItem("name"),
      UserEmail: localStorage.getItem("email"),
    };
    

    const issues = fields.filter(x => x.value).map(x => {
      return {
        records: [
          {
            fields: {
              Title: x.label,
              Description:x.value,
              Status:'example',
              ...user,
            },
          },
        ],
      }
    })


    for (let index = 0; index < issues.length; index++) {
      const issue = issues[index];
      await createTableRecords(BaseID, TableID,issue)
    }
    setLoading(false)
    goToNextStep()
  }
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#1A202C] mb-2.5">
          Add some example feedback
        </h1>
        <p className="text-[#4A5568] text-base font-medium ">
          Add a few example posts to show users how to share feedback. This
          will help kickstart engagement.
        </p>
      </div>

      <div className="space-y-5">
        {fields.map((item, idx) => (
          <InputField key={idx}
            label={item.label}
            changeValue={(data) => ChangeValue(data, idx)}
            placeholder="your feedback"
            status=""
          />
        ))}

      </div>

      {/* Continue Button */}
      <button
        className="w-full bg-[#ff4b55] text-white py-3.5 px-6 rounded-xl
                font-medium 
                flex items-center justify-center gap-2 
                hover:bg-[#ff3642] transition-colors duration-200"
        onClick={Continue}
      >
        {loading?'Loading...':'Continue'}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default AddExample
