import { useState } from "react";
import axios from "axios";
import { Layout } from "../components/layout/Layout";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Wrapper } from "../components/layout/Wrapper";

interface CreateRecipeForm {
  name: string;
  author: string;
  description: string;
  category: string;
  ingredients: string[];
  image: File | null;
}

const categories = ["Fast Food", "Pasta"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nazwa jest wymagana"),
  author: Yup.string().required("Autor jest wymagany"),
  description: Yup.string().required("Opis jest wymagany"),
  category: Yup.string().required("Kategoria jest wymagana"),
  ingredients: Yup.array().of(
    Yup.string().required("Składnik nie może być pusty")
  ),
  //image: Yup.mixed().nullable().required("Zdjęcie jest wymagane")
});

export const CreateRecipePage = () => {
  const handleCreate = async (values: CreateRecipeForm) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("author", values.author);
    formData.append("description", values.description);
    formData.append("category", values.category);
    //formData.append("image", values.image as Blob);
    values.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });

    const response = await axios.post("https://localhost:7061/api/Recipes", formData); 

    console.log(response.data);
  };

  return (
    <Layout>
      <Wrapper>
      <section className="p-4">
        <h2 className="text-xl font-semibold mb-4">Utwórz nowy przepis</h2>
        <Formik
          initialValues={{
            name: "",
            author: "",
            description: "",
            category: "",
            ingredients: [""],
            image: null, // Początkowo obraz jest null
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ setFieldValue, values }) => (
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

              <div>
                <label htmlFor="category" className="block">
                  Kategoria
                </label>
                <Field as="select" name="category" className="border rounded p-2 w-full">
                  <option value="">Wybierz kategorię</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-600" />
              </div>

              <div>
                <label className="block">Składniki</label>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <div>
                      {values.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                          <Field
                            name={`ingredients[${index}]`}
                            type="text"
                            placeholder="Składnik"
                            className="border rounded p-2 w-full"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Usuń
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Dodaj składnik
                      </button>
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage name="ingredients" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="image" className="block">Zdjęcie</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.target.files?.[0] || null);
                  }}
                  className="border rounded p-2 w-full"
                />
                <ErrorMessage name="image" component="div" className="text-red-600" />
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
      </Wrapper>     
    </Layout>
  );
};
