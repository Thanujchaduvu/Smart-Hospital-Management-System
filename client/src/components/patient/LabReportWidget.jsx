export default function LabReportWidget({ reports }) {
  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="border-b p-5">
        <h2 className="text-xl font-bold">
          🧪 Lab Reports
        </h2>
      </div>

      <div className="p-5">

        {reports.length === 0 ? (

          <p className="text-gray-500">
            No laboratory reports.
          </p>

        ) : (

          reports.slice(0, 5).map((report) => (

            <div
              key={report.id}
              className="border-b py-3"
            >

              <h3 className="font-semibold">
                {report.test_name}
              </h3>

              <p className="text-sm text-gray-500">
                {report.status}
              </p>

              {report.file_url && (

                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm"
                >
                  Download Report
                </a>

              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}