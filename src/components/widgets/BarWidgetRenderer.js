import React, { useEffect } from 'react'
import vega from 'vega'
import vegaLite from 'vega-lite'
import vegaEmbed from 'vega-embed'
import { getValueFrom } from '../../utils/common'

function BarWidgetRenderer({ config, dataSource }) {
	useEffect(() => {
		if (config.data && dataSource.data) {
			let values = getValueFrom(dataSource.data, config.data) || {}
			let cfg = {
				$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
				description: 'A simple bar chart with embedded data.',
				mark: 'bar',
				...config,
				data: {
					values
				}
			}
			vegaEmbed('#vis', cfg)
		}
	}, [config, dataSource])
	return (
		<div className="widget-display" >
			<div id="vis" />
		</div>
	)
}

export default BarWidgetRenderer
