import { NavLink } from "react-router-dom";
// import "../../assets/styles/product-card.css";

const ProductCard = (props) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  var productprice = addComma(props.product.prod_price);

  // if (!props.alcohol.prod_images === undefined)
  // | (props.alcohol.prod_images !== "") | (props.alcohol.prod_images !== null))
  var arr = props.product.prod_images
    .replace("[", "")
    .replace("]", "")
    .replaceAll(" ", "")
    .split(",");
  // console.log(arr);
  return (
    <NavLink
      className="Cardblock"
      to={`/products/${props.product.prod_num}`}
      state={{ props }}
    >
      <div className="Imagebox">
        <img
          className="Productimage"
          src={
            // !arr === undefined ?
            `http://localhost:8080/download?img=${arr[0]}`
            //  : null
          }
          alt=""
        />
      </div>
      <div className="Pintro">{props.product.prod_tag}</div>
      <div className="Pname">{props.product.prod_name}</div>
      <div className="Pprice">{productprice} 원</div>
      <div className="Pvolume">{props.product.prod_volume}mL</div>
    </NavLink>
  );
};

export default ProductCard;
