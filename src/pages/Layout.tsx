import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="h-screen max-h-screen overflow-hidden bg-background">
            <div className="h-[10%] flex items-center justify-center font-bold text-2xl bg-baseGround  text-white ">TonJobs</div>

            <section className="h-[90%]">
                <Outlet />
            </section>
        </div>
    )
};

export default Layout;