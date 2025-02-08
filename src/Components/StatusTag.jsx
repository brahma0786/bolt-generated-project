export const StatusTag = ({ status }) => {
    const styles = {
        done: 'bg-[#E6F6F4] text-[#047857]',
        active: 'bg-[#FEF3C7] text-[#B45309]',
        planned: 'bg-[#E0F2FE] text-[#0369A1]',
        example: 'bg-[#FEF3C7] text-[#B45309]',
        bugs: 'bg-[#EE4B2B] text-[#FFFFFF]'
    };

    return (
        <span
            className={`px-2 text-center text-xs rounded-[10px] flex items-center font-medium capitalize ${styles[status]}`}
        >
            {status}
        </span>
    );
};
