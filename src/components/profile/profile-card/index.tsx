import { NoAvatar } from "@/components/NoAvatar";
import { RiUpload2Fill } from "react-icons/ri";

interface User {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    username: string;
    points: number;
    dept: string;
}

export default function ProfileCard({ user }: Readonly<{ user: User }>) {
    return (
        <>
            <div>
                <div className="cursor-pointer">
                    {<RiUpload2Fill size={28} className="transition-transform ease-in-out delay-200 duration-500 absolute z-10 bg-primary p-1 translate-x-24 translate-y-24 hover:translate-y-[5.8rem] text-text-invert rounded-full" />}
                </div>
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden drop-shadow-xl">
                    {!user.avatar && <NoAvatar />}
                    {user.avatar && <img src={user.avatar} alt="user avatar" />}
                </div>
            </div>
            <div>
                <p className="font-semibold text-center text-text text-3xl">
                    {user.name}
                </p>
                <p className="font-medium text-center mb-5 text-text-light text-xs">
                    @{user.username}
                </p>
                <p className="font-normal text-text-light text-center mt-1">
                    {user.bio}
                </p>
            </div>
        </>
    );
}
