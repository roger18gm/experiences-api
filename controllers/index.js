export const getData = (req, res) => {
    const data = "This is the API for week 5-8 where I have two collections, one for programming projects and another for work experience. Try visiting /projects or /jobs";
    res.json(data);
};