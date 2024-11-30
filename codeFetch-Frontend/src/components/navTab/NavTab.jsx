import Tab from "../tab/Tab";

const NavTab = ({ requests, onShow, selectedRequest, onClose }) => {
    const navTab = requests.map((request) => (
        <Tab
        key={request.id}
        request={request}
        isActive={selectedRequest?.id === request.id}
        onShow={onShow}
        onClose={onClose}
      />
    ));
  
    return (
      <div className="border-b-2 mt-12 overflow-x-auto whitespace-nowrap">
        <div className="flex">
          {navTab}
        </div>
      </div>
    );
  };
  
  export default NavTab;
  