import React, { useEffect, useState } from 'react'
import WidgetOptions from '../WidgetOptions'

function PieWidgetEditor({model, setConfig}) {
	const thetaFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const colorFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const dataFunc = node => (model[node][0]==='[' && node.slice(-2, -1)!=='0') 
	const [theta, setTheta] = useState('')
	const [color, setColor] = useState('')
	const [displayedData, setDisplayedData] = useState('')
	useEffect(() => {
		if (model  ) {
			let fieldTheta = theta.replace(`${displayedData}.`, '')
			let fieldColor = color.replace(`${displayedData}.`, '')
			var cfg = {
				data: displayedData,
				encoding: {
					theta: {field: fieldTheta, type: 'quantitative'},
					color: {field: fieldColor, type: 'nominal'}
				}
			}
			setConfig(cfg)
		}
	}, [theta, color, displayedData])
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
					value={theta}
					setValue={setTheta}
					condition={thetaFunc}
					title={'Category'}
					model={model}
				/>
				<WidgetOptions 
					value={color}
					setValue={setColor}
					condition={colorFunc}
					title={'Color'}
					model={model}
				/>
			</div>
		</div>
	)
}

export default PieWidgetEditor
