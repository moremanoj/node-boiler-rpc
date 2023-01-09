import express from "express";
import print from "helpers/print";

const app = express();
const port  = process.env.PORT || 3000

app.get('/', async (req, res) => {
    const data = await print();
    res.send(data).status(200);
})

app.listen(port, ()=> {
    console.log(`Server started and listening on ${port} !!!`);
})

process.on('unhandledRejection', (reason) => {
    error(
        `Unhandled Promise Rejection: reason: ${JSON.stringify(reason.message)}`
    );
    error(reason.stack);
});
