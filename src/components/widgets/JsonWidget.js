import React from 'react'

function JsonWidget({result}) {
	return (
		<div className="widget">
			<pre style={{'alignSelf': 'flex-start', 'width': '100%'}}>
				{JSON.stringify(result, null, 2)}
			</pre>
		</div>
	)
}

export default JsonWidget
