import React, { useState, useEffect } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'

function BarWidgetEditor({model, config, setConfig}) {
	const xFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const yFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const dataFunc = node => (model[node][0]==='[' && node.slice(-2, -1)!=='0') 
	const [xAxis, setXAxis] = useState('')
	const [yAxis, setYAxis] = useState('')
	const [displayedData, setDisplayedData] = useState(() => config ? config.data : '')

	useEffect(() => {
		if (!xAxis && config) {
			if (Object.keys(config).length) {
				if ('encoding' in config) {
					if ('x' in config.encoding) {
						setXAxis(`${config.data}.${config.encoding.x.field}`)
					}
					if ('y' in config.encoding) {
						setYAxis(`${config.data}.${config.encoding.y.field}`)
					}
				}
			}
		} 
	}, [JSON.stringify(config)])
	useFirstUpdate(() => {
		if (model) {
			let fieldX = xAxis && xAxis.replace(`${displayedData}.`, '')
			let fieldY = yAxis && yAxis.replace(`${displayedData}.`, '')
			var cfg = {
				data: displayedData,
				encoding: {
					x: {field: fieldX, type: 'ordinal'},
					y: {field: fieldY, type: 'quantitative'}
				}
			}
			setConfig(cfg)
		}
	}, [xAxis, yAxis, displayedData])
	
	return (
		<div className="widget">
			<WidgetOptions 
				value={displayedData}
				setValue={setDisplayedData}
				condition={dataFunc}
				title={'Displayed data'}
				model={model}
			/>
			<div className="widget-editor">
				<WidgetOptions 
					value={xAxis}
					setValue={setXAxis}
					condition={xFunc}
					title={'X Axis'}
					model={model}
				/>
				<WidgetOptions 
					value={yAxis}
					setValue={setYAxis}
					condition={yFunc}
					title={'Y Axis'}
					model={model}
				/>
			</div>
		</div>
	)
}

export default BarWidgetEditor
