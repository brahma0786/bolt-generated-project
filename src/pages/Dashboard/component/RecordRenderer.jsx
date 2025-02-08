import React from 'react'
import { Link } from 'react-router-dom'
import { StatusTag } from '../../../Components/StatusTag'
import moment from 'moment'

export default function RecordRenderer({BaseID,TableID,id, item, createdTime }) {
    const searchParams= new URLSearchParams(window.location.search)
    return (
        <Link to={"/form?id="+id+'&baseId='+BaseID+'&tableId='+TableID+(searchParams.get('ad_ac')==='true'?'&ad_ac=true':'')} className="flex border-b last:border-b-0 border-neutral-200 hover:bg-neutral-50 transition duration-200 ease-in-out">
            {/* Upvote Section */}
            <div className="text-neutral-600 text-lg flex-shrink-0 border-r w-16 flex items-center justify-center py-4">
                <div className="flex flex-col items-center">
                    <svg fill="currentColor" viewBox="0 0 30 30" className="w-3 h-3 rotate-180 mb-1.5">
                        <path d="M15,23c-0.256,0-0.512-0.098-0.707-0.293l-10-10c-0.286-0.286-0.372-0.716-0.217-1.09C4.23,11.243,4.596,11,5,11h20 c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09l-10,10C15.512,22.902,15.256,23,15,23z"></path>
                    </svg>
                    <div className="font-bold text-base">1</div>
                </div>
            </div>
            {/* Post Content */}
            <div className="flex-1 flex flex-col items-start p-4 cursor-pointer">
                <div className="w-full flex justify-between items-start mb-2">
                    <h3 className="font-semibold flex gap-4">
                        <a className="text-neutral-900">{item.Title}</a>
                        <StatusTag status={item.Status} />
                        <StatusTag status={'bugs'} />
                    </h3>
                    <span className="text-sm text-gray-500">
                        {moment(item.createdTime).format('MMM D, YYYY')}
                    </span>
                </div>
                <p className="text-neutral-700 text-sm">{item.Description}</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            {item.UserName?.[0]}
                        </span>
                        {item.UserName}
                    </div>
                </div>
            </div>
        </Link>
    )
}
