"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { SiDogecoin } from "react-icons/si";
import {
    TbRosetteNumber1,
    TbRosetteNumber2,
    TbRosetteNumber3,
} from "react-icons/tb";

const TbRosetteNumber = ({ pos }) => {
    if (pos === 1) {
        return <TbRosetteNumber1 size={20} color="#f0b90b" />;
    }
    if (pos === 2) {
        return <TbRosetteNumber2 size={20} color="#c0c0c0" />;
    }
    if (pos === 3) {
        return <TbRosetteNumber3 size={20} color="#cd7f32" />;
    } else {
        return <>{pos}</>;
    }
};

const ItemRanking = ({ name, points, pos, username, avatar }) => {

    const [pontos, setPontos] = useState(0);

    useEffect(() => {
      const intervalo = setInterval(() => {
        setPontos(prevPontos => {
          const novoValor = prevPontos + Math.floor(Math.random() * 500);
          return novoValor >= points ? points : novoValor;
        });
      }, 20);
  
      return () => clearInterval(intervalo); 
    }, [points]); 

    return (
        <div className="flex flex-row bg-background items-center justify-between py-1 px-4 rounded-lg border-border">
            <div className="flex flex-row gap-4 items-center">
                <div className="w-7">
                    <p className="text-text flex items-center justify-center font-semibold">
                        <TbRosetteNumber pos={pos} />
                    </p>
                </div>
                <a
                    href={`/user/${username}`}
                    className="flex justify-center rounded-full w-8 overflow-hidden"
                >
                    <img className="h-8" src={avatar} alt="userImage" />
                </a>
                <p className="text-text font-semibold text-nowrap max-w-32 overflow-hidden">
                    {name}
                </p>
            </div>
            <p className="text-text font-bold flex flex-row">
                {pontos}
                <span className="pl-2 pt-[0.3rem] text-text">
                    <SiDogecoin size={12} />
                </span>
            </p>
        </div>
    );
};

const Ranking = () => {
    let hasData = false;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getRanking = async () => {
            fetch("http://localhost:3000/api/ranking")
                .then(async (res) => await res.json())
                .then((data) => setUsers(data))
                .catch((err) => console.log(err));
        };
        !hasData && getRanking();
        hasData = true;
    }, []);

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    return (
        <>
            {!users.length ? (
                <Loading />
            ) : (
                <div className="h-full m-4 flex justify-start flex-col">
                    <h2 className="bg-background h-[3.5rem] mb-3 text-center w-full py-3 rounded-lg font-semibold text-primary text-2xl">
                        Ranking
                    </h2>
                    <div className="h-[calc(100%-5.9rem)] overflow-auto noscrollbar flex flex-col gap-2">
                        {users.map((user, pos) => (
                            <ItemRanking
                                key={user.id}
                                name={user.name}
                                points={user.points}
                                avatar={user.avatar}
                                pos={pos + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Ranking;
