import { Field, Form, Formik, ErrorMessage} from "formik";
import { FaRegEnvelope } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Layout } from "../components/layout/Layout";
import { NavItem } from "../components/layout/Navbar";
import * as Yup from "yup";
import { AuthContext } from "../providers/AuthProvider";
import { useAuth } from "../providers/AuthProvider";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface LoginUserForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { setLoggedUser } = useAuth();

  const navigate = useNavigate();

  const handleLoginClick = async ({ email, password }: LoginUserForm) => {

    const response = await axios.post("https://localhost:7061/api/Account/Login", {
      email,
      password
    }, {
      withCredentials: true
    });
    const user = {
      id: response.data.userId,
      email: response.data.email,
      username: response.data.name,
      role: "user",
    };
    setLoggedUser(user);
    navigate("/profile");
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Emailis required"),
    password: Yup.string().required("Password is required"),
  });

  return(
    <Layout>
      <section className="h-[65vh] flex items-center justify-center">
        <div className="bg-gradient-to-b from-gray-200 to-white flex flex-col items-center gap-8 shadow-lg rounded-xl p-12">
        <h2 className="bg-primary rounded-xl text-white font-bold p-2">
          Welcome back!
        </h2>
        <div className="flex">
          <p>Don't have an accout yet?</p>
          <NavItem to="/register" text="Sign up"/>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLoginClick}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="flex flex-col gap-1">
              <div className="flex items-center bg-custom-gray-3 rounded-xl px-2 mb-2 w-full">
                <FaRegEnvelope className="mr-2 ml-1 text-white "  />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-custom-gray-3 p-2 border-none outline-none w-full placeholder-white text-white"
                />
                
              </div>
              <div className="flex items-center bg-custom-gray-3 rounded-xl px-2 mb-2 w-full">   
                <GiPadlock className="mr-2 ml-1 text-white"/>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-custom-gray-3 p-2 border-none outline-none w-full placeholder-white text-white"
                />
                
              </div>
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-xl"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
        </div>
        
      </section>
    </Layout>
  );
};