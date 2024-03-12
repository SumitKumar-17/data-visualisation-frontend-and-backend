import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
// import { FaRegWindowClose, FaTh } from "react-icons/fa";

const SideBarNav = ({ active, setActive }) => {
    const urlLocation = useLocation().pathname;

    const [location, setLocation] = useState(urlLocation);
    const [navigationActive, setnavigationActive] = useState(active);

    useEffect(() => {
        setLocation(urlLocation);
    }, [urlLocation])



    return (
        <div className="sidebar sidenav">
            <div className={`px-3  ${navigationActive
                ? "px-3 justify-content-between"
                : "justify-content-center justify-content-sm-start"
                } ps-sm-3 py-4 d-flex`}>
                <img
                    src={logo}
                    alt="Logo"
                    className={`logo pe-3 me-auto ${!navigationActive && "d-none d-sm-block"}`}
                />


                <span>
                    <span
                        className="text-white d-sm-none"
                        style={{ fontSize: "20px" }}
                        onClick={() => {
                            setnavigationActive(!navigationActive);
                            setActive(!navigationActive);
                        }}
                    >
                        {navigationActive ? "X" : "|||"}
                    </span>
                </span>
            </div>

            <div>
                <div
                    className={`text-light ${navigationActive ? "ps-3" : "justify-content-center justify-content-sm-start"
                        } ps-sm-3 pt-2 pb-4 d-flex align-items-center`}
                >
                    <div className={`ps-3 ${!navigationActive && "d-none d-sm-block"}`}>
                        <p className="m-0" style={{ fontSize: "15px" }}>
                            <small>Someone</small>
                        </p>
                        <p className="m-0" style={{ fontSize: "12px" }}>
                            <small>Anybody</small>
                        </p>
                    </div>
                </div>
                <Link to="/">
                    <div
                        className={`text-light ${navigationActive
                                ? "ps-3"
                                : "justify-content-center justify-content-sm-start"
                            } ps-sm-3 py-3 d-flex align-items-center div-link ${location === "/" && "border-start border-3"
                            }`}
                    >
                        X
                        <span className={`ps-3 ${!navigationActive && "d-none d-sm-block"}`}>
                            Dashboard
                        </span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default SideBarNav;