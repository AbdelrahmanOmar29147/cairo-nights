import SideBar from "../../Components/SideBar/SideBar"
import SinglePost from "../../Components/SinglePost/SinglePost"
import "./single.css"

//RFC
export default function Single() {
    return (
        <div className="single">
            <SinglePost/>
            <SideBar/>
        </div> 
    )
}
