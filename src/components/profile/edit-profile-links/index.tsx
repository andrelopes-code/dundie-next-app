import { User } from "@/types/user";
import { FaSquareGithub, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";

export function EditLinksForm({
    user,
    setEditLinks,
}: Readonly<{ user: User; setEditLinks: any }>) {
    const toggleEditLinks = () => {
        setEditLinks(false);
    };

    return (
        <div className="transition-all duration-200 bg-[rgba(0,0,0,0.1)]  top-0 left-0 flex flex-col backdrop-blur-sm z-20 items-center h-screen w-screen justify-center absolute">
            <div className="bg-background-light opacity-85 backdrop-blur-lg shadow-lg rounded-lg w-1/3 p-5">
                <form
                    id="links_form"
                    onSubmit={(event) => event.preventDefault()}
                >
                    {/* GITHUB FIELD */}
                    <label
                        htmlFor="github"
                        className="flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaSquareGithub className="mb-[1px]" size={22} />
                        <p>Github</p>
                    </label>

                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="github"
                        spellCheck="false"
                        placeholder="enter your github link"
                        id="github"
                        defaultValue={user?.github as string}
                        pattern="https://github.com/.*"
                        minLength={19}
                        maxLength={70}
                        title="enter a valid github link with https://github.com/"
                    />
                    {/* LINKEDIN FIELD */}
                    <label
                        htmlFor="linkedin"
                        className="mt-5 flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaLinkedin className="mb-[1px]" size={22} />
                        <p>Linkedin</p>
                    </label>

                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="linkedin"
                        spellCheck="false"
                        placeholder="enter your linkedin link"
                        id="linkedin"
                        defaultValue={user?.linkedin as string}
                        pattern="https://linkedin.com/in/.*"
                        minLength={25}
                        maxLength={70}
                        title="enter a valid linkedin link with https://linkedin.com/in/"
                    />
                    {/* INSTAGRAM FIELD */}
                    <label
                        htmlFor="instagram"
                        className="mt-5 flex flex-row gap-2 items-center text-text text-base mb-1"
                    >
                        <FaSquareInstagram className="mb-[1px]" size={22} />
                        <p>Instagram</p>
                    </label>
                    <input
                        className="w-full bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="text"
                        name="instagram"
                        spellCheck="false"
                        placeholder="enter your instagram link"
                        id="instagram"
                        defaultValue={user?.instagram as string}
                        pattern="https://instagram.com/.*"
                        minLength={23}
                        maxLength={70}
                        title="enter a valid linkedin link with https://instagram.com/"
                    />
                    {/* SAVE BUTTON */}
                    <div className="flex flex-row justify-end mt-5">
                        <button
                            onClick={toggleEditLinks}
                            className="w-28 text-text-invert font-medium bg-primary p-1 rounded-lg"
                            form="links_form"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
