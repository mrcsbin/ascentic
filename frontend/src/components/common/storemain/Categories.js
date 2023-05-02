import React from "react";
import { NavLink } from "react-router-dom";
import animal from "../../../assets/Category/animal.jpg";
import citrus from "../../../assets/Category/citrus.jpg";
import floral from "../../../assets/Category/floral1.jpg";
import fruity from "../../../assets/Category/fruity.jpg";
import herbal from "../../../assets/Category/herbal.jpg";
import mossy from "../../../assets/Category/mossy.jpg";
import special from "../../../assets/Category/special.jpg";
import watery from "../../../assets/Category/watery.jpg";
import woody from "../../../assets/Category/woody.jpg";

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
  return categorylist.map((c) => (
    <NavLink
      className={({ isActive }) => (isActive ? "active" : undefined)}
      key={c.name}
      to={c.text}
    >
      <div className="cateimgEffect">
        <div className="cateimg">
          <img src={c.image} alt="" />
        </div>
      </div>
      {c.name}
    </NavLink>
  ));
};

export default Categories;
