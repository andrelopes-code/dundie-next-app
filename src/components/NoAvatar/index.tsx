import Image from "next/image";

export const NoAvatar = ({
    alt = "user avatar",
    gender = "M",
    className = "",
}: Readonly<{ alt?: string; gender?: "M" | "F"; className?: string }>) => {
    if (gender === "F") {
        return (
            <div>
                <Image
                    className={className}
                    src="/images/no_avatar_female.jpg"
                    alt={alt}
                    width={200}
                    height={200}
                    priority
                />
            </div>
        );
    } else {
        return (
            <div className="relative">
                <Image
                    className={className}
                    src="/images/no_avatar.jpg"
                    alt={alt}
                    width={200}
                    height={200}
                    priority
                />
            </div>
        );
    }
};
