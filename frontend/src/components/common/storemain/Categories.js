import React from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/StoreMain.css";
import animal from "../../../assets/category/animal.jpg";
import citrus from "../../../assets/category/citrus.jpg";
import floral from "../../../assets/category/floral1.jpg";
import fruity from "../../../assets/category/fruity.jpg";
import herbal from "../../../assets/category/herbal.jpg";
import mossy from "../../../assets/category/mossy.jpg";
import special from "../../../assets/category/special.jpg";
import watery from "../../../assets/category/watery.jpg";
import woody from "../../../assets/category/woody.jpg";
const categorylist = [
  {
    name: "Animal",
    text: "/Animal",
    image: animal,
  },
  {
    name: "Watery & Powdery",
    text: "/Watery&Powdery",
    image: watery,
  },
  {
    name: "Woody",
    text: "/Woody",
    image: woody,
  },
  {
    name: "Mossy",
    text: "/Mossy",
    image: mossy,
  },
  {
    name: "Herbal & Green",
    text: "/Herbal&Green",
    image: herbal,
  },
  {
    name: "Floral",
    text: "/Floral",
    image: floral,
  },
  {
    name: "Citrus",
    text: "/Citrus",
    image: citrus,
  },
  {
    name: "Fruity",
    text: "/Fruity",
    image: fruity,
  },
  {
    name: "Special",
    text: "/Special",
    image: special,
  },
];
const Categories = () => {
  return (
    <div className="categories">
      <div className="categoriesbox">
        {categorylist.map((c) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "catebox-active" : "catebox"
            }
            key={c.name}
            to={"/StoreMain" + c.text}
          >
            <div className="cateimgEffect">
              <div className="cateimgbox">
                <img className="cateimg" src={c.image} alt="" />
              </div>
            </div>
            {c.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
