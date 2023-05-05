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
    text: "/animal",
    image: animal,
  },
  {
    name: "Watery & Powdery",
    text: "/waterypowdery",
    image: watery,
  },
  {
    name: "Woody",
    text: "/woody",
    image: woody,
  },
  {
    name: "Mossy",
    text: "/mossy",
    image: mossy,
  },
  {
    name: "Herbal & Green",
    text: "/herbalgreen",
    image: herbal,
  },
  {
    name: "Floral",
    text: "/floral",
    image: floral,
  },
  {
    name: "Citrus",
    text: "/citrus",
    image: citrus,
  },
  {
    name: "Fruity",
    text: "/fruity",
    image: fruity,
  },
  {
    name: "Special",
    text: "/special",
    image: special,
  },
];

const Categories = () => {
  return (
    <div className="categories">
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
  );
};

export default Categories;
