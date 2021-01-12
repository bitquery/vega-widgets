import BarWidgetEditor from './src/components/widgets/BarWidgetEditor'
import BarWidgetRenderer from './src/components/widgets/BarWidgetRenderer'
import PieWidgetEditor from './src/components/widgets/PieWidgetEditor'
import PieWidgetRenderer from './src/components/widgets/PieWidgetRenderer'

class BarPlugin {
	constructor() {
		this.id = 'vega.bar'
		this.name = 'Bar Widget'
		this.editor = BarWidgetEditor
		this.renderer = BarWidgetRenderer
	}
	supportsModel(model) {
		return model[0]==='[' && model.slice(-2, -1)!=='0'
	}
}
class PiePlugin {
	constructor() {
		this.id = 'vega.pie'
		this.name = 'Pie Widget'
		this.editor = PieWidgetEditor
		this.renderer = PieWidgetRenderer
	}
	supportsModel(model) {
		return model[0]==='['&& model.slice(-2, -1)!=='0'
	}
}

export let vegaPlugins = [new BarPlugin(), new PiePlugin()]
