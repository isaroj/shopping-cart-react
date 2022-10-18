import  {useEffect, useState, useRef} from 'react'
import { fetchProducts } from "../services/ProductService";
import { toast } from "react-toastify";

import { faker } from "@faker-js/faker";

import {Container, Row, Col, Spinner} from 'reactstrap'
import ProductCard from './ProductCard'

const authKey = "563492ad6f917000010000014bb2dbd0fa774076b13e0bd80d1ace1c";


const Items = ({addToCart}) => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const initialRender = useRef(true)

    const getProducts = async ()=> {
        try {
            const {data} = await fetchProducts(authKey);
            const curatedData = data.photos.map(photo => {
                return {
                  id: photo.id,
                  largeImage: photo.src.large,
                  tinyImage: photo.src.tiny,
                  title: faker.commerce.productName(),
                  price: faker.commerce.price(),
                  quantity: 0
                };
            })
            setItems(curatedData)
        } catch (err) {
            toast.error("unable to fetch products...");
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            setIsLoading(true)
            getProducts()
        }
        return () => {
            setItems([])
        };
    }, []);

    return (
      <>
        {isLoading ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
          >
            <Spinner color="warning" />
            <h4 className="text-white">Loading....</h4>
          </div>
        ) : (
          <Container
            className="mb-4"
            style={{
              maxHeight: "96vh",
              overflowY: "scroll",
              overflowX: "hidden",
              margin: "auto",
            }}
          >
            <h1 className="text-center text-white my-2 sticky-top bg-secondary display-6 p-2 rounded">
              Product Dashboard
            </h1>

            <Row>
              {items.map((item) => (
                <Col md={4} key={item.id}>
                  <ProductCard item={item} addToCart={addToCart} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </>
    );
}

export default Items;