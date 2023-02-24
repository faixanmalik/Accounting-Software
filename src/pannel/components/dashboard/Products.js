import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
  {
    CurrentMonthProducts: "20",
    prevMonthProducts: "15"
  }
];

const Products = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Products Details</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the Products Details
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Previous Month Products</th>
                <th>Current Month Products</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="">
                        <h6 className="mb-0">{tdata.prevMonthProducts}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.CurrentMonthProducts}</td>
                  <td>
                    {tdata.prevMonthProducts > tdata.CurrentMonthProducts ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.prevMonthProducts < tdata.CurrentMonthProducts ? (
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

export default Products;