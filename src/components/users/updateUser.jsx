import React, { useState } from "react";
import { Button, Form, Dimmer, Loader } from "semantic-ui-react";
import UserNavBar from "../userHeader";
import "../../styles/updateUser.css";

function UpdateUserForm() {
  const [loading, setLoading] = useState(false);
  const [nic, setNic] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [role, setRole] = useState("USER");

  async function postData(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://zoozo-for-seller-backend.azurewebsites.net/api/user/updateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nic,
            username,
            password,
            mobileNo,
            bankDetails,
            role,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("User Details Updated Successfully!");
        setNic("");
        setUsername("");
        setPassword("");
        setMobileNo("");
        setBankDetails("");
        setRole("");
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <UserNavBar />
      <div className="update-user-container">
        <div className="update-user-form">
          <h3 className="update-user-heading">Update Your Details</h3>
          <Form>
            <Form.Field>
              <label>User Name</label>
              <input
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Mobile No.</label>
              <input
                placeholder="Mobile No."
                type="number"
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Bank Details</label>
              <textarea
                onChange={(e) => setBankDetails(e.target.value)}
              ></textarea>
            </Form.Field>

            <Button type="submit" onClick={postData} disabled={loading}>
              {loading ? (
                <Dimmer active inverted>
                  <Loader>Processing</Loader>
                </Dimmer>
              ) : (
                "Update Details"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserForm;
