import { Rings } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="loading">
            <Rings
                height="80"
                width="80"
                color="#FF6700"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}

export default Loading;