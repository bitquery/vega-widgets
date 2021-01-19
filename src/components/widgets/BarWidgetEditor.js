import React, { useState, useEffect } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'

function BarWidgetEditor({model, config, setConfig, displayedData}) {
	const xFunc = key => {if (model[key].typeInfo) {
		return model[key].typeInfo.toString().includes('String')
			||model[key].typeInfo.toString().includes('Int')
			||model[key].typeInfo.toString().includes('Float')
	}}
	const yFunc = key => {if (model[key].typeInfo) {
		return model[key].typeInfo.toString().includes('String')
			||model[key].typeInfo.toString().includes('Int')
			||model[key].typeInfo.toString().includes('Float')
	}}
	const [xAxis, setXAxis] = useState('')
	const [yAxis, setYAxis] = useState('')
	
	//set options if query has config, only on mount
	useEffect(() => {
		if (!xAxis && config) {
			if (Object.keys(config).length) {
				if ('encoding' in config) {
					if ('x' in config.encoding) {
						setXAxis(`${displayedData}.${config.encoding.x.field}`)
					}
					if ('y' in config.encoding) {
						setYAxis(`${displayedData}.${config.encoding.y.field}`)
					}
				}
			}
		} 
	}, [])
	//every time since first update when xAxis, yAxis or displayedData changed, set config
	useFirstUpdate(() => {
		if (model && xAxis && yAxis && xAxis.includes(displayedData)) {
			let fieldX = xAxis.replace(`${displayedData}.`, '')
			let fieldY = yAxis.replace(`${displayedData}.`, '')
			let cfg = {
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
