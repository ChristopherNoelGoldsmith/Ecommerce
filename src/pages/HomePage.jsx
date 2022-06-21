import styles from "./Homepage.module.scss";
import Megatron from "../components/Megatron/Megatron";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

const HomePage = () => {
	return (
		<section className={`${styles["homepage"]}`}>
			<Megatron />
			<FeaturedProducts />
		</section>
	);
};

export default HomePage;
