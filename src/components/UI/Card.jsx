const Card = (props) => {
  return (
    <figure>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <div>{props.children}</div>
    </figure>
  );
};

export default Card;
