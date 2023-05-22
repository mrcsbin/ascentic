import React from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/StoreMain.css";

import all from "../../../assets/category/floral2.webp";
import animal from "../../../assets/category/animal.webp";
import citrus from "../../../assets/category/citrus.webp";
import floral from "../../../assets/category/floral1.webp";
import fruity from "../../../assets/category/fruity.webp";
import herbal from "../../../assets/category/herbal.webp";
import mossy from "../../../assets/category/mossy.webp";
import special from "../../../assets/category/special.webp";
import watery from "../../../assets/category/watery.webp";
import woody from "../../../assets/category/woody.webp";

const categorylist = [
  {
    name: "전체보기",
    text: "/",
    image: all,
  },
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
            to={"/storemain" + c.text}
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
