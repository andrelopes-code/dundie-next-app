export const NoAvatar = ({
    alt = "user avatar",
    gender = "M",
    className = "",
}: Readonly<{ alt?: string; gender?: "M" | "F"; className?: string; }>) => {
    if (gender === "F") {
        return (
            <img
                className={className}
                src="/images/no_avatar_female.jpg"
                alt={alt}
            />
        );
    } else {
        return (
            <img className={className} src="/images/no_avatar.jpg" alt={alt} />
        );
    }
};
