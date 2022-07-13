import { modalActions } from "../../store/modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Modal from "../modals/Modal";

const useModal = () => {
	const dispatch = useDispatch();
	const modal = useSelector((store) => store.modal);
	const modalVis = modal.vis;
	const modalContent = modal.content;

	//TOGGLES MODULE VISABILITY.
	const toggleModalVis = () => {
		return dispatch(modalActions.toggleVis());
	};

	//INSERT JSX IN THE "content" PARAM AND IT WILL APPEAR IN THE MODAL.
	//SET PERSIST TO TRUE TO REPLACE THE CURRENT MODAL
	const createModal = (content, persist = false) => {
		if (!persist) toggleModalVis();
		const newModal = <Modal onClick={toggleModalVis}>{content}</Modal>;
		dispatch(modalActions.setContent(newModal));
		return;
	};

	const closeModal = () => {
		return dispatch(modalActions.closeModal());
	};

	return {
		modal: modalContent,
		modalVis: modalVis,
		closeModal: closeModal,
		createModal: createModal,
	};
};

export default useModal;
