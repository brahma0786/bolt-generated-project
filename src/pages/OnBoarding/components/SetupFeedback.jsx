import React, { useState } from 'react';
import { adminEmail, createBase, createTable, getTablesInBase } from '../../../apiList';

const PresetButton = ({ emoji, label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3.5 rounded-lg border transition-all duration-200
          ${selected
          ? 'border-[#ff4646] bg-[#FFF5F5]'
          : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
        }
        `}
    >
      <span className="mr-3 text-xl">{emoji}</span>
      <span className="text-[#4B5563] text-sm font-medium">{label}</span>
    </button>
  );
};

const SetupFeedback = ({ goToNextStep, BaseName,setTableID, BaseID, GetBasesList, setPreset, Preset,canCreate }) => {
  const [loading, setLoading] = useState('')
  const [selectedPreset, setSelectedPreset] = useState('Feature Requests');
  const [boardName, setBoardName] = useState('Feature Requests');

  const presets = [
    { emoji: '💡', label: 'Feature Requests' },
    { emoji: '🐞', label: 'Bug Reports' },
    { emoji: '🔗', label: 'Integrations' },
    { emoji: '💭', label: 'General Feedback' },
  ];

  async function CreateBase() {
    setLoading(true)
    const table_structure = GetTableStructurte()
    if (!BaseID) {
      await createBase(BaseName, table_structure)
      GetBasesList()
    } else {
      const tables = await getTablesInBase(BaseID)
      const table = tables.find(x => x.name === Preset)
      if (table) {
        setTableID(table.id)
      }else{
         await createTable(BaseID,table_structure[0])
         const tables_list = await getTablesInBase(BaseID)
         const table_data = tables_list.find(x => x.name === Preset)
         setTableID(table_data.id)
      }
    }
    setLoading(false)
    goToNextStep()
  }


  function GetTableStructurte() {
    const fields = [
      { name: "Title", type: "singleLineText" }, // Primary field
      { name: "Description", type: "singleLineText" },
      { name: "UserName", type: "singleLineText" },
      { name: "UserEmail", type: "singleLineText" },
      { name: "Status", type: "singleLineText" },
      { name: "Type", type: "singleLineText" }
    ];
    const tables = [
      {
        description: adminEmail,
        fields: fields,
        name: Preset
      }
    ]

    return tables
  }
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-[#1E293B] text-2xl font-bold mb-3">
          Set up your first feedback board
        </h1>
        <p className="text-[#64748B] leading-relaxed font-medium ">
          Start with a feature requests board - you can add more boards 
          <br />
          later for bugs, questions, or other feedback types.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-[#4B5563] font-medium mb-4">Start with a preset</h2>
        <div className="grid grid-cols-2 gap-4">
          {presets.map(({ emoji, label }) => (
            <PresetButton
              key={label}
              emoji={emoji}
              label={label}
              selected={Preset === label}
              onClick={() => {
                setPreset(label)
              }}
            />
          ))}
        </div>
      </div>

      {/* <div className="mb-8">
          <label className="block text-[#4B5563] font-medium mb-2">
            Board name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              💡
            </span>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-[#E5E7EB] rounded-lg
                focus:ring-2 focus:ring-[#FFF5F5] focus:border-[#ff4646] outline-none
                text-[#1E293B]"
            />
          </div>
        </div> */}

      <button disabled={!canCreate}
        className="w-full bg-[#ff4646] text-white py-3.5 px-4 rounded-xl font-medium
            hover:bg-[#ff3939] disabled:bg-[#d69090] disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        onClick={CreateBase}
      >
        {loading ? 'Loading' : 'Continue'}
        <svg
          className="ml-2 w-5 h-5"
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
    </>
  )
}

export default SetupFeedback
