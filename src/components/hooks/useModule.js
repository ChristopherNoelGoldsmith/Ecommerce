import { moduleActions } from "../../store/module";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Module from "../module/Module";

const useModule = () => {
	const dispatch = useDispatch();
	const module = useSelector((store) => store.module);
	const moduleVis = module.vis;
	const moduleContent = module.content;

	const toggleModuleVis = dispatch(moduleActions.toggleVis());

	const createModule = (content) => {
		const module = <Module onClick={toggleModuleVis}>{content}</Module>;
		dispatch(moduleActions.setContent(module));
		return;
	};

	return {
		module: moduleContent,
		moduleVis: moduleVis,
		createModule: createModule,
	};
};

export default useModule;
