import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";
import "../../styles/allOrders.css"

function useAPIData() {
  const [APIData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/allOrders`,
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

function completeProduct(orderId) {
  return fetch(
    `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/addSale/${orderId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
}

function updateOrderStatus(orderId, status) {
  return fetch(
    `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/order/${orderId}?status=${status}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );
}

function OrdersTable() {
  const { APIData, loading } = useAPIData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [completeLoading, setCompleteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = APIData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Complete Order
  const handleCompleteOrder = async (productCode) => {
    setCompleteLoading(true);

    try {
      const response = await completeProduct(productCode);

      if (response.ok) {
        alert("Order Marked As Completed!");
        window.location.reload(); // Refresh the page
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      alert(err.message);
    }

    setCompleteLoading(false);
  };

  // Update Order Status
  const handleUpdateStatus = async (orderId, status) => {
    setStatusLoading(true);

    try {
      const response = await updateOrderStatus(orderId, status);

      if (response.ok) {
        alert("Order Status Updated Successfully!");
        window.location.reload(); // Refresh the page
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      alert(err.message);
    }

    setStatusLoading(false);
  };

  return (
    <div className="layout">
      <div >
      <h3>All Orders</h3>
      <div>
        {loading ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <>
            <Table singleLine>
              {/* Table Header */}
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Order ID</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Code</Table.HeaderCell>
                  <Table.HeaderCell>Selling Price</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Seller ID</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {currentItems.map((data) => {
                  return (
                    <Table.Row key={data.id}>
                      <Table.Cell>{data.id}</Table.Cell>
                      <Table.Cell>{data.productName}</Table.Cell>
                      <Table.Cell>{data.productCode}</Table.Cell>
                      <Table.Cell>{data.sellingPrice}</Table.Cell>
                      <Table.Cell>
                        <select
                          value={data.status}
                          onChange={(e) =>
                            handleUpdateStatus(data.id, e.target.value)
                          }
                          disabled={statusLoading}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="IN DELIVERY">IN DELIVERY</option>
                          <option value="RETURN">RETURN</option>
                        </select>
                        {statusLoading && <Loader active inline size="tiny" />}
                      </Table.Cell>
                      <Table.Cell>{data.quantity}</Table.Cell>
                      <Table.Cell>{data.sellerId}</Table.Cell>
                      <Table.Cell>
                        <button
                          className="ui inverted green button"
                          onClick={() => handleCompleteOrder(data.id)}
                          disabled={completeLoading}
                        >
                          {completeLoading ? (
                            <Loader active inline size="tiny" />
                          ) : (
                            "Mark As Completed"
                          )}
                        </button>
                        <button className="ui inverted red button">
                          Remove
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
    </div>
  );
}

export default OrdersTable;
