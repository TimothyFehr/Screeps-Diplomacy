declare global {
    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {
            Memory: {creeps: {[p: string]: any}};
            Game: {creeps: {[p: string]: any}, rooms: any, spawns: any, time: any};
        }
    }
}

export {Diplomacy} from './diplomacy'