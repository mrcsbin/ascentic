import { NavLink } from "react-router-dom";
import "../../../styles/StoreMain.css";

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
    <NavLink
      className="Cardblock"
      to={`/store/productdetail/${props.product.prodNum}`}
      state={{ props }}
    >
      <div className="CardImagebox">
        <img
          className="Productimage"
          src={
            // !arr === undefined ?
            `http://localhost:8080/getProdImg?prodNum=${props.product.prodNum}&prodImageType=0`
            //  : null
          }
          alt=""
        />
      </div>
      <div className="Pintro">{props.product.prodInfo}</div>
      <div className="Pname">{props.product.prodName}</div>
      <div className="Pprice">{productprice} 원</div>
    </NavLink>
  );
};

export default ProductCard;
