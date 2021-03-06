import {merge} from 'lodash';
import remove from 'flow-remove-types';
import resolveTransform from 'patternplate-transform-resolve-imports';

export default flowRemoveTypesTransformFactory;

function flowRemoveTypesTransformFactory(app) {
	const resolve = resolveTransform(app);

	return async function (file) {
		app.resources = app.resources || [];

		const sourceFile = merge({}, file);
		sourceFile.buffer = sourceFile.source;

		const resolved = await resolve(sourceFile, null, app.configuration.transforms['resolve-imports'], true);
		const source = resolved.buffer.toString('utf-8');
		const result = remove(file.buffer.toString('utf-8')).toString();

		if (result !== source) {
			app.resources.push({
				content: source,
				file,
				id: `flow-remove-types/${resolved.pattern.id}`,
				pattern: resolved.pattern.id,
				reference: false,
				type: 'js.flow'
			});

			file.buffer = result;
		}

		return file;
	};
}
