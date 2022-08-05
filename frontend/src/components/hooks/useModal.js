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

	//ADD JSX AS THE PERAMETER AND IT WILL LOAD A MO
	const modalWithCondition = async (jsx, condition) => {
		closeModal();
		createModal(jsx);

		if (condition.timeout) {
			setTimeout(() => {
				return closeModal();
			}, condition.timeout);

			return;
		}

		if (condition.callback) {
			const callbackCall = await condition.callback();
			if (callbackCall.status === "ERROR")
				alert("There was an issue with your connection, please try again!");
			return modalWithCondition(jsx, { timeout: 2000 });
		}
	};

	return {
		modal: modalContent,
		modalVis: modalVis,
		closeModal: closeModal,
		createModal: createModal,
		modalWithCondition: modalWithCondition,
	};
};

export default useModal;
