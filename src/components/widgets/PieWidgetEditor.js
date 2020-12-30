import React, { useEffect, useState } from 'react'
import { useFirstUpdate } from '../../utils/useFirstUpdate'
import WidgetOptions from '../WidgetOptions'

function PieWidgetEditor({model, config, setConfig, displayedData}) {
	const thetaFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const colorFunc = node => {if (typeof model[node] === 'string') {
		return model[node].includes('String')||model[node].includes('Int')||model[node].includes('Float')
	}}
	const [theta, setTheta] = useState('')
	const [color, setColor] = useState('')

	useEffect(() => {
		if (!theta && config) {
			if (Object.keys(config).length) {
				if ('encoding' in config) {
					if ('theta' in config.encoding) {
						setTheta(`${displayedData}.${config.encoding.theta.field}`)
					}
					if ('color' in config.encoding) {
						setColor(`${displayedData}.${config.encoding.color.field}`)
					}
				}
			}
		} 
	}, [])
	useFirstUpdate(() => {
		if (model  ) {
			let fieldTheta = theta && theta.replace(`${displayedData}.`, '')
			let fieldColor = color && color.replace(`${displayedData}.`, '')
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
