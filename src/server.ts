import app from "./index";
import { connectToDb } from './config/db';

// establish database connection
connectToDb
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.listen(process.env.PORT, (): void => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);

})