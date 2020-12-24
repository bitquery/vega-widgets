import React, { useEffect, useState } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'

function PieWidgetEditor({model, config, setConfig}) {
	const thetaFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const colorFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const dataFunc = node => (model[node][0]==='[' && node.slice(-2, -1)!=='0') 
	const [theta, setTheta] = useState('')
	const [color, setColor] = useState('')
	const [displayedData, setDisplayedData] = useState(() => config ? config.data : '')
	useEffect(() => {
		if (!theta && config) {
			if (Object.keys(config).length) {
				if ('encoding' in config) {
					if ('theta' in config.encoding) {
						setTheta(`${config.data}.${config.encoding.theta.field}`)
					}
					if ('color' in config.encoding) {
						setColor(`${config.data}.${config.encoding.color.field}`)
					}
				}
			}
		} 
	}, [JSON.stringify(config)])
	useFirstUpdate(() => {
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
