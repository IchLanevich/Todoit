import React, { useEffect, useRef } from 'react'


const Test = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)




    return (
        <div>
            <button ref={buttonRef} className='p-3 bg-slate-200 rounded'>=</button>
        </div>
    )
}

export default Test