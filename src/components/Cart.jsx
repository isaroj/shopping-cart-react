import { ListGroup, ListGroupItem, Button, Row, Col, Badge } from "reactstrap";
import {useState, useEffect} from 'react'

const Cart = ({ cartItems, modifyQuantity, emptyCart}) => {

    const [total, setTotal] = useState(0);
    useEffect(() => {
        cartItems.forEach(item => {
            const totalTemp = total + (parseFloat(item.price) * item.quantity)
            setTotal(totalTemp);
        })
    }, [cartItems]);

  return (
    <>
      <h1 className="text-center text-white my-2 sticky-top bg-secondary display-6 p-2 rounded">
        Your Cart
      </h1>
      {cartItems.length ? (
        <>
          <ListGroup
            className="mt-4"
            style={{
              maxHeight: "60vh",
              overflowY: "scroll",
              overflowX: "hidden",
              margin: "auto",
            }}
          >
            {cartItems.map((item) => (
              <ListGroupItem key={item.id} className="mt-2">
                <Row>
                  <Col md={5}>
                    <img
                      src={item.tinyImage}
                      alt="cart item"
                      width="100%"
                      className="mb-2"
                    />
                    <span
                      className="bg-secondary text-white px-3 py-1 rounded modify"
                      onClick={() => modifyQuantity("dcr", item)}
                    >
                      -
                    </span>
                    <span className="bg-dark text-white px-2 py-1 rounded">
                      {item.quantity}
                    </span>
                    <span
                      className="bg-secondary text-white px-3 py-1 rounded modify"
                      onClick={() => modifyQuantity("incr", item)}
                    >
                      +
                    </span>
                  </Col>
                  <Col md={7}>
                    <div>{item.title}</div>
                    <div>Price: {item.price} $</div>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <div>
            <Badge
              className="text-white my-4 bg-primary"
              style={{ fontSize: "1.2rem" }}
            >
              Your total purchase is {total} $
            </Badge>
            <Button onClick={emptyCart} color="success">
              Buy Now
            </Button>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-white mt-4" style={{ fontSize: "1.2rem" }}>
            Cart is empty now. Add something to cart.
          </h4>
        </>
      )}
    </>
  );
};

export default Cart;
