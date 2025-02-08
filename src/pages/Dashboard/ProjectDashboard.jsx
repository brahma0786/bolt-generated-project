import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getBases, getTableRecords, getTablesInBase } from '../../apiList'
import ShareFeedbackUrl from '../../Components/ShareFeedbackUrl'
import PostsComponent from './component/PostComponent'
import { ShareFeedback } from './component/ShareFeedback'
export default function ProjectDashboard() {
    const [BaseID, setBaseID] = useState('')
    const [TableID, setTableID] = useState('')
    const [TableList, setTableList] = useState([])
    const [Records, setRecords] = useState([])
    const [tb_owner, setTbOwner] = useState(false)
    const searchParams = new URLSearchParams(window.location.search)
    useEffect(() => {

        getInitialData()
    }, [])
    async function getInitialData() {
        let BaseID = searchParams.get('ID')
        let TableID = searchParams.get('Preset')
        if (BaseID) {
            setBaseID(BaseID)
        } else {
            const ProjectName = searchParams.get('Project')
            if (ProjectName) {
                const list = await getBases()
                const base = list.find(x => x.name === ProjectName + '_feedback')
                if (base) {
                    setBaseID(base.id)
                }
            }
        }

        if (TableID) {
            setTableID(TableID)
        }
        if (BaseID) {
            let tempList = await getTablesInBase(BaseID)
            let tables = []
            tempList.forEach(element => {
                if (element?.description === localStorage.getItem('email') || element.id === TableID || searchParams.get('ad_ac') === 'true') {
                    tables.push(element)
                    if (element.id === TableID && element?.description === localStorage.getItem('email')) {
                        setTbOwner(true)
                    }
                }
            });
            setTableList(tables)
            if (!TableID) {
                setTableID(tables[0]?.id)
            }
        }
    }
    useEffect(() => {
        if (BaseID && TableID) {
            getRecordList()
        }
    }, [TableID, BaseID, TableList])


    async function getRecordList() {
        const table = TableList.find(x => x.id === TableID)
        if (table) {
            let filter = ''
            if (!table?.description || table?.description !== localStorage.getItem('email') && searchParams.get('ad_ac') !== 'true') {
                filter = "UserEmail='" + localStorage.getItem('email') + "'"
            }
            const records = await getTableRecords(BaseID, TableID, filter)
            setRecords([...records.records])
        }
    }
    return (
        <div className='w-full h-[calc(100vh-80px)] flex-col gap-5 p-5 bg-gray-100'>

            <div className="mb-2 flex gap-4">
                <Select
                    className='w-40'
                    value={TableID}
                    onChange={setTableID}
                    options={TableList.map(x => {
                        return {
                            value: x.id,
                            label: x.name
                        }

                    })}
                />

                <ShareFeedbackUrl BaseId={BaseID} tableId={TableID} isOwner={tb_owner||searchParams.get('ad_ac') === 'true'} />
            </div>
            <div className="flex gap-5">
                <div className=" w-96 ">
                    <ShareFeedback BaseID={BaseID} getRecordList={getRecordList} TableID={TableID} Fields={TableList.find(x => x.id === TableID)} />
                </div>
                <div className="bg-white flex-grow h-full rounded-lg">
                    <PostsComponent Records={Records} BaseID={BaseID} TableID={TableID} />
                </div>
            </div>
        </div>
    )
}
