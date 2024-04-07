import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="h-screen bg-background">
            <div className="h-[10%] flex items-center justify-center font-bold text-2xl bg-neutral-700 text-white border-b border-neutral-500">TonJobs</div>

            <section className="h-[90%]">
                <Outlet />
            </section>
        </div>
    )
};

export default Layout;