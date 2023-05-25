import React, { useState } from "react";
import { Button, Form, Dimmer, Loader } from "semantic-ui-react";
import '../../styles/createProduct.css';

function CreateProductForm() {
  const [loading, setLoading] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [productValue, setProductValue] = useState("");
  const [commission, setCommission] = useState("");

  async function postData(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://zoozo-for-seller-backend.azurewebsites.net/api/admin/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productCode,
            productName,
            description,
            sellingPrice,
            inStock,
            productValue,
            commission,
          }),
          credentials: "include",
        }
      );
  
      if (response.ok) {
        alert("Product Created Successfully!");
        setProductCode("");
        setProductName("");
        setDescription("");
        setSellingPrice("");
        setInStock("");
        setProductValue("");
        setCommission("");
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  const options = [
    { key: "yes", text: "Yes", value: "YES" },
    { key: "no", text: "No", value: "NO" },
    ];

  return (
    <div>
      <h3>Create Product</h3>
      <div className="create-product-form">
        <Form>
          <Form.Field>
            <label>Product Code</label>
            <input placeholder="Product Code" onChange={(e) => setProductCode(e.target.value)} />
          </Form.Field>

          <Form.Field>
            <label>Product Name</label>
            <input
              placeholder="Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
          </Form.Field>

          <Form.Field>
            <label>Selling Price</label>
            <input
              placeholder="Selling Price"
              type="number"
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
        <label>In Stock</label>
        <Form.Select
          placeholder="In Stock"
          options={options}
          value={inStock}
          onChange={(e, { value }) => setInStock(value)}
        />
      </Form.Field>

          <Form.Field>
            <label>Product Value</label>
            <input
              placeholder="Product Value"
              type="number"
              onChange={(e) => setProductValue(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Commission</label>
            <input
              placeholder="Commission"
              type="number"
              onChange={(e) => setCommission(e.target.value)}
            />
          </Form.Field>

          <Button type="submit" onClick={postData} disabled={loading}>
            {loading ? (
              <Dimmer active inverted>
                <Loader>Processing</Loader>
              </Dimmer>
            ) : (
              "Create Product"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateProductForm;
