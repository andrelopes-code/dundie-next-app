"use client"
import axios from "@/api/axios"
import { useEffect, useState } from "react";
import getAccessCookie from "@/hooks/getAccessCookie";


const ItemRanking = ({ name, points, pos, username, avatar }) => {
    return (
        <div className="flex flex-row items-center justify-between border-b-2 pb-1 border-border">

            <div className="flex flex-row gap-4 items-center">
                <div className="w-7">
                    <p className="text-text font-bold">{pos}.</p>
                </div>
                <a href={`/user/${username}`} className="flex justify-center rounded-full w-8 overflow-hidden">
                    <img className="h-8"
                    src={avatar} alt="userImage"
                    />
                </a>
                <p className="text-text font-medium text-nowrap max-w-32 overflow-hidden">{name}</p>
            </div>
            <p className="text-text font-bold">{points} <span className="font-normal text-sm pl-1">pts</span></p>

        </div>
    )
}

const LoadingNoContent = () => {
    return (
        <div className="flex flex-col h-[85%] items-center justify-center">
            <span className="loader"></span>
        </div>
    )
}

const Ranking = () => {

    const [users, setUsers] = useState([])

    
    useEffect( () => {
        const getRanking = async () => {

            const access_cookie = await getAccessCookie();

            const config = {
                headers: {
                    "authorization": `Bearer ${access_cookie}`
                }
                , withCredentials: true
            }
    
            const response = await axios.get('/ranking', config);
            setUsers(response?.data)
        }

        getRanking()
    }, [])    


    if (users.length > 0) {
        return (
            <div className="h-full flex flex-col gap-2 overflow-auto noscrollbar scroll-smooth">
            {
                users.map((user, index) => (
                    <ItemRanking 
                    key={user.id} 
                    username={user.username} 
                    name={user.name} 
                    points={user.points} 
                    pos={index+1} 
                    avatar={user.avatar}
                    />
                ))
            }
            </div>
        )} else {
            return (
                <LoadingNoContent />
            )
        }
}

export default Ranking