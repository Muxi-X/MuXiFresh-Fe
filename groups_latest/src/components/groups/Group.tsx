import React, { useState } from 'react'
import './groupStyle.scss'
import Flower from './flower'
import GroupItem from './group-item'
import GroupController from './group-controller'

function Group() {

	const [store, setStore] = useState(0)
	return (
		<div className="products-wrap">
			<Flower />
			{/* 之前GroupItem是被包裹在一个className='products-intro'组件中的，该组件的作用是为文字的切换增加淡出淡入效果 */}
			<GroupItem data={store} />
			<GroupController select={setStore} current={store} />
		</div>
	)
}

export default Group