import  Robo from "./service/robo.service"
import schedule from "node-schedule";

class Main {

    constructor() {
        schedule.scheduleJob("*/30 * * * *", () => {
            Robo.consultaPrecoNotebook()
            Robo.consultaPrecoPanela()
        })
    }
}

export default new Main()