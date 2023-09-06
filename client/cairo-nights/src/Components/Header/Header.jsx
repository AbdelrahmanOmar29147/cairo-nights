import "./header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">react & node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img 
                className = "headerImg" 
                src="https://images.pexels.com/photos/11010692/pexels-photo-11010692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="" 
            />
        </div> 
    )
}
