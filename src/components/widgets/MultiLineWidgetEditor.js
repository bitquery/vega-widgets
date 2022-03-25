import React, { useState, useEffect } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'
import Multiselect from 'multiselect-react-dropdown'

function MultiLineWidgetEditor({model, config, setConfig, displayedData}) {
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
	const [layer, setLayer] = useState([])

	useEffect(() => {
		if (!xAxis && config) {
			if (Object.keys(config).length) {
				if ('repeat' in config) {
					setLayer(config.repeat.layer.map(el => {return {name: el}}))
				}
				if ('spec' in config) {
					if ('x' in config.spec.encoding) {
						setXAxis(`${displayedData}.${config.spec.encoding.x.field}`)
						if ('axis' in config.spec.encoding.x) {
							setXAxisTitle(config.spec.encoding.x.axis?.title)
						}
					}
					if ('y' in config.spec.encoding) {
						setYAxis(`${displayedData}.${config.spec.encoding.y.field}`)
						if ('axis' in config.spec.encoding.y) {
							setYAxisTitle(config.spec.encoding.y.axis?.title)
						}
					}
				}
			}
		} 
	}, [])
	useFirstUpdate(() => {
		if (model && xAxis && xAxis.includes(displayedData)) {
			let fieldX = xAxis.replace(`${displayedData}.`, '')
			const axisShared = {
				"titleFont": "Nunito ExtraLight",
				"titleFontWeight": "normal",
				"titleFontStyle": "italic"
			}
			let cfg = {
				repeat: {
					layer: layer.map(el => el.name)
				},
				spec: {
					mark: {"type": "line", "tooltip": true},
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
							field: {repeat: "layer"},
							type: 'quantitative',
							axis: {
								...axisShared,
								title: yAxisTitle && yAxisTitle
							},
							scale: {
								type: "log"
							}
						},
						color: {
							datum: {repeat: "layer"},
							type: "nominal",
							legend: {
								orient: "top"
							}
						}
					}
				}
			}
			setConfig(cfg)
		}
	}, [xAxis, yAxis, color, xAxisTitle, yAxisTitle, layer, displayedData])
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
				<div className="form-group">
				<Multiselect
					options={Object.keys(model).length ? Object.keys(model).filter((node, i)=>yFunc(node)).map(node => {return {name: node.replace(`${displayedData}.`, '')}} ) : []} // Options to display in the dropdown
					selectedValues={layer || null}
					onSelect={(selectedList, selectedItem) => setLayer(prev => [...prev, selectedItem])}
					onRemove={(selectedList, selectedItem) => setLayer(prev => [...prev.filter(el => el !== selectedItem)])}
					displayValue="name"
					hidePlaceholder
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

export default MultiLineWidgetEditor
