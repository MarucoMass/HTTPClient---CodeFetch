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

    if (!requests) return null;
  
    return (
      <div className="mt-6 overflow-x-auto whitespace-nowrap">
        <div className="flex border-b-2">
          {navTab}
        </div>
      </div>
    );
  };
  
  export default NavTab;
  