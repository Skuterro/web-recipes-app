import { useState } from "react";
import { Recipe } from "../models/recipe";
import axios from "axios";
import { Layout } from "../components/layout/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface CreateRecipeForm {
  name: string;
  author: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nazwa jest wymagana"),
  author: Yup.string().required("Autor jest wymagany"),
  description: Yup.string().required("Opis jest wymagany"),
});

export const CreateRecipePage = () => {
  //const[recipes, setRecipes] = useState<Recipe[]>([]);

  const handleCreate = async(values:CreateRecipeForm) => {

    const recipe = {
      name: values.name,
      description: values.description,
      author: values.author
    };
  
    const response = await axios.post("https://localhost:7061/api/Recipes", recipe);
  };

  return(
    <Layout>
      <section className="p-4">
        <h2 className="text-xl font-semibold mb-4">Utwórz nowy przepis</h2>
        <Formik
          initialValues={{ name: "", author: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block">
                  Nazwa
                </label>
                <Field
                  name="name"
                  type="text"
                  className="border rounded p-2 w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="author" className="block">
                  Autor
                </label>
                <Field
                  name="author"
                  type="text"
                  className="border rounded p-2 w-full"
                />
                <ErrorMessage name="author" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="description" className="block">
                  Opis
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="border rounded p-2 w-full"
                  rows={4}
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                Utwórz przepis
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );

};