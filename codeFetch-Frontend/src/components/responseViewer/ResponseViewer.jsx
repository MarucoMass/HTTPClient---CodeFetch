
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// eslint-disable-next-line react/prop-types
function ResponseViewer({ response }) {
  if (!response) return null;

  // eslint-disable-next-line react/prop-types
  function JsonViewer({ data }) {
    return (
      <SyntaxHighlighter className="h-80" language="json" style={a11yDark}>
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow-md ">
      <h2 className="text-lg font-bold mb-2">Respuesta</h2>

      <div className="mb-2">
        <strong>Status:</strong> {response.status} {response.statusText}
      </div>

      <div className="mb-2">
        <strong>Headers:</strong>
        <SyntaxHighlighter language="json" style={a11yDark}>
          {JSON.stringify(response.headers || {}, null, 2)}
        </SyntaxHighlighter>
      </div>

      <div className="mt-2 ">
        <strong>Data:</strong>
        <JsonViewer data={response.data || {}} />
      </div>
    </div>
  );
}

export default ResponseViewer;
