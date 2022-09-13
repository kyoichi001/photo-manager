import WorkData from "../value/work_data";

interface IWorkDataFactory {
    create: (path: string) => WorkData | undefined
    convert: (id: string) => WorkData | undefined
}
export default IWorkDataFactory