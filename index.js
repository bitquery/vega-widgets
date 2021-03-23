import BarWidgetEditor from './src/components/widgets/BarWidgetEditor'
import barWidgetRenderer from './src/components/widgets/barWidgetRenderer'
import PieWidgetEditor from './src/components/widgets/PieWidgetEditor'
import pieWidgetRenderer from './src/components/widgets/pieWidgetRenderer'

class Plugin {
	constructor() {
		this.dependencies = [
			'https://cdn.jsdelivr.net/npm/vega@5.19.1',
			'https://cdn.jsdelivr.net/npm/vega-lite@5.0.0',
			'https://cdn.jsdelivr.net/npm/vega-embed@6.15.1'
		]
	}
}

class BarPlugin extends Plugin {
	constructor() {
		super()
		this.id = 'vega.bar'
		this.name = 'Bar Widget'
		this.editor = BarWidgetEditor
		this.renderer = barWidgetRenderer
		this.source = 'node_modules/vega-widgets/src/components/widgets/barWidgetRenderer.js'
	}
	supportsModel(model) {
		for (let key in model) {
			return model[key].typeInfo.toString()[0]==='[' 
				&& model[key].typeInfo.toString().slice(-2, -1)!=='0'
		}
	}
}
class PiePlugin extends Plugin {
	constructor() {
		super()
		this.id = 'vega.pie'
		this.name = 'Pie Widget'
		this.editor = PieWidgetEditor
		this.renderer = pieWidgetRenderer
		this.source = 'node_modules/vega-widgets/src/components/widgets/pieWidgetRenderer.js'
	}
	supportsModel(model) {
		for (let key in model) {
			return model[key].typeInfo.toString()[0]==='[' 
				&& model[key].typeInfo.toString().slice(-2, -1)!=='0'
		}
	}
}

export let vegaPlugins = [new BarPlugin(), new PiePlugin()]
