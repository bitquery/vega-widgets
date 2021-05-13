import vega from 'vega'
import vegaLite from 'vega-lite'
import vegaEmbed from 'vega-embed'
export default async function pieWidgetRenderer(ds, config, el) {
	let values = undefined
	if (!ds.values) {
		const data = await ds.fetcher()
		const json = await data.json()
		values = ds.setupData(json)
	} else {
		values = ds.values
	}
	let cfg = {
		$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
		description: 'A simple bar chart with embedded data.',
		width: 'container',
		height: 'container',
		mark: {"type": "arc", "tooltip": true},
		selection: {
			highlight: {
				type: "single",
				empty: "none",
				on: "mouseover"
			}
		},
		...config,
		data: {
			values
		},
		view: {stroke: null}
	}
	try {
		el && vegaEmbed(`#${el}`, cfg, {actions: false})
	} catch (error) {
		console.log(error)
	}
}
