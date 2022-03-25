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
	const [xAxisTitle, setXAxisTitle] = useState(undefined)
	const [yAxisTitle, setYAxisTitle] = useState(undefined)
	const [color, setColor] = useState(undefined)
	const [sample, setSample] = useState('')
	
	//set options if query has config, only on mount
	useEffect(() => {
		if (!xAxis && config) {
			if (Object.keys(config).length) {
				if ('mark' in config) {
					setColor(config.mark?.color)
				}
				if ('encoding' in config) {
					if ('x' in config.encoding) {
						setXAxis(`${displayedData}.${config.encoding.x.field}`)
						if ('axis' in config.encoding.x) {
							setXAxisTitle(config.encoding.x.axis?.title)
						}
					}
					if ('y' in config.encoding) {
						setYAxis(`${displayedData}.${config.encoding.y.field}`)
						if ('axis' in config.encoding.x) {
							setYAxisTitle(config.encoding.y.axis?.title)
						}
					}
					if ('transform' in config) {
						setSample(config.transform[0].sample)
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
			const axisShared = {
				"titleFont": "Nunito ExtraLight",
				"titleFontWeight": "normal",
				"titleFontStyle": "italic"
			}
			let cfg = {
				transform: [{sample: +sample ? sample : 1000}],
				mark: {"type": "bar", "tooltip": true, color: color?.match(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/) && color},
				encoding: {
					x: {
						field: fieldX,
						type: 'ordinal',
						sort: null,
						timeUnit: "yearmonthdate",
						axis: {
							...axisShared,
							title: xAxisTitle && xAxisTitle,
							labelAngle: 25
						}
					},
					y: {
						field: fieldY,
						type: 'quantitative',
						axis: {
							...axisShared,
							title: yAxisTitle && yAxisTitle
						}
					},
				}
			}
			setConfig(cfg)
		}
	}, [xAxis, yAxis, color, xAxisTitle, yAxisTitle, sample, displayedData])
	
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
				<div className="form-group">
					<label>Sample (optional)</label>
					<input
						value={sample}
						onChange={e => setSample(e.target.value)}
						type="text"
						className="form-control form-control--sample"
						placeholder="default"
					/>
					<label>Bars color</label>
					<input
						value={color}
						onChange={e => setColor(e.target.value)}
						type="text"
						className="form-control form-control--color"
						placeholder="default"
					/>
					<label>X Axis Title</label>
					<input
						value={xAxisTitle}
						onChange={e => setXAxisTitle(e.target.value)}
						type="text"
						className="form-control form-control--xtitle"
						placeholder="default"
					/>
					<label>Y Axix Title</label>
					<input
						value={yAxisTitle}
						onChange={e => setYAxisTitle(e.target.value)}
						type="text"
						className="form-control form-control--ytitle"
						placeholder="default"
					/>
					
				</div>
			</div>
		</div>
	)
}

export default BarWidgetEditor
