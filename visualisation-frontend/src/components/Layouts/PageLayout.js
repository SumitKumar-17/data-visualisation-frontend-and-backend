import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import SidebarNav from './SideBarNav';

const Render = () => {

    const [active, setActive] = useState(false);

    return (<>
        <div className="d-flex flex-row" style={{ overflowX: "hidden" }}>
            <div className={`sidenav ${active ? "" : "col-2"
                }d-sm-block col-sm-3 col-lg-2
       `}>

                <SidebarNav active={active} setActive={setActive} />
            </div>

            <div
                className="col-10 col-sm-9 col-lg-10 p-3 outlet"
                style={{ maxHeight: "100vh", overflowY: "scroll" }}
            >
                <Outlet />
            </div>
        </div>
    </>

    )

}

export default Render;
