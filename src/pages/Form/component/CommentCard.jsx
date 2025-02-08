import moment from "moment";
import { memo } from "react";

const Avatar = ({ letter, className = "" }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-purple-600 ${className}`}>
        {letter}
    </div>
);

// Username component
const Username = memo(({ username }) => (
    <span
        className="text-[#00BA95] text-[13px] font-medium hover:underline cursor-pointer"
        role="button"
        tabIndex={0}
    >
        {username}
    </span>
));

// Timestamp component
const Timestamp = memo(({ time }) => (
    <span className="text-[#8E8E8E] text-[13px] font-normal">
        {time}
    </span>
));

// Message content component
const MessageContent = memo(({ text }) => (
    <p className="text-[15px] text-[#262626] leading-[1.4]  mt-[2px]">
        {text}
    </p>
));


const CommentCard = ({ item }) => (
    <div className="flex gap-[10px] py-[12px] px-[16px] hover:bg-[#F8F8F8] transition-colors duration-200">
        <div className="flex-shrink-0 pt-[2px]">
           {item?.fields?.UserName&&( <Avatar letter={item?.fields?.UserName[0]} />)}
        </div>
        <div className="flex-grow">
            <div className="flex items-center gap-[6px]">
                <Username username={item?.fields?.UserName} />
                <Timestamp time={moment(item.createdTime).format('hh:mm a')} />
            </div>
            <MessageContent
                text={item?.fields.Text}
            />
        </div>
    </div>
);

export default CommentCard;
