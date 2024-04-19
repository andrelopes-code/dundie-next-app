import { IoMdAlert } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

export function AlertSuccess({ msg }: Readonly<{ msg: string }>) {
    return (
        <div className="absolute w-full h-32 px-24 flex flex-col items-end justify-center bottom-0 right-0">
            <div className="flex flex-row bg-alert-success p-3 text-text gap-1 items-center rounded-xl">
                <AiFillCheckCircle size={22} />
                <p className="mt-[2px] font-bold">SUCCESS!</p>
                <p className="mt-[2px] font-medium">&nbsp;&nbsp;{msg}</p>
            </div>
        </div>
    );
}

export function AlertError({ msg }: Readonly<{ msg: string }>) {
    return (
        <div className="absolute w-full h-32 px-24 flex flex-col justify-center items-end bottom-0 right-0">
            <div className="flex flex-row bg-alert-error p-3 text-text gap-1 items-center rounded-xl">
                <IoMdAlert size={22} />
                <p className="mt-[2px] font-bold">AN ERROR OCURRED:</p>
                <p className="mt-[2px] font-medium">&nbsp;&nbsp;{msg}</p>
            </div>
        </div>
    );
}