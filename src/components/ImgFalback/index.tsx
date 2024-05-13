export default function ImgFallback({
    elem,
    src,
    falbackImg,
    className,
    ...props
}: {
    elem: React.RefObject<HTMLImageElement>;
    src: string;
    falbackImg: string;
    className?: string;
    [key: string]: any;
}) {
    return (
        <img
            ref={elem}
            src={falbackImg}
            alt="product image"
            className={className}
            onError={() => {
                elem.current!.src = falbackImg;
            }}
            {...props}
        />
    );
}
