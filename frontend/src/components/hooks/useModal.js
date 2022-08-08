import { modalActions } from "../../store/modal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Modal from "../modals/Modal";

const useModal = () => {
	const dispatch = useDispatch();
	const modal = useSelector((store) => store.modal);
	const modalVis = modal.vis;
	const modalContent = modal.content;

	//!
	//TOGGLES MODULE VISABILITY.
	//TODO: NEEDS DEPRECIATEION

	const toggleModalVis = () => {
		return dispatch(modalActions.toggleVis());
	};
	//!

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

	/*
	CREATES A MODAL WHICH WILL CLOS ON A THAT WILL CLOSE UPON A CONDITION

	? jsx: JSX IS PASSED IS THE FIRST PARAM.  IT IS WHAT WILL BE IN THE MODAL

	? condition: PASS AN OBJECT WITH THE "timeout" OR "callback" KEY. 
	? * timeout: ADD THE AMOUNT OF TIME BEFORE YOU WONT THE WINDOW TO CLOSE
	? * callback: INTENDED FOR ASYNC FUNCTIONS. SUCH AS A LOADING SCRREN THAT WILL POPULATE AND CLOSE WHEN LOADED.
	*/
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
			const callOver = async (numOfCalls = 0) => {
				// ASYNC 1 ) CALLBACK IS PASSED AND CALLED
				const callbackCall = await condition.callback();
				console.log(numOfCalls);
				// CATCH ) IF THE CONNECTION WAS UNCESSFUL MORE THEN 2 TIMES AN ALERT IS SHOWN
				if (numOfCalls >= 2) return callbackCall;
				console.log("poop");
				if (callbackCall.status === "ERROR" || !callbackCall) {
					return callOver(numOfCalls++);
				}

				return callbackCall;
			};

			const callbackCall = await callOver();
			// ASYNC 2 ) THROWS AN ALERT IF CALLBACK RETURNS AN ERROR OR RETURNS FALSE
			if (callbackCall.status === "ERROR" || !callbackCall)
				alert("There was an issue with your connection, please try again!");

			// ASYNC 3 ) SETS MODAL TO CLOSE AFTER 2 SECONDS
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
