import anime from "animejs";
import { useEffect, useRef } from "react";

export default function RequestAdminPassword({
    setAdminPassword,
    setPasswordModal,
}: any) {
    const background = useRef<HTMLDivElement>(null);
    const internalDiv = useRef<HTMLDivElement>(null);
    const Text = useRef<HTMLParagraphElement>(null);
    const animationDuration = 800;

    function unmount() {
        const target = background.current as HTMLDivElement;
        const internal = internalDiv.current as HTMLDivElement;

        // Remove the background color
        target.style.backgroundColor = "rgba(0, 0, 0, 0)";

        anime({
            targets: target,
            easing: "easeInOutQuad",
            duration: animationDuration,
            update: function (anim) {
                let value = 1 - anim.progress / 100; // isso vai variar de 1 a 0 durante a animação
                let blurValue = 5 * value; // quantidade de desfoque
                target.style.backdropFilter = `blur(${blurValue}px)`;
            },
        });

        anime({
            targets: internal,
            easing: "easeInOutQuad",
            duration: animationDuration,
            opacity: 0,
        });

        setTimeout(() => {
            setPasswordModal(false);
        }, animationDuration);
    }

    useEffect(() => {
        const target = background.current as HTMLDivElement;
        const internal = internalDiv.current as HTMLDivElement;
        const text = Text.current as HTMLParagraphElement;

        // Add a background color to the target
        target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        // Start the animation for the target when the component mounts
        anime({
            targets: target,
            easing: "easeInOutQuad",
            duration: animationDuration,
            update: function (anim) {
                let value = anim.progress / 100; // isso vai variar de 0 a 1 durante a animação
                let blurValue = 5 * value; // quantidade de desfoque
                target.style.backdropFilter = `blur(${blurValue}px)`;
            },
        });

        anime({
            targets: text,
            easing: "easeInOutQuad",
            duration: animationDuration * 3,
            update: function (anim) {
                if (anim.progress < 33) {
                    text.innerText = "Type your admin password.";
                } else if (anim.progress < 66) {
                    text.innerText = "Type your admin password..";
                } else if (anim.progress < 99) {
                    text.innerText = "Type your admin password...";
                }
            },
            loop: true,
        });

        anime({
            targets: internal,
            easing: "easeInOutQuad",
            duration: animationDuration,
            opacity: [0, 1],
        });
    }, []);

    return (
        <div
            ref={background}
            className="absolute z-50 top-0 left-0 h-full bg-transparent transition-colors duration-[800ms] w-full flex flex-col items-center justify-center"
        >
            <form
                onSubmit={(e: any) => {
                    e.preventDefault();
                    setAdminPassword(e.target.RequestAdminPassword.value);
                    unmount();
                }}
            >
                <div
                    ref={internalDiv}
                    className="flex flex-col items-center selection:bg-[#00000010] text-zinc-600 caret-transparent font-semibold gap-3 p-5 rounded-lg"
                >
                    <label htmlFor="RequestAdminPassword">
                        <p
                            ref={Text}
                            id="RequestAdminPasswordText"
                            className="animate-pulse"
                        >
                            Type your admin password
                        </p>
                    </label>
                    <input
                        onBlur={unmount}
                        className="outline-none bg-transparent placeholder:px-1"
                        type="password"
                        name="RequestAdminPassword"
                        id="RequestAdminPassword"
                        minLength={8}
                        autoFocus
                        required
                    />
                </div>
            </form>
        </div>
    );
}
