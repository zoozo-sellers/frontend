import React, { useState, useEffect } from "react";
import { Table, Dimmer, Loader } from "semantic-ui-react";

const WeeklySalesTable = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customSalesValue, setCustomSalesValue] = useState("");
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/getCustomSales?startDate=${startDate}&endDate=${endDate}`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSalesData(data);
        } else {
          throw new Error("Failed to fetch custom sales data");
        }
      } catch (error) {
        console.error(error);
        setSalesData([]);
      }

      setIsLoading(false);
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchCustomSalesValue = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/customSales?startDate=${startDate}&endDate=${endDate}`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCustomSalesValue(data);
        } else {
          throw new Error("Failed to fetch custom sales value");
        }
      } catch (error) {
        console.error(error);
        setCustomSalesValue("");
      }

      setIsLoading(false);
    };

    if (startDate && endDate) {
      fetchCustomSalesValue();
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h3><u>Sort Your Sales</u></h3>
      <b>Start Date : </b><input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        placeholder="Start Date"
      />
      <br/>
      <b>End Date : </b><input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        placeholder="End Date"
      />
      <br/>
      <br/>
      {isLoading ? (
        <Dimmer active>
          <Loader>Loading Sales Data</Loader>
        </Dimmer>
      ) : (
        <div>
          {salesData.length > 0 ? (
            <Table sortable celled>
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
                    <Table.Cell>{sale.sellerId}</Table.Cell>
                    <Table.Cell>{sale.soldDate}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p><b>No sales data available</b></p>
          )}
        </div>
      )}
      <br/>
      <br/>
      <h3>
        Sorted Sales Value: Rs.{""}
        {isLoading ? <Loader active inline size="tiny" /> :customSalesValue}
      </h3>
    </div>
  );
};

export default WeeklySalesTable;
