import { useVariables } from "../../presentationVariables";
import "./style.css";

export const ErrorText = () => {
    const {
        setError
    } = useVariables()
    return (
        <div className="blurredBackground">
            <div className="errorBackground">
            <p className="errorText">The image API has ran into an error, which may have been cause by reaching the hourly API limit. Please try again in an hour</p>
            <button onPointerUp={()=>{
                setError(false)
            }} className="closeError">Close</button>
            </div>
        </div>
    )
}