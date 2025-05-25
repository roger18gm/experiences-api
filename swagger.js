import swaggerAutoGen from "swagger-autogen";

const doc = {
    info: {
        title: "Roger's Work Portfolio API",
        description: "API docs for work experience and projects API"
    },
    host: "localhost:8080"
};

// const doc = {
//     info: {
//         title: "Roger's Work Portfolio API",
//         description: "API docs for work experience and projects API"
//     },
//     host: "express-server-c7bg.onrender.com"
// };

const outputFile = './swagger-output.json';
const routes = ["./server.js"];

swaggerAutoGen()(outputFile, routes, doc);