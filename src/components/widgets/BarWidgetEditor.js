import React, { useState, useEffect } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'

function BarWidgetEditor({model, config, setConfig, displayedData}) {
	const xFunc = key => {if (model[key].typeInfo) {
		return model[key].typeInfo.toString().includes('String')
			||model[key].typeInfo.toString().includes('Int!')
	}}
	const yFunc = key => {if (model[key].typeInfo) {
		return (model[key].typeInfo.toString().includes('Int')
			||model[key].typeInfo.toString().includes('Float'))
			&&!model[key].typeInfo.toString().includes('Int!')
	}}
	const [xAxis, setXAxis] = useState('')
	const [yAxis, setYAxis] = useState('')
	const [sample, setSample] = useState(null)
	
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
				transform: [{sample: +sample ? sample : 1000}],
				encoding: {
					x: {field: fieldX, type: 'ordinal', sort: null},
					y: {field: fieldY, type: 'quantitative'},
					stroke: {
						condition: {
						  selection: "highlight",
						  value: "#000"
						}
					}
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
				<div class="form-group">
					<label for="sample">Sample (optional)</label>
					<input
						value={sample}
						onChange={e => setSample(e.target.value)}
						type="text"
						class="form-control"
						id="sample"
						placeholder="default"
					/>
				</div>
			</div>
		</div>
	)
}

export default BarWidgetEditor
