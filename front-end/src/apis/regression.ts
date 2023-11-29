import { FlaskServer } from "./setting";

export const getPolynomialRegression = async () => {
    const result = await FlaskServer.get(`/polynomial-regression`)
    console.log(result.data);
    return result.data;
}