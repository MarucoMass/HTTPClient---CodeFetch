const Tab = ({ request, isActive, onShow, onClose }) => {
    return (
      <div
        className={`px-4 py-2 border-r relative min-w-44 ${
          isActive ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <button onClick={() => onShow(request)} className="truncate w-full text-left">
          {request.config?.url || "Nueva Solicitud"}
        </button>
        <button
          onClick={() => onClose(request)}
          className={`absolute text-xl -top-2 right-0 text-red-600 hover:text-red-800${
            isActive ? "bg-gray-300" : "bg-transparent"
          }`}
        >
          ×
        </button>
      </div>
    );
  };
  
  export default Tab;
  