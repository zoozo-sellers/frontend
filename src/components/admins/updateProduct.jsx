import React, { useState, useEffect } from "react";
import { Form, Button, Dimmer, Loader } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/updateProduct.css";

function UpdateProduct() {
  const { productCode } = useParams();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [productValue, setProductValue] = useState("");
  const [commission, setCommission] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/product/${productCode}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setProductName(data.productName);
        setDescription(data.description);
        setSellingPrice(data.sellingPrice);
        setInStock(data.inStock);
        setProductValue(data.productValue);
        setCommission(data.commission);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading state to false when data retrieval is complete
      }
    };

    fetchProductDetails();
  }, [productCode]);

  const handleUpdate = () => {
    setLoading(true);

    // Create an object with the updated product details
    const updatedProduct = {
      productName,
      description,
      sellingPrice,
      inStock,
      productValue,
      commission,
    };

    // Send a PUT request to update the product
    fetch(
      `https://zoozo-for-seller-backend.azurewebsites.net/api/admin/product/${productCode}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        alert("Product updated successfully!");
        navigate("/products");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Failed to update the product.");
      });
  };

  const options = [
    { value: "YES", text: "Yes" },
    { value: "NO", text: "No" },
    // Add more options as needed
  ];

  return (
    <div className="update-form">
      <h3>Update Product Details</h3>
      <div className="update-product-form">
        <Form>
          <Form.Field>
            <label>Product Name</label>
            <input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={loading} // Disable input field while loading
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading} // Disable textarea while loading
            ></textarea>
          </Form.Field>

          <Form.Field>
            <label>Selling Price</label>
            <input
              placeholder="Selling Price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              disabled={loading}
            />
          </Form.Field>

          <Form.Field>
            <label>In Stock</label>
            <Form.Select
              placeholder="In Stock"
              options={options}
              value={inStock}
              onChange={(e, { value }) => setInStock(value)}
              disabled={loading}
            />
          </Form.Field>

          <Form.Field>
            <label>Product Value</label>
            <input
              placeholder="Product Value"
              type="number"
              value={productValue}
              onChange={(e) => setProductValue(e.target.value)}
              disabled={loading}
            />
          </Form.Field>

          <Form.Field>
            <label>Commission</label>
            <input
              placeholder="Commission"
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              disabled={loading}
            />
          </Form.Field>

          <Button type="submit" onClick={handleUpdate} disabled={loading}>
            {loading ? (
              <Dimmer active inverted>
                <Loader>Processing</Loader>
              </Dimmer>
            ) : (
              "Update Product"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
