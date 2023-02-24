import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
  {
    sales: "$195",
    purchase: "$194"
  }
];

const TodayOverview = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Today Sale Overview</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the today sale
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Today Sale</th>
                <th>Today Purchase</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="">
                        <h6 className="mb-0">{tdata.sales}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.purchase}</td>
                  <td>
                    {/* {tdata.purchase >= tdata.sales ? 
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                     :
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                   } */}
                   {tdata.purchase > tdata.sales ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.purchase < tdata.sales ? (
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

export default TodayOverview;