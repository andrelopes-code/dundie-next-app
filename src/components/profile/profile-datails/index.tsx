import { User, ProfileUpdateRequest } from "@/types/user";
import { FormEvent, useState } from "react";
import { AlertError, AlertSuccess } from "@/components/alert";

const inputClassnameDisabled =
    "w-full bg-background transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light";

export default function ProfileDetails({ user }: Readonly<{ user: User }>) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            document
                .getElementById("up_name")
                ?.setAttribute("disabled", "disabled");
            document
                .getElementById("up_username")
                ?.setAttribute("disabled", "disabled");
            document
                .getElementById("up_bio")
                ?.setAttribute("disabled", "disabled");

            document
                .getElementById("save_profile_btn")
                ?.classList.add("hidden");
            document
                .getElementById("edit_profile_btn")
                ?.classList.remove("hidden");
        } else {
            document.getElementById("up_name")?.removeAttribute("disabled");
            document.getElementById("up_username")?.removeAttribute("disabled");
            document.getElementById("up_bio")?.removeAttribute("disabled");

            document
                .getElementById("save_profile_btn")
                ?.classList.remove("hidden");
            document
                .getElementById("edit_profile_btn")
                ?.classList.add("hidden");

            document.getElementById("up_name")?.focus();
        }
    };

    const setErrorWithTimeout = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError("");
        }, 2000);
    };

    const setSuccessWithTimeout = (successMessage: string) => {
        setSuccess(successMessage);
        setTimeout(() => {
            setSuccess("");
        }, 2000);
    };

    const sendData = async (data: any) => {
        fetch("http://localhost:3000/api/user/profile", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setSuccessWithTimeout(data?.detail);
                } else {
                    const data = await res.json();
                    setErrorWithTimeout(data?.detail);
                }
            })
            .catch((err: Error) => setErrorWithTimeout(err?.message));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let name = (event.target as any)[0].value;
        let username = (event.target as any)[2].value.slice(1);
        let bio = (event.target as any)[4].value;

        const data: ProfileUpdateRequest = {
            name: name == user.name ? "" : name,
            username: username == user.username ? "" : username,
            bio: bio == user.bio ? "" : bio
        };
        await sendData(data);
        toggleEdit();
    };  

    return (
        <div className="h-full flex flex-col justify-evenly">
            {error && <AlertError msg={error} />}
            {success && <AlertSuccess msg={success} />}
            <form
                className="w-[100%] flex flex-col gap-4 justify-center"
                id="profile_form"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-[1fr_1fr] gap-3 ">
                    <div>
                        <label
                            className="text-text text-sm font-medium pl-1 pb-2"
                            htmlFor="up_name"
                        >
                            Full Name
                        </label>
                        <input
                            className={inputClassnameDisabled}
                            type="text"
                            name="up_name"
                            spellCheck="false"
                            disabled
                            placeholder="enter your full name here"
                            id="up_name"
                            defaultValue={user.name}
                            pattern="[a-zA-ZÀ-ú ]*"
                            minLength={8}
                            maxLength={50}
                            title="Only letters are allowed, ex: 'Dundie Awesome'"
                        />
                    </div>
                    <div>
                        <label
                            className="text-text text-sm font-medium pl-1 pb-2"
                            htmlFor="up_email"
                        >
                            Email
                        </label>
                        <input
                            className={inputClassnameDisabled}
                            type="email"
                            disabled
                            name="up_email"
                            spellCheck="false"
                            placeholder="enter your email here"
                            id="up_email"
                            defaultValue={user.email}
                        />
                    </div>
                    <div>
                        <label
                            className="text-text text-sm font-medium pl-1 pb-2"
                            htmlFor="up_username"
                        >
                            Username
                        </label>
                        <input
                            className={inputClassnameDisabled}
                            type="text"
                            disabled
                            name="up_username"
                            spellCheck="false"
                            placeholder="enter your username here"
                            id="up_username"
                            defaultValue={"@" + user.username}
                            pattern="@[a-z-_0-9]*"
                            minLength={3}
                            maxLength={50}
                            title="Only lowercase letters are allowed, ex: '@username'"
                        />
                    </div>
                    <div>
                        <label
                            className="text-text text-sm font-medium pl-1 pb-2"
                            htmlFor="up_dept"
                        >
                            Departament
                        </label>
                        <input
                            className={inputClassnameDisabled}
                            type="text"
                            name="up_dept"
                            disabled
                            id="up_dept"
                            defaultValue={user.dept}
                        />
                    </div>
                </div>
                <div>
                    <label
                        className="text-text text-sm font-medium pl-1 pb-2"
                        htmlFor="up_bio"
                    >
                        Bio
                    </label>
                    <textarea
                        className="w-full h-20 resize-none text-sm bg-background noscrollbar transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        name="up_bio"
                        disabled
                        spellCheck="false"
                        id="up_bio"
                        maxLength={255}
                        defaultValue={user.bio}
                    />
                </div>
            </form>
            <div className="w-full flex flex-row justify-end">
                <button
                    className="w-32 hidden text-text-invert font-medium bg-primary p-2 rounded-lg"
                    form="profile_form"
                    type="submit"
                    id="save_profile_btn"
                >
                    Save Profile
                </button>
                <button
                    className="w-32 text-text-invert font-medium bg-primary p-2 rounded-lg"
                    onClick={toggleEdit}
                    id="edit_profile_btn"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
