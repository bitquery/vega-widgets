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
		if (
			(model.includes('String!') || model.includes('Int!')) &&
			(model.includes('Int') || model.includes('Float'))
		) { return true } else { return false }
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
		if (
			(model.includes('String') || model.includes('Int') || model.includes('Float')) &&
			(model.includes('String') || model.includes('Int') || model.includes('Float'))
		) { return true } else { return false }
	}
}

export let vegaPlugins = [new BarPlugin(), new PiePlugin()]
