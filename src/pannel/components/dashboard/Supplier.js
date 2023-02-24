import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
  {
    CurrentMonthSupplier: "10",
    prevMonthSupplier: "13"
  }
];

const Supplier = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Supplier Details</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the Suppliers
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Previous Month Supplier</th>
                <th>Current Month Supplier</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="">
                        <h6 className="mb-0">{tdata.prevMonthSupplier}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.CurrentMonthSupplier}</td>
                  <td>
                    {tdata.prevMonthSupplier > tdata.CurrentMonthSupplier ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.prevMonthSupplier < tdata.CurrentMonthSupplier ? (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                        ) : (
                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />    
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default Supplier;