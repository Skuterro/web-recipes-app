import { Layout } from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import paella from "../images/spanish-paella-isolated-ai-generated-png.webp"

export const HomePage = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/recipes");
  }

  return(
    <Layout>
      <section>
        <div className="bg-black h-[80vh] flex flex-row justify-center gap-20">
          <div className="flex flex-col justify-center items-center pl-14">
            <h3 className="text-white text-5xl font-bold pb-6 text-center">
              Share your best <br/> recipes with others!
            </h3>
            <span className="text-white text-2xl pb-10">
              Cook, eat and rate!
            </span>
            <button 
              className="px-12 py-2 text-white text-xl border-white border-2 rounded-2xl 
                      hover:border-orange-500 hover:text-orange-500 transition-colors duration-500 ease-in-out"
              onClick={handleNavigate}
              >
              View recipes
            </button>
          </div>
          <div className="flex justify-end">
            <img
              src={paella}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="bg-black h-[5vh]"></div>
      </section>
    </Layout>
  );
};