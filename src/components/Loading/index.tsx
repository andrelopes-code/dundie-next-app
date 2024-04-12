const Loading = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="lds-ellipsis text-primary">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading