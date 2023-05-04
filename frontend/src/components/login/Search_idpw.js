import React, { useState, useEffect } from "react";
import axios from "axios";

const Search_id = () => {
  const [selectData, setSelectData] = useState("Search_id");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");
  const [serverUrl, setServerUrl] = useState(
    "http://localhost:8080/user/find/id"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectData(value);
    setName("");
    setEmail("");
    setResult("");
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleId = (e) => {
    setId(e.target.value);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(setServerUrl);
    const user = {
      user_id: id,
      user_name: name,
      user_email: email,
    };
    console.log(user);
    console.log(serverUrl);

    axios
      .post(serverUrl, user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(user);
        setResult(response.data);
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clickHandler = (e) => {
    if (e.target.value === "Search_id") {
      setServerUrl("http://localhost:8080/user/find/id");
    } else if (e.target.value === "Search_Pw") {
      setServerUrl("http://localhost:8080/user/find/pw");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="data"
              value="Search_id"
              checked={selectData === "Search_id"}
              onClick={clickHandler}
              onChange={handleChange}
            />
            ID찾기
          </label>
          <label>
            <input
              type="radio"
              name="data"
              value="Search_Pw"
              checked={selectData === "Search_Pw"}
              onClick={clickHandler}
              onChange={handleChange}
            />
            PW 찾기
          </label>
          {selectData === "Search_id" && (
            <div className="modalCont">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  onChange={handleName}
                  value={name}
                />
              </div>
              <input
                type="text"
                name="email"
                placeholder="이메일"
                onChange={handleEmail}
                value={email}
              />
            </div>
          )}
        </div>
        <div>
          {selectData === "Search_Pw" && (
            <div className="modalCont">
              <div>
                <input
                  type="text"
                  name="id"
                  placeholder="ID"
                  onChange={handleId}
                  value={id}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  onChange={handleName}
                  value={name}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="이메일"
                  onChange={handleEmail}
                  value={email}
                />
              </div>
            </div>
          )}
        </div>
        <button type="submit" onClick={handleSubmit} className="search">
          조회
        </button>
      </form>
      <br />
      <div>{result}</div>
    </div>
  );
};

export default Search_id;
