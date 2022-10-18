import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";

const ProductCard = ({ item, addToCart }) => {
  return (
    <Card
      className="mt-4"
      style={{ height: "20rem", backgroundColor: "#0D0D0D", color: "#FFFFFF", borderColor: "#FFFFFF"}}
    >
      <div style={{ overflow: "hidden" }}>
        <CardImg
          top
          src={item.largeImage}
          alt="card image"
          className="prodImg"
          style={{ height: "12rem", objectFit: "cover" }}
        />
      </div>
      <CardBody>
        <CardTitle
          tag="h5"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </CardTitle>
        <CardTitle tag="h5">Price : {item.price} $</CardTitle>
        <Button
          className="mt-2"
          onClick={() => addToCart(item)}
          color="secondary"
        >
          Add To Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
