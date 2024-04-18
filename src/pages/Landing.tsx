import { Link } from "react-router-dom";
import logo from "/logo.png"
import { Button } from "@/components/ui/button"
import { GoWorkflow } from "react-icons/go";
import GitHubOAuth from "@/components/GithubOAuth";
const Landing = () => {
    return (
        <div className=" h-full  flex flex-col  items-center justify-center gap-10">
            {/* <img src={logo} className="w-[300px] h-[300px] rounded-full" /> */}
            <GoWorkflow size={150} />

            <div className="w-[90%] max-w-[400px]">
                <p className="font-semibold text-xl text-center">Continue as</p>
                <div className="flex gap-2 justify-center my-3">
                    <Link to={"/organization"}><Button variant="outline" >Organization </Button></Link>
                    <Link to={"/contributor"}> <Button variant={"outline"}>Contributor </Button></Link>

                </div>
                <div className="flex gap-2 justify-center my-3">
                <GitHubOAuth />
                </div>
            </div>
        </div>
    )
};

export default Landing;