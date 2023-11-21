interface Props {
    bannerId: number,
    handleClick: any,
}

export default function BannerComponent({bannerId, handleClick}:Props) {
    return (
        <div 
            className="flex border-2 border-lightgrey rounded-lg justify-center cursor-pointer shadow-sm m-4"
            onClick={handleClick}
        >
            <span className="p-6">기사 {bannerId}</span>
        </div>
    )
}