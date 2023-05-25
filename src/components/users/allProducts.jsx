import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";

function useAPIData() {
  const [APIData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/allProducts`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAPIData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return { APIData, loading };
}

function UserProductsTable() {
  const { APIData, loading } = useAPIData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = APIData.slice(indexOfFirstItem, indexOfLastItem);

  // Track input field values for each product
  const [orderAmounts, setOrderAmounts] = useState(() => {
    const initialOrderAmounts = Array(APIData.length).fill(0);
    return initialOrderAmounts;
  });

  const [ordering, setOrdering] = useState(false);

  const handleOrderAmountChange = (event, index) => {
    const newOrderAmounts = [...orderAmounts];
    newOrderAmounts[index] = parseInt(event.target.value, 10);
    setOrderAmounts(newOrderAmounts);
  };

  const handleOrderClick = (productCode, quantity) => {
    setOrdering(true);
    const url = `https://zoozo-for-seller-backend.azurewebsites.net/api/user/addOrder/${productCode}?quantity=${quantity}`;
    // Perform the order logic here
    fetch(url, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
        setOrdering(false);
      })
      .catch((error) => {
        // Handle any error that occurs during the order process
        console.error(error);
        setOrdering(false);
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h3><u>All Products</u></h3>
      <div>
        {loading ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <>
            {ordering && (
              <Dimmer active inverted>
                <Loader>Ordering...</Loader>
              </Dimmer>
            )}

            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Code</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Selling Price</Table.HeaderCell>
                  <Table.HeaderCell>In Stock</Table.HeaderCell>
                  <Table.HeaderCell>Product Value</Table.HeaderCell>
                  <Table.HeaderCell>Commission</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {currentItems.map((data, index) => {
                  return (
                    <Table.Row key={data.id}>
                      <Table.Cell>{data.productCode}</Table.Cell>
                      <Table.Cell>{data.productName}</Table.Cell>
                      <Table.Cell>{data.description}</Table.Cell>
                      <Table.Cell>{data.sellingPrice}</Table.Cell>
                      <Table.Cell>{data.inStock}</Table.Cell>
                      <Table.Cell>{data.productValue}</Table.Cell>
                      <Table.Cell>{data.commission}</Table.Cell>
                      <Table.Cell>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={orderAmounts[index]}
                          onChange={(event) =>
                            handleOrderAmountChange(event, index)
                          }
                        />
                        <button
                          className="ui inverted green button"
                          disabled={orderAmounts[index] === 0 || ordering}
                          onClick={() =>
                            handleOrderClick(
                              data.productCode,
                              orderAmounts[index]
                            )
                          }
                        >
                          Order
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>

            {/* Pagination */}
            <div>
              {APIData.length > itemsPerPage && (
                <div className="pagination">
                  <button
                    className="ui button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="ui button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= APIData.length}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProductsTable;
