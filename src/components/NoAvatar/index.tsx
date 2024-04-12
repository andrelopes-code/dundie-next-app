export const NoAvatar = ({
    alt = "user avatar",
    gender = "M",
}: Readonly<{ alt?: string; gender?: "M" | "F" }>) => {
    if (gender === "F") {
        return <img src="/images/no_avatar_male.jpg" alt={alt} />;
    } else {
        return <img src="/images/no_avatar_famale.jpg" alt={alt} />;
    }
};
