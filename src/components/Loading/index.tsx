const Loading = ({ color }: { color?: string }) => {
    const classe = color ? "text-[" + color + "]" : "text-primary";

    return (
        <div className="flex flex-col h-[100%] items-center justify-center">
            <div className={"lds-ellipsis " + classe}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export const loadingHTML = `<div id="loadingHtml" class="flex flex-col h-[60vh] items-center justify-center"><div class="lds-ellipsis text-primary"><div></div><div></div><div></div><div></div></div></div>`;

export default Loading;
