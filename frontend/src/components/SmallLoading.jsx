import { TailSpin } from "react-loader-spinner";

const SmallLoading = () => {
    return ( 
        <div className="tailSpin">
                        <TailSpin
                            height="20"
                            width="20"
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
 
export default SmallLoading;