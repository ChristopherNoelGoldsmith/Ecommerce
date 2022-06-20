const ListItem = (props) => {
  return <li key={props.key}>{props.children}</li>;
};

export default ListItem;
