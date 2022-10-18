// bringing all comps
import Items from "./Items";
import Cart from "./Cart";

import { useState } from "react";

//import reactstrap stuffs
import { Container, Row, Col } from "reactstrap";

// import toaster stuffs
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  // methods
  const addToCart = (item) => {
    // check if the product is already in the cart
    const isAddedToCart = cartItems.indexOf(item);
    if (isAddedToCart !== -1) {
        toast.error("Product is already added to the cart...");
        return
    } else {
        item.quantity = 1
        toast.success("Product added successfully")
        setCartItems([...cartItems, item])
    }
  };

  const modifyQuantity = (action, item) => {
    if (action === 'incr') {
        item.quantity += 1
    } else if (action === 'dcr') {
        item.quantity -= 1;
        if (item.quantity === 0) {
            removeFromCart(item)
            return
        }
    }
    const latestCartItems = cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
            cartItem.quantity = item.quantity
        }
        return cartItem
    })
    setCartItems(latestCartItems)
  }

  const removeFromCart = (item) => {
    const updatedCartItems =cartItems.filter((cartItem) => cartItem.id !== item.id)
    setCartItems(updatedCartItems)
    toast.success("item removed successfully");
  }

  const emptyCart = () => {
    setCartItems([])
    toast.info("Your purchase has been successful...");
  }
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Container fluid>
        <Row>
          <Col md={9}>
            <Items addToCart={addToCart} />
          </Col>
          <Col md={3}>
            <Cart
              cartItems={cartItems}
              modifyQuantity={modifyQuantity}
              emptyCart={emptyCart}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
