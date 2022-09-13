import TagData from "../value/tag_data";

interface ITagDataFactory {
    create: (name: string) => TagData
    convert: (id: string) => TagData | undefined
}
export default ITagDataFactory