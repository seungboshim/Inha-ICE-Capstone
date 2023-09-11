export default function LoginInput() {
    return (
        <div className="flex justify-center">
            <div className="flex-col">
                <div className="flex p-4 border-b-2 border-primary w-[360px]">
                    <span className="font-bold text-lg text-primary pr-8">ID</span>
                    <input className="flex flex-grow"></input>
                </div>
                <div className="flex p-4 border-b-2 border-grey w-[360px]">
                    <span className="font-bold text-lg text-grey pr-4">PW</span>
                    <input type="password" className="flex flex-grow"></input>
                </div>
            </div>
        </div>
    )
}