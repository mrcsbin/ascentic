import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SbProductUpdateBox = ({ sbproduct, Categories, setUpdateMode }) => {
  const [sbProductDTO, setSbProductDTO] = useState({
    scentName: sbproduct.scentName.scentName,
    sbProdPrice: sbproduct.sbProdPrice,
    sbProdIntro: sbproduct.sbProdIntro,
    sbProdImage: sbproduct.sbProdImage,
    sbProdStock: sbproduct.sbProdStock,
  });
  const [noteName, setNoteName] = useState(sbproduct.scentName.scentNoteName);
  const [scentlist, setScentlist] = useState([]);
  const [scentloading, setScentloading] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [file, setFile] = useState("");

  const handleNoteChange = (e) => {
    setNoteName(e.target.value);
  };
  const handleChange = (e) => {
    setSbProductDTO({
      ...sbProductDTO,
      [e.target.name]: e.target.value,
    });
  };
  const loadImgFile = (e) => {
    if (e.target.files) {
      const img = e.target.files[0];
      setFile(img);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    } else {
      return;
    }
  };
  const updateSbProduct = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append(
      "sbProduct",
      new Blob([JSON.stringify(sbProductDTO)], {
        type: "application/json",
      })
    );
    axios
      .post(
        `http://localhost:8080/subsProduct/update/${sbproduct.sbProdNum}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        alert("수정이 완료되었습니다.");
        //   window.location.replace("/admin/subscribemanagement");
        setUpdateMode("");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const fetchScents = async () => {
      setScentloading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/scent/list/${noteName}`
        );
        setScentlist(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setScentloading(false);
    };
    fetchScents();
  }, [noteName]);

  return (
    <SbProdBox>
      <InlineContent>
        <div>ID: {sbproduct.sbProdNum}</div>
        <div>
          <select
            defaultValue={sbproduct.scentName.scentNoteName}
            onChange={handleNoteChange}
          >
            {Categories.map((note) => (
              <option key={note.text} value={note.text}>
                {note.name}
              </option>
            ))}
          </select>
        </div>
      </InlineContent>
      <InputImg
        type="file"
        accept="image/*"
        id="spImg"
        onChange={loadImgFile}
      />
      <ImgBox>
        <img
          src={imgFile ? imgFile : `/images/${sbProductDTO.sbProdImage}`}
          alt="sbProductImg"
        />
      </ImgBox>
      <BlockContent>
        {scentlist && scentloading === false && scentlist.length !== 0 ? (
          <select
            key="scentName"
            name="scentName"
            defaultValue={sbproduct.scentName.scentName}
            onChange={handleChange}
          >
            {scentlist.map((scent) => (
              <option key={scent.scentName} value={scent.scentName}>
                {scent.scentName}
              </option>
            ))}
          </select>
        ) : (
          <select name="scentName">
            <option>로딩중...</option>
          </select>
        )}
      </BlockContent>
      <BlockContentS>
        <textarea
          name="sbProdIntro"
          value={sbProductDTO.sbProdIntro}
          onChange={handleChange}
        />
      </BlockContentS>
      <InlineContent>
        <div>
          <label htmlFor="sbProdPrice">가격</label>
          <input
            id="sbProdPrice"
            type="number"
            name="sbProdPrice"
            value={sbProductDTO.sbProdPrice}
            onChange={handleChange}
          />{" "}
          원
        </div>
        <div>
          <label htmlFor="sbProdStock">재고</label>
          <input
            id="sbProdStock"
            type="number"
            name="sbProdStock"
            value={sbProductDTO.sbProdStock}
            onChange={handleChange}
          />{" "}
          개
        </div>
      </InlineContent>
      <Buttonbox>
        <button
          disabled={
            (sbProductDTO.scentName === "") |
            (sbProductDTO.sbProdPrice === "") |
            (sbProductDTO.sbProdIntro === "") |
            (sbProductDTO.sbProdStock === "")
              ? true
              : false
          }
          onClick={() => updateSbProduct()}
        >
          수정완료
        </button>
        <button onClick={() => setUpdateMode("")}>수정취소</button>
      </Buttonbox>
    </SbProdBox>
  );
};

const SbProdBox = styled.div`
  margin: 10px 20px;
  padding: 10px;
  width: 500px;
  border-bottom: 1px solid black;
  font-size: 1rem;
`;
const InlineContent = styled.div`
  div {
    display: inline-block;
    margin: 5px 15px 10px 0;
  }
  div > input[type="number"] {
    margin: 0 5px;
    padding: 2px 2px;
    width: 80px;
    text-align: right;
    font-size: 1rem;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  select {
    font-size: 1rem;
  }
`;
const InputImg = styled.input`
  display: block;
  float: left;
  margin-bottom: 10px;
  width: 100%;
  font-size: 1rem;
`;
const ImgBox = styled.div`
  display: block;
  float: left;
  margin-right: 15px;
  width: 90px;
  height: 90px;
  overflow: hidden;
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    object-position: center;
  }
`;
const BlockContent = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  select {
    font-size: 1rem;
    font-weight: 500;
  }
`;
const BlockContentS = styled.div`
  font-size: 0.9rem;
  line-height: 1.2;
  word-break: keep-all;
  textarea {
    width: 385px;
    height: fit-content;
    font-size: 1rem;
  }
`;
const Buttonbox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    margin-top: 10px;
    margin-right: 10px;
    padding: 5px 15px;
    background-color: black;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    border: 0;
    cursor: pointer;
  }
  button:nth-child(1):disabled {
    margin-top: 10px;
    margin-right: 10px;
    padding: 5px 15px;
    background-color: gray;
    color: white;
    border: 0;
    cursor: default;
  }
`;

export default SbProductUpdateBox;
