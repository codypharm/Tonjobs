import logo from "/logo.png"
import { Button } from "@/components/ui/button"


const Landing = () => {
    return (
        <div className=" h-full  flex flex-col  items-center justify-center gap-10">
            <img src={logo} className="w-[300px] h-[300px] rounded-full" />


            <div className="w-[90%] max-w-[400px]">
                <p className="font-semibold text-xl text-center">Continue as</p>
                <div className="flex gap-2 justify-center my-3">
                    <Button variant="outline" >Organization </Button>
                    <Button variant={"outline"}>Contributor </Button>

                </div>
            </div>
        </div>
    )
};

export default Landing;