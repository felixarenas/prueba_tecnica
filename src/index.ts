import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { server } from "./presentation/server";

(() => {
    main()
})()

async function main() {

    const appServer = new server({
        port: envs.SERVER_PORT,
        routes: AppRoutes.routes,
    });

    appServer.start()
}