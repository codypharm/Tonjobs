import { Link } from "react-router-dom";
import logo from "/logo.png"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
const Landing = () => {
    return (
        <div className=" h-full  flex flex-col  items-center justify-center gap-10">
            {/* <img src={logo} className="w-[300px] h-[300px] rounded-full" /> */}
            <GoWorkflow size={150} />

            <div className="w-[90%] max-w-[400px]">
                <p className="font-semibold text-xl text-center">Continue as</p>
                <div className="flex gap-2 justify-center my-3">
                    <Link to={"/organization"}><Button variant="outline" >Organization </Button></Link>
                    <Button variant={"outline"}>Contributor </Button>

                </div>
                <div className="flex gap-2 justify-center my-3">

                    <Button variant={"outline"} className="flex  gap-3"><FaGithub /> Login </Button>

                </div>
            </div>
        </div>
    )
};

export default Landing;