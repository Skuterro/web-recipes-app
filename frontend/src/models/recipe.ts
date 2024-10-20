export interface Recipe{
    id: string;
    name: string;
    author: string;
    description: string;
    category: string;
    ingredients: string[];
    imageData: string | null;
}