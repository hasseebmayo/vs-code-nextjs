import HorizentalStack from "@/components/FlexStack/HorizentalStack/HorizentalStack";
import PlusIcon from "../../../assets/images/PlusIcon.svg";
type fileManager = {
  onClick?: React.MouseEventHandler<any>;
};
const FileManagerHeader = ({ onClick }: fileManager) => {
  return (
    <HorizentalStack
      className="vs-filemanager-header"
      justifyContent="space-between"
    >
      <h2>Explorer</h2>
      <PlusIcon onClick={onClick} />
    </HorizentalStack>
  );
};

export default FileManagerHeader;
