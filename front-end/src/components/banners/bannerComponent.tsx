import { ballotBannerDummy } from "./bannerDummy"
import { HiLink } from "react-icons/hi";

interface Props {
    ballotId: number,
    bannerId: number,
    handleClick: any,
}

export default function BannerComponent({ballotId, bannerId, handleClick}:Props) {

    const targetBanner = ballotBannerDummy.results.find(result => {
        if (result.ballotId === ballotId) {
            return result.banners.find(banner => banner.bannerId === bannerId);
        }
        return false;
    });

    if (targetBanner) {
        const banner = targetBanner.banners.find(banner => banner.bannerId === bannerId);
        const { image_path, title, link }:any = banner;

        return (
            <div
                className="flex border-2 border-lightgrey rounded-lg justify-center shadow-sm m-4 h-24"
                //onClick={handleClick}
            >
                <div className="flex justify-evenly w-full m-4">
                    <div className="w-1/4">
                        <img src={image_path} className="w-16 h-16 object-contain" alt="이미지"/>
                    </div>
                    <div className="flex w-3/4 items-center">
                        <span className="w-4/5 text-center">{title}</span>
                        <a href={link} target="_blank" className="w-1/5 flex justify-end" onClick={handleClick}>
                            <HiLink size={24} className=""/>
                        </a>
                    </div>
                </div>

            </div>
        );
    }

    // 해당하는 배너 데이터가 없는 경우에 대한 처리
    return (
        <div
        className="flex border-2 border-lightgrey rounded-lg justify-center cursor-pointer shadow-sm m-4"
        onClick={handleClick}
        >
            <span className="p-6">기사 {bannerId}</span>
        </div>
    )
}