import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ARROW_ICON from "../../assets/right-arrow.png";
import { Link } from "react-router-dom";

export const SearchResult = ({ searchData, handleHideSearch }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8080/search?searchData=${searchData}`
      );
      const fetchedData = res.data;

      const categorizedResults = {};
      fetchedData.forEach((item) => {
        const category = item.productCategory;
        if (!categorizedResults[category]) {
          categorizedResults[category] = [];
        }
        categorizedResults[category].push(item);
      });

      setData(categorizedResults);
      setSelectedCategory(Object.keys(categorizedResults)[0]);
      setIsLoading(false);
    };

    fetchData();
  }, [searchData]);

  useEffect(() => {
    const itemCardContainer = document.getElementById("item-card-container");
    if (itemCardContainer) {
      itemCardContainer.scrollTop = 0;
    }
  }, [selectedCategory]);

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <>
          <ResultCategory>
            {`"${searchData}"에 대한 검색 결과가 없습니다.`}
          </ResultCategory>
        </>
      ) : (
        <>
          <ResultCategory>
            {Object.keys(data).map((category) => (
              <CategoryBox
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                <Category isSelected={category === selectedCategory}>
                  {category}
                </Category>
              </CategoryBox>
            ))}
          </ResultCategory>
          <ItemCardContainer id="item-card-container">
            {data[selectedCategory].map((product) => (
              <ItemCard>
                <Link
                  to={`/store/productdetail/${product.productNum}`}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleHideSearch}
                >
                  <ItemCardContent key={product.productNum}>
                    <ImageBox>
                      <Image
                        src={`http://localhost:8080/images/${product.productImage}`}
                        alt="상품 이미지"
                      />
                    </ImageBox>
                    <ContentBox>
                      <ItemBox>
                        <NameBox>
                          <Name>{product.productName}</Name>
                        </NameBox>
                        <InfoBox>
                          <Info>{product.productInfo}</Info>
                        </InfoBox>
                        <PriceBox>
                          <Price>
                            {addComma(product.productPrice) + " 원"}
                          </Price>
                        </PriceBox>
                      </ItemBox>
                      <IconBox>
                        <Icon src={ARROW_ICON} alt="바로가기 이미지" />
                      </IconBox>
                    </ContentBox>
                  </ItemCardContent>
                </Link>
              </ItemCard>
            ))}
          </ItemCardContainer>
        </>
      )}
    </>
  );
};

const ResultCategory = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
`;

const CategoryBox = styled.div`
  width: 10%;
  text-align: center;
`;

const Category = styled.span`
  cursor: pointer;
  padding: 20px 0;
  box-sizing: border-box;
  ${({ isSelected }) =>
    isSelected &&
    `
    border-bottom: 3px solid black;
  `}
`;

const ItemCardContainer = styled.div`
  overflow: auto;
  max-height: 60vh;
`;

const ItemCard = styled.div`
  margin: 0 auto;
  padding: 2% 5%;
  width: 60%;
`;

const ItemCardContent = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
`;

const Image = styled.img`
  width: 50%;
`;

const ContentBox = styled.div`
  display: flex;
  width: 75%;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0 20px 2%;
  box-sizing: border-box;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
`;

const NameBox = styled.div`
  margin: 10px 0;
`;

const Name = styled.div`
  text-align: left;
`;

const InfoBox = styled.div`
  margin: 10px 0;
`;

const Info = styled.div`
  text-align: left;
`;

const PriceBox = styled.div`
  margin: 10px 0;
`;

const Price = styled.div`
  text-align: left;
`;

const IconBox = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;

const Icon = styled.img`
  width: 20%;
`;
