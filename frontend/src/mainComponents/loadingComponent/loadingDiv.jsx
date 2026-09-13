import { useVariables } from "../../presentationVariables";
import "./style.css";

export const LoadingDiv = () => {
    const {objectLoading} = useVariables()
    return (
        <div className={`bluredBackground ${objectLoading ? "loaded" : ""}`}>
            <div className="spinner"/>
            <p>loading</p>
        </div>
    )
}