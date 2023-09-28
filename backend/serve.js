// config dotenv
import "dotenv/config"
import { app as serve} from "./app/app.js"

//serve
const PORT = process.env.PORT || 3333

serve.listen(PORT, () => {
    console.log(`server is running PORT ${PORT} 
    http://localhost:${PORT}/<routes>`)
})