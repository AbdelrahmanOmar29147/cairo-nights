import "./sidebar.css"
import { useEffect, useState } from "react";
import {useLocation} from "react-router";
import axios from "axios"
import {Link} from "react-router-dom"; 

export default function SideBar() {

    const [cats, setCat] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const response = await axios.get("/categories")
            setCat(response.data);
        };
        getCats();
    }, [])

    return (
        <div className="sidebar">
            <div className="sideBarItem">
                <span className="sideBarTitle">ABOUT US</span>
                <img className="img" src="https://i.pinimg.com/564x/90/20/e8/9020e8f7d5cfee85985630c2e7e63160.jpg" alt="" />
                <p>
                    lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dol
                    lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dol
                    lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et dol
                </p>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">CATEGORIES</span>
                <ul className="sideBarList">
                    {cats.map( c => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sideBarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">FOLLOW US</span>
                <div className="sideBarSocial">
                    <i className="sideBarIcons fa-brands fa-facebook-square"></i>
                    <i className="sideBarIcons fa-brands fa-instagram-square"></i>
                    <i className="sideBarIcons fa-brands fa-twitter-square"></i>
                    <i className="sideBarIcons fa-brands fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}
