import { modalActions } from "../../store/modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Modal from "../modals/Modal";

const useModal = () => {
	const dispatch = useDispatch();
	const modal = useSelector((store) => store.modal);
	const modalVis = modal.vis;
	const modalContent = modal.content;

	const toggleModalVis = () => {
		return dispatch(modalActions.toggleVis());
	};
	const createModal = (content) => {
		toggleModalVis();
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
