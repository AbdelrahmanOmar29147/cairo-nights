import SideBar from '../../Components/SideBar/SideBar'
import './settings.css'
import {useContext, useState} from 'react'
import {Context} from '../../Context/Context'
import axios from "axios"

export default function Settings() {

    const PF = "http://localhost:4001/images/"

    const {user, dispatch} = useContext(Context);

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updatedUser.profilePic = fileName;
            try {
                await axios.post("http://localhost:4001/api/upload", data); 
            } catch (err) {
                console.log("Error uploading");
            }
        }
        try {
            const response = await axios.put("http://localhost:4001/api/users/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: response.data})
        } catch (err) {
            console.log("Error changing info");
            dispatch({type: "UPDATE_FAILURE"})
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img 
                            src={file ? URL.createObjectURL(file) : PF+user.profilePic} 
                            alt="" 
                        />
                        <label htmlFor="fileInput">
                            <i className=" settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{display: "none"}} 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder={user.username} 
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder={user.email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success 
                    && 
                    <span style={{color: "green", textAlign: "center", marginTop:"20px"}}>
                        Your profile has been updated
                    </span>} 
                </form>
            </div>
            <SideBar/>
        </div>
    )
} 
