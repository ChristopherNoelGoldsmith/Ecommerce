//not finished
import Button from "../UI/Button";

const ProductListItem = (props) => {
  const submithandler = () => {
    "placeholder";
  };

  const productHandler = () => {
    "placeholder";
  };

  return (
    <li>
      <figure>
        <label htmlFor="product name">product name</label>
        <div>'image'</div>
        <div className="product-details">
          <form onSubmit={submithandler}>
            <label htmlFor="price">{props.productPrice}</label>
            <input type="number" />
            <Button onClick={productHandler} type={"submit"}>
              Add
            </Button>
          </form>
        </div>
      </figure>
    </li>
  );
};

export default ProductListItem;
