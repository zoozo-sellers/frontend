import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";

function SalesBySellerId() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchSalesData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://zoozo-for-seller-backend.azurewebsites.net/api/user/salesBySellerId",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const sales = await response.json();

        const updatedSalesData = await Promise.all(
          sales.map(async (sale) => {
            try {
              const productValueResponse = await fetch(
                `https://zoozo-for-seller-backend.azurewebsites.net/api/user/pointsBySeller?productCode=${sale.productCode}`,
                {
                  credentials: "include",
                }
              );

              if (productValueResponse.ok) {
                const productValueData = await productValueResponse.text();
                const productValue = parseFloat(productValueData);
                const points = productValue * sale.quantity;
                return { ...sale, productValue, points };
              } else {
                console.error(
                  "Error fetching product value:",
                  productValueResponse.statusText
                );
              }
            } catch (error) {
              console.error("Error fetching product value:", error);
            }
          })
        );

        setSalesData(updatedSalesData);
        calculateTotalPoints(updatedSalesData);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []); // Empty dependency array to run the effect only once

  const calculateTotalPoints = (sales) => {
    const total = sales.reduce((acc, sale) => acc + sale.points, 0);
    setTotalPoints(total);
  };

  return (
    <div>
      <h2><u>Your Sales </u><h1>Total Points Earned! : {totalPoints}</h1> </h2>
      
      {isLoading ? (
        <Dimmer active inverted>
          <Loader>Loading sales data...</Loader>
        </Dimmer>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Product Code</Table.HeaderCell>
              <Table.HeaderCell>Selling Price</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Seller ID</Table.HeaderCell>
              <Table.HeaderCell>Sold Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {salesData.map((sale) => (
              <Table.Row key={sale.id}>
                <Table.Cell>{sale.id}</Table.Cell>
                <Table.Cell>{sale.productName}</Table.Cell>
                <Table.Cell>{sale.productCode}</Table.Cell>
                <Table.Cell>{sale.sellingPrice}</Table.Cell>
                <Table.Cell>{sale.status}</Table.Cell>
                <Table.Cell>{sale.quantity}</Table.Cell>
                <Table.Cell>{sale.sellerId} </Table.Cell>
                <Table.Cell>{sale.soldDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default SalesBySellerId;
