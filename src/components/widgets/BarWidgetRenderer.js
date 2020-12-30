import React, { useEffect, useState } from 'react'
import vega from 'vega'
import vegaLite from 'vega-lite'
import vegaEmbed from 'vega-embed'

function BarWidgetRenderer({ el, config, dataSource, displayedData }) {

	useEffect(() => {
		if (dataSource && config && displayedData && dataSource.data) {
			let cfg = {
				$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
				description: 'A simple bar chart with embedded data.',
				width: "container",
				height: "container",
				mark: 'bar',
				...config,
				data: {
					values: dataSource.values
				}
			}
			try {
				el && vegaEmbed(`#${el}`, cfg)
			} catch (error) {
				console.log(error)
			}
		}
	}, [JSON.stringify(config), JSON.stringify(dataSource), displayedData])
	if (!dataSource) return (<div></div>)
	return (
		<div className="widget-display" >
			<div style={{'width': '100%', 'overflowY': 'hidden'}} id={el} />
		</div>
	)
}

export default BarWidgetRenderer
