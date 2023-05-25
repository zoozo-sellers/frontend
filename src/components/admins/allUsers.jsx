import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";

function useAPIData() {
  const [APIData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/allUsers`,
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

function UsersTable() {
  const { APIData, loading } = useAPIData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = APIData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h3>All Users</h3>
      <div>
        {loading ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : (
          <>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>NIC</Table.HeaderCell>
                  <Table.HeaderCell>User Name</Table.HeaderCell>
                  <Table.HeaderCell>Mobile No</Table.HeaderCell>
                  <Table.HeaderCell>Bank Details</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {currentItems.map((data) => {
                  return (
                    <Table.Row key={data.id}>
                      <Table.Cell>{data.nic}</Table.Cell>
                      <Table.Cell>{data.username}</Table.Cell>
                      <Table.Cell>{data.mobileNo}</Table.Cell>
                      <Table.Cell>{data.bankDetails}</Table.Cell>
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

export default UsersTable;
