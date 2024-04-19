import Image from "next/image";

export const NoAvatar = ({
    alt = "user avatar",
    gender = "M",
    className = "",
    src = "",
}: Readonly<{
    alt?: string;
    gender?: "M" | "F";
    className?: string;
    src?: string;
}>) => {
    const style = className;

    if (gender === "F") {
        return (
            <Image
                className={style}
                src={src || "/images/no_avatar_female.jpg"}
                alt={alt}
                width={200}
                height={200}
                priority
            />
        );
    } else {
        return (
            <Image
                className={style}
                src={src || "/images/no_avatar.jpg"}
                alt={alt}
                width={200}
                height={200}
                priority
            />
        );
    }
};
