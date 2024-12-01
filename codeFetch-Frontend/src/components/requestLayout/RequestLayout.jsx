/* eslint-disable react/prop-types */
import { useState } from "react";
import RequestForm from "../requestForm/RequestForm";
import ResponseViewer from "../responseViewer/ResponseViewer";

const RequestLayout = ({selectedRequest, handleSaveRequest, response, setResponse}) => {
const [loader, setLoader] = useState(false);
// const [response, setResponse] = useState({})
if (!selectedRequest) return null;
  return (
      <div key={selectedRequest.id} className="mt-4 mx-8">
        <RequestForm
          setLoader={setLoader}
          onSave={handleSaveRequest}
          setResponse={setResponse}
          data={selectedRequest}
        />
        {loader ? (
          <div className="flex justify-center items-center gap-4 mt-4">
            <p className="text-black dark:text-white">Cargando...</p>
            <div className="w-10 h-10 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          Object.keys(response).length > 0 && (
            <ResponseViewer response={response} />
          )
        )}
      </div>
  );
}

export default RequestLayout