import { NavLink } from "react-router-dom";
import "../../../styles/StoreMain.css";
import styled from "styled-components";

const ProductCard = (props) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  var productprice = addComma(props.product.prodPrice);

  // if (!props.alcohol.prod_images === undefined)
  // | (props.alcohol.prod_images !== "") | (props.alcohol.prod_images !== null))

  // console.log(arr);
  return (
    <Cardblock
      to={`/store/productdetail/${props.product.prodNum}`}
      state={{ props }}
    >
      <CardImagebox>
        <CardImage
          src={
            // !arr === undefined ?
            `http://localhost:8080/images/${props.product.prodImage}`
            //  : null
          }
          alt=""
        />
      </CardImagebox>
      <Pinfo>{props.product.prodInfo}</Pinfo>
      <Pname>{props.product.prodName}</Pname>
      <Pprice>{productprice} 원</Pprice>
    </Cardblock>
  );
};

const Cardblock = styled(NavLink)`
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  float: left;
  width: 280px;
  overflow: hidden;
  text-decoration: none;
  font-family: "Pretendard";
  color: black;
`;
const CardImagebox = styled.div`
  margin: 0 0 10px 0;
  padding: 0;
  width: 280px;
  height: 330px;
  overflow: hidden;
`;
const CardImage = styled.img`
  width: 280px;
  height: 330px;
  object-fit: cover;
  object-position: center;
`;
const Pinfo = styled.div`
  margin: 0;
  padding: 5px 10px;
  font-family: "Pretendard";
  font-size: 0.9rem;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;
const Pname = styled.div`
  margin: 0;
  padding: 5px 10px;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;
const Pprice = styled.div`
  margin: 0;
  padding: 5px 10px;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  color: black;
`;

export default ProductCard;
