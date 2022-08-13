// 报名表页面表格小标题组件
import React, { useState } from 'react'
import './tittle.less'

type Block = {
    tittleName: string
}
function Tittle(props: Block) {
    return (
        <div className='tittle-container'>
            {/* 受教了！协同开发要注意自己引用的库会不会对其它代码产生影响 */}
            <div className='textBlock text-center'>{props.tittleName}</div>
            {/* 这里的text-center类是从boostrap中拿出来的，为了避免污染其它代码而没有再引入全部bootstrap.min.css */}
            <div className='underBlock bg-warning'></div>
        </div>
    )
}

export default Tittle
