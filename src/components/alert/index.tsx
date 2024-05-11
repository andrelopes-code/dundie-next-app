import { IoMdAlert } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

export function AlertSuccess({ msg }: Readonly<{ msg: string }>) {
    return (
        <div className="fixed w-full z-50 drop-shadow-lg h-32 px-28 animate-fadeIn flex flex-col items-end justify-center bottom-0 right-0">
            <div className="flex flex-row bg-green-500 p-3 text-white gap-1 items-center rounded-xl">
                <AiFillCheckCircle size={22} />
                <p className="mt-[2px] font-bold">SUCCESS!</p>
                <p className="mt-[2px] font-medium">&nbsp;&nbsp;{msg}</p>
            </div>
        </div>
    );
}

export function AlertError({ msg }: Readonly<{ msg: string }>) {
    return (
        <div className="fixed w-full z-50 animate-fadeIn drop-shadow-lg h-32 px-28 flex flex-col justify-center items-end bottom-0 right-0">
            <div className="flex flex-row bg-red-500 p-3 text-white gap-1 items-center rounded-xl">
                <IoMdAlert size={22} />
                <p className="mt-[2px] font-bold">AN ERROR OCURRED:</p>
                <p className="mt-[2px] font-medium">&nbsp;&nbsp;{msg}</p>
            </div>
        </div>
    );
}