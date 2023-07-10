import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const SbProductAddModal = ({ open, close, Categories, setRerender }) => {
  const [sbProductDTO, setSbProductDTO] = useState({
    scentName: "",
    sbProdPrice: 22900,
    sbProdIntro: "",
    sbProdImage: "",
    sbProdStock: "",
  });
  const [noteName, setNoteName] = useState("all");
  const [scentlist, setScentlist] = useState([]);
  const [scentloading, setScentloading] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [file, setFile] = useState("");
  const inputfile = useRef();
  //   console.log(sbProductDTO, file);
  const handleNoteChange = (e) => {
    setNoteName(e.target.value);
  };
  const handleChange = (e) => {
    setSbProductDTO({
      ...sbProductDTO,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset = () => {
    setSbProductDTO({
      scentName: "",
      sbProdPrice: 22900,
      sbProdIntro: "",
      sbProdImage: "",
      sbProdStock: "",
    });
    setImgFile("");
    setFile("");
    setNoteName("all");
    inputfile.current.value = "";
  };
  const loadImgFile = (e) => {
    if (e.target.files.length !== 0) {
      const img = e.target.files[0];
      setFile(img);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    }
  };

  const addSbProduct = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append(
      "sbProduct",
      new Blob([JSON.stringify(sbProductDTO)], {
        type: "application/json",
      })
    );
    axios
      .post("http://localhost:8080/subsProduct/add", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("등록이 완료되었습니다.");
        handleReset();
        close();
        // window.location.replace("/admin/subscribemanagement/product");
        setRerender(Math.random());
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
        // console.log(res.data);
      } catch (e) {
        console.log(e);
      }
      setScentloading(false);
    };
    fetchScents();
  }, [noteName]);

  return (
    <FormModal>
      <div className={open ? "openModal modal" : "modal"}>
        <ModalBG onClick={close} />
        <SbProdBox>
          <Header>
            구독상품 추가하기
            <button className="close" onClick={close}>
              &times;
            </button>
          </Header>
          <InlineContent>
            <div>Note</div>
            <div>
              <select value={noteName} onChange={handleNoteChange}>
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
            ref={inputfile}
            onChange={loadImgFile}
          />
          <ImgBox>{imgFile && <img src={imgFile} alt="sbProductImg" />}</ImgBox>
          <BlockContent>
            {scentlist && scentloading === false && scentlist.length !== 0 ? (
              <select key="scentName" name="scentName" onChange={handleChange}>
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
            )}{" "}
            향
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
            <button onClick={() => handleReset()}>초기화</button>
            <button
              disabled={
                (sbProductDTO.scentName === "") |
                (sbProductDTO.sbProdPrice === "") |
                (sbProductDTO.sbProdIntro === "") |
                (sbProductDTO.sbProdStock === "") |
                (file === "")
                  ? true
                  : false
              }
              onClick={() => addSbProduct()}
            >
              등록하기
            </button>
          </Buttonbox>
        </SbProdBox>
      </div>
    </FormModal>
  );
};

const FormModal = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
`;
const ModalBG = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SbProdBox = styled.div`
  margin: auto;
  padding: 30px 60px 40px 60px;
  width: 500px;
  border: 5px solid black;
  background-color: white;
  z-index: 1000;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
  button {
    padding: 0;
    font-size: 2rem;
    background-color: white;
    border: 0;
    cursor: pointer;
  }
`;
const InlineContent = styled.div`
  div {
    display: inline-block;
    margin: 5px 15px 10px 0;
    font-size: 1rem;
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
  background-color: #e6e6e6;
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
  margin-bottom: 5px;
  font-size: 1rem;
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
  justify-content: center;
  button:nth-child(1) {
    margin-top: 20px;
    margin-right: 40px;
    padding: 10px 30px;
    font-size: 1.1rem;
    background-color: white;
    color: black;
    border: 1.5px solid black;
    cursor: pointer;
  }
  button:nth-child(2) {
    margin-top: 20px;
    padding: 10px 30px;
    font-size: 1.1rem;
    background-color: black;
    color: white;
    border: 0;
    cursor: pointer;
  }
  button:nth-child(2):disabled {
    margin-top: 20px;
    padding: 10px 30px;
    font-size: 1.1rem;
    background-color: gray;
    color: white;
    border: 0;
    cursor: default;
  }
`;

export default SbProductAddModal;
